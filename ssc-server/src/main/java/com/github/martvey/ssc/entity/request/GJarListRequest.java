package com.github.martvey.ssc.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GJarListRequest {
    private String spaceId;
    private String projectId;
    private String appId;
}
