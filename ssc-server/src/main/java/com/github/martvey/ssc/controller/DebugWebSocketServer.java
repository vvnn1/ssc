package com.github.martvey.ssc.controller;


import com.github.martvey.core.util.EnvironmentUtils;
import com.github.martvey.debug.exception.UserProgramException;
import com.github.martvey.ssc.entity.bo.LocalWorkSpaceBO;
import com.github.martvey.ssc.entity.debug.CmdOutputWriter;
import com.github.martvey.ssc.entity.result.ResultExecutor;
import com.github.martvey.ssc.entity.sql.AppDetail;
import com.github.martvey.ssc.exception.SscDebugException;
import com.github.martvey.ssc.exception.SscSqlWorkSpaceException;
import com.github.martvey.ssc.service.AppService;
import com.google.common.util.concurrent.ThreadFactoryBuilder;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.client.deployment.executors.LocalExecutor;
import org.apache.flink.client.program.ProgramInvocationException;
import org.apache.flink.configuration.*;
import org.apache.flink.core.fs.Path;
import org.apache.flink.runtime.util.ExecutorThreadFactory;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.util.FlinkRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

@Component
@ServerEndpoint(value = "/app-debug/{appId}")
@Slf4j
public class DebugWebSocketServer {
    private static AppService sqlService;
    private volatile boolean isRunning = true;
    private Session session;
    private String appId;
    private PrintWriter printWriter;

    public static final ExecutorService debugExecutorService = new ThreadPoolExecutor(
            Runtime.getRuntime().availableProcessors() * 2,
            Runtime.getRuntime().availableProcessors() * 3,
            60L,
            TimeUnit.SECONDS,
            new SynchronousQueue<>(),
            new ThreadFactoryBuilder().setNameFormat("ssc-debug-%d").setDaemon(true).build(),
            new ThreadPoolExecutor.CallerRunsPolicy()
    );

    @OnOpen
    public void onOpen(@PathParam("appId") String appId, Session session) {
        log.debug("Debug app {} ...", appId);
        this.session = session;
        this.appId = appId;
        this.printWriter = new PrintWriter(new CmdOutputWriter(session));
        debugExecutorService.execute(this::doDebug);
    }

    @OnClose
    public void onClose() {
        log.info("Debug app {} 关闭", appId);
        makePendingFinish();
    }

    @OnMessage
    public void onMessage(String ignore) {
        makePendingFinish();
    }

    private void doDebug() {
        try {
            printWriter.write("项目构件中....");
            AppDetail appDetail = sqlService.getAppDetailAllScope(appId);
            String debugMetastoreConfig = initMetastoreConfig(appDetail.getMetastoreConfig());

            String content = appDetail.getContent();
            List<Path> jarList = appDetail.getJarList();
            String mainClass = appDetail.getMainClass();

            try (LocalWorkSpaceBO workSpaceBO = new LocalWorkSpaceBO()) {
                workSpaceBO.createWorkSpace(debugMetastoreConfig, content, jarList);

                List<URL> jarUrlList = workSpaceBO.getJarUrlList();
                List<URL> classPathList = workSpaceBO.getClassPaths();

                Configuration configuration = EnvironmentUtils.resolveConfiguration(debugMetastoreConfig);
                ConfigUtils.encodeCollectionToConfig(configuration, PipelineOptions.JARS, jarUrlList, URL::toString);
                ConfigUtils.encodeCollectionToConfig(configuration, PipelineOptions.CLASSPATHS, classPathList, URL::toString);

                Environment defaultEnvironment = EnvironmentUtils.parse(debugMetastoreConfig);

                ResultExecutor resultExecutor = ResultExecutor.builder()
                        .entryPointClassName(mainClass)
                        .jarUrlList(jarUrlList)
                        .classPathList(classPathList)
                        .environment(defaultEnvironment)
                        .appType(appDetail.getAppType())
                        .sqlContent(content)
                        .writer(printWriter)
                        .configuration(configuration)
                        .isRunning(() -> isRunning)
                        .build();

                printWriter.write("项目构建完毕....");
                resultExecutor.printResult();

            }
        } catch (SscSqlWorkSpaceException | IOException e) {
            throw new SscDebugException("调试环境构建异常", e);
        } catch (ProgramInvocationException | URISyntaxException e) {
            throw new SscDebugException("调试异常", e);
        } catch (UserProgramException e) {
            throw new SscDebugException("用户程序错误", e);
        } finally {
            try {
                session.close();
            } catch (IOException e) {
                log.error("关闭 websocket session 错误", e);
            }
        }
    }

    private String initMetastoreConfig(String defaultMetastoreConfig) {
        try {
            Environment environment = EnvironmentUtils.parse(defaultMetastoreConfig);
            Configuration initConfiguration = Configuration.fromMap(environment.getConfiguration().asMap());
            initConfiguration.set(DeploymentOptions.ATTACHED, true);
            initConfiguration.set(DeploymentOptions.TARGET, LocalExecutor.NAME);
            initConfiguration.set(CoreOptions.DEFAULT_PARALLELISM, 1);
            initConfiguration.removeConfig(CheckpointingOptions.SAVEPOINT_DIRECTORY);
            initConfiguration.removeConfig(CheckpointingOptions.STATE_BACKEND);
            initConfiguration.removeConfig(CheckpointingOptions.CHECKPOINTS_DIRECTORY);
            environment.setConfiguration(changeGenerics(initConfiguration.toMap()));
            return EnvironmentUtils.press(environment);
        } catch (IOException e) {
            throw new FlinkRuntimeException("Environment转化错误", e);
        }
    }

    private <K, V> Map<K, V> changeGenerics(Map<? extends K, ? extends V> m) {
        //noinspection unchecked
        return (Map<K, V>) m;
    }

    private void makePendingFinish() {
        if (this.isRunning) {
            this.isRunning = false;
        }
    }

    @Autowired
    public void setSqlNet(AppService sqlService) {
        DebugWebSocketServer.sqlService = sqlService;
    }
}
