package com.github.martvey.ssc.dao;


import com.github.martvey.ssc.entity.request.PUAppRequest;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.entity.sql.AppDetail;
import com.github.martvey.ssc.entity.sql.AppUpsert;
import com.github.martvey.ssc.entity.sql.AppVO;

import java.util.List;

public interface AppDao {
    void insertApp(AppUpsert upsert) throws DaoException;
    void deleteAppById(String id) throws DaoException;
    void updateApp(AppUpsert upsert) throws DaoException;

    AppDetail getAppDetail(String id) throws DaoException;

    List<AppVO> listAppVO(String projectId) throws DaoException;

    AppVO getAppVO(String id) throws DaoException;
}
