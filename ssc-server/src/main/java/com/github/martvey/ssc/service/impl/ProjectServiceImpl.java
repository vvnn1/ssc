package com.github.martvey.ssc.service.impl;

import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.dao.ProjectDao;
import com.github.martvey.ssc.entity.project.ProjectQuery;
import com.github.martvey.ssc.entity.project.ProjectUpsert;
import com.github.martvey.ssc.entity.project.ProjectVO;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectDao projectDao;

    @Override
    public void insertProject(ProjectUpsert upsert) {
        try {
            projectDao.insertProject(upsert);
        } catch (DaoException e) {
            log.error("添加任务失败，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    @Transactional
    public void deleteProject(String id) {
        try {
            projectDao.deleteProject(id);
        } catch (DaoException e) {
            log.error("删除任务失败，id={}", id,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public List<ProjectVO> listProjectVO(ProjectQuery query) {
        try {
            return projectDao.listProjectDO(query);
        } catch (DaoException e) {
            log.error("查询任务失败,query={}", query,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public ProjectVO getProjectVO(String id) {
        try {
            return projectDao.getProjectVO(id);
        } catch (DaoException e) {
            log.error("查询任务信息失败，id={}", id,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void updateProject(ProjectUpsert upsert) {
        try {
            projectDao.updateProject(upsert);
        }catch (Exception e){
            log.error("更新任务信息失败，upsert={}", upsert,e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }
}
