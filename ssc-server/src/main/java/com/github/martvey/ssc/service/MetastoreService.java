package com.github.martvey.ssc.service;


import com.github.martvey.ssc.constant.MetastoreEnum;
import com.github.martvey.ssc.entity.metastore.*;
import org.apache.flink.configuration.Configuration;

import java.util.List;

public interface MetastoreService {
    void insertMetastore(MetastoreDefine<?> metastoreDefine);
    void deleteMetastore(MetastoreDelete delete);
    void updateMetastore(String id, MetastoreDefine<?> metastoreDefine);
    String getProjectEnvironment(ScopeQuery scopeQuery);

    List<MetastoreVO> listMetastore(MetastoreQuery query);

    MetastoreDefine<?> getMetastoreDefine(MetastoreEnum metastoreType, ScopeQuery scopeQuery);

    MetastoreVO getMetastore(MetastoreQuery query);

    Configuration getConfigurationCover(ScopeQuery query);
}
