package com.github.martvey.cli.shell.provider;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class JarFileValueProvider extends AbstractFileValueProvider{
    @Override
    protected boolean fileNameMatch(String fileName) {
        return StringUtils.hasText(fileName) && StringUtils.endsWithIgnoreCase(fileName, ".jar");
    }
}
