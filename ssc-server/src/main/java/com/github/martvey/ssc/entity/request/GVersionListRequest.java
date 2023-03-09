package com.github.martvey.ssc.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class GVersionListRequest {
    @NotBlank(message = "appId参数不能为空")
    private String appId;
}
