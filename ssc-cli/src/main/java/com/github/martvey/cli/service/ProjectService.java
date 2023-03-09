package com.github.martvey.cli.service;

import com.github.martvey.cli.entity.project.ProjectTable;

import java.util.List;

public interface ProjectService {
    List<ProjectTable> listProject(String spaceId);
    void createProject(String spaceId, String projectName);
    void deleteProject(String projectId);

    void renameProject(String id, String projectName);
}
