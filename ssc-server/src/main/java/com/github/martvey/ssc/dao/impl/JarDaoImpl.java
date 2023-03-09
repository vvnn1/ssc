package com.github.martvey.ssc.dao.impl;


import com.github.martvey.ssc.dao.JarDao;
import com.github.martvey.ssc.entity.jar.JarDO;
import com.github.martvey.ssc.entity.jar.JarDelete;
import com.github.martvey.ssc.entity.jar.JarUpsert;
import com.github.martvey.ssc.entity.jar.JarVO;
import com.github.martvey.ssc.entity.metastore.ScopeQuery;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.mapper.local.JarMapper;
import lombok.RequiredArgsConstructor;
import org.apache.flink.core.fs.Path;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class JarDaoImpl implements JarDao {
    private final JarMapper jarMapper;

    @Override
    public void insertJar(JarUpsert upsert) {
        try {
            jarMapper.insertJar(upsert);
        } catch (Exception e) {
            throw new DaoException("数据库插入jar信息错误",e);
        }
    }

    @Override
    public JarDO getJarById(String jarId) {
        try {
            return jarMapper.getJarById(jarId);
        } catch (Exception e) {
            throw new DaoException("数据库查询jar信息错误",e);
        }
    }

    @Override
    public void deleteJar(JarDelete delete) {
        try {
            jarMapper.deleteJar(delete);
        } catch (Exception e) {
            throw new DaoException("数据库删除jar信息错误",e);
        }
    }

    @Override
    public List<Path> listJarPathCover(ScopeQuery query) throws DaoException {
        try {
            return jarMapper.listJarPathCover(query);
        }catch (Exception e){
            throw new DaoException("数据库查询jar路径错误",e);
        }
    }

    @Override
    public List<JarVO> listJar(ScopeQuery query) throws DaoException {
        try {
           return jarMapper.listJar(query);
        }catch (Exception e){
            throw new DaoException("数据库查询jar信息错误",e);
        }
    }
}
