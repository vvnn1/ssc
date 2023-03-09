package com.github.martvey.ssc.mapper.local;


import com.github.martvey.ssc.entity.project.ProjectQuery;
import com.github.martvey.ssc.entity.project.ProjectUpsert;
import com.github.martvey.ssc.entity.project.ProjectVO;

import java.util.List;

public interface ProjectMapper {
    void insertProject(ProjectUpsert upsert);
    void deleteProject(String id);
    List<ProjectVO> listProjectDO(ProjectQuery query);
    ProjectVO getProjectVO(String id);

    void updateProject(ProjectUpsert upsert);
}
