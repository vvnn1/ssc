package com.github.martvey.core.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.config.entries.*;
import org.apache.flink.util.CollectionUtil;
import org.apache.flink.util.FlinkRuntimeException;

import java.io.IOException;
import java.util.Map;

public class EnvironmentUtils {
    public static Configuration resolveConfiguration(String metastoreConfig){
        if (StringUtils.isEmpty(metastoreConfig)){
            return new Configuration();
        }
        try {
            Environment environment = EnvironmentUtils.parse(metastoreConfig);
            return Configuration.fromMap(environment.getConfiguration().asMap());
        }catch (IOException e){
            throw new FlinkRuntimeException("读取Flink配置错误", e);
        }
    }

    public static Environment parse(String metastoreConfig) throws IOException {
        return Environment.parse(metastoreConfig);
    }

    public static String press(Environment environment){
        final StringBuilder metastoreConfig = new StringBuilder();

        metastoreConfig.append("tables: ");
        Map<String, TableEntry> tables = environment.getTables();
        if (CollectionUtil.isNullOrEmpty(tables)){
            metastoreConfig.append("[]");
        }
        metastoreConfig.append("\n");
        tables.forEach((name, table) -> {
            metastoreConfig.append("- ").append(TableEntry.TABLES_NAME).append(": ").append(name).append("\n");
            metastoreConfig.append("  ").append("type").append(": ");
            if (table instanceof SourceTableEntry){
                metastoreConfig.append("source-table");
            }else if (table instanceof SinkTableEntry){
                metastoreConfig.append("sink-table");
            }else if (table instanceof SourceSinkTableEntry){
                metastoreConfig.append("source-sink-table");
            }else if (table instanceof ViewEntry){
                metastoreConfig.append("view");
            }else if (table instanceof TemporalTableEntry){
                metastoreConfig.append("temporal-table");
            }
            metastoreConfig.append("\n");
            table.asMap().forEach((k, v) -> metastoreConfig.append("  ").append(k).append(": ").append(v).append('\n'));
        });

        metastoreConfig.append("functions: ");
        Map<String, FunctionEntry> functions = environment.getFunctions();
        if (CollectionUtil.isNullOrEmpty(functions)) {
            metastoreConfig.append("[]");
        }
        metastoreConfig.append("\n");
        functions.forEach((name, function) -> {
            metastoreConfig.append("- ").append(FunctionEntry.FUNCTIONS_NAME).append(": ").append(name).append("\n");
            function.asMap().forEach((k, v) -> metastoreConfig.append("  ").append(k).append(": ").append(v).append('\n'));
        });

        metastoreConfig.append("catalogs: ");
        Map<String, CatalogEntry> catalogs = environment.getCatalogs();
        if (CollectionUtil.isNullOrEmpty(catalogs)){
            metastoreConfig.append("[]");
        }
        metastoreConfig.append("\n");
        catalogs.forEach((name, catalog) -> {
            metastoreConfig.append("- ").append(CatalogEntry.CATALOG_NAME).append(": ").append(name).append("\n");
            catalog.asMap().forEach((k, v) -> metastoreConfig.append("  ").append(k).append(": ").append(v).append('\n'));
        });

        metastoreConfig.append("modules: ");
        Map<String, ModuleEntry> modules = environment.getModules();
        if (CollectionUtil.isNullOrEmpty(modules)){
            metastoreConfig.append("[]");
        }
        metastoreConfig.append("\n");
        modules.forEach((name, module) -> {
            metastoreConfig.append("- ").append(ModuleEntry.MODULE_NAME).append(": ").append(name).append("\n");
            module.asMap().forEach((k, v) -> metastoreConfig.append("  ").append(k).append(": ").append(v).append('\n'));
        });

        ExecutionEntry execution = environment.getExecution();
        if (!CollectionUtil.isNullOrEmpty(execution.asTopLevelMap())){
            metastoreConfig.append("execution:\n");
            execution.asMap().forEach((k, v) -> metastoreConfig.append("  ").append(k).append(": ").append(v).append('\n'));
        }

        ConfigurationEntry configuration = environment.getConfiguration();
        if (!CollectionUtil.isNullOrEmpty(configuration.asMap())){
            metastoreConfig.append("configuration:\n");
            configuration.asMap().forEach((k, v) -> metastoreConfig.append("  ").append(k).append(": ").append(v).append('\n'));
        }
        DeploymentEntry deployment = environment.getDeployment();
        if (!CollectionUtil.isNullOrEmpty(deployment.asTopLevelMap())){
            metastoreConfig.append("deployment:\n");
            deployment.asMap().forEach((k, v) -> metastoreConfig.append("  ").append(k).append(": ").append(v).append('\n'));
        }
        return metastoreConfig.toString();
    }
}
