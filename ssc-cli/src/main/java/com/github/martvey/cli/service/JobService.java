package com.github.martvey.cli.service;

import com.github.martvey.cli.constant.GraphFlowEnum;
import com.github.martvey.cli.entity.job.JobTable;

import java.util.List;

public interface JobService {
    List<JobTable> listJobTable();

    void createJob(String versionId, String jobName, String clusterId, String target);

    void dropJob(String jobId);

    void runJob(String jobId);
    void stopJob(String jobId);
    void reRunJob(String jobId);
    void showPlan(String jobId, GraphFlowEnum flow);
}
