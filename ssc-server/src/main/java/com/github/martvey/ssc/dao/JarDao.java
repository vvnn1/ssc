package com.github.martvey.ssc.dao;


import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.entity.jar.JarDO;
import com.github.martvey.ssc.entity.jar.JarDelete;
import com.github.martvey.ssc.entity.jar.JarUpsert;
import com.github.martvey.ssc.entity.jar.JarVO;
import com.github.martvey.ssc.entity.metastore.ScopeQuery;
import org.apache.flink.core.fs.Path;

import java.util.List;

public interface JarDao {
    void insertJar(JarUpsert upsert) throws DaoException;
    JarDO getJarById(String jarId) throws DaoException;
    void deleteJar(JarDelete delete) throws DaoException;
    List<Path> listJarPathCover(ScopeQuery query) throws DaoException;
    List<JarVO> listJar(ScopeQuery query) throws DaoException;
}
