package com.github.martvey.ssc.service.impl;


import com.github.martvey.core.exception.SscSqlValidatorException;
import com.github.martvey.ssc.constant.ScopeEnum;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.constant.AppEnum;
import com.github.martvey.ssc.dao.AppDao;
import com.github.martvey.ssc.dao.JarDao;
import com.github.martvey.ssc.entity.metastore.ScopeQuery;
import com.github.martvey.ssc.entity.request.PUAppRequest;
import com.github.martvey.ssc.entity.sql.*;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.AppService;
import com.github.martvey.ssc.service.MetastoreService;
import com.github.martvey.ssc.util.AppUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.util.Preconditions;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.List;
@Service
@Slf4j
@RequiredArgsConstructor
public class AppServiceImpl implements AppService {
    private final AppDao appDao;
    private final JarDao jarDao;
    private final MetastoreService metastoreService;

    @Override
    @Transactional
    public void insertApp(AppUpsert upsert) {
        try {
            appDao.insertApp(upsert);
        }catch (DaoException e){
            log.error("创建应用失败，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    @Transactional
    public void updateApp(AppUpsert upsert) {
        try {
            appDao.updateApp(upsert);
        }catch (DaoException e){
            log.error("更新应用失败，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void deleteAppById(String id) {
        try {
            appDao.deleteAppById(id);
        } catch (DaoException e) {
            log.error("删除app失败，id={}", id,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public SqlValidResultVO validateSql(String id) {
        try {
            AppDetail appDetail = getAppDetailAllScope(id);
            Preconditions.checkState(appDetail != null, "不存在此SQL信息");
            Preconditions.checkState(appDetail.getAppType() == AppEnum.SQL, "不支持校验JAR");
            AppUtil.validateSql(appDetail);
            return null;
        } catch (SscSqlValidatorException e) {
            return new SqlValidResultVO(e.getSqlContent(), e.getMessage());
        }catch (Exception e){
            log.error("校验异常",e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public AppDetail getAppDetail(AppDetailQuery query) {
        try {
            String appId = query.getAppId();
            AppDetail appDetail = appDao.getAppDetail(appId);
            if (appDetail == null)
                return null;

            String spaceId = appDetail.getSpaceId();
            String projectId = appDetail.getProjectId();

            ScopeQuery scopeQuery = ScopeQuery.builder(spaceId, projectId, appId)
                    .scopeTypeList(query.getScopeTypeList())
                    .build();
            appDetail.setJarList(jarDao.listJarPathCover(scopeQuery));

            String metastoreConfig = metastoreService.getProjectEnvironment(scopeQuery);
            appDetail.setMetastoreConfig(metastoreConfig);

            return appDetail;
        }catch (DaoException e){
            log.error("查询SQL详细信息错误，query={}", query,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public AppDetail getAppDetailAllScope(String id) {
        AppDetailQuery appDetailQuery = AppDetailQuery.builder()
                .appId(id)
                .scopeTypeList(ScopeEnum.SYSTEM, ScopeEnum.SPACE, ScopeEnum.PROJECT, ScopeEnum.APPLICATION)
                .build();
        return getAppDetail(appDetailQuery);
    }

    @Override
    public List<AppVO> listAppVO(String projectId) {
        try {
            return appDao.listAppVO(projectId);
        }catch (DaoException e){
            log.error("查询SQL列表失败， projectId={}", projectId,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public AppVO getAppVO(String sqlId) {
        try {
            return appDao.getAppVO(sqlId);
        }catch (DaoException e){
            log.error("查询sql失败，sqlId={}", sqlId,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public PUAppRequest buildPUAppRequestById(String id) {
        AppVO appVO;
        if (ObjectUtils.isEmpty(id) || (appVO = appDao.getAppVO(id)) == null){
            return new PUAppRequest();
        }
        PUAppRequest request = new PUAppRequest();
        BeanUtils.copyProperties(appVO, request);
        return request;
    }
}
