package com.github.martvey.cli.entity.plan;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * @author martvey
 * @date 2022/7/12 14:41
 */
@Getter
@Setter
@ToString
public class Node {
    private String id;
    private String parallelism;
    private String operator;
    @JsonProperty("operator_strategy")
    private String operatorStrategy;
    private String description;
    private List<Input> inputs;
//    private String optimizerProperties;
}
