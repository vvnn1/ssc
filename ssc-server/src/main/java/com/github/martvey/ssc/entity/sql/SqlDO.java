package com.github.martvey.ssc.entity.sql;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class SqlDO {
    private String id;
    private String projectId;
    private String name;
    private String sqlContent;
    private Date createTime;
}
