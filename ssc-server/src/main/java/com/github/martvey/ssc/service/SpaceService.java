package com.github.martvey.ssc.service;



import com.github.martvey.ssc.entity.space.SpaceQuery;
import com.github.martvey.ssc.entity.space.SpaceUpsert;
import com.github.martvey.ssc.entity.space.SpaceVO;

import java.util.List;

public interface SpaceService {
    void insertSpace(SpaceUpsert upsert);
    void deleteSpace(String spaceId);

    List<SpaceVO> listSpaceVO(SpaceQuery query);

    SpaceVO getSpaceVO(String id);

    void updateSpace(SpaceUpsert upsert);
}
