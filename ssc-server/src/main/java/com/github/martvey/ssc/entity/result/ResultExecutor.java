package com.github.martvey.ssc.entity.result;

import com.github.martvey.core.validator.SqlMetadata;
import com.github.martvey.debug.exception.UserProgramException;
import com.github.martvey.debug.util.SinkNameSelector;
import com.github.martvey.ssc.constant.AppEnum;
import com.github.martvey.ssc.entity.result.collector.AbstractCollectResult;
import com.github.martvey.ssc.entity.result.collector.CollectBatchResult;
import com.github.martvey.ssc.entity.result.collector.CollectStreamResult;
import com.github.martvey.ssc.entity.result.type.*;
import com.github.martvey.ssc.entity.result.view.*;
import com.github.martvey.ssc.exception.SscDebugException;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.common.ExecutionConfig;
import org.apache.flink.api.dag.Pipeline;
import org.apache.flink.client.ClientUtils;
import org.apache.flink.client.program.*;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.configuration.DeploymentOptions;
import org.apache.flink.core.execution.DefaultExecutorServiceLoader;
import org.apache.flink.core.execution.JobClient;
import org.apache.flink.core.execution.PipelineExecutorFactory;
import org.apache.flink.optimizer.CompilerException;
import org.apache.flink.table.api.TableSchema;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.operations.ddl.CreateDebugOperation;
import org.apache.flink.util.ExceptionUtils;
import org.apache.flink.util.TemporaryClassLoaderContext;
import org.springframework.util.ObjectUtils;

import javax.annotation.Nullable;
import java.io.PrintWriter;
import java.io.Serializable;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.apache.flink.util.Preconditions.checkNotNull;

@Slf4j
public class ResultExecutor {
    public static final String OPT_D = "-D";
    public static final String DEBUG_ENABLE = "deployment.debug-enable=%s";
    public static final String COLLECT_ENABLE = "deployment.collect-serialize=%s";
    public static final String SINK_ADDRESS = "deployment.gateway.%s.address=%s";
    public static final String SINK_PORT = "deployment.gateway.%s.port=%d";

    private final Boolean inStreamMode;
    private final PrintWriter writer;
    private final String sqlContent;
    private final AppEnum appType;
    private final Environment environment;
    private final Configuration configuration;
    private final List<URL> classPathList;
    private final String entryPointClassName;


    private ResultExecutor(Configuration configuration,
                           List<URL> classPathList,
                           String entryPointClassName,
                           Environment environment,
                           PrintWriter writer,
                           AppEnum appType,
                           @Nullable String sqlContent) {
        this.classPathList = classPathList;
        this.entryPointClassName = entryPointClassName;
        this.environment = environment;
        this.configuration = configuration;
        this.writer = writer;
        this.sqlContent = sqlContent;
        this.appType = appType;
        this.inStreamMode = environment.getExecution().inStreamingMode();
    }

    @SuppressWarnings("all")
    public void printResult() throws ProgramInvocationException {
        List<TypeInfoHolder<?>> typeInfoHolderList = buildTypeInfoHolderList();

        String[] args;

        AbstractCollectResult<?> result;
        if (inStreamMode) {
            List<SocketHolderWrapper<?>> socketList = convert2Socket(typeInfoHolderList);
            result = new CollectStreamResult(socketList);
            args = buildProgramArgs(socketList);
        } else {
            result = new CollectBatchResult(typeInfoHolderList);
            args = buildBaseArgs();
        }

        ResultCollectorOperator<?> operator = new ResultCollectorOperator<>(result);

        JobClient jobClient = runJob(args);
        operator.startRetrieval(jobClient);

        boolean isSingle = typeInfoHolderList.size() == 1;
        if (appType == AppEnum.SQL) {
            receiveSqlResult(isSingle, operator, typeInfoHolderList);
        } else if (appType == AppEnum.JAR) {
            receiveJarResult(operator, typeInfoHolderList);
        }

        if (operator.isJobRunning()) {
            jobClient.cancel();
        }
    }


