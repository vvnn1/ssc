package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author martvey
 * @date 2022/6/2 14:08
 */
@Getter
@Setter
@ToString
public class UMetastoreRequest extends PMetastoreReuqest{
    private String id;
    public UMetastoreRequest(String id, String scopeId, String scopeType, String name, String metastoreYml) {
        super(scopeId, scopeType, name, metastoreYml);
        this.id = id;
    }
}
