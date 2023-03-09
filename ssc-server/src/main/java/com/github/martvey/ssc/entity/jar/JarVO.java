package com.github.martvey.ssc.entity.jar;

import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class JarVO {
    private String id;
    private String jarName;
    private Date addTime;
    private ScopeEnum scopeType;
}
