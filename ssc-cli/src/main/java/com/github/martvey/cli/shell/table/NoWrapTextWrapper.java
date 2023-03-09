package com.github.martvey.cli.shell.table;

import org.springframework.shell.table.TextWrapper;

public class NoWrapTextWrapper implements TextWrapper {
    @Override
    public String[] wrap(String[] original, int columnWidth) {
        return original;
    }
}
