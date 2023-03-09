package com.github.martvey.debug.parser;

import org.apache.commons.cli.*;

import java.util.Properties;

public class OptionsParser {
    static final Option DYNAMIC_PROPERTIES = Option
            .builder("D")
            .argName("property=value")
            .numberOfArgs(2)
            .valueSeparator('=')
            .desc("自定义的属性")
            .build();
    private static final Options DEFAULT_CLIENT_OPTIONS = getDefaultClientOptions(new Options());

    public static Properties parseDefaultClient(String[] args) {
        try {
            DefaultParser parser = new DefaultParser();
            CommandLine line = parser.parse(DEFAULT_CLIENT_OPTIONS, args, true);
            return line.getOptionProperties(DYNAMIC_PROPERTIES.getOpt());
        } catch (ParseException e) {
            throw new RuntimeException("程序命令解析错误", e);
        }
    }

    private static Options getDefaultClientOptions(Options options) {
        options.addOption(DYNAMIC_PROPERTIES);
        return options;
    }

}
