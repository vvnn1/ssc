package com.github.martvey.debug.util;

import com.github.martvey.debug.exception.UserProgramException;
import org.apache.flink.api.common.ExecutionConfig;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.api.common.typeutils.TypeSerializer;
import org.apache.flink.api.java.DataSet;
import org.apache.flink.api.java.Utils;
import org.apache.flink.api.java.io.PrintingOutputFormat;
import org.apache.flink.api.java.operators.DataSink;

public class BatchDebugUtils extends DebugUtils{

    public static <T> DataSink<T> debug(DataSet<T> dataSet, String name, String[] args){
        if (hasRegistry(name)){
            throw new UserProgramException("此调试名称：" + name + "已被注册");
        }

        initProperties(args);

        if (!isDebugEnable()){
            return dataSet.output(new PrintingOutputFormat<>()).name(name);
        }


        TypeInformation<T> typeInformation = dataSet.getType();
        ExecutionConfig executionConfig = dataSet.getExecutionEnvironment().getConfig();
        TypeSerializer<T> serializer = typeInformation.createSerializer(executionConfig);
        if (collectTypeSerializer()){
            registryTypeSerializer(name, serializer);
            return dataSet.output(new PrintingOutputFormat<>()).name(name);
        }
        return dataSet.output(new Utils.CollectHelper<>(name, serializer)).name(name);
    }
}
