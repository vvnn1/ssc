package com.github.martvey.ssc.entity.job;

import com.github.martvey.ssc.constant.JobStatusEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.api.common.JobID;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.yarn.configuration.YarnDeploymentTarget;

import java.util.Date;

@Getter
@Setter
@ToString
public class JobDetail {
    private String id;
    private String clusterId;
    private JobStatusEnum jobStatus;
    private Configuration sourceConfiguration;
    private Configuration configuration;
    private Date createTime;
    private JobID jobID;
    private String jobName;
    private String versionId;
    private YarnDeploymentTarget yarnDeploymentTarget;
    private JobPlanInfo jobPlan;
}
