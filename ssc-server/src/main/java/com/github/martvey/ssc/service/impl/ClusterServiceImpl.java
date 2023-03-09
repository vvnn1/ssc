package com.github.martvey.ssc.service.impl;


import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.constant.ClusterStatusEnum;
import com.github.martvey.ssc.dao.ClusterDao;
import com.github.martvey.ssc.entity.cluster.*;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.ClusterService;
import com.github.martvey.ssc.util.ClusterClientUtil;
import com.github.martvey.ssc.util.YmlPropertiesUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.client.deployment.ClusterClientFactory;
import org.apache.flink.client.deployment.ClusterClientServiceLoader;
import org.apache.flink.client.deployment.ClusterSpecification;
import org.apache.flink.client.deployment.DefaultClusterClientServiceLoader;
import org.apache.flink.client.program.ClusterClient;
import org.apache.flink.client.program.ClusterClientProvider;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.configuration.ConfigurationUtils;
import org.apache.flink.yarn.YarnClusterDescriptor;
import org.apache.hadoop.yarn.api.records.ApplicationId;
import org.apache.hadoop.yarn.util.ConverterUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.ObjectUtils;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ClusterServiceImpl implements ClusterService {
    private final ClusterDao clusterDao;
    private final ClusterClientServiceLoader clusterClientServiceLoader = new DefaultClusterClientServiceLoader();
    private ExecutorService executorService;

    @Override
    public void insertCluster(ClusterUpsert clusterUpsert) {
        try {
            clusterDao.insertCluster(clusterUpsert);
        } catch (DaoException e) {
            log.error("创建集群信息错误，update={}", clusterUpsert, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }

    }

    @Override
    public void updateClusterStatus(ClusterStatusUpdate update) {
        try {
            clusterDao.updateClusterStatus(update);
        } catch (DaoException e) {
            log.error("更新容器状态失败，update={}", update, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public Configuration getClusterConfiguration(String clusterId) {
        try {
            String configuration = clusterDao.getClusterConfiguration(clusterId);
            if (ObjectUtils.isEmpty(configuration)) {
                return new Configuration();
            }
            Properties properties = YmlPropertiesUtil.yml2Properties(configuration);
            return ConfigurationUtils.createConfiguration(properties);
        } catch (DaoException e) {
            log.error("查询容器配置失败，clusterId={}", clusterId, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public ClusterDetail getClusterDetail(String clusterId) {
        try {
            return clusterDao.getClusterDetailById(clusterId);
        } catch (DaoException e) {
            log.error("查询集群信息失败，clusterId={}", clusterId, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public Configuration getSourceClusterConfiguration(String clusterId) {
        try {
            String configuration = clusterDao.getSourceClusterConfiguration(clusterId);
            if (ObjectUtils.isEmpty(configuration)) {
                return new Configuration();
            }
            Properties properties = YmlPropertiesUtil.yml2Properties(configuration);
            return ConfigurationUtils.createConfiguration(properties);
        } catch (DaoException e) {
            log.error("查询容器配置失败，clusterId={}", clusterId, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void runCluster(String clusterId) {
        Configuration clusterConfiguration = getSourceClusterConfiguration(clusterId);
        CompletableFuture.runAsync(() -> runClusterAndMonitor(clusterId, clusterConfiguration), executorService)
                .exceptionally(throwable -> {
                    ClusterStatusUpdate statusUpdate = ClusterStatusUpdate.builder()
                            .id(clusterId)
                            .configuration(clusterConfiguration)
                            .clusterStatus(ClusterStatusEnum.FAILED)
                            .build();
                    updateClusterStatus(statusUpdate);
                    return null;
                });
    }

    @Override
    public void stopCluster(String clusterId) {
        ClusterDetail clusterDetail = getClusterDetail(clusterId);
        Assert.state(clusterDetail.getClusterStatus() == ClusterStatusEnum.RUNNING, "集群未启动");

        try {
            Configuration clusterConfiguration = getClusterConfiguration(clusterId);
            ClusterClientFactory<ApplicationId> yarnClusterClientFactory = clusterClientServiceLoader.getClusterClientFactory(clusterConfiguration);
            YarnClusterDescriptor yarnClusterDescriptor = (YarnClusterDescriptor) yarnClusterClientFactory.createClusterDescriptor(clusterConfiguration);
            ClusterClientProvider<ApplicationId> clientProvider = yarnClusterDescriptor.retrieve(ConverterUtils.toApplicationId(clusterDetail.getApplicationId()));
            ClusterClient<ApplicationId> clusterClient = clientProvider.getClusterClient();
            clusterClient.shutDownCluster();
            clusterClient.close();
        } catch (Exception e) {
            log.error("关闭集群失败，clusterId={}", clusterId, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void deleteCluster(String clusterId) {
        ClusterDetail clusterDetail = getClusterDetail(clusterId);
        Assert.state(clusterDetail.getClusterStatus() != ClusterStatusEnum.RUNNING, "集群运行中，无法删除");

        try {
            clusterDao.deleteCluster(clusterId);
        } catch (DaoException e) {
            log.error("删除集群信息失败，clusterId={}", clusterId, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public List<ClusterVO> listCluster() {
        try {
            return clusterDao.listCluster();
        } catch (DaoException e) {
            log.error("查询集群失败", e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    private void runClusterAndMonitor(String clusterId, Configuration clusterConfiguration) {
        ClusterClientUtil.runClusterDescriptorAction(clusterConfiguration, (ClusterClientUtil.ClusterDescriptorAction<ApplicationId>) (clusterDescriptor, clusterClientFactory) -> {
            ClusterSpecification clusterSpecification = clusterClientFactory.getClusterSpecification(clusterConfiguration);
            ClusterClientProvider<ApplicationId> clusterClientProvider = clusterDescriptor.deploySessionCluster(clusterSpecification);
            ClusterClient<ApplicationId> clusterClient = clusterClientProvider.getClusterClient();
            new YarnApplicationStatusMonitor(
                    clusterId,
                    clusterConfiguration,
                    this,
                    clusterClient,
                    clusterDescriptor
            ).watch();
        });
    }

    @PostConstruct
    public void init() {
        executorService = Executors.newCachedThreadPool();
    }

    @PreDestroy
    public void preDestroy() {
        executorService.shutdown();
    }
}
