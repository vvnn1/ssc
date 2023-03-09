package com.github.martvey.ssc.dao.impl;


import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.dao.SpaceDao;
import com.github.martvey.ssc.entity.space.SpaceQuery;
import com.github.martvey.ssc.entity.space.SpaceUpsert;
import com.github.martvey.ssc.entity.space.SpaceVO;
import com.github.martvey.ssc.mapper.local.SpaceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SpaceDaoImpl implements SpaceDao {
    private final SpaceMapper spaceMapper;

    @Override
    public void insertSpace(SpaceUpsert spaceUpsert) throws DaoException {
        try {
            spaceMapper.insertSpace(spaceUpsert);
        }catch (Exception e){
            throw new DaoException("数据库插入项目空间失败",e);
        }
    }

    @Override
    public void deleteSpace(String spaceId) throws DaoException {
        try {
            spaceMapper.deleteSpace(spaceId);
        } catch (Exception e) {
            throw new DaoException("数据库删除项目空间失败",e);
        }
    }

    @Override
    public List<SpaceVO> listSpaceVO(SpaceQuery query) throws DaoException {
        try {
            return spaceMapper.listSpaceVO(query);
        } catch (Exception e) {
            throw new DaoException("数据库查询项目空间失败",e);
        }
    }

    @Override
    public SpaceVO getSpaceVO(String id) throws DaoException {
        try {
            return spaceMapper.getSpaceVO(id);
        }catch (Exception e){
            throw new DaoException("数据库查询项目空间错误",e);
        }
    }

    @Override
    public void updateSpace(SpaceUpsert upsert) {
        try {
            spaceMapper.updateSpace(upsert);
        }catch (Exception e){
            throw new DaoException("数据库更新项目空间错误",e);
        }
    }
}
