package com.github.martvey.cli.service;

import com.github.martvey.cli.entity.app.AppTable;
import com.github.martvey.cli.entity.app.AppValidResultTable;

import java.io.File;
import java.util.List;

public interface AppService {
    List<AppTable> listApp(String projectId);
    void createApp(String appName, String appType, File contentFile, String projectId);
    void updateAppContent(String id, File appFile);

    void catApp(String appId);

    String exportApp(String id);

    AppValidResultTable validateApp(String id);

    void debugApp(String id);

    void deleteApp(String appId);
}
