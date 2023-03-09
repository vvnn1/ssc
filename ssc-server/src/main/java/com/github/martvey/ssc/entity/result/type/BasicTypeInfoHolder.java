package com.github.martvey.ssc.entity.result.type;


import org.apache.flink.api.common.typeutils.TypeSerializer;

public class BasicTypeInfoHolder<T> implements TypeInfoHolder<T> {
    private String sinkName;
    private TypeSerializer<T> typeSerializer;

    public BasicTypeInfoHolder(String sinkName, TypeSerializer<T> typeSerializer) {
        this.sinkName = sinkName;
        this.typeSerializer = typeSerializer;
    }

    @Override
    public String getName() {
        return sinkName;
    }

    @Override
    public TypeSerializer<T> getTypeSerializer() {
        return typeSerializer;
    }
}
