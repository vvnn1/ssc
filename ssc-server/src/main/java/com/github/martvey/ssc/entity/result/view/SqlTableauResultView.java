package com.github.martvey.ssc.entity.result.view;

import com.github.martvey.ssc.entity.result.type.SqlTypeInfoHolder;
import com.github.martvey.ssc.entity.result.type.TypeInfoHolder;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.table.api.TableColumn;
import org.apache.flink.table.api.TableSchema;
import org.apache.flink.table.client.cli.CliStrings;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.client.gateway.TypedResult;
import org.apache.flink.table.utils.PrintUtils;
import org.apache.flink.types.Row;
import org.apache.flink.util.Preconditions;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CancellationException;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

@Slf4j
public class SqlTableauResultView<T> extends AbstractResultView<T>{

    private static final int DEFAULT_COLUMN_WIDTH = 20;
    private static final String CHANGEFLAG_COLUMN_NAME = "+/-";

    public SqlTableauResultView(
            PrintWriter writer,
            ResultCollectorOperator<T> operator,
            List<TypeInfoHolder<T>> typeInfoHolderList) {
        super(writer, operator, typeInfoHolderList);
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void printBatchResults() {
        for (int i = 0; i < typeInfoHolderList.size(); i++) {
            SqlTypeInfoHolder<T> sqlTypeInformationHolder = (SqlTypeInfoHolder<T>) typeInfoHolderList.get(i);
            String tableName = sqlTypeInformationHolder.getName();
            List<Row> resultRows = (List<Row>) waitBatchResults(tableName);

            if (i > 0){
                writer.println();
            }
            writer.println(tableName + ":");

            List<TableColumn> columns = sqlTypeInformationHolder
                    .getTableSchema()
                    .getTableColumns();
            String[] columnNames = columns.stream()
                    .map(TableColumn::getName)
                    .toArray(String[]::new);
            int[] colWidths = PrintUtils.columnWidthsByType(columns, DEFAULT_COLUMN_WIDTH, CliStrings.NULL_COLUMN, null);
            String borderline = PrintUtils.genBorderLine(colWidths);

            writer.println(borderline);
            PrintUtils.printSingleRow(colWidths, columnNames, writer);
            writer.println(borderline);

            for (Row row : resultRows) {
                String[] rowToString = PrintUtils.rowToString(row);
                PrintUtils.printSingleRow(colWidths,  rowToString, writer);
                writer.println(borderline);
            }
            totalPrint(tableName, resultRows.size());
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void printStreamResults(Map<String, Integer> receiveCount) {
        Preconditions.checkArgument(typeInfoHolderList.size() == 1, "只能包含一个输出类型信息");

        SqlTypeInfoHolder<T> sqlTypeInformationHolder = (SqlTypeInfoHolder<T>) typeInfoHolderList.get(0);
        String tableName = sqlTypeInformationHolder.getName();
        TableSchema tableSchema = sqlTypeInformationHolder.getTableSchema();

        writer.println(tableName + ":");
        List<TableColumn> columns = tableSchema.getTableColumns();
        String[] columnNames =
                Stream.concat(
                        Stream.of(CHANGEFLAG_COLUMN_NAME),
                        columns.stream().map(TableColumn::getName)
                ).toArray(String[]::new);

        int[] colWidths = PrintUtils.columnWidthsByType(
                columns, DEFAULT_COLUMN_WIDTH, CliStrings.NULL_COLUMN, CHANGEFLAG_COLUMN_NAME);
        String borderline = PrintUtils.genBorderLine(colWidths);

        writer.println(borderline);
        PrintUtils.printSingleRow(colWidths, columnNames, writer);
        writer.println(borderline);

        while (true) {
            final TypedResult<List<T>> result = operator.retrieveStreamResult(tableName);
            try {
                TimeUnit.MILLISECONDS.sleep(500);
            } catch (InterruptedException e) {
                throw new CancellationException("结束收集数据");
            }

            switch (result.getType()) {
                case EMPTY:
                    break;
                case EOS:
                    Integer totalCount = receiveCount.remove(tableName);
                    totalPrint(tableName, totalCount);
                    totalPrint(tableName, totalCount);
                    return;
                case PAYLOAD:
                    List<Tuple2<Boolean, Row>> changes = (List<Tuple2<Boolean, Row>>) result.getPayload();
                    for (Tuple2<Boolean, Row> change : changes) {
                        final String[] cols = PrintUtils.rowToString(change.f1);
                        String[] row = new String[cols.length + 1];
                        row[0] = change.f0 ? "+" : "-";
                        System.arraycopy(cols, 0, row, 1, cols.length);
                        PrintUtils.printSingleRow(colWidths, row, writer);
                        writer.println(borderline);

                        receiveCount.compute(tableName, (key, value)-> {
                            if (value == null){
                                return changes.size();
                            }
                            return value + changes.size();
                        });
                    }
                    break;
                default:
                    throw new SqlExecutionException("未知输入类型: " + result.getType());
            }
        }
    }

    @Override
    protected void totalPrint(String name, Integer total) {
        if (total == null){
            total = 0;
        }
        writer.println(name + " 总计 " + total + " 条记录");
    }
}
