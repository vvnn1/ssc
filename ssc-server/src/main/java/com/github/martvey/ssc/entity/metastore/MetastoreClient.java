package com.github.martvey.ssc.entity.metastore;


import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.table.client.config.Environment;

import java.util.List;

@Getter
@Setter
@ToString
public class MetastoreClient {
    private ScopeEnum scopeType;
    private List<MetastoreYml> metastoreYmlList;

    public Environment toEnvironment(){
        return null;
    }
}
