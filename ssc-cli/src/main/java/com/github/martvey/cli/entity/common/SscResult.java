package com.github.martvey.cli.entity.common;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SscResult<T> {
    private String code;
    private String message;
    private T content;
}
