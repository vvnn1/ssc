package com.github.martvey.ssc.dao.impl;


import com.github.martvey.ssc.dao.VersionDao;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.entity.version.VersionDO;
import com.github.martvey.ssc.entity.version.VersionQuery;
import com.github.martvey.ssc.entity.version.VersionUpsert;
import com.github.martvey.ssc.entity.version.VersionVO;
import com.github.martvey.ssc.mapper.local.VersionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class VersionDaoImpl implements VersionDao {
    private final VersionMapper versionMapper;


    @Override
    public void insertVersion(VersionUpsert upsert) throws DaoException {
        try {
            versionMapper.insertVersion(upsert);
        }catch (Exception e){
            throw new DaoException("数据库插入版本信息错误",e);
        }
    }

    @Override
    public List<VersionDO> listVersionDO(VersionQuery query) throws DaoException {
        try {
            return versionMapper.listVersionDO(query);
        }catch (Exception e){
            throw new DaoException("查询SQL版本错误",e);
        }
    }

    @Override
    public VersionDO getVersionDOById(String id) throws DaoException {
        try {
            return versionMapper.getVersionDOById(id);
        }catch (Exception e){
            throw new DaoException("查询版本错误",e);
        }
    }

    @Override
    public void deleteVersionById(String id) throws DaoException {
        try {
            versionMapper.deleteVersionById(id);
        }catch (Exception e){
            throw new DaoException("删除版本错误",e);
        }
    }

    @Override
    public List<VersionVO> listVersionVO(String appId) throws DaoException {
        try {
            return versionMapper.listVersionVO(appId);
        }catch (Exception e){
            throw new DaoException("数据库查询版本信息错误",e);
        }
    }
}
