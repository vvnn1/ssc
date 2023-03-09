package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.entity.cluster.ClusterTable;
import com.github.martvey.cli.entity.request.PClusterRequest;
import com.github.martvey.cli.entity.request.PClusterRunRequest;
import com.github.martvey.cli.net.ClusterApi;
import com.github.martvey.cli.service.ClusterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author martvey
 * @date 2022/5/24 13:51
 */
@Service
@RequiredArgsConstructor
public class ClusterServiceImpl implements ClusterService {
    private final ClusterApi clusterApi;

    @Override
    public void createCluster(String clusterName, String jmMemory, String tmMemory, Integer slots) {
        PClusterRequest request = new PClusterRequest();
        request.setClusterName(clusterName);
        request.setJmMemory(jmMemory);
        request.setTmMemory(tmMemory);
        request.setSlots(slots);
        clusterApi.createCluster(request);
    }

    @Override
    public void runCluster(String id) {
        PClusterRunRequest request = new PClusterRunRequest();
        request.setId(id);
        clusterApi.runCluster(request);
    }

    @Override
    public void cancelCluster(String id) {
        clusterApi.cancelCluster(id);
    }

    @Override
    public void deleteCluster(String id) {
        clusterApi.deleteCluster(id);
    }

    @Override
    public List<ClusterTable> listCluster() {
        return clusterApi.listCluster();
    }
}
