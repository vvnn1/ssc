package com.github.martvey.ssc.entity.result.indicator;

import com.github.martvey.ssc.entity.result.collector.ResultCollector;
import com.github.martvey.ssc.entity.result.collector.StreamResultCollector;
import com.github.martvey.ssc.entity.result.type.TypeInfoHolder;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.client.gateway.TypedResult;
import org.apache.flink.util.StringUtils;
import org.springframework.util.CollectionUtils;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CancellationException;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

public class BasicResultIndicator<T> extends AbstractResultIndicator<T> {
    public BasicResultIndicator(PrintWriter writer,
                                ResultCollector collector,
                                List<TypeInfoHolder<T>> typeInfoHolders,
                                Supplier<Boolean> isRunning) {
        super(writer, collector, typeInfoHolders, isRunning);
    }

    @Override
    protected void printBatchResults() {
        for (int i = 0; i < typeInfoHolderList.size(); i++) {
            TypeInfoHolder<T> typeInfoHolder = typeInfoHolderList.get(i);
            String sinkName = typeInfoHolder.getName();
            List<T> resultT = waitBatchResults(sinkName);

            if (i > 0){
                writer.println();
            }
            writer.println(sinkName + ">:");

            for (T t : resultT) {
                writer.println(StringUtils.arrayAwareToString(t));
            }

            totalPrint(sinkName, resultT.size());
        }
    }

    @Override
    protected void printStreamResults(Map<String, Integer> receiveCount) {
        while(isDisplayRunning()){
            if (CollectionUtils.isEmpty(typeInfoHolderList)){
                return;
            }

            try {
                TimeUnit.MILLISECONDS.sleep(500);
            } catch (InterruptedException e) {
                throw new CancellationException("结束收集数据");
            }

            for (int i = typeInfoHolderList.size() - 1; i >= 0; i--){
                TypeInfoHolder<T> typeInfoHolder = typeInfoHolderList.get(i);
                String sinkName = typeInfoHolder.getName();
                TypedResult<List<T>> result = ((StreamResultCollector<T>) collector).retrieveStreamResult(sinkName);

                switch (result.getType()){
                    case EMPTY:
                        break;
                    case EOS:
                        typeInfoHolderList.remove(i);
                        Integer totalCount = receiveCount.remove(sinkName);
                        totalPrint(sinkName, totalCount);
                        break;
                    case PAYLOAD:
                        List<T> changes = result.getPayload();
                        for (T change : changes) {
                            writer.println(sinkName + ":> " + StringUtils.arrayAwareToString(change));
                        }

                        receiveCount.compute(sinkName, (key, value)-> {
                            if (value == null){
                                return changes.size();
                            }
                            return value + changes.size();
                        });
                        break;
                    default:
                        throw new SqlExecutionException("未知的结果类型: " + result.getType());
                }
            }
        }
    }

    @Override
    protected void totalPrint(String name, Integer total) {
        if (total == null){
            total = 0;
        }
        writer.println(name + ":> 总计 " + total + " 条记录");
    }
}
