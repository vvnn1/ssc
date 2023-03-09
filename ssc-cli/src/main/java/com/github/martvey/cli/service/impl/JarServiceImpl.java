package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.entity.jar.JarTable;
import com.github.martvey.cli.net.JarApi;
import com.github.martvey.cli.service.JarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class JarServiceImpl implements JarService {
    private final JarApi jarApi;

    @Override
    public void uploadJar(File jarFile, String scopeType, String scopeId) {
        MultipartBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("file", jarFile.getName(), RequestBody.create(MediaType.parse("multipart/form-data"), jarFile))
                .addFormDataPart("scopeType", scopeType)
                .addFormDataPart("scopeId", scopeId)
                .build();
        jarApi.uploadJar(requestBody);
    }

    @Override
    public List<JarTable> listJar(String spaceId, String projectId, String appId) {
        return jarApi.listJar(spaceId, projectId, appId);
    }

    @Override
    public void deleteJar(String jarId) {
        jarApi.deleteJar(jarId);
    }
}
