package com.github.martvey.ssc.mapper.local;


import com.github.martvey.ssc.entity.jar.JarDO;
import com.github.martvey.ssc.entity.jar.JarDelete;
import com.github.martvey.ssc.entity.jar.JarUpsert;
import com.github.martvey.ssc.entity.jar.JarVO;
import com.github.martvey.ssc.entity.metastore.ScopeQuery;
import org.apache.flink.core.fs.Path;

import java.util.List;

public interface JarMapper {
    void insertJar(JarUpsert upsert);
    JarDO getJarById(String jarId);
    void deleteJar(JarDelete delete);

    List<Path> listJarPathCover(ScopeQuery query);
    List<JarVO> listJar(ScopeQuery query);
}
