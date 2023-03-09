package com.github.martvey.cli.shell.table;

import org.springframework.shell.table.Aligner;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ChineseHorizontalAligner implements Aligner {
    private final Pattern p = Pattern.compile("[\\u4E00-\\u9FA5]");

    private int calculateCNSize(String word) {
        int countNum = 0;
        Matcher m = p.matcher(word);
        while (m.find()) {
            countNum++;
        }
        return countNum;
    }

    @Override
    public String[] align(String[] text, int cellWidth, int cellHeight) {
        for (int i = 0; i < cellHeight; i++) {
            String line = text[i];
            int cnSize = calculateCNSize(line);
            if (cnSize == 0){
                continue;
            }
            text[i] = line.substring(cnSize);
        }
        return text;
    }

    @Override
    public String toString() {
        return "Chinese Horizontal Aligner";
    }
}
