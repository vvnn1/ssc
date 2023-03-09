package com.github.martvey.ssc.entity.result.type;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.api.common.typeutils.TypeSerializer;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Getter
@Setter
@ToString
public class SocketHolderWrapper<T> implements TypeInfoHolder<T> {
    private final TypeInfoHolder<T> holder;
    private InetAddress inetAddress;
    private int port;

    public SocketHolderWrapper(TypeInfoHolder<T> holder) {
        this.holder = holder;
        try {
            this.inetAddress = Inet4Address.getLocalHost();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        this.port = 0;
    }


    @Override
    public String getName() {
        return holder.getName();
    }

    @Override
    public TypeSerializer<T> getTypeSerializer() {
        return holder.getTypeSerializer();
    }
}
