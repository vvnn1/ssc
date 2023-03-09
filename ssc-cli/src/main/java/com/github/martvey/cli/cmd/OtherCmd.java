package com.github.martvey.cli.cmd;

import com.github.martvey.cli.entity.app.AppTable;
import com.github.martvey.cli.entity.event.ProvideChangeEvent;
import com.github.martvey.cli.entity.project.ProjectTable;
import com.github.martvey.cli.shell.provider.AppIdValueProvider;
import com.github.martvey.cli.shell.provider.ProjectIdValueProvider;
import com.github.martvey.cli.shell.provider.SpaceIdValueProvider;
import com.github.martvey.cli.service.AppService;
import com.github.martvey.cli.service.CatalogManager;
import com.github.martvey.cli.service.ProjectService;
import com.github.martvey.cli.service.TreeService;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import org.jline.reader.LineReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.shell.Availability;
import org.springframework.shell.standard.*;
import org.springframework.shell.table.Table;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.List;

@ShellComponent
@ShellCommandGroup("其他命令")
@RequiredArgsConstructor
public class OtherCmd {
    private LineReader lineReader;
    private final ApplicationContext applicationContext;
    private final CatalogManager catalogManager;
    private final ProjectService projectService;
    private final AppService appService;
    private final TreeService treeService;

    @ShellMethod(value = "用户登录", key = "login")
    public Table login(@ShellOption(value = "--username",help = "用户名称")
                       String username,
                       @ShellOption(value = "--password",help = "用户密码")
                       String password){

        if (ObjectUtils.isEmpty(password)){
            password = lineReader.readLine("请输入密码:", '*');
        }
        System.out.println("用户名：" + username + " 用户密码：" + password);
        applicationContext.publishEvent(new ProvideChangeEvent(username));
        return TableUtils.execResult("登录成功");
    }


    @Autowired
    @Lazy
    public void setLineReader(LineReader lineReader) {
        this.lineReader = lineReader;
    }


    @ShellMethod(value = "指定空间", key = "use-space")
    public Table useSpace(@ShellOption(value = "--space-id",valueProvider = SpaceIdValueProvider.class)
                          String spaceId){
        catalogManager.useSpace(spaceId);
        List<ProjectTable> projectTableList = projectService.listProject(spaceId);
        if (CollectionUtils.isEmpty(projectTableList)){
            return TableUtils.execResult("指定空间成功");
        }
        return TableUtils.buildTable(ProjectTable.class, () -> projectTableList);
    }

    @ShellMethod(value = "指定工程", key = "use-project")
    @ShellMethodAvailability("isUseProjectAvailability")
    public Table useProject(@ShellOption(value = "--project-id", valueProvider = ProjectIdValueProvider.class)
                            String projectId){
        catalogManager.useProject(projectId);
        List<AppTable> tableList = appService.listApp(projectId);
        if (CollectionUtils.isEmpty(tableList)){
            return TableUtils.execResult("指定工程成功");
        }
        return TableUtils.buildTable(AppTable.class, () -> tableList);
    }

    @ShellMethod(value = "指定应用", key = "use-app")
    @ShellMethodAvailability("isUseAppAvailability")
    public Table useApp(@ShellOption(value = "--app-id", valueProvider = AppIdValueProvider.class)
                        String appId){
        catalogManager.useApp(appId);
        return TableUtils.execResult("指定应用成功");
    }

    @ShellMethod(value = "上一级", key = "..")
    public Table cdParent(){
        if (catalogManager.hadUseApp()) {
            catalogManager.useApp(null);
        } else if (catalogManager.hadUseProject()){
            catalogManager.useProject(null);
        } else if (catalogManager.hadUseSpace()){
            catalogManager.useSpace(null);
        }
        return showUsed();
    }

    @ShellMethod(value = "查询当前指定信息", key = "pwd")
    public Table showUsed(){
        return catalogManager.currentUsed();
    }

    @ShellMethod(value = "打印文件树", key = "print-tree")
    public void printTree(){
        treeService.printTree();
    }

    public Availability isUseAppAvailability() {
        return catalogManager.hadUseProject() ? Availability.available() : Availability.unavailable("未指定工程");
    }

    public Availability isUseProjectAvailability(){
        return catalogManager.hadUseSpace() ? Availability.available() : Availability.unavailable("未指定空间");
    }
}
