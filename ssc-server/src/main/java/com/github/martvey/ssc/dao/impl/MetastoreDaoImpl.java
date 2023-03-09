package com.github.martvey.ssc.dao.impl;


import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.constant.MetastoreEnum;
import com.github.martvey.ssc.dao.MetastoreDao;
import com.github.martvey.ssc.entity.metastore.*;
import com.github.martvey.ssc.mapper.local.MetastoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import static org.apache.flink.shaded.guava18.com.google.common.base.CaseFormat.LOWER_CAMEL;
import static org.apache.flink.shaded.guava18.com.google.common.base.CaseFormat.LOWER_UNDERSCORE;

@Repository
@RequiredArgsConstructor
public class MetastoreDaoImpl implements MetastoreDao {
    private final MetastoreMapper metastoreMapper;
    private final Map<String, Method> metastoreMethodMap = new ConcurrentHashMap<>(47);

    private Object invoke(String type, MetastoreEnum metastoreEnum, Object ... args){
        Class<?>[] paramsType = null;
        if (args != null) {
            paramsType = new Class<?>[args.length];
            for (int i = 0; i < args.length; i++) {
                paramsType[i] = args[i].getClass();
            }
        }

        Method metastoreMethod = getMetastoreMethod(type, metastoreEnum, paramsType);
        if (metastoreMethod == null) {
            throw new DaoException("没有操作 " + metastoreEnum + " 的方法");
        }

        try {
            return metastoreMethod.invoke(metastoreMapper, args);
        } catch (IllegalAccessException | InvocationTargetException e) {
            throw new RuntimeException(e);
        }
    }


    private Method getMetastoreMethod(String type, MetastoreEnum metastoreEnum, Class<?> ... paramsType){
        String metastoreType = type.toLowerCase();
        String metastoreName = metastoreEnum.name().toLowerCase();
        String methodName = LOWER_UNDERSCORE.to(LOWER_CAMEL, metastoreType + "_" + metastoreName);
        return metastoreMethodMap.computeIfAbsent(methodName, name -> {
            try {
                return MetastoreMapper.class.getMethod(name, paramsType);
            } catch (NoSuchMethodException e) {
                return null;
            }
        });
    }

    @PostConstruct
    public void init() {
        for (MetastoreEnum metastoreEnum : MetastoreEnum.values()) {
            metastoreEnum.insertDefineData = metastoreDefine -> invoke("insert", metastoreEnum, metastoreDefine);
            metastoreEnum.deleteDefineData = metastoreDelete -> invoke("delete", metastoreEnum, metastoreDelete);
            //noinspection unchecked
            metastoreEnum.listDefineData = scopeQuery -> (List<MetastoreVO>) invoke("query", metastoreEnum, scopeQuery);
            metastoreEnum.updateDefineData = (id, metastoreDefine) -> invoke("update", metastoreEnum, id, metastoreDefine);
            metastoreEnum.getDefineData = id -> (MetastoreVO) invoke("get", metastoreEnum, id);
        }
    }
}
