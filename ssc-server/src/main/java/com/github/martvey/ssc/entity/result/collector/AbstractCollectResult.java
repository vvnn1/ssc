package com.github.martvey.ssc.entity.result.collector;

import org.apache.flink.core.execution.JobClient;

public interface AbstractCollectResult<T> {
    void startRetrieval(JobClient jobClient);
    boolean isJobRunning();
    void close();
}
