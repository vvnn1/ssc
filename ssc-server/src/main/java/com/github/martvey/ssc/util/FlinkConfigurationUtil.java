package com.github.martvey.ssc.util;

import com.github.martvey.ssc.annotation.FlinkConfigField;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.configuration.Configuration;
import org.springframework.util.Assert;
import org.springframework.util.ObjectUtils;
import org.springframework.util.ReflectionUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.Arrays;
import java.util.StringJoiner;

@Slf4j
public class FlinkConfigurationUtil {

    public static Configuration mergeConfiguration(Configuration conf1, Configuration conf2){
        Configuration mergedConfiguration = new Configuration(conf1);
        mergedConfiguration.addAll(conf2);
        return mergedConfiguration;
    }

    public static Configuration convert2Configuration(Object o){
        Assert.notNull(o, "参数不能为空");
        Configuration configuration = new Configuration();
        for (Class<?> tmp = o.getClass(); tmp != Object.class; tmp = tmp.getSuperclass()){
            Arrays.stream(tmp.getDeclaredFields())
                    .filter(field -> field.isAnnotationPresent(FlinkConfigField.class))
                    .forEach(field -> {
                        FlinkConfigField annotation = field.getAnnotation(FlinkConfigField.class);
                        String name = annotation.value();
                        ReflectionUtils.makeAccessible(field);
                        Object fieldValue = ReflectionUtils.getField(field, o);
                        if (fieldValue == null){
                            return;
                        }
                        String value = String.valueOf(fieldValue);
                        configuration.setString(name, value);
                    });
        }
        return configuration;
    }

    public static String toYml(Configuration configuration){
        StringJoiner joiner = new StringJoiner("\r\n");
        configuration.toMap().forEach((k,v) -> {
            joiner.add(String.format("%s: %s", k,v));
        });
        return joiner.toString();
    }

    public static Configuration loadYAMLResource(String yml){
        final Configuration config = new Configuration();
        if (ObjectUtils.isEmpty(yml)){
            return config;
        }

        try (BufferedReader reader = new BufferedReader(new StringReader(yml))){

            String line;
            int lineNo = 0;
            while ((line = reader.readLine()) != null) {
                lineNo++;
                // 1. check for comments
                String[] comments = line.split("#", 2);
                String conf = comments[0].trim();

                // 2. get key and value
                if (conf.length() > 0) {
                    String[] kv = conf.split(": ", 2);

                    // skip line with no valid key-value pair
                    if (kv.length == 1) {
                        continue;
                    }

                    String key = kv[0].trim();
                    String value = kv[1].trim();

                    // sanity check
                    if (key.length() == 0 || value.length() == 0) {
                        log.warn("Error while trying to split key and value in configuration yml: {}: {}", lineNo, line);
                        continue;
                    }

                    config.setString(key, value);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Error parsing YAML configuration.", e);
        }

        return config;
    }
}
