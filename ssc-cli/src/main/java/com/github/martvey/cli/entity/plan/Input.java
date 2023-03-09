package com.github.martvey.cli.entity.plan;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author martvey
 * @date 2022/7/12 14:42
 */
@Getter
@Setter
@ToString
public class Input {
    private Integer num;
    private String id;
    @JsonProperty("ship_strategy")
    private String shipStrategy;
    private String exchange;
}