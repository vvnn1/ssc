package com.github.martvey.ssc.entity.jar;

import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JarUpsert {
    private String jarId;
    private String jarName;
    private String jarPath;
    private ScopeEnum scopeType;
    private String scopeId;
}
