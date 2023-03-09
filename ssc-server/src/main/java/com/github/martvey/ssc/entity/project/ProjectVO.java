package com.github.martvey.ssc.entity.project;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class ProjectVO {
    private String id;
    private String projectName;
    private Date createTime;
}
