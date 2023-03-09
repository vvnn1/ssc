package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PProjectRequest {
    private String spaceId;
    private String projectName;

    public PProjectRequest(String spaceId, String projectName) {
        this.spaceId = spaceId;
        this.projectName = projectName;
    }

    public PProjectRequest() {
    }
}
