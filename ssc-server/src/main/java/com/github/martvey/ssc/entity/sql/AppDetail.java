package com.github.martvey.ssc.entity.sql;


import com.github.martvey.core.util.EnvironmentUtils;
import com.github.martvey.ssc.constant.AppEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.core.fs.Path;
import org.apache.flink.runtime.entrypoint.FlinkParseException;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.util.FlinkRuntimeException;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.List;

import static org.apache.flink.client.deployment.application.ApplicationConfiguration.APPLICATION_MAIN_CLASS;

@Getter
@Setter
@ToString
public class AppDetail {
    private String spaceId;
    private String spaceName;
    private String projectId;
    private String projectName;
    private String appId;
    private String appName;
    private String content;
    private String metastoreConfig;
    private List<Path> jarList;
    private AppEnum appType;

    public String getMainClass(){
        return getConfiguration().get(APPLICATION_MAIN_CLASS);
    }

    public Configuration getConfiguration(){
        return EnvironmentUtils.resolveConfiguration(metastoreConfig);
    }
}
