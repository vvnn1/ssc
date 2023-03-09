package com.github.martvey.ssc.dao;


import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.entity.space.SpaceQuery;
import com.github.martvey.ssc.entity.space.SpaceUpsert;
import com.github.martvey.ssc.entity.space.SpaceVO;

import java.util.List;

public interface SpaceDao {
    void insertSpace(SpaceUpsert spaceUpsert) throws DaoException;
    void deleteSpace(String spaceId) throws DaoException;
    List<SpaceVO> listSpaceVO(SpaceQuery query) throws DaoException;

    SpaceVO getSpaceVO(String id) throws DaoException;

    void updateSpace(SpaceUpsert upsert);
}