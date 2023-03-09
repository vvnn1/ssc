package com.github.martvey.ssc.entity.request;

import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class PJarRequest {
    @NotNull(message = "scopeType参数不能为空")
    private ScopeEnum scopeType;
    @NotBlank(message = "scopeId参数不能为空")
    private String scopeId;
}
