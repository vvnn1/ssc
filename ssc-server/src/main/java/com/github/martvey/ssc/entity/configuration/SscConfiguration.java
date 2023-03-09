package com.github.martvey.ssc.entity.configuration;

import com.github.martvey.ssc.util.FlinkConfigurationUtil;
import org.apache.flink.configuration.Configuration;

/**
 * @author martvey
 * @date 2022/5/13 16:19
 */
public class SscConfiguration extends Configuration {
    public SscConfiguration(String yml) {
        Configuration configuration = FlinkConfigurationUtil.loadYAMLResource(yml);
        addAll(configuration);
    }
}
