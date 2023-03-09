package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.constant.MetastoreEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.table.client.config.Environment;

import java.util.List;

@Getter
@Setter
@ToString
public class MetastoreYml {
    private MetastoreEnum metastoreType;
    private List<String> metastoreYmlList;

    public void addMetastore2Environment(Environment environment, ObjectMapper objectMapper) throws JsonProcessingException {
        for (String metastoreYml : metastoreYmlList) {

        }
    }
}
