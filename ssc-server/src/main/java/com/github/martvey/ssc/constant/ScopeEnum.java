package com.github.martvey.ssc.constant;

import lombok.Getter;

public enum ScopeEnum {
    FLINK("FLINK"),SYSTEM("系统"), SPACE("空间"), PROJECT("工程"), APPLICATION("应用");
    @Getter
    private String desc;

    ScopeEnum(String desc) {
        this.desc = desc;
    }
}
