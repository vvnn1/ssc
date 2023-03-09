package com.github.martvey.ssc.entity.common;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SscResult {
    private String code;
    private String message;
    private Object content;

    public SscResult(SscErrorCode error) {
        this.code = error.getCoed();
        this.message = error.getMessage();
    }

    public SscResult(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public SscResult(String code, String message, Object content) {
        this.code = code;
        this.message = message;
        this.content = content;
    }

    public static SscResult ok(){
        return new SscResult("0000","请求成功");
    }

    public static SscResult ok(String message){
        return new SscResult("0000",message);
    }

    public static SscResult ok(String message, Object content){
        return new SscResult("0000",message,content);
    }

    public static SscResult code(String code, String message){
        return new SscResult(code, message);
    }

    public static SscResult code(SscErrorCode code, String message){
        return new SscResult(code.getCoed(), message);
    }

    public static SscResult code(SscErrorCode code){
        return new SscResult(code.getCoed(), code.getMessage());
    }
}
