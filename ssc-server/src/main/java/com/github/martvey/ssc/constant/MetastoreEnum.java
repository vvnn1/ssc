package com.github.martvey.ssc.constant;

import com.github.martvey.ssc.entity.metastore.*;
import lombok.Getter;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.table.client.config.ConfigUtil;

import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;

public enum MetastoreEnum {
    TABLE(TableDefine.class, "tables"),
    FUNCTION(FunctionDefine.class, "functions"),
    CATALOG(CatalogDefine.class, "catalogs"),
    MODULE(ModuleDefine.class, "modules"),
    EXECUTION(ExecutionDefine.class, "execution"),
    CONFIGURATION(ConfigurationDefine.class, "configuration"),
    DEPLOYMENT(DeploymentDefine.class, "deployment");
    public final Class<? extends MetastoreDefine<?>> defineClass;

    public Consumer<MetastoreDefine> insertDefineData;

    public BiConsumer<String, MetastoreDefine> updateDefineData;

    public Consumer<MetastoreDelete> deleteDefineData;

    public Function<ScopeQuery, List<MetastoreVO>> listDefineData;

    public Function<String, MetastoreVO> getDefineData;

    @Getter
    private final String metastorePrefix;

    MetastoreEnum(Class<? extends MetastoreDefine<?>> defineClass, String metastorePrefix) {
        this.defineClass = defineClass;
        this.metastorePrefix = metastorePrefix;
    }

    public MetastoreDefine<?> convert(String yml) throws JsonProcessingException {
        ConfigUtil.LowerCaseYamlMapper yamlMapper = new ConfigUtil.LowerCaseYamlMapper();
        return convert(yml, yamlMapper);
    }

    public MetastoreDefine<?> convert(String yml, ObjectMapper objectMapper) throws JsonProcessingException{
        MetastoreDefine<?> metastoreDefine = objectMapper.readValue(yml, defineClass);
        metastoreDefine.setSourceYaml(yml);
        return metastoreDefine;
    }

    public MetastoreDefine emptyMetastoreDefine(){
        MetastoreDefine<?> metastoreDefine = null;
        try {
            metastoreDefine = defineClass.newInstance();
        } catch (Exception ignore) {
        }
        assert metastoreDefine != null;
        metastoreDefine.setMetastoreType(this);
        metastoreDefine.setScopeType(ScopeEnum.SYSTEM);
        metastoreDefine.setScopeId("");
        metastoreDefine.setSourceYaml("");
        return metastoreDefine;
    }

}
