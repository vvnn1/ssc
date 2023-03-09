package com.github.martvey.cli.cmd;

import com.github.martvey.cli.jsr303.annotation.FileExist;
import com.github.martvey.cli.jsr303.annotation.ScopeInUse;
import com.github.martvey.cli.constant.ScopeEnum;
import com.github.martvey.cli.entity.app.AppTable;
import com.github.martvey.cli.entity.app.AppValidResultTable;
import com.github.martvey.cli.shell.provider.AppFileValueProvider;
import com.github.martvey.cli.shell.provider.AppIdValueProvider;
import com.github.martvey.cli.shell.provider.AppTypeValueProvider;
import com.github.martvey.cli.shell.provider.ProjectIdValueProvider;
import com.github.martvey.cli.service.AppService;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellCommandGroup;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.shell.table.Table;
import org.springframework.util.ObjectUtils;

import javax.validation.constraints.Pattern;
import java.io.File;
import java.util.Collections;
import java.util.List;

import static com.github.martvey.cli.util.CatalogUtils.getDefaultProjectId;
import static org.springframework.shell.standard.ShellOption.NULL;

@ShellComponent
@ShellCommandGroup("应用命令")
@RequiredArgsConstructor
public class AppCmd {
    private final AppService appService;

    @ShellMethod(value = "查询应用列表", key = "list-app")
    public Table listApp(@ShellOption(value = "--project-id", help = "工程id", valueProvider = ProjectIdValueProvider.class, defaultValue = NULL)
                         String projectId){
        if (ObjectUtils.isEmpty(projectId)){
            projectId = getDefaultProjectId();
        }
        List<AppTable> tableList = appService.listApp(projectId);
        return TableUtils.buildTable(AppTable.class, () -> tableList);
    }

    @ShellMethod(value = "创建应用", key = "create-app")
    public Table createApp(@ShellOption(value = "--app-name", help = "应用名称")
                           String appName,
                           @ShellOption(value = "--project-id", help = "工程id", defaultValue = NULL)
                           String projectId,
                           @ShellOption(value = "--app-type", help = "应用类型", valueProvider = AppTypeValueProvider.class)
                           @Pattern(regexp = "JAR|SQL", message = "appType需为JAR、SQL之一")
                           String appType,
                           @ShellOption(value = "--content-file", help = "文件路径",valueProvider = AppFileValueProvider.class, defaultValue = NULL)
                           @FileExist(fileSuffix = {".sql",".properties",".yaml",".yml"}, message = "应用类型文件错误，仅支持{supportFile}")
                           File contentFile) {
        if (ObjectUtils.isEmpty(projectId)){
            projectId = getDefaultProjectId();
        }
        appService.createApp(appName, appType, contentFile, projectId);
        return TableUtils.execResult("创建成功");
    }

    @ShellMethod(value = "更新应用", key = "update-app")
    public Table updateAppContent(@ShellOption(value = "--app-id", help = "应用id", valueProvider = AppIdValueProvider.class)
                                  String appId,
                                  @ShellOption(value = "--app-file", help = "应用文件", valueProvider = AppFileValueProvider.class, defaultValue = NULL)
                                  File appFile){
        appService.updateAppContent(appId, appFile);
        return TableUtils.execResult("更新应用成功");
    }

    @ShellMethod(value = "删除应用", key = "drop-app")
    public Table deleteApp(
                    @ShellOption(value = "--app-id", help = "应用id", valueProvider = AppIdValueProvider.class)
                    @ScopeInUse(scopeType = ScopeEnum.APPLICATION, message = "当前{scope}正被使用")
                    String appId){
        appService.deleteApp(appId);
        return TableUtils.execResult("删除应用成功");
    }

    @ShellMethod(value = "预览应用", key = "cat-app")
    public void catApp(@ShellOption(value = "--app-id", help = "应用id", valueProvider = AppIdValueProvider.class)
                        String appId){
        appService.catApp(appId);
    }

    @ShellMethod(value = "导出应用", key = "export-app")
    public Table exportApp(@ShellOption(value = "--app-id", help = "应用id", valueProvider = AppIdValueProvider.class)
                           String appId){
        return TableUtils.singleTable("导出成功", appService.exportApp(appId));
    }

    @ShellMethod(value = "校验应用", key = "valid-app")
    public Table validateApp(@ShellOption(value = "--app-id", help = "应用id", valueProvider = AppIdValueProvider.class)
                             String appId){
        AppValidResultTable appValidResultTable = appService.validateApp(appId);
        if (appValidResultTable == null){
            return TableUtils.execResult("无异常");
        }
        return TableUtils.buildTable(AppValidResultTable.class, () -> Collections.singletonList(appValidResultTable));
    }

    @ShellMethod(value = "调试应用", key = "debug-app")
    public void debugApp(@ShellOption(value = "--app-id", help = "应用id", valueProvider = AppIdValueProvider.class, defaultValue = NULL)
                         String appId){
        appService.debugApp(appId);
    }
}
