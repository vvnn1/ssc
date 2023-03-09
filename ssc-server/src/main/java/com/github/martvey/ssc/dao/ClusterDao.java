package com.github.martvey.ssc.dao;


import com.github.martvey.ssc.entity.cluster.ClusterVO;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.entity.cluster.ClusterDetail;
import com.github.martvey.ssc.entity.cluster.ClusterStatusUpdate;
import com.github.martvey.ssc.entity.cluster.ClusterUpsert;

import java.util.List;

public interface ClusterDao {
    void insertCluster(ClusterUpsert upsert) throws DaoException;
    void updateClusterStatus(ClusterStatusUpdate update) throws DaoException;
    void deleteCluster(String id) throws DaoException;

    String getClusterConfiguration(String id) throws DaoException;
    ClusterDetail getClusterDetailById(String clusterId) throws DaoException;

    String getSourceClusterConfiguration(String clusterId) throws DaoException;

    List<ClusterVO> listCluster() throws DaoException;
}
