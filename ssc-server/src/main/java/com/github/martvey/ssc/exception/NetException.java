package com.github.martvey.ssc.exception;

public class NetException extends RuntimeException{
    public NetException(String message) {
        super(message);
    }

    public NetException(String message, Throwable cause) {
        super(message, cause);
    }
}
