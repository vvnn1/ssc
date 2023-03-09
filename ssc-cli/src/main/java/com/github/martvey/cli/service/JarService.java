package com.github.martvey.cli.service;

import com.github.martvey.cli.entity.jar.JarTable;

import java.io.File;
import java.util.List;

public interface JarService {
    void uploadJar(File jarFile, String scopeType, String scopeId);
    List<JarTable> listJar(String spaceId, String projectId, String appId);
    void deleteJar(String jarId);
}
