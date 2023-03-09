package com.github.martvey.cli.util;

import com.github.martvey.cli.annotation.Column;
import com.github.martvey.cli.shell.table.ChineseHorizontalAligner;
import com.github.martvey.cli.shell.table.ChineseSizeConstraints;
import com.github.martvey.cli.shell.table.NoWrapTextWrapper;
import com.github.martvey.cli.shell.table.SingleRowTableModel;
import org.springframework.shell.table.*;

import java.lang.reflect.Field;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.function.Supplier;

import static org.springframework.shell.table.SimpleHorizontalAligner.right;

public class TableUtils {

    public static Table execResult(String result){
        return singleTable("运行结果", result);
    }

    public static Table singleTable(String title, String content){
        SingleRowTableModel tableModel = SingleRowTableModel.builder()
                .title(title)
                .content(content)
                .build();
        TableBuilder tableBuilder = new TableBuilder(tableModel);
        return addBaseStyle(tableBuilder);
    }

    public static Table addBaseStyle(TableBuilder tableBuilder){
        tableBuilder.addFullBorder(BorderStyle.oldschool);
        tableBuilder
                .on(CellMatchers.table())
                .addAligner(right)
                .on(CellMatchers.table())
                .addSizer(new ChineseSizeConstraints())
                .addWrapper(new NoWrapTextWrapper())
                .addAligner(new ChineseHorizontalAligner());
        return tableBuilder.build();
    }

    public static LinkedHashMap<String, Object> resolveTableColumn(Class<?> clazz){
        LinkedHashMap<String, Object> result = new LinkedHashMap<>();
        for (Field field : clazz.getDeclaredFields()) {
            if (!field.isAnnotationPresent(Column.class)){
                continue;
            }
            result.put(field.getName(), field.getAnnotation(Column.class).value());
        }
        return result;
    }

    public static <T> Table buildTable(Class<T> clazz, Supplier<List<?>> dataList){
        LinkedHashMap<String, Object> columnMap = TableUtils.resolveTableColumn(clazz);
        TableModel tableModel = new BeanListTableModel<>(dataList.get(), columnMap);
        TableBuilder tableBuilder = new TableBuilder(tableModel);
        return TableUtils.addBaseStyle(tableBuilder);
    }
}