    private JobClient runJob(String[] args) throws ProgramInvocationException {
        PackagedProgram packagedProgram = buildPackagedProgram(args);

        final PipelineExecutorFactory executorFactory = new DefaultExecutorServiceLoader().getExecutorFactory(configuration);

        checkNotNull(
                executorFactory,
                "找不到 execution.target (=%s) 指定的工厂",
                configuration.get(DeploymentOptions.TARGET));

        try {
            Pipeline pipeline = PackagedProgramUtils.getPipelineFromProgram(packagedProgram, configuration, 1, true);
            checkNotNull(pipeline, "任务StreamGraph为空");

            CompletableFuture<JobClient> jobClientFuture = executorFactory
                    .getExecutor(configuration)
                    .execute(pipeline, configuration, packagedProgram.getUserCodeClassLoader());

            return jobClientFuture.get();
        } catch (Throwable throwable) {
            final Throwable strippedException = ExceptionUtils.stripExecutionException(throwable);
            throw new SqlExecutionException(String.format("执行任务失败 '%s'.", ""), strippedException);
        }
    }

    private List<TypeInfoHolder<?>> buildTypeInfoHolderList() throws ProgramInvocationException {
        if (appType == AppEnum.SQL) {
            ClassLoader userCodeClassLoader = ClientUtils.buildUserCodeClassLoader(Collections.emptyList(), classPathList, this.getClass().getClassLoader(), configuration);
            ExecutionConfig config = new ExecutionConfig();
            try (TemporaryClassLoaderContext ignored = TemporaryClassLoaderContext.of(userCodeClassLoader)) {
                return SqlMetadata.buildSqlMetadata(environment, userCodeClassLoader, configuration)
                        .validateSql(sqlContent)
                        .stream()
                        .filter(operation -> operation instanceof CreateDebugOperation)
                        .map(operation -> {
                            CreateDebugOperation op = (CreateDebugOperation) operation;
                            String tableName = op.getDebugIdentifier().getObjectName();
                            TableSchema tableSchema = op.getCatalogDebug().getSchema();
                            return inStreamMode ? new SqlStreamTypeInfoHolder(tableName, tableSchema, config) : new SqlBatchTypeInfoHolder(tableName, tableSchema, config);
                        })
                        .collect(Collectors.toList());
            }
        }
        return getTypeInfoHolderFromProgram();
    }

    private PackagedProgram buildPackagedProgram(String[] args) throws ProgramInvocationException {
        return PackagedProgram.newBuilder()
                .setArguments(args)
                .setConfiguration(configuration)
                .setEntryPointClassName(entryPointClassName)
                .setUserClassPaths(classPathList)
                .build();
    }

    @SuppressWarnings("all")
    private void receiveJarResult(ResultCollectorOperator<?> operator, List<TypeInfoHolder<?>> typeInfoHolderList) {
        BasicResultView<? extends Serializable> resultView = new BasicResultView(writer, operator, typeInfoHolderList);
        if (inStreamMode) {
            resultView.displayStreamResults();
        } else {
            resultView.displayBatchResults();
        }
    }

    @SuppressWarnings("all")
    private void receiveSqlResult(Boolean isSingle, ResultCollectorOperator<?> operator, List<TypeInfoHolder<?>> typeInfoHolderList) {
        if (inStreamMode) {
            ResultView resultView = isSingle
                    ? new SqlTableauResultView(writer, operator, typeInfoHolderList)
                    : new SqlChangelogResultView(writer, operator, typeInfoHolderList);
            resultView.displayStreamResults();
        } else {
            ResultView resultView = new SqlTableauResultView(writer, operator, typeInfoHolderList);
            resultView.displayBatchResults();
        }
    }

    private String[] buildBaseArgs() {
        return new String[]{OPT_D, String.format(DEBUG_ENABLE, Boolean.TRUE)};
    }

    private String[] buildProgramArgs(List<SocketHolderWrapper<?>> socketList) {
        String[] debugArgs = Arrays.copyOf(buildBaseArgs(), 2 + 4 * socketList.size());

        String[] socketArgs = socketList.stream()
                .flatMap(socket ->
                        Stream.of(
                                OPT_D, String.format(SINK_ADDRESS, socket.getName(), socket.getInetAddress().getHostAddress()),
                                OPT_D, String.format(SINK_PORT, socket.getName(), socket.getPort())
                        )
                )
                .toArray(String[]::new);

        System.arraycopy(socketArgs, 0, debugArgs, 2, socketArgs.length);

        return debugArgs;
    }

