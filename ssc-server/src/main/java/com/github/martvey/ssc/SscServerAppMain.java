package com.github.martvey.ssc;

import com.github.martvey.ssc.datasource.EnableLocalDataSource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableLocalDataSource(basePackages = "com.github.martvey.ssc.mapper.local")
public class SscServerAppMain {
    public static void main(String[] args) {
        SpringApplication.run(SscServerAppMain.class,args);
    }
}
