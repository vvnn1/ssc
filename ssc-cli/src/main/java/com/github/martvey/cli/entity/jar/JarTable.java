package com.github.martvey.cli.entity.jar;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JarTable {
    @Column("jarId")
    private String id;
    @Column("jar名称")
    private String jarName;
    @Column("添加时间")
    private String addTime;
    @Column("作用范围")
    private String scopeType;
}
