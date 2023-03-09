package com.github.martvey.ssc.entity.request;

import com.github.martvey.ssc.constant.AppEnum;
import com.github.martvey.ssc.util.UuidUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class PUAppRequest {
    private String id = UuidUtil.getId();
    @NotBlank(message = "projectId参数不能为空")
    private String projectId;
    @NotBlank(message = "appName参数不能为空")
    private String appName;
    @NotNull(message = "appType参数需为SQL，JAR之一")
    private AppEnum appType;
    private String content;
}
