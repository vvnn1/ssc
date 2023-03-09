package com.github.martvey.ssc.entity.cluster;

import com.github.martvey.ssc.constant.ClusterStatusEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.configuration.Configuration;

@Getter
@Setter
@ToString
public class ClusterUpsert {
    private String clusterName;
    private Configuration configuration;
    private ClusterStatusEnum clusterStatus;
}
