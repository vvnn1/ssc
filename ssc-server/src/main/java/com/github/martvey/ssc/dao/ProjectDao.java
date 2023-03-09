package com.github.martvey.ssc.dao;


import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.entity.project.ProjectQuery;
import com.github.martvey.ssc.entity.project.ProjectUpsert;
import com.github.martvey.ssc.entity.project.ProjectVO;

import java.util.List;

public interface ProjectDao {
    void insertProject(ProjectUpsert upsert) throws DaoException;
    void deleteProject(String id) throws DaoException;
    List<ProjectVO> listProjectDO(ProjectQuery query) throws DaoException;

    ProjectVO getProjectVO(String id) throws DaoException;

    void updateProject(ProjectUpsert upsert);
}
