package com.github.martvey.ssc.mapper.local;



import com.github.martvey.ssc.entity.sql.AppDetail;
import com.github.martvey.ssc.entity.sql.AppUpsert;
import com.github.martvey.ssc.entity.sql.AppVO;

import java.util.List;

public interface AppMapper {
    void insertSql(AppUpsert upsert);
    void deleteSqlById(String id);
    void updateSql(AppUpsert upsert);

    AppDetail getSqlDetail(String sqlId);

    List<AppVO> listSqlVO(String projectId);

    AppVO getSqlVO(String sqlId);
}
