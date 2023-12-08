package com.github.martvey.ssc.controller;

import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.entity.common.SscResult;
import com.github.martvey.ssc.exception.SscClientException;
import com.github.martvey.ssc.exception.SscServerException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class SscExceptionHandler {

    @ExceptionHandler({SscServerException.class, Exception.class})
    public ResponseEntity<SscResult> serverExceptionHandler(Exception e){
        ResponseEntity.BodyBuilder builder = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);

        if (e instanceof SscServerException){
            return builder
                    .body(SscResult.code(((SscServerException) e).code, e.getMessage()));
        }

        log.error("未知异常",e);
        return builder.body(SscResult.code(SscErrorCode.SYSTEM_ERROR, "未知异常"));
    }

    @ExceptionHandler({/*BadCredentialsException.class,*/ SscClientException.class, BindException.class, MethodArgumentNotValidException.class, IllegalStateException.class})
    public ResponseEntity<SscResult> clientExceptionHandler(Exception e){
        ResponseEntity.BodyBuilder builder = ResponseEntity.badRequest();

        if (e instanceof MethodArgumentNotValidException){
            String errorMessage = ((MethodArgumentNotValidException) e)
                    .getBindingResult()
                    .getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(";"));
            return builder
                    .body(SscResult.code(SscErrorCode.PARAMETER_ERROR, errorMessage));

        }

        if (e instanceof IllegalStateException){
            return builder.body(SscResult.code(SscErrorCode.BAD_REQUEST, e.getMessage()));
        }

        if (e instanceof SscClientException){
            return builder.body(SscResult.code(((SscClientException) e).code, e.getMessage()));
        }

        if (e instanceof BindException){
            String errorMessage = ((BindException) e).getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(";"));
            return builder
                    .body(SscResult.code(SscErrorCode.PARAMETER_ERROR, errorMessage));
        }

        return builder.body(SscResult.code(SscErrorCode.BAD_REQUEST, e.getMessage()));
    }
}
