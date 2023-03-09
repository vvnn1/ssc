package com.github.martvey.ssc.dao.impl;


import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.dao.ProjectDao;
import com.github.martvey.ssc.entity.project.ProjectQuery;
import com.github.martvey.ssc.entity.project.ProjectUpsert;
import com.github.martvey.ssc.entity.project.ProjectVO;
import com.github.martvey.ssc.mapper.local.ProjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ProjectDaoImpl implements ProjectDao {
    private final ProjectMapper projectMapper;

    @Override
    public void insertProject(ProjectUpsert upsert) {
        try {
            projectMapper.insertProject(upsert);
        } catch (Exception e) {
            throw new DaoException("数据库插入任务错误",e);
        }
    }

    @Override
    public void deleteProject(String id) throws DaoException {
        try {
            projectMapper.deleteProject(id);
        } catch (Exception e) {
            throw new DaoException("数据库删除工程错误",e);
        }
    }

    @Override
    public List<ProjectVO> listProjectDO(ProjectQuery query) throws DaoException {
        try {
            return projectMapper.listProjectDO(query);
        } catch (Exception e) {
            throw new DaoException("数据库查询工程错误",e);
        }
    }

    @Override
    public ProjectVO getProjectVO(String id) throws DaoException {
        try {
            return projectMapper.getProjectVO(id);
        } catch (Exception e) {
            throw new DaoException("数据库查询工程错误",e);
        }
    }

    @Override
    public void updateProject(ProjectUpsert upsert) {
        try {
            projectMapper.updateProject(upsert);
        }catch (Exception e){
            throw new DaoException("数据库更新工程错误", e);
        }
    }
}
