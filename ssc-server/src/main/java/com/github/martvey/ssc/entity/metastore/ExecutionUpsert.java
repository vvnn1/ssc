package com.github.martvey.ssc.entity.metastore;


import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ExecutionUpsert {
    private String ymlDefine;
    private ScopeEnum scopeType;
    private String scopeId;
}
