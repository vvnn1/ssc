package com.github.martvey.ssc.entity.request;


import com.github.martvey.ssc.annotation.FlinkConfigField;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter


@Setter
@ToString
public class PClusterRequest {
    @FlinkConfigField("yarn.application.name")
    private String clusterName;
    @FlinkConfigField("jobmanager.memory.process.size")
    private String jmMemory;
    @FlinkConfigField("taskmanager.memory.process.size")
    private String tmMemory;
    @FlinkConfigField("taskmanager.numberOfTaskSlots")
    private Integer slots;
    @FlinkConfigField("execution.target")
    private String executionTarget = "yarn-session";
}
