package com.github.martvey.ssc.service.impl;

import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.dao.ProjectDao;
import com.github.martvey.ssc.dao.SpaceDao;
import com.github.martvey.ssc.entity.project.ProjectQuery;
import com.github.martvey.ssc.entity.project.ProjectVO;
import com.github.martvey.ssc.entity.space.SpaceQuery;
import com.github.martvey.ssc.entity.space.SpaceUpsert;
import com.github.martvey.ssc.entity.space.SpaceVO;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.SpaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpaceServiceImpl implements SpaceService {
    private final SpaceDao spaceDao;
    private final ProjectDao projectDao;

    @Override
    @Transactional
    public void insertSpace(SpaceUpsert upsert) {
        try {
            spaceDao.insertSpace(upsert);
        } catch (DaoException e) {
            log.error("创建项目空间失败,upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }


    @Override
    @Transactional
    public void deleteSpace(String spaceId) {
        try{
            ProjectQuery projectQuery = new ProjectQuery();
            projectQuery.setSpaceId(spaceId);
            List<ProjectVO> projectVOList = projectDao.listProjectDO(projectQuery);
            if (!CollectionUtils.isEmpty(projectVOList)){
                throw new SscServerException(SscErrorCode.BAD_REQUEST,"项目空间下存在任务");
            }
            spaceDao.deleteSpace(spaceId);
        }catch (DaoException e){
            log.error("删除项目空间失败，spaceId={}", spaceId,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public List<SpaceVO> listSpaceVO(SpaceQuery query) {
        try {
            return spaceDao.listSpaceVO(query);
        } catch (DaoException e) {
            log.error("查询项目空间失败,query={}", query,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public SpaceVO getSpaceVO(String id) {
        try {
            return spaceDao.getSpaceVO(id);
        }catch (DaoException e){
            log.error("查询项目空间失败，id={}", id,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void updateSpace(SpaceUpsert upsert) {
        try {
            spaceDao.updateSpace(upsert);
        }catch (DaoException e){
            log.error("更新项目空间失败，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }
}
