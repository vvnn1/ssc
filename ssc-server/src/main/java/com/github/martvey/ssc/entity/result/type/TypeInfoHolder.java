package com.github.martvey.ssc.entity.result.type;

import org.apache.flink.api.common.typeutils.TypeSerializer;

public interface TypeInfoHolder<T> {
    String getName();
    TypeSerializer<T> getTypeSerializer();
}
