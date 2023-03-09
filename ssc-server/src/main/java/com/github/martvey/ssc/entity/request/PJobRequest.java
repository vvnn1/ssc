package com.github.martvey.ssc.entity.request;


import com.github.martvey.ssc.util.UuidUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.yarn.configuration.YarnDeploymentTarget;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class PJobRequest {
    private String id = UuidUtil.getId();
    @NotBlank(message = "versionId参数不能为空")
    private String versionId;
    @NotBlank(message = "jobName参数不能为空")
    private String jobName;
    private String clusterId;
    @NotNull(message = "yarnDeploymentTarget参数不能为空")
    private YarnDeploymentTarget yarnDeploymentTarget;
}
