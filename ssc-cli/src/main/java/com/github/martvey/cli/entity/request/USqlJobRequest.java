package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class USqlJobRequest {
    private String id;

    public USqlJobRequest(String id) {
        this.id = id;
    }

    public USqlJobRequest() {
    }
}
