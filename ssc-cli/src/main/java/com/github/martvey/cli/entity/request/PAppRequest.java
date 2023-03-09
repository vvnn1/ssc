package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PAppRequest {
    private String projectId;
    private String appName;
    private String appType;
    private String content;
}
