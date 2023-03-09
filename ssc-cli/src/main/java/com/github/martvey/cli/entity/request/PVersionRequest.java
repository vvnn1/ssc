package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PVersionRequest {
    private String appId;
    private String version;



    public PVersionRequest(String appId, String version) {
        this.appId = appId;
        this.version = version;
    }
}
