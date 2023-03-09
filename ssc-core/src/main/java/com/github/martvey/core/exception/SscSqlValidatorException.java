package com.github.martvey.core.exception;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SscSqlValidatorException extends RuntimeException{
    private String sqlContent;
    public SscSqlValidatorException(String sqlContent, String message) {
        super(message);
        this.sqlContent = sqlContent;
    }

    public SscSqlValidatorException(String sqlContent, String message, Throwable cause) {
        super(message, cause);
        this.sqlContent = sqlContent;
    }
}
