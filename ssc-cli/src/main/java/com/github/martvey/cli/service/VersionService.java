package com.github.martvey.cli.service;

import com.github.martvey.cli.entity.version.VersionTable;

import java.util.List;

public interface VersionService {
    void createVersion(String sqlId, String versionName);

    List<VersionTable> listVersion(String sqlId);

    void dropVersion(String sqlId);
}
