package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UProjectRequest {
    private String id;
    private String projectName;

    public UProjectRequest() {
    }

    public UProjectRequest(String id, String projectName) {
        this.id = id;
        this.projectName = projectName;
    }
}
