package com.github.martvey.ssc.entity.version;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.configuration.Configuration;

@Getter
@Setter
@ToString
public class VersionUpsert {
    private String id;
    private String appId;
    private String appName;
    private String content;
    private String metastoreConfig;
    private Configuration configuration;
    private String jarPath;
    private String version;
}
