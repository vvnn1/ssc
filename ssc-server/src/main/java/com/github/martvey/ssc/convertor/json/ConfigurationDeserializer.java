package com.github.martvey.ssc.convertor.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.flink.configuration.Configuration;

import java.io.IOException;
import java.util.HashMap;

public class ConfigurationDeserializer  extends JsonDeserializer<Configuration> {
    @Override
    public Configuration deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        HashMap<String, String> map = new HashMap<>();
        JsonNode node = jp.getCodec().readTree(jp);
        node.fields().forEachRemaining(entry -> {
            map.put(entry.getKey(), entry.getValue().asText());
        });
        return Configuration.fromMap(map);
    }
}
