package com.github.martvey.ssc.entity.configuration;

import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * @author martvey
 * @date 2022/5/14 17:36
 */
@Getter
@Setter
@ToString
public class ConfVO {
    private String id;
    private String defineYml;
    private Date createTime;
    private ScopeEnum scopeType;
    private String scopeId;
}
