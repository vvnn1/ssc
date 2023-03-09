package com.github.martvey.ssc.controller;


import com.github.martvey.core.util.EnvironmentUtils;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.entity.bo.LocalWorkSpaceBO;
import com.github.martvey.ssc.entity.debug.CmdOutputWriter;
import com.github.martvey.ssc.entity.result.ResultExecutor;
import com.github.martvey.ssc.entity.sql.AppDetail;
import com.github.martvey.ssc.exception.SscDebugException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.AppService;
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

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

@Component
@ServerEndpoint(value = "/app-debug/{appId}")
@Slf4j
public class DebugWebSocketServer {
    private static AppService sqlService;
    private final AtomicBoolean isOpening;
    private Session session;
    private String appId;
    private PrintWriter printWriter;

    public DebugWebSocketServer() {
        isOpening = new AtomicBoolean(true);
    }

    @OnOpen
    public void onOpen(@PathParam("appId") String appId, Session session) {
        log.debug("Debug app {} ...", appId);
        this.session = session;
        this.appId = appId;
        printWriter = new PrintWriter(new CmdOutputWriter(session));
        CompletableFuture.supplyAsync(this::buildClient)
                .thenCompose(this::runJobAndWaitUserInterrupted)
                .whenComplete(this::closeSession);
    }

    @OnClose
    public void onClose() {
        log.info("websocket 关闭");
        makePendingFinish();
    }

    @OnMessage
    public void onMessage(String cmd){
        log.info("接受到消息....{}", cmd);
        makePendingFinish();
    }

    private Runnable buildClient(){
        try {
            AppDetail appDetail = sqlService.getAppDetailAllScope(appId);

            String debugMetastoreConfig = initMetastoreConfig(appDetail.getMetastoreConfig());

            String content = appDetail.getContent();
            List<Path> jarList = appDetail.getJarList();
            String mainClass = appDetail.getMainClass();

            LocalWorkSpaceBO workSpaceBO = new LocalWorkSpaceBO();
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
                    .build();
            return () -> {
                try {
                    resultExecutor.printResult();
                } catch (ProgramInvocationException e) {
                    log.error("调试错误",e);
                    throw new RuntimeException(e.getMessage());
                } finally {
                    workSpaceBO.close();
                }
            };
        } catch (Exception e) {
            log.error("构建工作环境错误",e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    private void closeSession(Void unused, Throwable t) {
        try {
            if (t != null){
                Throwable cause = t.getCause();
                if (cause instanceof SscDebugException){
                    printWriter.println(cause.getMessage());
                } else {
                    log.error("调试未知错误",t);
                    printWriter.println("系统异常");
                }
            }
            this.session.close();
        } catch (IOException e) {
            log.warn("session错误", e);
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
        }catch (IOException e){
            throw new FlinkRuntimeException("Environment转化错误", e);
        }
    }

    @SuppressWarnings("unchecked")
    private <K,V> Map<K,V> changeGenerics(Map<? extends K, ? extends V> m){
        return (Map<K, V>) m;
    }

    private CompletableFuture<Void> runJobAndWaitUserInterrupted(Runnable job){
        ExecutorService executorService = Executors.newSingleThreadExecutor(new ExecutorThreadFactory("DebugJobThread"));

        CompletableFuture<Void> cf1 = CompletableFuture
                .runAsync(job, executorService)
                .whenComplete((unused, throwable) -> makePendingFinish());
        CompletableFuture<Void> cf2 = CompletableFuture
                .runAsync(this::listenUserInterrupted)
                .whenComplete((unused, throwable) -> {
                    if (!executorService.isShutdown()) {
                        executorService.shutdownNow();
                    }
                });

        return cf2.runAfterBoth(cf1, () -> {});
    }

    private void listenUserInterrupted(){
        synchronized (isOpening) {
            while (isOpening.get()) {
                try {
                    isOpening.wait();
                } catch (InterruptedException e) {
                    break;
                }
            }
            log.info("阻塞线程结束");
        }
    }

    private void makePendingFinish(){
        synchronized (isOpening){
            isOpening.compareAndSet(true,false);
            isOpening.notify();
        }
    }

    @Autowired
    public void setSqlNet(AppService sqlService) {
        DebugWebSocketServer.sqlService = sqlService;
    }
}
