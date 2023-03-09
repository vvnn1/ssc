package com.github.martvey.ssc.service;


import com.github.martvey.ssc.entity.cluster.ClusterDetail;
import com.github.martvey.ssc.entity.cluster.ClusterStatusUpdate;
import com.github.martvey.ssc.entity.cluster.ClusterUpsert;
import com.github.martvey.ssc.entity.cluster.ClusterVO;
import org.apache.flink.configuration.Configuration;

import java.util.List;

public interface ClusterService {
    void insertCluster(ClusterUpsert clusterUpsert);

    void updateClusterStatus(ClusterStatusUpdate update);

    Configuration getClusterConfiguration(String id);

    ClusterDetail getClusterDetail(String clusterId);

    Configuration getSourceClusterConfiguration(String clusterId);

    void runCluster(String id);

    void stopCluster(String id);

    void deleteCluster(String id);

    List<ClusterVO> listCluster();
}
