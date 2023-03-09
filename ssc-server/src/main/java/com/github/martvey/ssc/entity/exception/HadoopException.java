package com.github.martvey.ssc.entity.exception;

public class HadoopException extends RuntimeException {
    public HadoopException(String message) {
        super(message);
    }

    public HadoopException(String message, Throwable cause) {
        super(message, cause);
    }
}
