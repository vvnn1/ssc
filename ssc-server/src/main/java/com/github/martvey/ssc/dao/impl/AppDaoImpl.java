package com.github.martvey.ssc.dao.impl;


import com.github.martvey.ssc.dao.AppDao;
import com.github.martvey.ssc.entity.sql.AppDetail;
import com.github.martvey.ssc.entity.sql.AppUpsert;
import com.github.martvey.ssc.entity.sql.AppVO;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.mapper.local.AppMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AppDaoImpl implements AppDao {
    private final AppMapper appMapper;

    @Override
    public void insertApp(AppUpsert upsert) {
        try {
            appMapper.insertSql(upsert);
        } catch (Exception e) {
            throw new DaoException("数据库插入sql信息错误",e);
        }
    }

    @Override
    public void deleteAppById(String id) throws DaoException {
        try {
            appMapper.deleteSqlById(id);
        } catch (Exception e) {
            throw new DaoException("数据库删除sql信息错误",e);
        }
    }

    @Override
    public void updateApp(AppUpsert upsert) throws DaoException {
        try {
            appMapper.updateSql(upsert);
        } catch (Exception e) {
            throw new DaoException("数据库更新sql信息错误",e);
        }
    }

    @Override
    public AppDetail getAppDetail(String sqlId) throws DaoException {
        try {
            return appMapper.getSqlDetail(sqlId);
        }catch (Exception e){
            throw new DaoException("数据库查询Sql详情错误",e);
        }
    }

    @Override
    public List<AppVO> listAppVO(String projectId) {
        try {
            return appMapper.listSqlVO(projectId);
        }catch (Exception e){
            throw new DaoException("数据库查询SQL列表错误",e);
        }
    }

    @Override
    public AppVO getAppVO(String sqlId) throws DaoException {
        try {
            return appMapper.getSqlVO(sqlId);
        }catch (Exception e){
            throw new DaoException("数据库查询SQL错误",e);
        }
    }
}
