package com.github.martvey.cli;


import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RetrofitScan(basePackages = "com.github.martvey.cli.net")
public class SscClientApp {
    public static void main(String[] args) {
        SpringApplication.run(SscClientApp.class,args);
    }
}
