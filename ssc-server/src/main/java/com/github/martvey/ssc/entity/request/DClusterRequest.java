package com.github.martvey.ssc.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

/**
 * @author martvey
 * @date 2022/5/24 14:20
 */
@Getter
@Setter
@ToString
public class DClusterRequest {
    @NotBlank(message = "id参数不能为空")
    private String id;
}
