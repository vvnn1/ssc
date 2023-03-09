package com.github.martvey.ssc.entity.configuration;

import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author martvey
 * @date 2022/5/13 21:38
 */
@Getter
@Setter
@ToString
public class ConfUpsert {
    private String id;
    private String defineYml;
    private ScopeEnum scopeType;
    private String scopeId;
}
