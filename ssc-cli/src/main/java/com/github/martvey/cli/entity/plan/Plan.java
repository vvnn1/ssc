package com.github.martvey.cli.entity.plan;

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
public class Plan {
    private String jid;
    private String name;
    private List<Node> nodes;
}
