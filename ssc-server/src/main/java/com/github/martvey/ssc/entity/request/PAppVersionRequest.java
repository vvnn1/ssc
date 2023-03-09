package com.github.martvey.ssc.entity.request;


import com.github.martvey.ssc.jsr303.annotation.VersionRepeat;
import com.github.martvey.ssc.util.UuidUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@VersionRepeat(message = "版本 {version} 已存在")
public class PAppVersionRequest {
    private String id = UuidUtil.getId();
    @NotBlank(message = "appId参数不能为空")
    private String appId;
    @NotBlank(message = "version参数不能为空")
    private String version;
}
