package com.github.martvey.ssc.exception;

public class SscSqlWorkSpaceException extends Exception{
    public String code;
    public SscSqlWorkSpaceException(String message) {
        super(message);
    }

    public SscSqlWorkSpaceException(String message, Throwable throwable) {
        super(message, throwable);
    }
}