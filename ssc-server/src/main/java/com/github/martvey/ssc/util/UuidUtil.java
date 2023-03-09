package com.github.martvey.ssc.util;

import java.util.UUID;

public class UuidUtil {
    public static String getId(){
        return UUID.randomUUID().toString().replace("-", "").toUpperCase();
    }
}
