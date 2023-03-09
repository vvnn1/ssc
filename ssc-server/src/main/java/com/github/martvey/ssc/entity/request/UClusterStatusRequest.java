package com.github.martvey.ssc.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UClusterStatusRequest {
    private String id;
    private String applicationId;
    private String status;
    private String url;
    private String clusterName;
    private String jmMemory;
    private String tmMemory;
    private Integer slots;
}
