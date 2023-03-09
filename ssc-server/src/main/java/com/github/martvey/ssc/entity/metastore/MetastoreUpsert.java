package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.constant.MetastoreEnum;
import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MetastoreUpsert {
    private MetastoreEnum metastoreType;
    private String name;
    private String value;
    private ScopeEnum scopeType;
    private String scopeId;
}
