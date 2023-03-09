package com.github.martvey.ssc.entity.cluster;

import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.constant.ClusterStatusEnum;
import com.github.martvey.ssc.exception.NetException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.ClusterService;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.client.deployment.ClusterDescriptor;
import org.apache.flink.client.program.ClusterClient;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.util.Preconditions;
import org.apache.flink.yarn.YarnClusterDescriptor;
import org.apache.hadoop.service.Service;
import org.apache.hadoop.yarn.api.records.ApplicationId;
import org.apache.hadoop.yarn.api.records.ApplicationReport;
import org.apache.hadoop.yarn.api.records.YarnApplicationState;
import org.apache.hadoop.yarn.client.api.YarnClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Slf4j
public class YarnApplicationStatusMonitor{
    private static final Logger LOG = LoggerFactory.getLogger(org.apache.flink.yarn.cli.YarnApplicationStatusMonitor.class);

    private static final long UPDATE_INTERVAL = 1000L;
    private static final long CLIENT_POLLING_INTERVAL_MS = 3000L;
    private final YarnClient yarnClient;

    private final ApplicationId yarnApplicationId;
    private final ClusterService clusterService;
    private final ClusterStatusUpdate.Builder statusUpdateBuilder;


    public YarnApplicationStatusMonitor(
            String id,
            Configuration clusterConfiguration,
            ClusterService clusterService,
            ClusterClient<ApplicationId> clusterClient,
            ClusterDescriptor<ApplicationId> yarnClusterDescriptor) {
        ApplicationId applicationId = clusterClient.getClusterId();
        String webInterfaceURL = clusterClient.getWebInterfaceURL();
        this.statusUpdateBuilder = ClusterStatusUpdate.builder()
                .id(id)
                .applicationId(applicationId.toString())
                .configuration(clusterConfiguration)
                .url(webInterfaceURL);
        this.yarnClient = ((YarnClusterDescriptor) yarnClusterDescriptor).getYarnClient();
        this.yarnApplicationId = Preconditions.checkNotNull(applicationId);
        this.clusterService = clusterService;
    }

    public void watch() {
        ClusterStatusEnum preStatus = ClusterStatusEnum.UNKNOWN;
        boolean continueRepl = true;
        boolean isLastStatusUnknown = true;
        boolean needInterval = false;
        long unknownStatusSince = System.nanoTime();

        while (continueRepl) {
            final ClusterStatusEnum clusterStatusEnum = getApplicationStatusNow();
            log.debug("集群 {} 状态 {}", yarnApplicationId, clusterStatusEnum);
            switch (clusterStatusEnum) {
                case FAILED:
                case CANCELED:
                    continueRepl = false;
                    statusUpdateBuilder.applicationId(null)
                            .url(null)
                            .configuration(null);
                    break;
                case UNKNOWN:
                    if (!isLastStatusUnknown) {
                        unknownStatusSince = System.nanoTime();
                        isLastStatusUnknown = true;
                    }

                    if ((System.nanoTime() - unknownStatusSince) > 5L * CLIENT_POLLING_INTERVAL_MS * 1_000_000L) {
                        log.error("Flink集群处于未知状态，请检查集群");
                        continueRepl = false;
                    } else {
                        needInterval = true;
                    }
                    break;
                case RUNNING:
                    if (isLastStatusUnknown) {
                        isLastStatusUnknown = false;
                    }
                    needInterval = true;
            }

            if (preStatus != clusterStatusEnum){
                ClusterStatusUpdate clusterStatusUpdate = statusUpdateBuilder.clusterStatus(clusterStatusEnum)
                        .build();
                updateApplicationStatus(clusterStatusUpdate);
            }
            preStatus = clusterStatusEnum;

            if (needInterval){
                try {Thread.sleep(UPDATE_INTERVAL);} catch (InterruptedException ignored) {}
                needInterval = false;
            }
        }
        yarnClient.stop();
    }

    private void updateApplicationStatus(ClusterStatusUpdate statusUpdate){
        try {
            clusterService.updateClusterStatus(statusUpdate);
        }catch (NetException e){
            log.error("更新容器运行状态失败，statusUpdate={}", statusUpdate,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    public ClusterStatusEnum getApplicationStatusNow() {
        if (yarnClient.isInState(Service.STATE.STARTED)) {
            final ApplicationReport applicationReport;

            try {
                applicationReport = yarnClient.getApplicationReport(yarnApplicationId);
            } catch (Exception e) {
                LOG.info("无法获取yarn applicationReport {}.", yarnApplicationId);
                return ClusterStatusEnum.UNKNOWN;
            }

            YarnApplicationState yarnApplicationState = applicationReport.getYarnApplicationState();

            if (yarnApplicationState == YarnApplicationState.FAILED) {
                return ClusterStatusEnum.FAILED;
            } else if (yarnApplicationState == YarnApplicationState.KILLED || yarnApplicationState == YarnApplicationState.FINISHED){
                return ClusterStatusEnum.CANCELED;
            } else {
                return ClusterStatusEnum.RUNNING;
            }
        }
        return ClusterStatusEnum.UNKNOWN;
    }
}
