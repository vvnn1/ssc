package com.github.martvey.cli.entity.security;

import org.springframework.stereotype.Component;

public class TokenHolder {
    public static final String SSC_TOKEN = "ssc-token";
    public static final String NEW_SSC_TOKEN = "new-ssc-token";
    public static volatile String TOKEN;
}
