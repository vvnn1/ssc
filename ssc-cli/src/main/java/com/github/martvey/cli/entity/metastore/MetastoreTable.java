package com.github.martvey.cli.entity.metastore;


import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MetastoreTable {
    protected String metastoreType;
    protected String scopeType;
    protected String scopeId;
    protected String sourceYaml;

    private String id;
    private String name;
    private String createTime;
}
