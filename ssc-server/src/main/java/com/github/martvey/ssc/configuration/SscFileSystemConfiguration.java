package com.github.martvey.ssc.configuration;

import lombok.RequiredArgsConstructor;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.core.fs.FileSystem;
import org.apache.flink.core.plugin.PluginUtils;
import org.apache.hadoop.yarn.conf.YarnConfiguration;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class SscFileSystemConfiguration implements InitializingBean {
    private final Configuration flinkConfiguration;

    @Override
    public void afterPropertiesSet() throws ClassNotFoundException {
        // 保证配置顺序，避免 hadoop/yarn-site.xml 配置被覆盖
        Class.forName("org.apache.hadoop.conf.Configuration");
        Class.forName("org.apache.hadoop.yarn.conf.YarnConfiguration");

        org.apache.hadoop.conf.Configuration.addDefaultResource("hadoop/core-site.xml");
        org.apache.hadoop.conf.Configuration.addDefaultResource("hadoop/hdfs-site.xml");
        org.apache.hadoop.conf.Configuration.addDefaultResource("hadoop/yarn-site.xml");
        FileSystem.initialize(flinkConfiguration, PluginUtils.createPluginManagerFromRootFolder(flinkConfiguration));
    }
}
