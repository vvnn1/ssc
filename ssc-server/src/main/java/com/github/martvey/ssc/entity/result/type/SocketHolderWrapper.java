package com.github.martvey.ssc.entity.result.type;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.api.common.typeutils.TypeSerializer;
import org.apache.flink.streaming.experimental.SocketStreamIterator;
import org.apache.flink.table.client.SqlClientException;

import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Getter
@Setter
@ToString
public class SocketHolderWrapper<T> implements TypeInfoHolder<T> {
    private final TypeInfoHolder<T> holder;
    private final SocketStreamIterator<T> streamIterator;

    public SocketHolderWrapper(TypeInfoHolder<T> holder) {
        try {
            this.streamIterator = new SocketStreamIterator<>(0, Inet4Address.getLocalHost(), holder.getTypeSerializer());
        } catch (IOException e) {
            throw new SqlClientException("Could not start socket.", e);
        }
        this.holder = holder;
    }


    @Override
    public String getName() {
        return holder.getName();
    }

    @Override
    public TypeSerializer<T> getTypeSerializer() {
        return holder.getTypeSerializer();
    }

    public int getPort() {
        return this.streamIterator.getPort();
    }

    public InetAddress getInetAddress() {
        return this.streamIterator.getBindAddress();
    }
}
