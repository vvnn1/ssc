package com.github.martvey.cli.entity.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.shell.standard.ShellOption;

/**
 * @author martvey
 * @date 2022/5/24 13:47
 */
@Getter
@Setter
@ToString
public class PClusterRequest {
    private String clusterName;
    private String jmMemory;
    private String tmMemory;
    private Integer slots;
}
