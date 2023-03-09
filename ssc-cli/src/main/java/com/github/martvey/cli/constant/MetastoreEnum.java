package com.github.martvey.cli.constant;

import com.github.martvey.cli.entity.metastore.*;
import lombok.Getter;

import java.lang.reflect.Executable;
import java.util.List;

public enum MetastoreEnum {
    TABLE(TableTable.class),
    FUNCTION(FunctionTable.class),
    CATALOG(CatalogTable.class),
    MODULE(ModuleTable.class),
    EXECUTION(ExecutionTable.class),
    CONFIGURATION(ConfigurationTable.class),
    DEPLOYMENT(DeploymentTable.class);
    public MetastoreFunction listMetastore;

    @Getter
    private final Class<? extends MetastoreTable> metastoreClazz;

    MetastoreEnum(Class<? extends MetastoreTable> metastoreClazz) {
        this.metastoreClazz = metastoreClazz;
    }

    public interface MetastoreFunction{
        List<? extends MetastoreTable> apply(String spaceId, String projectId, String appId);
    }
}
