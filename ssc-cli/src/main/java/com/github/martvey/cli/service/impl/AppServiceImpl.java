package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.entity.app.AppDetail;
import com.github.martvey.cli.entity.app.AppTable;
import com.github.martvey.cli.entity.app.AppValidResultTable;
import com.github.martvey.cli.entity.app.DebugWebSocketClient;
import com.github.martvey.cli.entity.request.PAppRequest;
import com.github.martvey.cli.entity.request.UAppRequest;
import com.github.martvey.cli.entity.vim.VimOperator;
import com.github.martvey.cli.exception.SscCliException;
import com.github.martvey.cli.net.AppApi;
import com.github.martvey.cli.service.AppService;
import com.github.martvey.cli.util.FileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.java_websocket.client.WebSocketClient;
import org.jline.terminal.Terminal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.io.*;
import java.net.URI;
import java.nio.file.Files;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@Slf4j
@RequiredArgsConstructor
public class AppServiceImpl implements AppService {
    private final AppApi appApi;
    private final VimOperator vimOperator;
    @Lazy
    private final Terminal terminal;
    @Value("ws://${ssc.ip}:${ssc.port}/app-debug")
    private String sscServerUrl;

    @Override
    public List<AppTable> listApp(String projectId) {
        return appApi.listApp(projectId);
    }

    @Override
    public void createApp(String appName, String appType, File appFile, String projectId) {
        String content = appFile == null ? vimOperator.openVimAndReceive(null) : FileUtils.copyToString(appFile);
        if (ObjectUtils.isEmpty(content)) {
            throw new SscCliException("未定义内容");
        }

        PAppRequest appRequest = new PAppRequest();
        appRequest.setAppName(appName);
        appRequest.setAppType(appType);
        appRequest.setProjectId(projectId);
        appRequest.setContent(content);
        appApi.createApp(appRequest);
    }

    @Override
    public void updateAppContent(String id, File appFile) {
        AppDetail appDetail = appApi.getApp(id);

        String content = appFile == null ? vimOperator.openVimAndReceive(appDetail.getContent()) : FileUtils.copyToString(appFile);
        if (ObjectUtils.isEmpty(content)) {
            throw new SscCliException("未定义内容");
        }

        UAppRequest request = new UAppRequest();
        request.setId(id);
        request.setContent(content);
        appApi.updateApp(request);
    }

    @Override
    public void catApp(String appId) {
        AppDetail appDetail = appApi.getApp(appId);
        if (StringUtils.hasText(appDetail.getContent())) {
            terminal.writer().println(appDetail.getContent());
        }
    }

    @Override
    public String exportApp(String id) {
        try {
            AppDetail appDetail = appApi.getApp(id);
            if (appDetail == null) {
                return "";
            }
            File tempSqlFile = Files.createTempFile(appDetail.getAppName() + "_", ".sql").toFile();
            FileCopyUtils.copy(appDetail.getContent(), new FileWriter(tempSqlFile));
            return tempSqlFile.getPath();
        } catch (IOException e) {
            log.error("导出SQL文件错误，id={}", id, e);
            throw new SscCliException("导出SQL文件错误", e);
        }
    }

    @Override
    public AppValidResultTable validateApp(String id) {
        return appApi.validateApp(id);
    }

    @Override
    public void debugApp(String id) {
        AtomicBoolean isFinish = new AtomicBoolean(false);
        WebSocketClient webSocketClient = new DebugWebSocketClient(URI.create(sscServerUrl + "/" + id), terminal, isFinish);
        webSocketClient.connect();
        waitUntilCtrlCOrFinish(isFinish, webSocketClient);
    }

    @Override
    public void deleteApp(String appId) {
        appApi.deleteApp(appId);
    }

    private void waitUntilCtrlCOrFinish(AtomicBoolean isFinish, WebSocketClient webSocketClient) {
        terminal.handle(Terminal.Signal.INT, signal -> {
            log.debug("用户 Ctrl C 主动终止调试...");
            webSocketClient.send("close it...");
        });

        do {
            try {
                TimeUnit.MILLISECONDS.sleep(500);
            } catch (InterruptedException e) {
                throw new RuntimeException("状态轮询线程错误");
            }
        } while (!isFinish.get());
    }
}
