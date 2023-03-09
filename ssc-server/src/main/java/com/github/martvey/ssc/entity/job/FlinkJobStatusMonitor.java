package com.github.martvey.ssc.entity.job;

import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.constant.JobStatusEnum;
import com.github.martvey.ssc.exception.NetException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.JobService;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.common.JobID;
import org.apache.flink.api.common.JobStatus;
import org.apache.flink.client.deployment.ClusterDescriptor;
import org.apache.flink.client.program.ClusterClient;
import org.apache.flink.yarn.YarnClusterDescriptor;
import org.apache.hadoop.yarn.api.records.ApplicationId;
import org.apache.hadoop.yarn.api.records.ApplicationReport;
import org.apache.hadoop.yarn.client.api.YarnClient;

import java.util.concurrent.TimeUnit;

@Slf4j
public class FlinkJobStatusMonitor<ClusterID>{
    private static final long UPDATE_INTERVAL = 1_000L;
    private static final long CLIENT_POLLING_INTERVAL_MS = 3_000L;

    private final JobID jobID;
    private final JobStatusUpdate.Builder jobUpdateBuilder;
    private final JobService jobService;
    private final ClusterDescriptor<ClusterID> clusterDescriptor;
    private final ClusterID clusterID;
    private final ClusterClient<ClusterID> clusterClient;

    public FlinkJobStatusMonitor(JobDetail jobDetail,
                                 JobService jobService,
                                 JobID jobID,
                                 ClusterDescriptor<ClusterID> clusterDescriptor,
                                 ClusterID clusterID,
                                 ClusterClient<ClusterID> clusterClient) {
        this.jobID = jobID;
        this.jobService = jobService;
        this.jobUpdateBuilder = JobStatusUpdate.builder()
                .id(jobDetail.getId())
                .jodID(jobID)
                .restAddress(clusterClient.getWebInterfaceURL())
                .configuration(jobDetail.getSourceConfiguration());
        this.clusterDescriptor = clusterDescriptor;
        this.clusterID = clusterID;
        this.clusterClient = clusterClient;
    }

    public void watch() {
        this.pollingAndUpdateJobStatus();
    }

    private void pollingAndUpdateJobStatus() {
        JobStatusEnum preJobStatus = JobStatusEnum.UNKNOWN;
        boolean continueRepl = true;
        boolean needInterval = false;
        boolean isLastStatusUnknown = true;
        long unknownStatusSince = System.nanoTime();
        while (continueRepl){
            final JobStatusEnum jobStatus = getJobStatus(clusterDescriptor, clusterID, clusterClient);
            log.debug("job[{}]状态 {}", jobID, jobStatus);
            switch (jobStatus){
                case UPDATING:
                    needInterval = true;
                    break;
                case FINISHED:
                case FAILED:
                case CANCELED:
                case SUSPENDED:
                    continueRepl = false;
                    break;
                case UNKNOWN:
                    if (!isLastStatusUnknown) {
                        unknownStatusSince = System.nanoTime();
                        isLastStatusUnknown = true;
                    }

                    if ((System.nanoTime() - unknownStatusSince) > 5L * CLIENT_POLLING_INTERVAL_MS * 1_000_000L) {
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

            if (preJobStatus != jobStatus){
                JobStatusUpdate jobStatusUpdate = jobUpdateBuilder
                        .jobStatus(jobStatus)
                        .build();
                updateJobStatus(jobStatusUpdate);
            }
            preJobStatus = jobStatus;

            if (needInterval){
                try {
                    TimeUnit.MILLISECONDS.sleep(UPDATE_INTERVAL);
                }catch (InterruptedException e){
                    log.warn("主动终止线程");
                    continueRepl = false;
                }
                needInterval = false;
            }

        }
    }

    private void updateJobStatus(JobStatusUpdate update){
        try {
            jobService.updateJobStatus(update);
        }catch (NetException e){
            log.error("更新job状态失败",e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    private JobStatusEnum getJobStatus(ClusterDescriptor<ClusterID> clusterDescriptor, ClusterID clusterID, ClusterClient<ClusterID> clusterClient){
        try {
            JobStatus jobStatus = clusterClient.getJobStatus(this.jobID)
                    .get();
            return convertJobStatus(jobStatus);
        }catch (Exception e){
            log.warn("查询job状态超时，开始核查集群状态",e);
            return checkCluster(clusterDescriptor, clusterID);
        }
    }

    private JobStatusEnum checkCluster(ClusterDescriptor<ClusterID> clusterDescriptor, ClusterID clusterID) {
        if (clusterDescriptor instanceof YarnClusterDescriptor) {
            YarnClient yarnClient = ((YarnClusterDescriptor) clusterDescriptor).getYarnClient();
            try {
                ApplicationReport report = yarnClient.getApplicationReport(((ApplicationId) clusterID));
                log.debug("集群状态 {}", report.getFinalApplicationStatus());
                switch (report.getFinalApplicationStatus()){
                    case SUCCEEDED:
                        return JobStatusEnum.FINISHED;
                    case FAILED:
                        return JobStatusEnum.FAILED;
                    case KILLED:
                        return JobStatusEnum.CANCELED;
                    default:
                        return JobStatusEnum.UNKNOWN;
                }
            }catch (Exception e){
                log.warn("无法连接集群",e);
            }
        }
        return JobStatusEnum.UNKNOWN;
    }

    private JobStatusEnum convertJobStatus(JobStatus jobStatus){
        if (JobStatus.RUNNING == jobStatus){
            return JobStatusEnum.RUNNING;
        }

        if (JobStatus.CANCELED == jobStatus || JobStatus.FINISHED == jobStatus){
            return JobStatusEnum.FINISHED;
        }

        if (JobStatus.FAILED == jobStatus){
            return JobStatusEnum.FAILED;
        }

        if (JobStatus.SUSPENDED == jobStatus){
            return JobStatusEnum.SUSPENDED;
        }

        if (JobStatus.INITIALIZING == jobStatus || JobStatus.FAILING == jobStatus
                || JobStatus.CANCELLING == jobStatus || JobStatus.RESTARTING == jobStatus
                || JobStatus.RECONCILING == jobStatus || JobStatus.CREATED == jobStatus){
            return JobStatusEnum.UPDATING;
        }

        return JobStatusEnum.UNKNOWN;
    }
}
