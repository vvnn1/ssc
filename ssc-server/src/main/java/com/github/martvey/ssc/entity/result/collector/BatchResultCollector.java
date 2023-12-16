package com.github.martvey.ssc.entity.result.collector;

import com.github.martvey.ssc.entity.result.type.TypeInfoHolder;
import org.apache.flink.api.common.JobExecutionResult;
import org.apache.flink.api.common.accumulators.SerializedListAccumulator;
import org.apache.flink.api.common.typeutils.TypeSerializer;
import org.apache.flink.core.execution.JobClient;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.client.gateway.TypedResult;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class BatchResultCollector<T> implements ResultCollector {

    private final Object resultLock;
    private final Map<String, TypeSerializer<T>> typeSerializerMap;
    private Map<String, List<T>> resultTableMap;

    private final AtomicReference<SqlExecutionException> executionException = new AtomicReference<>();
    private CompletableFuture<Void> jobExecutionResultFuture;


    public BatchResultCollector(List<TypeInfoHolder<T>> typeInfoHolderList) {
        this.resultLock = new Object();
        this.typeSerializerMap = typeInfoHolderList
                .stream()
                .collect(Collectors.toMap(TypeInfoHolder::getName, TypeInfoHolder::getTypeSerializer));
    }

    @Override
    public void startRetrieval(JobClient jobClient) {
        jobExecutionResultFuture = jobClient.getJobExecutionResult()
                .thenAccept(new ResultRetrievalHandler())
                .whenComplete((unused, throwable) -> {
                    if (throwable != null) {
                        executionException.compareAndSet(null,
                                new SqlExecutionException(
                                        "Error while retrieving result.",
                                        throwable));
                    }
                });
    }

    @Override
    public boolean isCollectorRunning() {
        return !jobExecutionResultFuture.isDone();
    }

    @Override
    public void close() {

    }

    public TypedResult<Void> snapshot(String tableName) {
        synchronized (resultLock) {
            SqlExecutionException e = executionException.get();
            if (e != null) {
                throw e;
            }

            if (null == resultTableMap) {
                return TypedResult.empty();
            } else if (resultTableMap.get(tableName) != null) {
                return TypedResult.payload(null);
            } else {
                return TypedResult.endOfStream();
            }
        }
    }

    public List<T> retrieveBatchResult(String tableName) {
        synchronized (resultLock) {
            return resultTableMap.get(tableName);
        }
    }

    // --------------------------------------------------------------------------------------------

    private class ResultRetrievalHandler implements Consumer<JobExecutionResult> {
        @Override
        public void accept(JobExecutionResult jobExecutionResult) {
            BatchResultCollector.this.resultTableMap = typeSerializerMap
                    .entrySet()
                    .stream()
                    .collect(Collectors.toMap(Map.Entry::getKey, entry -> {
                        final ArrayList<byte[]> accResult = jobExecutionResult.getAccumulatorResult(entry.getKey());
                        if (accResult == null) {
                            throw new SqlExecutionException("The accumulator could not retrieve the result.");
                        }
                        try {
                            return SerializedListAccumulator.deserializeList(accResult, entry.getValue());
                        } catch (ClassNotFoundException | IOException e) {
                            throw new SqlExecutionException("Serialization error while deserializing collected data.", e);
                        }
                    }));

        }
    }
}
