package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.util.YmlUtil;
import org.apache.flink.table.client.SqlClientException;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.config.entries.ModuleEntry;

import java.util.*;

public class ModuleDefine extends MetastoreDefine<ModuleUpsert>{
    private final Map<String, ModuleEntry> name2EntryMap;
    private final Map<String,Map<String, Object>> name2ModuleMap;

    public ModuleDefine() {
        this.name2EntryMap = new HashMap<>();
        this.name2ModuleMap = new HashMap<>();
    }

    public void setModules(List<Map<String, Object>> modules) {
        modules.forEach(config -> {
            final ModuleEntry entry = ModuleEntry.create(config);
            if (this.name2EntryMap.containsKey(entry.getName())) {
                throw new SqlClientException(String.format("无法创建模块 '%s',模块定义重复", entry.getName()));
            }
            this.name2EntryMap.put(entry.getName(), entry);
            this.name2ModuleMap.put(entry.getName(), config);
        });
    }

    @Override
    public ModuleUpsert getUpsert(){
        for (Map.Entry<String, Map<String, Object>> mapEntry : name2ModuleMap.entrySet()) {
            String moduleName = mapEntry.getKey();
            ModuleUpsert upsert = new ModuleUpsert();
            upsert.setName(moduleName);
            upsert.setScopeId(scopeId);
            upsert.setScopeType(scopeType);
            upsert.setYmlDefine(YmlUtil.getYaml()
                    .dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(),Collections.singletonList(mapEntry.getValue()))));
            return upsert;
        }
        throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"需指定一个module配置");
    }

    @Override
    public void addDefine2Environment(Environment environment) {
        environment.getModules().putAll(name2EntryMap);
    }

    @Override
    public void validate() {
        if (name2ModuleMap.size() != 1){
            throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"需指定一个module配置");
        }
    }

    @Override
    public void enrich(MetastoreDefine<?> metastoreDefine) {
        this.name2ModuleMap.putAll(((ModuleDefine) metastoreDefine).name2ModuleMap);
        this.name2EntryMap.putAll(((ModuleDefine) metastoreDefine).name2EntryMap);
    }

    @Override
    public String toYaml() {
        return YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(), new LinkedList<>(name2ModuleMap.values())));
    }
}
