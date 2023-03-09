package com.github.martvey.ssc.dao;



import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.entity.version.VersionDO;
import com.github.martvey.ssc.entity.version.VersionQuery;
import com.github.martvey.ssc.entity.version.VersionUpsert;
import com.github.martvey.ssc.entity.version.VersionVO;

import java.util.List;

public interface VersionDao {
    void insertVersion(VersionUpsert upsert) throws DaoException;
    List<VersionDO> listVersionDO(VersionQuery query) throws DaoException;
    VersionDO getVersionDOById(String id) throws DaoException;
    void deleteVersionById(String id) throws DaoException;

    List<VersionVO> listVersionVO(String appId) throws DaoException;
}
