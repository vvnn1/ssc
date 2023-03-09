package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.util.YmlUtil;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.config.entries.DeploymentEntry;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class DeploymentDefine extends MetastoreDefine<DeploymentUpsert>{
    private DeploymentEntry deployment;
    private Map<String, Object> config;

    public DeploymentDefine() {
        this.deployment = DeploymentEntry.create(Collections.emptyMap());
        this.config = new HashMap<>();
    }

    public void setDeployment(Map<String, Object> config) {
        this.deployment = DeploymentEntry.create(config);
        this.config = config;
    }

    @Override
    public DeploymentUpsert getUpsert(){
        DeploymentUpsert upsert = new DeploymentUpsert();
        upsert.setScopeId(scopeId);
        upsert.setScopeType(scopeType);
        upsert.setYmlDefine(YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(),config)));
        return upsert;
    }

    @Override
    public void addDefine2Environment(Environment environment) {
        Map<String, Object> mergedProperties = new HashMap<>(environment.getDeployment().asMap());
        mergedProperties.putAll(deployment.asMap());
        environment.setDeployment(mergedProperties);
    }

    @Override
    public void validate() {
        if (CollectionUtils.isEmpty(config)){
            throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"未指定deployment配置");
        }
    }

    @Override
    public void enrich(MetastoreDefine<?> metastoreDefine) {
        config.putAll(((DeploymentDefine) metastoreDefine).config);
        this.deployment = DeploymentEntry.merge(deployment, ((DeploymentDefine) metastoreDefine).deployment);
    }

    @Override
    public String toYaml() {
        return YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(), config));
    }
}
