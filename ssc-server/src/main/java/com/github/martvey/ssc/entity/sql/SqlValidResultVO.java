package com.github.martvey.ssc.entity.sql;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SqlValidResultVO {
    private String sqlContent;
    private String errMessage;

    public SqlValidResultVO(String sqlContent, String errMessage) {
        this.sqlContent = sqlContent;
        this.errMessage = errMessage;
    }
}
