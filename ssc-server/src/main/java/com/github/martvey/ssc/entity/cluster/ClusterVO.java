package com.github.martvey.ssc.entity.cluster;

import com.github.martvey.ssc.constant.ClusterStatusEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * @author martvey
 * @date 2022/5/24 21:07
 */
@Getter
@Setter
@ToString
public class ClusterVO {
    private String id;
    private String clusterName;
    private Date createTime;
    private ClusterStatusEnum clusterStatus;
}
