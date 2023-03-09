package com.github.martvey.ssc.util;

import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

public class YmlUtil {
    public static Yaml getYaml(){
        DumperOptions dumperOptions = new DumperOptions();
        dumperOptions.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        dumperOptions.setDefaultScalarStyle(DumperOptions.ScalarStyle.PLAIN);
        dumperOptions.setLineBreak(DumperOptions.LineBreak.UNIX);
        return new Yaml(dumperOptions);
    }
}
