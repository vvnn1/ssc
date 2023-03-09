package com.github.martvey.ssc.mapper.local;


import com.github.martvey.ssc.entity.version.VersionDO;
import com.github.martvey.ssc.entity.version.VersionQuery;
import com.github.martvey.ssc.entity.version.VersionUpsert;
import com.github.martvey.ssc.entity.version.VersionVO;

import java.util.List;

public interface VersionMapper {
    void insertVersion(VersionUpsert upsert);

    List<VersionDO> listVersionDO(VersionQuery query);

    VersionDO getVersionDOById(String id);

    void deleteVersionById(String id);

    List<VersionVO> listVersionVO(String appId);
}