    private List<SocketHolderWrapper<?>> convert2Socket(List<TypeInfoHolder<?>> typeInfoHolderList) {
        return typeInfoHolderList.stream()
                .map(SocketHolderWrapper::new)
                .collect(Collectors.toList());
    }

    private List<TypeInfoHolder<?>> getTypeInfoHolderFromProgram() throws CompilerException, ProgramInvocationException {
        String[] args = Arrays.copyOf(buildBaseArgs(), 4);
        args[2] = OPT_D;
        args[3] = String.format(COLLECT_ENABLE, "true");

        PackagedProgram packagedProgram = buildPackagedProgram(args);
        ClassLoader userCodeClassLoader = packagedProgram.getUserCodeClassLoader();

        OptimizerPlanEnvironment benv = new OptimizerPlanEnvironment(configuration, userCodeClassLoader, 1);
        benv.setAsContext();
        StreamPlanEnvironment senv = new StreamPlanEnvironment(configuration, userCodeClassLoader, 1);
        senv.setAsContext();
        SinkNameSelector sinkNameSelector = new SinkNameSelector();
        sinkNameSelector.setAsContext();

        try (TemporaryClassLoaderContext ignore = TemporaryClassLoaderContext.of(userCodeClassLoader)) {
            try {
                packagedProgram.invokeInteractiveModeForExecution();
            } catch (Throwable t) {
                if (t instanceof ProgramAbortException) {
                    return sinkNameSelector.entrySet()
                            .stream()
                            .map(entry -> new BasicTypeInfoHolder<>(entry.getKey(), entry.getValue()))
                            .collect(Collectors.toList());
                }

                if (t instanceof ProgramInvocationException) {
                    Throwable cause = t.getCause();
                    if (cause instanceof UserProgramException) {
                        throw new SscDebugException(cause.getMessage());
                    }
                    throw t;
                }

                throw new ProgramInvocationException("JAR包执行错误");
            } finally {
                benv.unsetAsContext();
                senv.unsetAsContext();
                sinkNameSelector.unsetAsContext();
            }
        }
        throw new ProgramInvocationException("无法获取序列化类型");
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String entryPointClassName;
        private PrintWriter writer;
        private String sqlContent;
        private List<URL> jarUrlList;
        private List<URL> classPathList;
        private Environment environment;
        private Configuration configuration;
        private AppEnum appType;

        public Builder writer(PrintWriter writer) {
            this.writer = writer;
            return this;
        }

        public Builder sqlContent(String sqlContent) {
            this.sqlContent = sqlContent;
            return this;
        }

        public Builder jarUrlList(List<URL> jarUrlList) {
            this.jarUrlList = jarUrlList;
            return this;
        }

        public Builder classPathList(List<URL> classPathList) {
            this.classPathList = classPathList;
            return this;
        }

        public Builder environment(Environment environment) {
            this.environment = environment;
            return this;
        }

        public Builder configuration(Configuration configuration) {
            this.configuration = configuration;
            return this;
        }

        public Builder entryPointClassName(String entryPointClassName) {
            this.entryPointClassName = entryPointClassName;
            return this;
        }

        public Builder appType(AppEnum appType) {
            this.appType = appType;
            return this;
        }

        private List<URL> mergeJarUrlAndClassPath() {
            LinkedList<URL> list = new LinkedList<>();
            list.addAll(classPathList == null ? Collections.emptyList() : classPathList);
            list.addAll(jarUrlList == null ? Collections.emptyList() : jarUrlList);
            return list;
        }

        public ResultExecutor build() throws URISyntaxException, ProgramInvocationException {
            return new ResultExecutor(configuration,
                    mergeJarUrlAndClassPath(),
                    entryPointClassName,
                    environment,
                    writer,
                    appType,
                    sqlContent);
        }
    }
}
