package com.github.martvey.ssc.exception;


import com.github.martvey.ssc.entity.common.SscErrorCode;

public class SscClientException extends RuntimeException{
    public String code;
    public SscClientException(SscErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCoed();
    }

    public SscClientException(SscErrorCode errorCode, String message) {
        super(message);
        this.code = errorCode.getCoed();
    }
}
