package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.util.YmlUtil;
import org.apache.flink.table.client.SqlClientException;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.config.entries.TableEntry;

import java.util.*;

public class TableDefine extends MetastoreDefine<TableUpsert>{
    private final Map<String, TableEntry> name2EntryMap;
    private final Map<String,Map<String,Object>> name2TableMap;

    public TableDefine() {
        this.name2EntryMap = new HashMap<>();
        this.name2TableMap = new HashMap<>();
    }

    public void setTables(List<Map<String, Object>> tables) {
        tables.forEach(config -> {
            final TableEntry table = TableEntry.create(config);
            if (this.name2EntryMap.containsKey(table.getName())) {
                throw new SqlClientException(
                        "无法创建表 '" + table.getName() + "' ，表名定义重复");
            }
            this.name2EntryMap.put(table.getName(), table);
            this.name2TableMap.put(table.getName(),config);
        });
    }

    @Override
    public void addDefine2Environment(Environment environment) {
        environment.getTables().putAll(name2EntryMap);
    }

    @Override
    public TableUpsert getUpsert() {
        for (Map.Entry<String, Map<String, Object>> mapEntry : name2TableMap.entrySet()) {
            String tableName = mapEntry.getKey();
            TableUpsert upsert = new TableUpsert();
            upsert.setName(tableName);
            upsert.setScopeId(scopeId);
            upsert.setScopeType(scopeType);
            upsert.setYmlDefine(YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(),Collections.singletonList(mapEntry.getValue()))));
            return upsert;
        }
        return null; // never
    }

    @Override
    public void validate() {
        if (name2TableMap.size() != 1){
            throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"需制指定一个table配置");
        }
    }

    @Override
    public void enrich(MetastoreDefine<?> metastoreDefine) {
        this.name2TableMap.putAll(((TableDefine) metastoreDefine).name2TableMap);
        this.name2EntryMap.putAll(((TableDefine) metastoreDefine).name2EntryMap);
    }

    @Override
    public String toYaml() {
        return YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(), new LinkedList<>(name2TableMap.values())));
    }
}
