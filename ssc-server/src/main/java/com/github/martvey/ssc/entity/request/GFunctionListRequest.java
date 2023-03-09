package com.github.martvey.ssc.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class GFunctionListRequest {
    @NotBlank(message = "spaceId参数不能为空")
    private String spaceId;
    private String projectId;
}
