package com.github.martvey.ssc.service;


import com.github.martvey.ssc.entity.request.PUAppRequest;
import com.github.martvey.ssc.entity.sql.*;

import java.util.List;

public interface AppService {
    void insertApp(AppUpsert upsert);
    void deleteAppById(String id);
    void updateApp(AppUpsert upsert);
    SqlValidResultVO validateSql(String id);

    AppDetail getAppDetail(AppDetailQuery query);
    AppDetail getAppDetailAllScope(String id);

    List<AppVO> listAppVO(String projectId);
    AppVO getAppVO(String sqlId);

    PUAppRequest buildPUAppRequestById(String id);
}
