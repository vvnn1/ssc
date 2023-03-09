package com.github.martvey.ssc.entity.configuration;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author martvey
 * @date 2022/5/14 17:47
 */
@Getter
@Setter
@ToString
public class ConfigurationQuery {
    private String spaceId;
    private String projectId;
    private String appId;
}
