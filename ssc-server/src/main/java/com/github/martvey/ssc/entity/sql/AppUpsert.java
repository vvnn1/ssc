package com.github.martvey.ssc.entity.sql;

import com.github.martvey.ssc.constant.AppEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AppUpsert {
    private String id;
    private String spaceId;
    private String projectId;
    private String appName;
    private AppEnum appType;
    private String content;
}
