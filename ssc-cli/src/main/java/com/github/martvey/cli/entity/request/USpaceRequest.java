package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class USpaceRequest {
    private String id;
    private String spaceName;

    public USpaceRequest() {
    }

    public USpaceRequest(String id, String spaceName) {
        this.id = id;
        this.spaceName = spaceName;
    }
}
