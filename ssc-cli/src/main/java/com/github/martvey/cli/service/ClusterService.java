package com.github.martvey.cli.service;

import com.github.martvey.cli.entity.cluster.ClusterTable;

import java.util.List;

/**
 * @author martvey
 * @date 2022/5/24 13:51
 */
public interface ClusterService {
    void createCluster(String clusterName, String jmMemory, String tmMemory, Integer slots);
    void runCluster(String id);
    void cancelCluster(String id);
    void deleteCluster(String id);

    List<ClusterTable> listCluster();
}
