package com.github.martvey.cli.entity.version;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VersionTable {
    @Column("id")
    private String id;
    @Column("应用名称")
    private String appName;
    @Column("版本号")
    private String version;
    @Column("创建时间")
    private String createTime;
}
