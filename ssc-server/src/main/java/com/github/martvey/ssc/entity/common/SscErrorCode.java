package com.github.martvey.ssc.entity.common;

import lombok.Getter;

@Getter
public enum SscErrorCode {
    BAD_REQUEST("4000","错误的请求"),
    UNAUTHORIZED("4001", "登录信息错误"),
    PARAMETER_ERROR("4002","参数错误"),
    FORBIDDEN("4003", "未授权"),
    NOT_FOUND("4004","不存在"),
    TOKEN_EXPIRE("4005", "身份信息超时"),
    FILE_ALREADY_EXIST("4051","文件已存在"),
    SQL_ERROR("4052","SQL错误"),
    SYSTEM_ERROR("5000","系统异常");

    SscErrorCode(String coed, String message) {
        this.coed = coed;
        this.message = message;
    }

    private String coed;
    private String message;
}
