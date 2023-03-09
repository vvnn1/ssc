package com.github.martvey.ssc.entity.request;

import com.github.martvey.ssc.util.UuidUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class PProjectRequest {
    private String id = UuidUtil.getId();
    @NotBlank(message = "spaceId参数不能为空")
    private String spaceId;
    @NotBlank(message = "projectName参数不能为空")
    private String projectName;
}
