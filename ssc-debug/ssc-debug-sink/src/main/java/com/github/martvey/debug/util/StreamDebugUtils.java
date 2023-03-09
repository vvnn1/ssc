package com.github.martvey.debug.util;

import com.github.martvey.debug.exception.UserProgramException;
import org.apache.flink.api.common.ExecutionConfig;
import org.apache.flink.api.common.serialization.TypeInformationSerializationSchema;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.api.common.typeutils.TypeSerializer;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.datastream.DataStreamSink;
import org.apache.flink.streaming.api.functions.sink.PrintSinkFunction;
import org.apache.flink.streaming.api.functions.sink.SocketClientSink;


public class StreamDebugUtils extends DebugUtils{
    public static <T> DataStreamSink<T> debug(DataStream<T> dataStream, String name, String[] args){
        if (hasRegistry(name)){
            throw new UserProgramException("此调试名称：" + name + "已被注册");
        }

        initProperties(args);

        if (!isDebugEnable()){
            return dataStream.addSink(new PrintSinkFunction<>()).name(name);
        }

        TypeInformation<T> typeInformation = dataStream.getType();
        ExecutionConfig executionConfig = dataStream.getExecutionEnvironment().getConfig();
        TypeSerializer<T> serializer = typeInformation.createSerializer(executionConfig);
        if (collectTypeSerializer()){
            registryTypeSerializer(name, serializer);
            return dataStream.addSink(new PrintSinkFunction<>()).name(name);
        }

        String hostName = getSinkAddress(name);
        Integer port = getSinkPort(name);
        TypeInformationSerializationSchema<T> serializationSchema = new TypeInformationSerializationSchema<>(typeInformation, serializer);
        SocketClientSink<T> socketClientSink = new SocketClientSink<>(hostName, port, serializationSchema);

        return dataStream.addSink(socketClientSink).name(name);
    }
}
