package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.constant.ScopeEnum;
import com.github.martvey.cli.entity.app.AppDetail;
import com.github.martvey.cli.entity.project.ProjectDetail;
import com.github.martvey.cli.entity.space.SpaceDetail;
import com.github.martvey.cli.net.AppApi;
import com.github.martvey.cli.net.ProjectApi;
import com.github.martvey.cli.net.SpaceApi;
import com.github.martvey.cli.service.CatalogManager;
import com.github.martvey.cli.shell.table.SingleRowTableModel;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.shell.table.Table;
import org.springframework.shell.table.TableBuilder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.ObjectUtils;

@Service
@RequiredArgsConstructor
@Slf4j
public class CatalogManagerImpl implements CatalogManager {
    private final SpaceApi spaceApi;
    private final ProjectApi projectApi;
    private final AppApi appApi;
    public SpaceDetail currentSpace;
    public ProjectDetail currentProject;
    public AppDetail currentApp;


    @Override
    public void useSpace(String id) {
        if (ObjectUtils.isEmpty(id)){
            currentSpace = null;
            return;
        }
        SpaceDetail space = spaceApi.getSpace(id);

        Assert.notNull(space, "空间不存在");

        currentSpace = space;
        currentProject = null;
        currentApp = null;
    }

    @Override
    public void useProject(String id) {
        if (ObjectUtils.isEmpty(id)){
            currentProject = null;
            return;
        }
        ProjectDetail projectDetail;
        projectDetail = projectApi.getProject(id);

        Assert.notNull(projectDetail, "工程不存在");

        currentProject = projectDetail;
        currentApp = null;
    }

    @Override
    public void useApp(String id) {
        if (ObjectUtils.isEmpty(id)){
            currentApp = null;
            return;
        }
        AppDetail appDetail = appApi.getApp(id);
        Assert.notNull(appDetail, "应用不存在");
        currentApp = appDetail;
    }

    @Override
    public Table currentUsed() {
        SingleRowTableModel.SingleRowTableModelBuilder builder = SingleRowTableModel.builder();

        String currentSpaceName = getCurrentSpaceName();
        if (ObjectUtils.isEmpty(currentSpaceName)){
            return TableUtils.singleTable("空间", "            ");
        }
        builder.addTitle("空间").addContent(currentSpaceName);

        String currentProjectName = getCurrentProjectName();
        if (ObjectUtils.isEmpty(currentProjectName)){
            return TableUtils.addBaseStyle(new TableBuilder(builder.build()));
        }
        builder.addTitle("工程").addContent(currentProjectName);

        String currentAppName = getCurrentAppName();
        if (ObjectUtils.isEmpty(currentAppName)){
            return TableUtils.addBaseStyle(new TableBuilder(builder.build()));
        }
        builder.addTitle("应用").addContent(currentAppName);

        return TableUtils.addBaseStyle(new TableBuilder(builder.build()));
    }

    @Override
    public String getCurrentId(ScopeEnum scopeType) {
        if (scopeType == ScopeEnum.SPACE){
            return getCurrentSpaceId();
        }
        if (scopeType == ScopeEnum.PROJECT){
            return getCurrentProjectId();
        }
        if (scopeType == ScopeEnum.APPLICATION){
            return getCurrentAppId();
        }
        return null;
    }

    @Override
    public String getCurrentName(ScopeEnum scopeType) {
        if (scopeType == ScopeEnum.SPACE){
            return getCurrentSpaceName();
        }
        if (scopeType == ScopeEnum.PROJECT){
            return getCurrentProjectName();
        }
        if (scopeType == ScopeEnum.APPLICATION){
            return getCurrentAppName();
        }
        return null;
    }

    @Override
    public String getCurrentSpaceId() {
        return currentSpace == null ? null : currentSpace.getId();
    }

    @Override
    public String getCurrentProjectId() {
        return currentProject == null ? null : currentProject.getId();
    }

    @Override
    public String getCurrentAppId() {
        return currentApp == null ? null : currentApp.getId();
    }

    @Override
    public String getCurrentSpaceName() {
        return currentSpace == null ? null : currentSpace.getSpaceName();
    }

    @Override
    public String getCurrentProjectName() {
        return currentProject == null ? null : currentProject.getProjectName();
    }

    @Override
    public String getCurrentAppName() {
        return currentApp == null ? null : currentApp.getAppName();
    }

    @Override
    public Boolean hadUseSpace() {
        return currentSpace != null;
    }

    @Override
    public Boolean hadUseProject() {
        return currentProject != null;
    }

    @Override
    public Boolean hadUseApp() {
        return currentApp != null;
    }
}
