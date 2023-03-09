package com.github.martvey.ssc.entity.job;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.yarn.configuration.YarnDeploymentTarget;

@Getter
@Setter
@ToString
public class JobInsert {
    private String id;
    private String clusterId;
    private Configuration configuration;
    private String jobName;
    private String versionId;
    private YarnDeploymentTarget yarnDeploymentTarget;
    private JobPlanInfo jobPlan;
}
