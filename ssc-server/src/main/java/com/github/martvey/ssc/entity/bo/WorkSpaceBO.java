package com.github.martvey.ssc.entity.bo;

import com.github.martvey.ssc.constant.SscConstant;
import com.github.martvey.ssc.exception.SscSqlWorkSpaceException;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.core.fs.Path;

import java.io.IOException;
import java.util.List;

@Slf4j
public abstract class WorkSpaceBO implements AutoCloseable{
    public void createWorkSpace(String defaultMetastoreConfig, String content, List<Path> jarList) throws SscSqlWorkSpaceException {
        try {
            init();
            copyConf(defaultMetastoreConfig, content);
            copyJar(jarList);
        }catch (Exception e){
            throw new SscSqlWorkSpaceException("工作空间构建失败", e);
        }
    }

    protected String getMetastoreFileName(){
        return SscConstant.METASTORE_FILE;
    }

    protected abstract void init() throws IOException;

    protected abstract void copyConf(String defaultMetastoreConfig, String content) throws IOException;

    protected abstract void copyJar(List<Path> jarList) throws IOException;
}
