package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.util.YmlUtil;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.config.entries.ExecutionEntry;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ExecutionDefine extends MetastoreDefine<ExecutionUpsert>{
    private ExecutionEntry execution;
    private Map<String, Object> config;

    /**
     * 会被 {@link com.github.martvey.ssc.constant.MetastoreEnum#convert} 调用
     * @param config
     */
    public void setExecution(Map<String, Object> config) {
        this.execution = ExecutionEntry.create(config);
        this.config = config;
    }

    @Override
    public ExecutionUpsert getUpsert() {
        ExecutionUpsert upsert = new ExecutionUpsert();
        upsert.setScopeId(scopeId);
        upsert.setScopeType(scopeType);
        upsert.setYmlDefine(YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(),config)));
        return upsert;
    }

    @Override
    public void addDefine2Environment(Environment environment) {
        Map<String, Object> mergedProperties = new HashMap<>(environment.getExecution().asMap());
        mergedProperties.putAll(execution.asMap());
        environment.setExecution(mergedProperties);
    }

    @Override
    public void validate() {
        if (CollectionUtils.isEmpty(config)){
            throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"未指定execution配置");
        }
    }

    @Override
    public void enrich(MetastoreDefine<?> metastoreDefine) {
        config.putAll(((ExecutionDefine) metastoreDefine).config);
        execution = ExecutionEntry.merge(execution, ((ExecutionDefine) metastoreDefine).execution);
    }

    @Override
    public String toYaml() {
        return YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(), config));
    }

    public static ExecutionDefine of(Map<String, Object> config){
        ExecutionDefine define = new ExecutionDefine();
        define.setExecution(config);
        return define;
    }
}
