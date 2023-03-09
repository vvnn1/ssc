package com.github.martvey.ssc.mapper.local;


import com.github.martvey.ssc.entity.space.SpaceQuery;
import com.github.martvey.ssc.entity.space.SpaceUpsert;
import com.github.martvey.ssc.entity.space.SpaceVO;

import java.util.List;

public interface SpaceMapper {
    void insertSpace(SpaceUpsert spaceUpsert);
    void deleteSpace(String spaceId);
    List<SpaceVO> listSpaceVO(SpaceQuery query);

    SpaceVO getSpaceVO(String id);

    void updateSpace(SpaceUpsert upsert);
}