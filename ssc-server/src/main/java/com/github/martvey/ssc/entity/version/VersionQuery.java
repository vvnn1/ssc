package com.github.martvey.ssc.entity.version;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder(builderClassName = "Builder")
public class VersionQuery {
    private String appId;
    private String version;
}
