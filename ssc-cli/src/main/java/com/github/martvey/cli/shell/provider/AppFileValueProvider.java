package com.github.martvey.cli.shell.provider;

import org.springframework.util.StringUtils;

public class AppFileValueProvider extends AbstractFileValueProvider{

    @Override
    protected boolean fileNameMatch(String fileName) {
        return StringUtils.hasText(fileName)
                && (StringUtils.endsWithIgnoreCase(fileName, ".jar")
                    || StringUtils.endsWithIgnoreCase(fileName, ".sql"));
    }
}
