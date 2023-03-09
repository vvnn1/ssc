package com.github.martvey.ssc.entity.result.view;

import com.github.martvey.ssc.entity.result.type.SqlTypeInfoHolder;
import com.github.martvey.ssc.entity.result.type.TypeInfoHolder;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.client.gateway.TypedResult;
import org.apache.flink.table.utils.PrintUtils;
import org.apache.flink.types.Row;
import org.springframework.util.CollectionUtils;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CancellationException;
import java.util.concurrent.TimeUnit;

@Slf4j
public class SqlChangelogResultView<T> extends AbstractResultView<T>{

    public SqlChangelogResultView(
            PrintWriter writer,
            ResultCollectorOperator<T> operator,
            List<TypeInfoHolder<T>> typeInfoHolderList) {
        super(writer, operator, typeInfoHolderList);
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void printBatchResults(){
        for (int i = 0; i < typeInfoHolderList.size(); i++) {
            SqlTypeInfoHolder<T> sqlTypeInfoHolder = (SqlTypeInfoHolder<T>)typeInfoHolderList.get(i);
            String tableName = sqlTypeInfoHolder.getName();
            List<Row> resultRows = (List<Row>) waitBatchResults(tableName);

            if (i > 0){
                writer.println();
            }
            writer.println(tableName + ":");

            for (Row row : resultRows) {
                String[] cols = PrintUtils.rowToString(row);
                writer.println(Arrays.toString(cols));
            }

            totalPrint(tableName, resultRows.size());
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void printStreamResults(Map<String, Integer> receiveCount) {
        while (true) {
            if (CollectionUtils.isEmpty(typeInfoHolderList)){
                return;
            }

            try {
                TimeUnit.MILLISECONDS.sleep(500);
            } catch (InterruptedException e) {
                throw new CancellationException("结束收集数据");
            }

            for (int i = typeInfoHolderList.size() - 1; i >= 0; i--) {
                SqlTypeInfoHolder<T> sqlTypeInfoHolder = (SqlTypeInfoHolder<T>) typeInfoHolderList.get(i);
                String tableName = sqlTypeInfoHolder.getName();
                TypedResult<List<T>> result = operator.retrieveStreamResult(tableName);

                switch (result.getType()) {
                    case EMPTY:
                        break;
                    case EOS:
                        typeInfoHolderList.remove(i);
                        Integer totalCount = receiveCount.remove(tableName);
                        totalPrint(tableName, totalCount);
                        break;
                    case PAYLOAD:
                        List<Tuple2<Boolean, Row>> changes = (List<Tuple2<Boolean, Row>>) result.getPayload();
                        for (Tuple2<Boolean, Row> change : changes) {
                            final String[] cols = PrintUtils.rowToString(change.f1);
                            String[] row = new String[cols.length + 1];
                            row[0] = change.f0 ? "+" : "-";
                            System.arraycopy(cols, 0, row, 1, cols.length);
                            writer.println(tableName + ":> " + Arrays.toString(row));
                        }

                        receiveCount.compute(tableName, (key, value)-> {
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
