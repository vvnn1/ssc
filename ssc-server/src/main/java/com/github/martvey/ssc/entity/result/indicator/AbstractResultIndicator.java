package com.github.martvey.ssc.entity.result.indicator;

import com.github.martvey.ssc.entity.result.collector.BatchResultCollector;
import com.github.martvey.ssc.entity.result.collector.ResultCollector;
import com.github.martvey.ssc.entity.result.collector.StreamResultCollector;
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
import java.util.function.Supplier;

@Slf4j
public abstract class AbstractResultIndicator<T> implements ResultIndicator {
    protected final PrintWriter writer;
    protected final ResultCollector collector;
    protected final List<TypeInfoHolder<T>> typeInfoHolderList;
    private final Supplier<Boolean> isRunning;

    public AbstractResultIndicator(
            PrintWriter writer,
            ResultCollector collector,
            List<TypeInfoHolder<T>> typeInfoHolderList,
            Supplier<Boolean> isRunning) {
        this.writer = writer;
        this.collector = collector;
        this.typeInfoHolderList = typeInfoHolderList;
        this.isRunning = isRunning;
    }

    @Override
    public void displayStreamResults() throws SqlExecutionException {
        Map<String, Integer> receiveCount = new TreeMap<>();
        try {
            if (CollectionUtils.isEmpty(typeInfoHolderList)) {
                runSilence();
            } else {
                printStreamResults(receiveCount);
            }
        } catch (CancellationException e) {
            for (Map.Entry<String, Integer> entry : receiveCount.entrySet()) {
                totalPrint(entry.getKey(), entry.getValue());
            }
        } finally {
            log.info("结果打印程结束");
            checkAndCleanUpQuery();
        }
    }

    @Override
    public void displayBatchResults() {
        try {
            if (CollectionUtils.isEmpty(typeInfoHolderList)) {
                runSilence();
            } else {
                printBatchResults();
            }
        } catch (CancellationException e) {
            writer.println("调试结束");
        }
    }

    @Override
    public boolean isDisplayRunning() {
        return this.isRunning.get();
    }

    protected List<T> waitBatchResults(String tableName) {
        do {
            try {
                TimeUnit.MILLISECONDS.sleep(500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            TypedResult<?> result = ((BatchResultCollector<T>) collector).snapshot(tableName);

            if (result.getType() == TypedResult.ResultType.EOS) {
                return Collections.emptyList();
            } else if (result.getType() == TypedResult.ResultType.PAYLOAD) {
                return ((BatchResultCollector<T>) collector).retrieveBatchResult(tableName);
            }
        } while (true);
    }

    protected abstract void printBatchResults();

    protected abstract void printStreamResults(Map<String, Integer> receiveCount);

    protected abstract void totalPrint(String name, Integer total);

    private void runSilence() {
        writer.println("无调试语句, 任务静默运行中...");
        while (collector.isCollectorRunning() && isDisplayRunning()) {
            try {
                TimeUnit.SECONDS.sleep(1000L);
            } catch (InterruptedException e) {
                throw new CancellationException("结束收集数据");
            }
        }
        writer.println("任务调试结束");
    }

    private void checkAndCleanUpQuery() {
        try {
            collector.close();
        } catch (SqlExecutionException ignore) {

        }
    }
}
