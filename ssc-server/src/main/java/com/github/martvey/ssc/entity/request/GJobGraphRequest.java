package com.github.martvey.ssc.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

/**
 * @author martvey
 * @date 2022/6/25 15:58
 */
@Getter
@Setter
@ToString
public class GJobGraphRequest {
    @NotBlank(message = "id参数不能为空")
    private String id;
}
