package com.github.martvey.ssc.entity.request;

import com.github.martvey.ssc.constant.MetastoreEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author martvey
 * @date 2022/5/14 11:59
 */
@Getter
@Setter
@ToString
public class GMetastoreRequest {
    @NotBlank(message = "id参数不能为空")
    private String id;
    @NotNull(message = "metastoreType参数不能为空")
    private MetastoreEnum metastoreType;
}
