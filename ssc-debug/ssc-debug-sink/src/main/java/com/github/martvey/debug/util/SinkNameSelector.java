package com.github.martvey.debug.util;

import org.apache.flink.api.common.typeutils.TypeSerializer;

import java.util.TreeMap;

import static com.github.martvey.debug.util.DebugUtils.initializeSelectorThreadLocal;
import static com.github.martvey.debug.util.DebugUtils.removeSelectorThreadLocal;


public class SinkNameSelector extends TreeMap<String, TypeSerializer<?>> {

    public void setAsContext(){
        initializeSelectorThreadLocal(this);
    }

    public void unsetAsContext(){
        removeSelectorThreadLocal();
    }
}
