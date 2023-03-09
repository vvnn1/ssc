package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.entity.project.ProjectTable;
import com.github.martvey.cli.entity.request.PProjectRequest;
import com.github.martvey.cli.entity.request.UProjectRequest;
import com.github.martvey.cli.net.ProjectApi;
import com.github.martvey.cli.service.CatalogManager;
import com.github.martvey.cli.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    private final ProjectApi projectApi;

    public ProjectServiceImpl(ProjectApi projectApi) {
        this.projectApi = projectApi;
    }

    @Override
    public List<ProjectTable> listProject(String spaceId) {
        return projectApi.listProject(spaceId);
    }

    @Override
    public void createProject(String spaceId, String projectName) {
        PProjectRequest project = new PProjectRequest(spaceId, projectName);
        projectApi.postProject(project);
    }

    @Override
    public void deleteProject(String projectId) {
        projectApi.deleteProject(projectId);
    }

    @Override
    public void renameProject(String id, String projectName) {
        projectApi.renameProject(new UProjectRequest(id, projectName));
    }
}
