package com.github.martvey.cli.retrofit.decoder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.lianjiatech.retrofit.spring.boot.core.ErrorDecoder;
import com.github.martvey.cli.entity.common.SscResult;
import com.github.martvey.cli.exception.SscCliException;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class SscErrorDecoder implements ErrorDecoder {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public RuntimeException invalidRespDecode(Request request, Response response) {
        if (response.isSuccessful()){
            return null;
        }

        if (response.code() >= 500){
            throw new SscCliException("系统异常");
        }

        ResponseBody body = response.body();
        if (body == null){
            log.error("服务器响应错误，但没有返回内容，response={}", response);
            throw new SscCliException("未知错误");
        }
        try {
            SscResult<?> sscResult = objectMapper.readValue(body.byteStream(), SscResult.class);
            throw new SscCliException(sscResult.getMessage());
        } catch (IOException e) {
            log.error("读取响应流错误",e);
            throw new SscCliException("系统异常");
        }
    }
}
