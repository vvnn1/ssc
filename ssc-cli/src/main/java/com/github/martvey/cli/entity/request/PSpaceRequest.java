package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PSpaceRequest {
    private String spaceName;
    public static PSpaceRequest of(String spaceName){
        PSpaceRequest request = new PSpaceRequest();
        request.spaceName = spaceName;
        return request;
    }
}
