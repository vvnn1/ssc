package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.util.YmlUtil;
import org.apache.flink.table.client.SqlClientException;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.config.entries.FunctionEntry;

import java.util.*;

public class FunctionDefine extends MetastoreDefine<FunctionUpsert>{
    private final Map<String, FunctionEntry> name2EntryMap;
    private final Map<String,Map<String, Object>> name2FunctionMap;

    public FunctionDefine() {
        this.name2EntryMap = new HashMap<>();
        this.name2FunctionMap = new HashMap<>();
    }

    public void setFunctions(List<Map<String, Object>> functions) {
        functions.forEach(config -> {
            final FunctionEntry function = FunctionEntry.create(config);
            if (this.name2EntryMap.containsKey(function.getName())) {
                throw new SqlClientException(String.format("无法创建函数 '%s',函数定义重复", function.getName()));
            }
            this.name2EntryMap.put(function.getName(), function);
            this.name2FunctionMap.put(function.getName(), config);
        });
    }

    @Override
    public FunctionUpsert getUpsert() {
        for (Map.Entry<String, Map<String, Object>> mapEntry : name2FunctionMap.entrySet()) {
            String functionName = mapEntry.getKey();
            FunctionUpsert upsert = new FunctionUpsert();
            upsert.setName(functionName);
            upsert.setScopeType(scopeType);
            upsert.setScopeId(scopeId);
            upsert.setYmlDefine(YmlUtil.getYaml()
                    .dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(),Collections.singletonList(mapEntry.getValue()))));
            return upsert;
        }
        throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"需指定一个function配置");
    }

    @Override
    public void addDefine2Environment(Environment environment) {
        environment.getFunctions().putAll(name2EntryMap);
    }

    @Override
    public void validate() {
        if (name2FunctionMap.size() != 1) {
            throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"需指定一个function配置");
        }
    }

    @Override
    public void enrich(MetastoreDefine<?> metastoreDefine) {
        this.name2FunctionMap.putAll(((FunctionDefine) metastoreDefine).name2FunctionMap);
        this.name2EntryMap.putAll(((FunctionDefine) metastoreDefine).name2EntryMap);
    }

    @Override
    public String toYaml() {
        return YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(), new LinkedList<>(name2FunctionMap.values())));
    }
}
