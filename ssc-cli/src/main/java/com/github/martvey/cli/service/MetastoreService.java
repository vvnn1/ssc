package com.github.martvey.cli.service;

import com.github.martvey.cli.constant.MetastoreEnum;
import com.github.martvey.cli.entity.metastore.MetastoreTable;

import java.io.File;
import java.util.List;

public interface MetastoreService {
    void createMetastore(MetastoreEnum metastoreType, File yamlFile, String scopeType, String scopeId);
    void updateMetastore(String id, MetastoreEnum metastoreType, File yamlFile, String scopeType, String scopeId);
    List<? extends MetastoreTable> listMetastore(MetastoreEnum metastoreType, String spaceId, String projectId, String appId);
    void deleteMetastore(MetastoreEnum metastoreType, String id);
    void printMetastore(MetastoreEnum metastoreType, String id);
}
