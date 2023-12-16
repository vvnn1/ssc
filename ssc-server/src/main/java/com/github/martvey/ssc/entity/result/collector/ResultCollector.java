package com.github.martvey.ssc.entity.result.collector;

import org.apache.flink.core.execution.JobClient;

public interface ResultCollector {
    void startRetrieval(JobClient jobClient);
    boolean isCollectorRunning();
    void close();
}
