package com.github.martvey.ssc.entity.result.type;

import org.apache.flink.api.common.ExecutionConfig;
import org.apache.flink.api.common.typeutils.TypeSerializer;
import org.apache.flink.table.api.TableSchema;
import org.apache.flink.types.Row;

public class SqlBatchTypeInfoHolder extends SqlTypeInfoHolder<Row>{
    public SqlBatchTypeInfoHolder(String tableName, TableSchema tableSchema, ExecutionConfig config) {
        super(tableName, tableSchema, config);
    }

    @Override
    public TypeSerializer<Row> getTypeSerializer() {
        return tableSchema.toRowType().createSerializer(config);
    }
}
