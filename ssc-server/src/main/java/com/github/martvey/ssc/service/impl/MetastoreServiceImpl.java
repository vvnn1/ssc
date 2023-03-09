package com.github.martvey.ssc.service.impl;

import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.constant.MetastoreEnum;
import com.github.martvey.ssc.entity.metastore.*;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.mapper.local.MetastoreMapper;
import com.github.martvey.ssc.service.MetastoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.flink.table.client.config.ConfigUtil;
import org.apache.flink.table.client.config.Environment;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.github.martvey.ssc.constant.ScopeEnum.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class MetastoreServiceImpl implements MetastoreService {
    private final MetastoreMapper metastoreMapper;
    @Override
    @Transactional
    public void insertMetastore(MetastoreDefine<?> metastoreDefine) {
        metastoreDefine.validate();
        MetastoreEnum metastoreType = metastoreDefine.getMetastoreType();
        try {
            metastoreType.insertDefineData.accept(metastoreDefine);
        } catch (DaoException e) {
            log.error("添加元数据错误, metastoreDefine={}",metastoreDefine,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void deleteMetastore(MetastoreDelete delete) {
        MetastoreEnum metastoreType = delete.getMetastoreType();
        try {
            metastoreType.deleteDefineData.accept(delete);
        } catch (DaoException e) {
            log.error("删除元数据错误,metastoreDelete={}", delete,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void updateMetastore(String id, MetastoreDefine<?> metastoreDefine) {
        metastoreDefine.validate();
        MetastoreEnum metastoreType = metastoreDefine.getMetastoreType();
        try {
            metastoreType.updateDefineData.accept(id, metastoreDefine);
        } catch (DaoException e) {
            log.error("更新元数据信息错误,metastoreDefine={}", metastoreDefine,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public String getProjectEnvironment(ScopeQuery scopeQuery) {
        try {
            return Arrays.stream(MetastoreEnum.values())
                    .map(metastoreType -> getMetastoreDefine(metastoreType, scopeQuery))
                    .sorted()
                    .map(MetastoreDefine::toYaml)
                    .collect(Collectors.joining("\n"));
        } catch (DaoException e) {
            log.error("查询job配置错误, spaceId={}，projectId={}", scopeQuery,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public List<MetastoreVO> listMetastore(MetastoreQuery query) {
        ScopeQuery scopeQuery = ScopeQuery.builder(query.getSpaceId(), query.getProjectId(), query.getAppId())
                .scopeTypeList(SPACE, PROJECT, APPLICATION)
                .build();

        MetastoreEnum metastoreType = query.getMetastoreType();
        try {
            return metastoreType.listDefineData
                    .apply(scopeQuery);
        }catch (DaoException e){
            log.error("查询元素据失败",e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public MetastoreDefine<?> getMetastoreDefine(MetastoreEnum metastoreType, ScopeQuery scopeQuery){
        try {
            return metastoreType.listDefineData
                    .andThen(metastoreDOList -> cast2MetastoreDefineStream(metastoreDOList, metastoreType))
                    .apply(scopeQuery)
                    .sorted()
                    .reduce((m1, m2) -> {
                        m1.enrich(m2);
                        return m1;
                    })
                    .orElseGet(metastoreType::emptyMetastoreDefine);
        }catch (DaoException e){
            log.error("查询元数据失败",e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }

    }

    @Override
    public MetastoreVO getMetastore(MetastoreQuery query) {
        MetastoreEnum metastoreType = query.getMetastoreType();
        try {
            return metastoreType.getDefineData.apply(query.getId());
        }catch (DaoException e){
            log.error("查询元数据信息失败",e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public Configuration getConfigurationCover(ScopeQuery query) {
        try {
            Configuration mergedConfiguration = new Configuration();
            for (MetastoreVO metastoreVO : metastoreMapper.queryConfiguration(query)) {
                String sourceYaml = metastoreVO.getSourceYaml();
                Environment environment = Environment.parse(sourceYaml);
                environment.getConfiguration().asMap().forEach(mergedConfiguration::setString);
            }
            return mergedConfiguration;
        } catch (Exception e) {
            log.error("查询配置失败，query={}", query,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    private Stream<MetastoreDefine<?>> cast2MetastoreDefineStream(List<MetastoreVO> metastoreVOList, MetastoreEnum metastoreType){
        ConfigUtil.LowerCaseYamlMapper yamlMapper = new ConfigUtil.LowerCaseYamlMapper();
        return metastoreVOList.stream()
                .map(metastoreDO -> {
                    try {
                        MetastoreDefine<?> metastoreDefine = metastoreType.convert(metastoreDO.getSourceYaml(), yamlMapper);
                        BeanUtils.copyProperties(metastoreDO, metastoreDefine);
                        return metastoreDefine;
                    } catch (JsonProcessingException e) {
                        throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
                    }
                });
    }
}
