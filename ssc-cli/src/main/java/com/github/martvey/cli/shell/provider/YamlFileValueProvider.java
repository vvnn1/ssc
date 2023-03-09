package com.github.martvey.cli.shell.provider;

import org.springframework.util.StringUtils;

public class YamlFileValueProvider extends AbstractFileValueProvider{
    @Override
    protected boolean fileNameMatch(String fileName) {
        return StringUtils.hasText(fileName)
                && (StringUtils.endsWithIgnoreCase(fileName, ".yaml")
                    || StringUtils.endsWithIgnoreCase(fileName, ".yml"));
    }
}
