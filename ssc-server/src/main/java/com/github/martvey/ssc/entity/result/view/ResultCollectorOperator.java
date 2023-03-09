package com.github.martvey.ssc.entity.result.view;

import com.github.martvey.ssc.entity.result.collector.AbstractCollectResult;
import com.github.martvey.ssc.entity.result.collector.CollectBatchResult;
import com.github.martvey.ssc.entity.result.collector.CollectStreamResult;
import org.apache.flink.core.execution.JobClient;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.client.gateway.TypedResult;

import java.util.List;

public class ResultCollectorOperator<T> implements AbstractCollectResult<T>{
    private final AbstractCollectResult<T> result;

    public ResultCollectorOperator(AbstractCollectResult<T> result) {
        this.result = result;
    }

    @Override
    public void close() {
        result.close();
    }

    @Override
    public boolean isJobRunning(){
        return result.isJobRunning();
    }

    @Override
    public void startRetrieval(JobClient jobClient){
        result.startRetrieval(jobClient);
    }

    TypedResult<?> snapshotResult(String name) throws SqlExecutionException {
        return ((CollectBatchResult<?>) result).snapshot(name);
    }

    List<T> retrieveBatchResult(String name) throws SqlExecutionException {
        return ((CollectBatchResult<T>)result).retrieveBatchResult(name);
    }

    TypedResult<List<T>> retrieveStreamResult(String name) throws SqlExecutionException {
        return ((CollectStreamResult<T>) result).retrieveStreamResult(name);
    }
}
