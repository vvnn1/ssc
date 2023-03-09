package com.github.martvey.core.util;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;


public class CliStatementSplitter {

    private static final String MASK = "--.*$";

    public static List<String> splitContent(String content) {
        List<String> statements = new ArrayList<>();
        List<String> buffer = new ArrayList<>();

        for (String line : content.split("\n")) {
            line = removeSqlNote(line);
            if (StringUtils.isEmpty(line)){
                continue;
            }

            if (!line.contains(";")){
                buffer.add(line);
                continue;
            }

            if (line.endsWith(";") && line.lastIndexOf(";") == line.indexOf(";")) {
                buffer.add(line);
                statements.add(String.join("\n", buffer));
                buffer.clear();
                continue;
            }

            for (int i = line.indexOf(";");i != -1; i = line.indexOf(";")){
                String eofLine = line.substring(0, i + 1);
                buffer.add(eofLine);
                statements.add(String.join("\n", buffer));
                buffer.clear();

                line = line.substring(i+1);
            }

            if (line.length() > 0){
                buffer.add(line);
            }
        }
        if (!buffer.isEmpty()) {
            statements.add(String.join("\n", buffer));
        }
        return statements;
    }

    private static String removeSqlNote(String line){
        return line.replaceAll(MASK, "").trim();
    }
}
