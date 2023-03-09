package com.github.martvey.ssc.mapper.local;

import com.github.martvey.ssc.entity.metastore.*;
import com.github.martvey.ssc.exception.DaoException;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface MetastoreMapper {
    void insertTable(TableDefine tableDefine);
    void deleteTable(MetastoreDelete delete);
    List<MetastoreVO> queryTable(ScopeQuery query);
    void updateTable(@Param("id") String id, @Param("define") MetastoreDefine<TableUpsert> metastoreDefine);
    MetastoreVO getTable(String id) throws DaoException;
    
    void insertFunction(FunctionDefine functionDefine);
    void deleteFunction(MetastoreDelete delete);
    List<MetastoreVO> queryFunction(ScopeQuery query);
    void updateFunction(@Param("id") String id,@Param("define") MetastoreDefine<FunctionUpsert> metastoreDefine);
    MetastoreVO getFunction(String id) throws DaoException;

    void insertCatalog(CatalogDefine catalogDefine);
    void deleteCatalog(MetastoreDelete delete);
    List<MetastoreVO> queryCatalog(ScopeQuery query);
    void updateCatalog(@Param("id") String id,@Param("define") MetastoreDefine<CatalogUpsert> metastoreDefine);
    MetastoreVO getCatalog(String id) throws DaoException;

    void insertModule(ModuleDefine moduleDefine);
    void deleteModule(MetastoreDelete delete);
    List<MetastoreVO> queryModule(ScopeQuery query);
    void updateModule(@Param("id") String id,@Param("define") MetastoreDefine<ModuleUpsert> metastoreDefine);
    MetastoreVO getModule(String id) throws DaoException;

    void insertExecution(ExecutionDefine executionDefine);
    void deleteExecution(MetastoreDelete delete);
    List<MetastoreVO> queryExecution(ScopeQuery query);
    void updateExecution(@Param("id") String id,@Param("define") MetastoreDefine<ExecutionUpsert> metastoreDefine);
    MetastoreVO getExecution(String id) throws DaoException;

    void insertConfiguration(ConfigurationDefine configurationDefine);
    void deleteConfiguration(MetastoreDelete delete);
    List<MetastoreVO> queryConfiguration(ScopeQuery query);
    void updateConfiguration(@Param("id") String id,@Param("define") MetastoreDefine<ConfigurationUpsert> metastoreDefine);
    MetastoreVO getConfiguration(String id) throws DaoException;

    void insertDeployment(DeploymentDefine deploymentDefine);
    void deleteDeployment(MetastoreDelete delete);
    List<MetastoreVO> queryDeployment(ScopeQuery query);
    void updateDeployment(@Param("id") String id,@Param("define") MetastoreDefine<DeploymentUpsert> metastoreDefine);
    MetastoreVO getDeployment(String id) throws DaoException;
}
