package com.github.martvey.ssc.exception;

public class SscDebugException extends RuntimeException{
    public SscDebugException(String message) {
        super(message);
    }

    public SscDebugException(String message, Throwable cause) {
        super(message, cause);
    }
}
