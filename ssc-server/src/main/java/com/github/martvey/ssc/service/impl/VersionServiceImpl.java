package com.github.martvey.ssc.service.impl;

import com.github.martvey.core.exception.SscSqlValidatorException;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.constant.AppEnum;
import com.github.martvey.ssc.dao.JobDao;
import com.github.martvey.ssc.dao.VersionDao;
import com.github.martvey.ssc.entity.bo.JarWorkSpaceBO;
import com.github.martvey.ssc.entity.sql.AppDetail;
import com.github.martvey.ssc.entity.version.VersionDO;
import com.github.martvey.ssc.entity.version.VersionUpsert;
import com.github.martvey.ssc.entity.version.VersionVO;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.exception.SscClientException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.exception.SscSqlWorkSpaceException;
import com.github.martvey.ssc.service.AppService;
import com.github.martvey.ssc.service.VersionService;
import com.github.martvey.ssc.util.AppUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.configuration.ConfigUtils;
import org.apache.flink.configuration.PipelineOptions;
import org.apache.flink.core.fs.Path;
import org.apache.flink.util.FileUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class VersionServiceImpl implements VersionService {
    private final VersionDao versionDao;
    private final JobDao jobDao;
    private final AppService appService;
    @Value("${ssc.base-dir}/repository")
    private String basePath;

    @Override
    @Transactional
    public void insertVersion(VersionUpsert upsert) {
        try {
            AppDetail appDetail = appService.getAppDetailAllScope(upsert.getAppId());
            if (appDetail.getAppType() == AppEnum.SQL){
                AppUtil.validateSql(appDetail);
            }

            BeanUtils.copyProperties(appDetail, upsert);

            JarWorkSpaceBO.Builder builder = JarWorkSpaceBO.builder()
                    .basePath(basePath)
                    .spaceId(appDetail.getSpaceId())
                    .projectId(appDetail.getProjectId())
                    .appId(appDetail.getAppId())
                    .appName(appDetail.getAppName())
                    .version(upsert.getVersion())
                    .mainClass(appDetail.getMainClass());


            try (JarWorkSpaceBO workSpaceBO = builder.build()){
                Path jarPath = workSpaceBO.getTargetJarPath();
                ConfigUtils.encodeCollectionToConfig(upsert.getConfiguration(), PipelineOptions.JARS, Collections.singleton(jarPath), Object::toString);
                versionDao.insertVersion(upsert);
                workSpaceBO.createWorkSpace(appDetail.getMetastoreConfig(), appDetail.getContent(), appDetail.getJarList());
            }
        }catch (DaoException e){
            log.error("jar文件信息入库失败，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }catch (SscSqlValidatorException e){
            log.error("SQL校验失败，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SQL_ERROR, e.getMessage());
        } catch (SscSqlWorkSpaceException e) {
            log.error("构建项目空间失败，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }catch (Exception e){
            log.error("未知错误，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    @Transactional
    public void deleteVersion(String versionId) {
        try {
            if (jobDao.hasVersionJob(versionId)) {
                throw new SscClientException(SscErrorCode.BAD_REQUEST,"版本已发布的job无法执行删除操作");
            }

            VersionDO versionDO = versionDao.getVersionDOById(versionId);
            if (versionDO == null){
                return;
            }
            versionDao.deleteVersionById(versionId);

            List<Path> pipeJarList = ConfigUtils.decodeListFromConfig(versionDO.getConfiguration(), PipelineOptions.JARS, Path::new);
            for (Path path : pipeJarList) {
                FileUtils.deleteFile(path);
            }
        }catch (DaoException | IOException e){
            log.error("删除version失败，versionId={}", versionId,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public List<VersionVO> listVersion(String appId) {
        try {
            return versionDao.listVersionVO(appId);
        }catch (DaoException e){
            log.error("查询version版本失败, appId={}", appId,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }
}
