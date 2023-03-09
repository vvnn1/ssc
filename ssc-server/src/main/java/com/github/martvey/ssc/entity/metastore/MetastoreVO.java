package com.github.martvey.ssc.entity.metastore;


import com.github.martvey.ssc.constant.MetastoreEnum;
import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class MetastoreVO {
    protected String id;
    protected MetastoreEnum metastoreType;
    protected ScopeEnum scopeType;
    protected String scopeId;
    protected String sourceYaml;
    private Date createTime;
}
