package com.github.martvey.ssc.entity.request;


import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.constant.MetastoreEnum;
import com.github.martvey.ssc.constant.ScopeEnum;
import com.github.martvey.ssc.entity.metastore.MetastoreDefine;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.core.JsonProcessingException;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class PMetastoreRequest {
    @NotBlank(message = "defineYml参数不能为空")
    private String defineYml;
    @NotNull(message = "type参数不能为空")
    private MetastoreEnum metastoreType;
    @NotNull(message = "scopeType参数不能为空")
    private ScopeEnum scopeType;
    private String scopeId;

    public MetastoreDefine getMetastoreDefine(){
        try {
            return metastoreType.convert(defineYml);
        } catch (JsonProcessingException e) {
            throw new SscServerException(SscErrorCode.PARAMETER_ERROR,"defineYml信息错误：" + e.getMessage());
        }
    }
}
