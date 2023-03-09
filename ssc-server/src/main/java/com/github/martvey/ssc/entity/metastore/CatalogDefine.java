package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.util.YmlUtil;
import org.apache.flink.table.client.SqlClientException;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.config.entries.CatalogEntry;

import java.util.*;

public class CatalogDefine extends MetastoreDefine<CatalogUpsert>{
    private final Map<String, CatalogEntry> name2EntryMap;
    private final Map<String,Map<String, Object>> name2CatalogMap;

    public CatalogDefine() {
        this.name2EntryMap = new HashMap<>();
        this.name2CatalogMap = new HashMap<>();
    }

    public void setCatalogs(List<Map<String, Object>> catalogs) {
        catalogs.forEach(config -> {
            final CatalogEntry catalog = CatalogEntry.create(config);
            if (this.name2EntryMap.containsKey(catalog.getName())) {
                throw new SqlClientException(String.format("无法创建catalog '%s',catalog定义重复", catalog.getName()));
            }
            this.name2EntryMap.put(catalog.getName(), catalog);
            this.name2CatalogMap.put(catalog.getName(),config);
        });
    }

    @Override
    public CatalogUpsert getUpsert(){
        for (Map.Entry<String, Map<String, Object>> mapEntry : name2CatalogMap.entrySet()) {
            String catalogName = mapEntry.getKey();
            CatalogUpsert upsert = new CatalogUpsert();
            upsert.setName(catalogName);
            upsert.setScopeType(scopeType);
            upsert.setScopeId(scopeId);
            upsert.setYmlDefine(YmlUtil.getYaml()
                    .dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(),Collections.singletonList(mapEntry.getValue()))));
            return upsert;
        }
        throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"不能定义多个catalog");
    }

    @Override
    public void addDefine2Environment(Environment environment) {
        environment.getCatalogs().putAll(name2EntryMap);
    }

    @Override
    public void validate() {
        if (name2CatalogMap.size() != 1){
            throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"不能定义多个catalog");
        }
    }

    @Override
    public void enrich(MetastoreDefine<?> metastoreDefine) {
        this.name2CatalogMap.putAll(((CatalogDefine) metastoreDefine).name2CatalogMap);
        this.name2EntryMap.putAll(((CatalogDefine) metastoreDefine).name2EntryMap);
    }

    @Override
    public String toYaml() {
        return YmlUtil.getYaml().dumpAsMap(Collections.singletonMap(metastoreType.getMetastorePrefix(), new LinkedList<>(name2CatalogMap.values())));
    }
}
