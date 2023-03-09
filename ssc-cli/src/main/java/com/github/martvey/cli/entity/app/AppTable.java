package com.github.martvey.cli.entity.app;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AppTable {
    @Column("应用id")
    private String id;
    @Column("应用名称")
    private String appName;
    @Column("创建时间")
    private String createTime;
}
