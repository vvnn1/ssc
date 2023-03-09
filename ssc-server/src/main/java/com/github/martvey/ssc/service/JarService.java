package com.github.martvey.ssc.service;


import com.github.martvey.ssc.entity.jar.JarDelete;
import com.github.martvey.ssc.entity.jar.JarUpsert;
import com.github.martvey.ssc.entity.jar.JarVO;
import com.github.martvey.ssc.entity.metastore.ScopeQuery;
import org.apache.flink.core.fs.Path;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface JarService {
    void insertJar(MultipartFile file, JarUpsert upsert);
    void deleteJar(JarDelete delete);
    List<Path> listJarPathCover(ScopeQuery query);
    List<JarVO> listJar(ScopeQuery query);
}
