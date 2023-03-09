package com.github.martvey.ssc.service.impl;


import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.dao.JarDao;
import com.github.martvey.ssc.entity.jar.JarDO;
import com.github.martvey.ssc.entity.jar.JarDelete;
import com.github.martvey.ssc.entity.jar.JarUpsert;
import com.github.martvey.ssc.entity.jar.JarVO;
import com.github.martvey.ssc.entity.metastore.ScopeQuery;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.JarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.core.fs.Path;
import org.apache.flink.util.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class JarServiceImpl implements JarService {
    private final JarDao jarDao;

    @Value("${ssc.base-dir}/metastore/libraries")
    private Path libDirPath;

    @Override
    @Transactional
    public void insertJar(MultipartFile file, JarUpsert upsert) {
        String childPath = String.join("/", upsert.getScopeType().name(), upsert.getScopeId(), file.getOriginalFilename());
        Path jarPath = new Path(libDirPath, childPath);
        try {
            if (FileUtils.exists(jarPath)) {
                log.debug("文件已存在，filename={}", upsert.getJarName());
                throw new SscServerException(SscErrorCode.FILE_ALREADY_EXIST,"文件已存在");
            }

            upsert.setJarPath(jarPath.toString());
            jarDao.insertJar(upsert);

            FileUtils.copyFile(file.getInputStream(), jarPath);
        } catch (IOException e){
            log.error("传输jar文件失败，jarPath={}, upsert={}", jarPath,upsert, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        } catch (DaoException e){
            log.error("添加jar信息失败，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    @Transactional
    public void deleteJar(JarDelete delete) {
        try {
            JarDO jarDO = jarDao.getJarById(delete.getJarId());
            Path jarPath = new Path(jarDO.getJarPath());
            jarDao.deleteJar(delete);
            if (FileUtils.exists(jarPath) && !FileUtils.deleteFile(jarPath)) {
                throw new SscServerException(SscErrorCode.SYSTEM_ERROR, "删除文件失败");
            }
        } catch (IOException e) {
            log.error("删除jar文件失败，delete={}", delete, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        } catch (DaoException e){
            log.error("删除jar信息失败,delete={}", delete,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public List<Path> listJarPathCover(ScopeQuery query) {
        try {
            return jarDao.listJarPathCover(query);
        }catch (DaoException e){
            log.error("查询jar包路径错误，query={}", query,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public List<JarVO> listJar(ScopeQuery query) {
        try {
            return jarDao.listJar(query);
        }catch (DaoException e){
            log.error("查询jar信息错误，query={}", query,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }
}
