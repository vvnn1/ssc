package com.github.martvey.ssc.entity.jar;

import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class JarDO {
    private String jarId;
    private String jarName;
    private String jarPath;
    private Date addTime;
    private ScopeEnum scopeType;
    private String scopeId;
}
