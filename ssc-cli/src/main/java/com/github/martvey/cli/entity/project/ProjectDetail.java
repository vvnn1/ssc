package com.github.martvey.cli.entity.project;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectDetail {
    private String id;
    private String projectName;
    private String createTime;
}
