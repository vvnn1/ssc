package com.github.martvey.example.stream;

import com.github.martvey.debug.util.StreamDebugUtils;
import org.apache.flink.api.common.functions.FilterFunction;
import org.apache.flink.streaming.api.datastream.SingleOutputStreamOperator;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import java.util.Arrays;

public class StreamWordCount {
    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        SingleOutputStreamOperator<SensorReading> map = env.fromCollection(Arrays.asList(
                new SensorReading("sensor_1", 15487165481L, 30.1),
                new SensorReading("sensor_2", 15487165482L, 31.7),
                new SensorReading("sensor_1", 15487165483L, 31.6),
                new SensorReading("sensor_3", 15487165484L, 30.2),
                new SensorReading("sensor_4", 15487165485L, 32.3),
                new SensorReading("sensor_2", 15487165486L, 31.2),
                new SensorReading("sensor_1", 15487165487L, 32.1),
                new SensorReading("sensor_3", 15487165488L, 33.2),
                new SensorReading("sensor_4", 15487165489L, 34.2)
        )).filter(new FilterFunction<SensorReading>() {
            @Override
            public boolean filter(SensorReading value) throws Exception {
                return value.getTemperature() > 32.0;
            }
        });

        StreamDebugUtils.debug(map, "first_out", args);

        env.execute();
    }
}
