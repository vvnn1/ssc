package com.github.martvey.ssc.entity.version;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.configuration.Configuration;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class VersionDO {
    private String id;
    private String appId;
    private String appName;
    private String content;
    private String metastoreConfig;
    private Configuration configuration;
    private List<String> dependenceJarList;
    private Date createTime;
    private String version;
}
