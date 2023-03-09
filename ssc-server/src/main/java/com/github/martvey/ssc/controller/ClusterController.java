package com.github.martvey.ssc.controller;


import com.github.martvey.ssc.entity.common.SscResult;
import com.github.martvey.ssc.constant.ClusterStatusEnum;
import com.github.martvey.ssc.entity.cluster.ClusterUpsert;
import com.github.martvey.ssc.entity.request.DClusterCancelRequest;
import com.github.martvey.ssc.entity.request.DClusterRequest;
import com.github.martvey.ssc.entity.request.PClusterRequest;
import com.github.martvey.ssc.entity.request.PClusterRunRequest;
import com.github.martvey.ssc.service.ClusterService;
import com.github.martvey.ssc.util.FlinkConfigurationUtil;
import lombok.RequiredArgsConstructor;
import org.apache.flink.configuration.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/cluster")
@RequiredArgsConstructor
public class ClusterController {
    private final ClusterService clusterService;
    private final Configuration configuration;

    @PostMapping
    public ResponseEntity<SscResult> createCluster(@RequestBody @Valid PClusterRequest request){
        Configuration configuration = FlinkConfigurationUtil.convert2Configuration(request);
        Configuration mergeConfiguration = FlinkConfigurationUtil.mergeConfiguration(this.configuration, configuration);
        ClusterUpsert clusterUpsert = new ClusterUpsert();
        clusterUpsert.setClusterName(request.getClusterName());
        clusterUpsert.setConfiguration(mergeConfiguration);
        clusterUpsert.setClusterStatus(ClusterStatusEnum.INIT);
        clusterService.insertCluster(clusterUpsert);
        return ResponseEntity.ok(SscResult.ok("创建容器成功"));
    }


    @PostMapping("/run")
    public ResponseEntity<SscResult> clusterRun(@RequestBody @Valid PClusterRunRequest request){
        clusterService.runCluster(request.getId());
        return ResponseEntity.ok(SscResult.ok("启动集群成功"));
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<SscResult> cancelCluster(@Valid DClusterCancelRequest request){
        clusterService.stopCluster(request.getId());
        return ResponseEntity.ok(SscResult.ok("集群关闭成功"));
    }

    @DeleteMapping
    public ResponseEntity<SscResult> deleteCluster(@Valid DClusterRequest request){
        clusterService.deleteCluster(request.getId());
        return ResponseEntity.ok(SscResult.ok("删除集群成功"));
    }

    @GetMapping("/list")
    public ResponseEntity<SscResult> listCluster(){
        return ResponseEntity.ok(SscResult.ok("查询集群成功",clusterService.listCluster()));
    }
}
