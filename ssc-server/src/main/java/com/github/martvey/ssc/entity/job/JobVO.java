package com.github.martvey.ssc.entity.job;

import com.github.martvey.ssc.constant.JobStatusEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class JobVO {
    private String id;
    private String jobName;
    private Date createTime;
    private JobStatusEnum jobStatus;
}
