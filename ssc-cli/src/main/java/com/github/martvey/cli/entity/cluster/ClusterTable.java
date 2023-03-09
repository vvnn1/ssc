package com.github.martvey.cli.entity.cluster;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * @author martvey
 * @date 2022/5/24 21:31
 */
@Getter
@Setter
@ToString
public class ClusterTable {
    @Column("集群id")
    private String id;
    @Column("集群名称")
    private String clusterName;
    @Column("创建时间")
    private String createTime;
    @Column("集群状态")
    private String clusterStatus;
}
