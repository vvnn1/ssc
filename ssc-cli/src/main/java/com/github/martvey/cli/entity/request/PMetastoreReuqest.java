package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PMetastoreReuqest {
    private String scopeId;
    private String scopeType;
    private String metastoreType;
    private String defineYml;

    public PMetastoreReuqest(String scopeId, String scopeType, String metastoreType, String defineYml) {
        this.scopeId = scopeId;
        this.scopeType = scopeType;
        this.metastoreType = metastoreType;
        this.defineYml = defineYml;
    }
}
