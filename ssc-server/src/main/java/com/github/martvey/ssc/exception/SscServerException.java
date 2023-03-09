package com.github.martvey.ssc.exception;


import com.github.martvey.ssc.entity.common.SscErrorCode;

public class SscServerException extends RuntimeException{
    public SscErrorCode code;
    public SscServerException(SscErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode;
    }


    public SscServerException(SscErrorCode errorCode, String message) {
        super(message);
        this.code = errorCode;
    }
}
