package com.github.martvey.cli.entity.job;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PJobRequest {
    private String versionId;
    private String jobName;
    private String clusterId;
    private String yarnDeploymentTarget;

    public PJobRequest(String versionId, String jobName, String clusterId, String yarnDeploymentTarget) {
        this.versionId = versionId;
        this.jobName = jobName;
        this.clusterId = clusterId;
        this.yarnDeploymentTarget = yarnDeploymentTarget;
    }

    public PJobRequest() {
    }
}
