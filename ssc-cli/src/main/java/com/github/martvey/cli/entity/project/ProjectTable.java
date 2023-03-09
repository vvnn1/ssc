package com.github.martvey.cli.entity.project;

import com.github.martvey.cli.annotation.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectTable {
    @Column("工程id")
    private String id;
    @Column("工程名称")
    private String projectName;
    @Column("创建时间")
    private String createTime;
}
