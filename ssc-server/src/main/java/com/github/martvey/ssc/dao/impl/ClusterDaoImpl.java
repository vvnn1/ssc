package com.github.martvey.ssc.dao.impl;

import com.github.martvey.ssc.entity.cluster.ClusterVO;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.dao.ClusterDao;
import com.github.martvey.ssc.entity.cluster.ClusterDetail;
import com.github.martvey.ssc.entity.cluster.ClusterStatusUpdate;
import com.github.martvey.ssc.entity.cluster.ClusterUpsert;
import com.github.martvey.ssc.mapper.local.ClusterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ClusterDaoImpl implements ClusterDao {
    private final ClusterMapper clusterMapper;

    @Override
    public void insertCluster(ClusterUpsert upsert) throws DaoException {
        try {
            clusterMapper.insertCluster(upsert);
        }catch (Exception e){
            throw new DaoException("数据库插入集群信息错误",e);
        }
    }

    @Override
    public void updateClusterStatus(ClusterStatusUpdate update) throws DaoException {
        try {
            clusterMapper.updateClusterStatus(update);
        }catch (Exception e){
            throw new DaoException("数据库更新cluster状态错误",e);
        }
    }

    @Override
    public void deleteCluster(String id) throws DaoException {
        try {
            clusterMapper.deleteCluster(id);
        }catch (Exception e){
            throw new DaoException("数据库删除cluster信息错误",e);
        }
    }

    @Override
    public String getClusterConfiguration(String id) {
        try {
            return clusterMapper.getClusterConfiguration(id);
        }catch (Exception e){
            throw new DaoException("数据库查询cluster配置错误",e);
        }
    }

    @Override
    public ClusterDetail getClusterDetailById(String clusterId) {
        try {
            return clusterMapper.getClusterDetailById(clusterId);
        }catch (Exception e){
            throw new DaoException("数据库查询cluster错误",e);
        }
    }

    @Override
    public String getSourceClusterConfiguration(String clusterId) throws DaoException {
        try {
            return clusterMapper.getSourceClusterConfiguration(clusterId);
        }catch (Exception e){
            throw new DaoException("数据库查询cluster配置错误",e);
        }
    }

    @Override
    public List<ClusterVO> listCluster() throws DaoException {
        try {
            return clusterMapper.listCluster();
        }catch (Exception e){
            throw new DaoException("数据库查询cluster错误",e);
        }
    }
}
