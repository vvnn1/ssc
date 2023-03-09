package com.github.martvey.cli.entity.app;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AppDetail {
    private String id;
    private String appName;
    private String content;
    private String createTime;
}
