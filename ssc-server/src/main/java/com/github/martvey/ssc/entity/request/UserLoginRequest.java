package com.github.martvey.ssc.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class UserLoginRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
