package com.github.martvey.ssc.entity.result.type;

import lombok.Getter;
import org.apache.flink.api.common.ExecutionConfig;
import org.apache.flink.table.api.TableSchema;


public abstract class SqlTypeInfoHolder<T> implements TypeInfoHolder<T> {
    protected final String tableName;
    @Getter
    protected final TableSchema tableSchema;
    protected final ExecutionConfig config;

    public SqlTypeInfoHolder(String tableName, TableSchema tableSchema, ExecutionConfig config) {
        this.tableName = tableName;
        this.tableSchema = tableSchema;
        this.config = config;
    }

    @Override
    public String getName() {
        return tableName;
    }
}
