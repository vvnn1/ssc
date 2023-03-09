package com.github.martvey.cli.shell.table;

import org.springframework.shell.table.SizeConstraints;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ChineseSizeConstraints implements SizeConstraints {
    private final Pattern p = Pattern.compile("[\\u4E00-\\u9FA5]");

    private int calculateSize(String word) {
        int countNum = 0;
        Matcher m = p.matcher(word);
        while (m.find()) {
            countNum++;
        }
        return countNum;
    }

    @Override
    public Extent width(String[] raw, int tableWidth, int nbColumns) {
        int max = 0;
        for (String line : raw) {
            int chineseNum = calculateSize(line);
            max = Math.max(max, line.length() + chineseNum);
        }
        return new Extent(max, max);
    }
}
