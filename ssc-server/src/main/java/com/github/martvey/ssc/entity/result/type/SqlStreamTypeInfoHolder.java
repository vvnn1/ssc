package com.github.martvey.ssc.entity.result.type;

import org.apache.flink.api.common.ExecutionConfig;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.api.common.typeutils.TypeSerializer;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.table.api.TableSchema;
import org.apache.flink.types.Row;

public class SqlStreamTypeInfoHolder extends SqlTypeInfoHolder<Tuple2<Boolean, Row>> {
    public SqlStreamTypeInfoHolder(String tableName, TableSchema tableSchema, ExecutionConfig config) {
        super(tableName, tableSchema, config);
    }

    @Override
    public TypeSerializer<Tuple2<Boolean, Row>> getTypeSerializer() {
        TypeInformation<Tuple2<Boolean, Row>> tuple = Types.TUPLE(Types.BOOLEAN, tableSchema.toRowType());
        return tuple.createSerializer(config);
    }
}
