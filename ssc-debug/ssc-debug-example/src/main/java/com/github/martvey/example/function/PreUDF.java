package com.github.martvey.example.function;

import org.apache.flink.table.functions.ScalarFunction;

public class PreUDF extends ScalarFunction {
    private String pre;

    public PreUDF(String pre) {
        this.pre = pre;
    }

    public String eval(String str){
        return pre + str;
    }
}
