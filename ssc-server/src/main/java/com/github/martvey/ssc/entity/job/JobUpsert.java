package com.github.martvey.ssc.entity.job;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class JobUpsert {
    private String id;
    private String applicationId;
    private String applicationUrl;
    private String status;
    private Date createTime;
    private String sqlId;
    private String sqlName;
    private String versionId;
    private String version;
}
