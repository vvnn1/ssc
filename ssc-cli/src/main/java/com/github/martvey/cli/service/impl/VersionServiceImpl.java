package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.entity.request.PVersionRequest;
import com.github.martvey.cli.entity.version.VersionTable;
import com.github.martvey.cli.net.VersionApi;
import com.github.martvey.cli.service.VersionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class VersionServiceImpl implements VersionService {
    private final VersionApi versionApi;

    @Override
    public void createVersion(String id, String versionName) {
        versionApi.createVersion(new PVersionRequest(id, versionName));
    }

    @Override
    public List<VersionTable> listVersion(String appId) {
        return versionApi.listVersion(appId);
    }

    @Override
    public void dropVersion(String versionId) {
        versionApi.dropVersion(versionId);
    }
}
