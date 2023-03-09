package com.github.martvey.ssc.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertiesUtil {
    public static Properties of(String value) throws IOException {
        Properties properties = new Properties();
        if (value == null || value.trim().length() == 0){
            return properties;
        }
        properties.load(new ByteArrayInputStream(value.getBytes()));
        return properties;
    }
}
