package com.github.martvey.cli.entity.job;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JobTable {
    @Column("id")
    private String id;
    @Column("任务名称")
    private String jobName;
    @Column("创建时间")
    private String createTime;
    @Column("任务状态")
    private String jobStatus;
}
