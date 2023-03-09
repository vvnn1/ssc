package com.github.martvey.ssc.mapper.local;

import com.github.martvey.ssc.entity.cluster.ClusterDetail;
import com.github.martvey.ssc.entity.cluster.ClusterStatusUpdate;
import com.github.martvey.ssc.entity.cluster.ClusterUpsert;
import com.github.martvey.ssc.entity.cluster.ClusterVO;

import java.util.List;

public interface ClusterMapper {
    void insertCluster(ClusterUpsert upsert);

    void updateClusterStatus(ClusterStatusUpdate update);

    void deleteCluster(String id);

    String getClusterConfiguration(String id);

    ClusterDetail getClusterDetailById(String clusterId);

    String getSourceClusterConfiguration(String clusterId);

    List<ClusterVO> listCluster();
}
