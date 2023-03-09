package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.constant.MetastoreEnum;
import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.table.client.config.Environment;

import javax.annotation.Nonnull;

@Getter
@Setter
@ToString
public abstract class MetastoreDefine<T> implements Comparable<MetastoreDefine<T>>{
    protected MetastoreEnum metastoreType;
    protected ScopeEnum scopeType;
    protected String scopeId;
    protected String sourceYaml;

    public abstract T getUpsert();
    public abstract void addDefine2Environment(Environment environment);
    public abstract void validate();
    public abstract void enrich(MetastoreDefine<?> metastoreDefine);
    public abstract String toYaml();

    @Override
    public int compareTo(@Nonnull MetastoreDefine<T> o) {
        if ((metastoreType.ordinal() - o.metastoreType.ordinal()) != 0) {
            return metastoreType.ordinal() - o.metastoreType.ordinal();
        }

        return scopeType.ordinal() - o.scopeType.ordinal();
    }
}
