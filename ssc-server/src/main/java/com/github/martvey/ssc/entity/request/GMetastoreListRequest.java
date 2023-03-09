package com.github.martvey.ssc.entity.request;

import com.github.martvey.ssc.constant.MetastoreEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class GMetastoreListRequest {
    @NotNull(message = "type参数不能为空")
    private MetastoreEnum metastoreType;
    private String spaceId;
    private String projectId;
    private String appId;
}
