package com.github.martvey.cli.cmd;

import com.github.martvey.cli.jsr303.annotation.ScopeInUse;
import com.github.martvey.cli.constant.ScopeEnum;
import com.github.martvey.cli.entity.project.ProjectTable;
import com.github.martvey.cli.shell.provider.ProjectIdValueProvider;
import com.github.martvey.cli.service.ProjectService;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellCommandGroup;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.shell.table.Table;
import org.springframework.util.ObjectUtils;

import java.util.List;

import static com.github.martvey.cli.util.CatalogUtils.getDefaultSpaceId;
import static org.springframework.shell.standard.ShellOption.NULL;

@ShellComponent
@ShellCommandGroup("工程命令")
@RequiredArgsConstructor
public class ProjectCmd {
    private final ProjectService projectService;

   @ShellMethod(value = "工程列表", key = "list-project")
    public Table listProject(@ShellOption(value = "--space-id", help = "空间id", defaultValue = NULL)
                             String spaceId){
        if (ObjectUtils.isEmpty(spaceId)){
            spaceId = getDefaultSpaceId();
        }
        List<ProjectTable> projectTableList = projectService.listProject(spaceId);
        return TableUtils.buildTable(ProjectTable.class, () -> projectTableList);
    }

    @ShellMethod(value = "创建工程", key = "create-project")
    public Table createProject(@ShellOption(value = "--project-name", help = "工程名称")
                               String projectName,
                               @ShellOption(value = "--space-id", help = "空间id", defaultValue = NULL)
                               String spaceId){
        if (ObjectUtils.isEmpty(spaceId)){
            spaceId = getDefaultSpaceId();
        }
        projectService.createProject(spaceId, projectName);
        return TableUtils.execResult("创建工程成功");
    }

    @ShellMethod(value = "删除工程", key = "drop-project")
    public Table deleteProject(@ShellOption(value = "--project-id", help = "工程id", valueProvider = ProjectIdValueProvider.class)
                               @ScopeInUse(scopeType = ScopeEnum.PROJECT, message = "当前{}正被使用")
                               String projectId){
        projectService.deleteProject(projectId);
        return TableUtils.execResult("删除工程成功");
    }

    @ShellMethod(value = "重命名工程", key = "rename-project")
    public Table renameProject(@ShellOption(value = "--project-id", help = "工程id", valueProvider = ProjectIdValueProvider.class)
                               String projectId,
                               @ShellOption(value = "--project-name", help = "工程名称")
                               String projectName){
        projectService.renameProject(projectId, projectName);
        return TableUtils.execResult("重命名工程成功");
    }
}
