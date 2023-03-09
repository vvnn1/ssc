package com.github.martvey.ssc.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.github.martvey.ssc.convertor.json.ConfigurationDeserializer;
import com.github.martvey.ssc.convertor.json.ConfigurationSerializer;
import com.github.martvey.ssc.convertor.json.JobIDDeserializer;
import com.github.martvey.ssc.convertor.json.JobIDSerializer;
import com.github.martvey.ssc.entity.metastore.ScopeQuery;
import com.github.martvey.ssc.service.MetastoreService;
import org.apache.flink.api.common.JobID;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AutoConfigureAfter(JacksonAutoConfiguration.class)
@ConditionalOnClass(ObjectMapper.class)
public class SscConfiguration {
    public SscConfiguration(ObjectMapper objectMapper){
        SimpleModule module = new SimpleModule("Configuration");
        module.addSerializer(org.apache.flink.configuration.Configuration.class, new ConfigurationSerializer());
        module.addDeserializer(org.apache.flink.configuration.Configuration.class, new ConfigurationDeserializer());
        module.addSerializer(JobID.class, new JobIDSerializer());
        module.addDeserializer(JobID.class, new JobIDDeserializer());
        objectMapper.registerModule(module);
    }

    @Bean
    public org.apache.flink.configuration.Configuration configuration(MetastoreService metastoreService){
        ScopeQuery scopeQuery = ScopeQuery.builder().build();
        return metastoreService.getConfigurationCover(scopeQuery);
    }
}
