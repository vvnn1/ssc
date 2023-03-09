package com.github.martvey.ssc.service;

import com.github.martvey.ssc.entity.version.VersionUpsert;
import com.github.martvey.ssc.entity.version.VersionVO;

import java.util.List;

public interface VersionService {
    void insertVersion(VersionUpsert upsert);
    void deleteVersion(String versionId);
    List<VersionVO> listVersion(String appId);
}
