package com.github.martvey.cli.cmd;

import com.github.martvey.cli.jsr303.annotation.FileExist;
import com.github.martvey.cli.entity.jar.JarTable;
import com.github.martvey.cli.shell.provider.JarFileValueProvider;
import com.github.martvey.cli.shell.provider.JarIdValueProvider;
import com.github.martvey.cli.service.CatalogManager;
import com.github.martvey.cli.service.JarService;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellCommandGroup;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.shell.table.Table;
import org.springframework.util.ObjectUtils;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.File;
import java.util.List;

import static com.github.martvey.cli.util.CatalogUtils.doInMinScope;
import static org.springframework.shell.standard.ShellOption.NULL;

@ShellComponent
@ShellCommandGroup("JAR包命令")
@RequiredArgsConstructor
public class JarCmd {
    private final JarService jarService;
    private final CatalogManager catalogManager;

    @ShellMethod(value = "添加jar包", key = "upload-jar")
    public Table addJar(@ShellOption(value = "--jar-file", help = "jar包路径", valueProvider = JarFileValueProvider.class)
                        @NotNull(message = "jar包路径不能为空")
                        @FileExist(fileSuffix = ".jar", message = "仅支持{supportFile}类型文件")
                        File jarFile,
                        @ShellOption(value = "--space-id", help = "空间id", defaultValue = NULL)
                        String spaceId,
                        @ShellOption(value = "--project-id", help = "工程id", defaultValue = NULL)
                        String projectId,
                        @ShellOption(value = "--app-id", help = "项目id", defaultValue = NULL)
                        String applicationId){
        doInMinScope(spaceId, projectId, applicationId, (scopeEnum, s) -> jarService.uploadJar(jarFile, scopeEnum.name(), s));
        return TableUtils.execResult("上传成功");
    }

    @ShellMethod(value = "删除jar包", key = "drop-jar")
    public Table deleteJar(
                    @ShellOption(value = "--jar-id", help = "jar包id", valueProvider = JarIdValueProvider.class)
                    @NotBlank(message = "-jid参数不能为空")
                    String jarId){
        jarService.deleteJar(jarId);
        return TableUtils.execResult("删除jar成功");
    }

    @ShellMethod(value = "查询jar包", key = "list-jar")
    public Table listJar(@ShellOption(value = "--space-id", help = "空间id", defaultValue = NULL)
                         String spaceId,
                         @ShellOption(value = "--project-id", help = "工程id", defaultValue = NULL)
                         String projectId,
                         @ShellOption(value = "--app-id", help = "项目id", defaultValue = NULL)
                         String appId){
        if (ObjectUtils.isEmpty(spaceId) && ObjectUtils.isEmpty(projectId) && ObjectUtils.isEmpty(appId)){
            spaceId = catalogManager.getCurrentSpaceId();
            projectId = catalogManager.getCurrentProjectId();
            appId = catalogManager.getCurrentAppId();
        }

        List<JarTable> jarTableList = jarService.listJar(spaceId, projectId, appId);
        return TableUtils.buildTable(JarTable.class, () -> jarTableList);
    }
}
