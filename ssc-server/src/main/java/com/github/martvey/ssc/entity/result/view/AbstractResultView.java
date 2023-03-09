package com.github.martvey.ssc.entity.result.view;

import com.github.martvey.ssc.entity.result.type.TypeInfoHolder;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.client.gateway.TypedResult;

import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.CancellationException;
import java.util.concurrent.TimeUnit;

@Slf4j
public abstract class AbstractResultView<T> implements ResultView{
    protected final PrintWriter writer;
    protected final ResultCollectorOperator<T> operator;
    protected final List<TypeInfoHolder<T>> typeInfoHolderList;

    public AbstractResultView(
            PrintWriter writer,
            ResultCollectorOperator<T> operator,
            List<TypeInfoHolder<T>> typeInfoHolderList) {
        this.writer = writer;
        this.operator = operator;
        this.typeInfoHolderList = typeInfoHolderList;
    }

    @Override
    public void displayStreamResults() throws SqlExecutionException {
        Map<String, Integer> receiveCount = new TreeMap<>();
        boolean cleanUpQuery = true;
        try {
            if (CollectionUtils.isEmpty(typeInfoHolderList)){
                runSilence();
            } else {
                printStreamResults(receiveCount);
            }
            cleanUpQuery = false;
        } catch (CancellationException e) {
            for (Map.Entry<String, Integer> entry : receiveCount.entrySet()) {
                totalPrint(entry.getKey(), entry.getValue());
            }
        } finally {
            log.info("结果打印程结束");
            checkAndCleanUpQuery(cleanUpQuery);
        }
    }

    @Override
    public void displayBatchResults() {
        try {
            if (CollectionUtils.isEmpty(typeInfoHolderList)){
                runSilence();
            } else {
                printBatchResults();
            }
        } catch (CancellationException e) {
            writer.println("调试结束");
        }
    }

    protected List<T> waitBatchResults(String tableName) {
        do {
            try {
                TimeUnit.MILLISECONDS.sleep(500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            TypedResult<?> result = operator.snapshotResult(tableName);

            if (result.getType() == TypedResult.ResultType.EOS) {
                return Collections.emptyList();
            } else if (result.getType() == TypedResult.ResultType.PAYLOAD) {
                return operator.retrieveBatchResult(tableName);
            }
        } while (true);
    }

    protected abstract void printBatchResults();

    protected abstract void printStreamResults(Map<String, Integer> receiveCount);

    protected abstract void totalPrint(String name, Integer total);

    private void runSilence() {
        boolean hasPrint = false;
        while (operator.isJobRunning()){
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                throw new CancellationException("结束收集数据");
            }
            if (!hasPrint){
                writer.println("无调试语句, 任务静默运行中...");
                hasPrint = true;
            }
        }
        writer.println("任务调试结束");
    }

    private void checkAndCleanUpQuery(boolean cleanUpQuery) {
        if (cleanUpQuery) {
            try {
                operator.close();
            } catch (SqlExecutionException ignore) {

            }
        }
    }
}
