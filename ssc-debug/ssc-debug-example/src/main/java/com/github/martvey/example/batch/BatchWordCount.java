package com.github.martvey.example.batch;

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.java.DataSet;
import org.apache.flink.api.java.ExecutionEnvironment;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.api.java.utils.MultipleParameterTool;
import org.apache.flink.util.Collector;

import static com.github.martvey.debug.util.BatchDebugUtils.debug;

public class BatchWordCount {
    public static void main(String[] args) throws Exception {
        final MultipleParameterTool params = MultipleParameterTool.fromArgs(args);
        final ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();
        env.getConfig().setGlobalJobParameters(params);
        DataSet<String> text = WordCountData.getDefaultTextLineDataSet(env);
        DataSet<Tuple2<String, Integer>> counts =
                text.flatMap(new Tokenizer())
                        .groupBy(0)
                        .sum(1);

        debug(counts, "first_out", args);

        debug(counts, "second_out", args);

        env.execute("WordCount Example");
    }

    public static final class Tokenizer implements FlatMapFunction<String, Tuple2<String, Integer>> {

        @Override
        public void flatMap(String value, Collector<Tuple2<String, Integer>> out) {
            String[] tokens = value.toLowerCase().split("\\W+");

            for (String token : tokens) {
                if (token.length() > 0) {
                    out.collect(new Tuple2<>(token, 1));
                }
            }
        }
    }

}
