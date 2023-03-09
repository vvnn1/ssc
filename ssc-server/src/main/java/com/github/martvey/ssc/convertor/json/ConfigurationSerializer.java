package com.github.martvey.ssc.convertor.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.apache.flink.configuration.Configuration;

import java.io.IOException;
import java.util.Map;

public class ConfigurationSerializer extends JsonSerializer<Configuration> {
    @Override
    public void serialize(Configuration configuration, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        Map<String, String> configurationMap = configuration.toMap();
        gen.writeStartObject();
        configurationMap.forEach((k,v) -> {
            try {
                gen.writeStringField(k,v);
            } catch (IOException e) {
                throw new RuntimeException("configuration json转化错误");
            }
        });
        gen.writeEndObject();
    }
}
