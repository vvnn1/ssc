package com.github.martvey.ssc.entity.version;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class VersionVO {
    private String id;
    private String appName;
    private String version;
    private Date createTime;
}
