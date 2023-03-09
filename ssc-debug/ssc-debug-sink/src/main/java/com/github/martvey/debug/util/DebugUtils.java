package com.github.martvey.debug.util;

import com.github.martvey.debug.parser.OptionsParser;
import org.apache.flink.api.common.typeutils.TypeSerializer;
import org.apache.flink.util.Preconditions;
import org.apache.flink.util.StringUtils;

import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

public class DebugUtils {
    public static final String DEBUG_ENABLE = "deployment.debug-enable";
    public static final String COLLECT_ENABLE = "deployment.collect-serialize";
    public static final String SINK_ADDRESS = "deployment.gateway.%s.address";
    public static final String SINK_PORT = "deployment.gateway.%s.port";

    private static final ThreadLocal<Set<String>> threadLocalDebugNameSet = ThreadLocal.withInitial(HashSet::new);
    private static final ThreadLocal<SinkNameSelector> threadLocalSelector = ThreadLocal.withInitial(SinkNameSelector::new);
    private static final ThreadLocal<Properties> threadLocalProperties = ThreadLocal.withInitial(Properties::new);

    protected static void initProperties(String[] args) {
        threadLocalProperties.set(OptionsParser.parseDefaultClient(args));
    }

    static void initializeSelectorThreadLocal(SinkNameSelector selector){
        threadLocalDebugNameSet.set(new HashSet<>());
        threadLocalSelector.set(selector);
    }

    static void removeSelectorThreadLocal(){
        threadLocalDebugNameSet.remove();
        threadLocalSelector.remove();
        threadLocalProperties.remove();
    }

    protected static boolean hasRegistry(String name){
        return threadLocalDebugNameSet.get().contains(name);
    }

    protected static void registryTypeSerializer(String name, TypeSerializer<?> serializer){
        threadLocalDebugNameSet.get().add(name);
        threadLocalSelector.get().put(name, serializer);
    }

    protected static Boolean collectTypeSerializer(){
        return threadLocalProperties.get() != null && Boolean.parseBoolean(threadLocalProperties.get().getProperty(COLLECT_ENABLE));
    }

    protected static Boolean isDebugEnable(){
        return threadLocalProperties.get() != null && Boolean.parseBoolean(threadLocalProperties.get().getProperty(DEBUG_ENABLE));
    }

    protected static String getSinkAddress(String name){
        String sinkAddress = threadLocalProperties.get().getProperty(String.format(SINK_ADDRESS, name));
        Preconditions.checkArgument(!StringUtils.isNullOrWhitespaceOnly(sinkAddress), "未指定Sink '" + name + "' 输出的地址");
        return sinkAddress;
    }

    protected static Integer getSinkPort(String name){
        String sinkPort = threadLocalProperties.get().getProperty(String.format(SINK_PORT, name));
        Preconditions.checkArgument(!StringUtils.isNullOrWhitespaceOnly(sinkPort), "未指定Sink '" + name + "' 输出端口");
        return Integer.parseInt(sinkPort);
    }
}
