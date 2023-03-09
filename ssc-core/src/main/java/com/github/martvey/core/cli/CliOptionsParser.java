package com.github.martvey.core.cli;

import com.github.martvey.core.util.ResourceUtils;
import org.apache.commons.cli.*;
import org.apache.flink.table.client.SqlClientException;

import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class CliOptionsParser {
    static final Option DYNAMIC_PROPERTIES = Option
            .builder("D")
            .argName("property=value")
            .numberOfArgs(2)
            .valueSeparator('=')
            .desc("自定义的属性")
            .build();


    public static final Option OPTION_ENVIRONMENT = Option
            .builder("e")
            .longOpt("environment")
            .numberOfArgs(1)
            .desc("会话ENVIRONMENT配置文件地址")
            .build();

    public static final Option OPTION_DEFAULTS = Option
            .builder("d")
            .required(false)
            .longOpt("defaults")
            .numberOfArgs(1)
            .desc("默认ENVIRONMENT配置文件地址，会被会话的覆盖")
            .build();

    public static final Option OPTION_UPDATE_LOCATION = Option
            .builder("ul")
            .required(false)
            .longOpt("update-location")
            .numberOfArgs(1)
            .desc("SQL文件地址")
            .build();

    private static final Options DEFAULT_CLIENT_OPTIONS = getDefaultClientOptions(new Options());

    public static CliOptions parseDefaultClient(String[] args) {
        try {
            DefaultParser parser = new DefaultParser();
            CommandLine line = parser.parse(DEFAULT_CLIENT_OPTIONS, args, true);
            return new CliOptions(
                    checkUrl(line, OPTION_ENVIRONMENT),
                    checkUrl(line, OPTION_DEFAULTS),
                    line.getOptionValue(OPTION_UPDATE_LOCATION.getOpt()),
                    line.getOptionProperties(DYNAMIC_PROPERTIES.getOpt())
            );
        }
        catch (ParseException e) {
            throw new SqlClientException(e.getMessage());
        }
    }

    private static Options getDefaultClientOptions(Options options) {
        options.addOption(DYNAMIC_PROPERTIES);
        options.addOption(OPTION_ENVIRONMENT);
        options.addOption(OPTION_DEFAULTS);
        options.addOption(OPTION_UPDATE_LOCATION);
        return options;
    }

    private static URL checkUrl(CommandLine line, Option option) {
        final List<URL> urls = checkUrls(line, option);
        if (urls != null && !urls.isEmpty()) {
            return urls.get(0);
        }
        return null;
    }

    private static List<URL> checkUrls(CommandLine line, Option option) {
        if (line.hasOption(option.getOpt())) {
            final String[] urls = line.getOptionValues(option.getOpt());
            return Arrays.stream(urls)
                    .distinct()
                    .map((url) -> {
                        try {
                            return ResourceUtils.getURL(url);
                        } catch (Exception e) {
                            throw new SqlClientException("命令 '" + option.getLongOpt() + "': " + url, e);
                        }
                    })
                    .collect(Collectors.toList());
        }
        return null;
    }
}
