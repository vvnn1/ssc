package com.github.martvey.ssc.entity.request;



import com.github.martvey.ssc.util.UuidUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class PSpaceRequest {
    private String id = UuidUtil.getId();
    @NotBlank(message = "spaceName参数不能为空")
    private String spaceName;
}
