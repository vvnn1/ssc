package com.github.martvey.ssc.entity.result.collector;

import com.github.martvey.ssc.entity.result.type.SocketHolderWrapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.common.JobExecutionResult;
import org.apache.flink.api.common.typeutils.TypeSerializer;
import org.apache.flink.core.execution.JobClient;
import org.apache.flink.streaming.experimental.SocketStreamIterator;
import org.apache.flink.table.client.SqlClientException;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.client.gateway.TypedResult;

import java.io.IOException;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Slf4j
public class CollectStreamResult<T> implements AbstractCollectResult<T>{

    private static final int CHANGE_RECORD_BUFFER_SIZE = 5_000;
    private final ExecutorService executorService;
    private final List<ResultRetrievalThread> resultRetrievalThreadList;
    private final Map<String, List<T>> changeRecordBuffer;
    private CompletableFuture<JobExecutionResult> jobExecutionResultFuture;

    protected final Object resultLock;
    protected AtomicReference<SqlExecutionException> executionException = new AtomicReference<>();

    public CollectStreamResult(List<SocketHolderWrapper<T>> informationHolderList) {
        this.changeRecordBuffer = new HashMap<>();
        this.resultLock = new Object();

        int threadLength = informationHolderList.size();
        this.executorService = threadLength == 0
                ? Executors.newCachedThreadPool()
                : Executors.newFixedThreadPool(threadLength);

        this.resultRetrievalThreadList = informationHolderList
                .stream()
                .map(holder -> {
                    TypeSerializer<T> serializer = holder.getTypeSerializer();
                    String resultName = holder.getName();
                    InetAddress inetAddress = holder.getInetAddress();
                    int port = holder.getPort();

                    try {
                        SocketStreamIterator<T> iterator = new SocketStreamIterator<>(port, inetAddress, serializer);
                        holder.setInetAddress(iterator.getBindAddress());
                        holder.setPort(iterator.getPort());
                        return new ResultRetrievalThread(resultName, iterator);
                    } catch (IOException e) {
                        throw new SqlClientException("Could not start socket for result retrieval.", e);
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public void startRetrieval(JobClient jobClient) {
        resultRetrievalThreadList.forEach(executorService::submit);

        jobExecutionResultFuture = jobClient.getJobExecutionResult()
                .whenComplete((unused, throwable) -> {
                    log.info("jobClient结束");
                    if (throwable != null) {
                        executionException.compareAndSet(
                                null,
                                new SqlExecutionException("Error while retrieving result.", throwable));
                    }
                });
    }

    @Override
    public boolean isJobRunning() {
        return !jobExecutionResultFuture.isDone();
    }

    @Override
    public void close() {
        for (ResultRetrievalThread resultRetrievalThread : resultRetrievalThreadList) {
            resultRetrievalThread.isRunning = false;
        }
        executorService.shutdownNow();
    }

    public TypedResult<List<T>> retrieveStreamResult(String tableName) {
        synchronized (resultLock) {
            List<T> resultList = changeRecordBuffer.get(tableName);
            if (isRetrieving(tableName) && executionException.get() == null && isJobRunning()) {
                if (resultList == null || resultList.isEmpty()) {
                    return TypedResult.empty();
                } else {
                    final List<T> change = new ArrayList<>(resultList);
                    resultList.clear();
                    resultLock.notify();
                    return TypedResult.payload(change);
                }
            } else if (!isRetrieving(tableName) && !resultList.isEmpty()) {
                final List<T> change = new ArrayList<>(resultList);
                resultList.clear();
                return TypedResult.payload(change);
            } else {
                return handleMissingResult();
            }
        }
    }

    private void processRecord(String tableName, T change) {
        synchronized (resultLock) {
            int countRecord = changeRecordBuffer
                    .values()
                    .stream()
                    .mapToInt(List::size)
                    .sum();
            if (countRecord >= CHANGE_RECORD_BUFFER_SIZE) {
                try {
                    resultLock.wait();
                } catch (InterruptedException ignore) {
                }
            } else {
                changeRecordBuffer
                        .computeIfAbsent(tableName, key -> new ArrayList<>())
                        .add(change);
            }
        }
    }

    private TypedResult<List<T>> handleMissingResult() {
        if (executionException.get() != null) {
            throw executionException.get();
        }

        if (isJobRunning()) {
            return TypedResult.empty();
        }

        return TypedResult.endOfStream();
    }

    private boolean isRetrieving(String tableName) {
        for (ResultRetrievalThread resultRetrievalThread : resultRetrievalThreadList) {
            if (resultRetrievalThread.tableName .equals(tableName)){
                return resultRetrievalThread.isRunning;
            }
        }
        return false;
    }

    // --------------------------------------------------------------------------------------------

    private class ResultRetrievalThread implements Runnable {

        private final String tableName;
        private final SocketStreamIterator<T> iterator;
        private volatile boolean isRunning = true;

        private ResultRetrievalThread(String tableName, SocketStreamIterator<T> iterator) {
            this.tableName = tableName;
            this.iterator = iterator;
        }

        @Override
        public void run() {
            try {
                while (isRunning && iterator.hasNext()) {
                    T change = iterator.next();
                    processRecord(tableName, change);
                }
            } catch (RuntimeException ignore) {
            }

            iterator.close();
            isRunning = false;
            log.info(tableName + "结果接收线程结束");
        }
    }

}
