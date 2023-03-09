package com.github.martvey.ssc.entity.cluster;

import com.github.martvey.ssc.constant.ClusterStatusEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.configuration.Configuration;

import java.util.Date;

@Getter
@Setter
@ToString
public class ClusterDetail {
    private String id;
    private String applicationId;
    private String clusterName;
    private Configuration sourceConfiguration;
    private Configuration configuration;
    private Date createTime;
    private ClusterStatusEnum clusterStatus;
    private String url;
}
