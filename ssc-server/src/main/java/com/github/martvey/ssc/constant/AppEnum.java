package com.github.martvey.ssc.constant;

import lombok.Getter;
import org.springframework.util.StringUtils;

public enum AppEnum {
    SQL("SQL任务"),JAR("JAR包任务");
    @Getter
    private String desc;

    AppEnum(String desc) {
        this.desc = desc;
    }

    public static AppEnum resolveFromFileName(String fileName){
        for (AppEnum appEnum : values()) {
            if (StringUtils.endsWithIgnoreCase(fileName, appEnum.name())){
                return appEnum;
            }
        }
        return null;
    }
}
