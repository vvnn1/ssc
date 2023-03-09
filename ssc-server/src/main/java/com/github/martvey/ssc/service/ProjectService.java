package com.github.martvey.ssc.service;



import com.github.martvey.ssc.entity.project.ProjectQuery;
import com.github.martvey.ssc.entity.project.ProjectUpsert;
import com.github.martvey.ssc.entity.project.ProjectVO;

import java.util.List;

public interface ProjectService {
    void insertProject(ProjectUpsert upsert);
    void deleteProject(String id);
    List<ProjectVO> listProjectVO(ProjectQuery query);
    ProjectVO getProjectVO(String id);
    void updateProject(ProjectUpsert upsert);
}
