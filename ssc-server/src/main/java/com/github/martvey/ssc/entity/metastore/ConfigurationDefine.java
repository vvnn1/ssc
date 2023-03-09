package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.util.YmlUtil;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.config.entries.ConfigurationEntry;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ConfigurationDefine extends MetastoreDefine<ConfigurationUpsert>{
    private ConfigurationEntry configuration;
    private Map<String, Object> config;

    public ConfigurationDefine() {
        this.configuration = ConfigurationEntry.create(Collections.emptyMap());
        this.config = new HashMap<>();
    }

    public void setConfiguration(Map<String, Object> config) {
        this.configuration = ConfigurationEntry.create(config);
        this.config = config;
    }

    @Override
    public ConfigurationUpsert getUpsert() {
        ConfigurationUpsert upsert = new ConfigurationUpsert();
        upsert.setScopeId(scopeId);
        upsert.setScopeType(scopeType);
        upsert.setYmlDefine(YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(),config)));
        return upsert;
    }

    @Override
    public void addDefine2Environment(Environment environment) {
        Map<String, Object> mergedProperties = new HashMap<>(environment.getConfiguration().asMap());
        mergedProperties.putAll(configuration.asMap());
        environment.setConfiguration(mergedProperties);
    }

    @Override
    public void validate() {
        if (CollectionUtils.isEmpty(config)){
            throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"未指定configuration配置");
        }
    }

    @Override
    public void enrich(MetastoreDefine<?> metastoreDefine) {
        config.putAll(((ConfigurationDefine) metastoreDefine).config);
        this.configuration = ConfigurationEntry.merge(configuration, ((ConfigurationDefine) metastoreDefine).configuration);
    }

    @Override
    public String toYaml() {
        return YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(),config));
    }
}
