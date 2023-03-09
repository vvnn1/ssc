package com.github.martvey.cli.exception;

public class SscCliException extends RuntimeException{
    public SscCliException(String message) {
        super(message);
    }

    public SscCliException(String message, Throwable cause) {
        super(message, cause);
    }
}
