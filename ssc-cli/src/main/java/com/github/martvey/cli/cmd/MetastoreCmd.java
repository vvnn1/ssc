package com.github.martvey.cli.cmd;

import com.github.martvey.cli.jsr303.annotation.FileExist;
import com.github.martvey.cli.constant.MetastoreEnum;
import com.github.martvey.cli.entity.metastore.FunctionTable;
import com.github.martvey.cli.entity.metastore.MetastoreTable;
import com.github.martvey.cli.shell.provider.MetastoreIdValueProvider;
import com.github.martvey.cli.shell.provider.MetastoreTypeValueProvider;
import com.github.martvey.cli.shell.provider.YamlFileValueProvider;
import com.github.martvey.cli.service.CatalogManager;
import com.github.martvey.cli.service.MetastoreService;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellCommandGroup;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.shell.table.Table;
import org.springframework.util.ObjectUtils;

import javax.validation.constraints.NotBlank;
import java.io.File;
import java.util.Collections;
import java.util.List;

import static com.github.martvey.cli.util.CatalogUtils.doInMinScope;
import static org.springframework.shell.standard.ShellOption.NULL;

@ShellComponent
@ShellCommandGroup("函数命令")
@RequiredArgsConstructor
public class MetastoreCmd {
    private final MetastoreService metastoreService;
    private final CatalogManager catalogManager;

    @ShellMethod(value = "预览元数据", key = "cat-metastore")
    public void catMetastore(@ShellOption(value = "--metastore-id", help = "函数id", valueProvider = MetastoreIdValueProvider.class)
                             @NotBlank(message = "--metastore-id 不能为空")
                             String id,
                             @ShellOption(value = "--metastore-type", valueProvider = MetastoreTypeValueProvider.class)
                             MetastoreEnum metastoreType){
        metastoreService.printMetastore(metastoreType, id);
    }

    @ShellMethod(value = "更新元数据", key = "update-metastore")
    public Table updateMetastore(
                            @ShellOption(value = "--metastore-id", help = "元数据id")
                            String id,
                            @FileExist(fileSuffix = {".yaml",".yml"}, message = "需指定yaml，yml类型文件")
                            @ShellOption(value = "--yaml-file", help = "yaml文件路径", valueProvider = YamlFileValueProvider.class, defaultValue = NULL)
                            File yamlFile,
                            @ShellOption(value = "--metastore-type", valueProvider = MetastoreTypeValueProvider.class)
                            MetastoreEnum metastoreType,
                            @ShellOption(value = "--scope-id", help = "作用范围id", defaultValue = NULL)
                            String spaceId,
                            @ShellOption(value = "--project-id", help = "作用范围id", defaultValue = NULL)
                            String projectId,
                            @ShellOption(value = "--application-id", help = "作用范围id", defaultValue = NULL)
                            String applicationId){
        doInMinScope(spaceId, projectId, applicationId, (scopeEnum, s) -> metastoreService.updateMetastore(id, metastoreType, yamlFile, scopeEnum.name(), s));
        return TableUtils.execResult("更新元数据成功");
    }

    @ShellMethod(value = "添加元数据", key = "create-metastore")
    public Table addMetastore(@FileExist(fileSuffix = {".yaml",".yml"}, message = "需指定yaml，yml类型文件")
                             @ShellOption(value = "--yaml-file", help = "yaml文件路径", valueProvider = YamlFileValueProvider.class, defaultValue = NULL)
                             File yamlFile,
                             @ShellOption(value = "--metastore-type", valueProvider = MetastoreTypeValueProvider.class)
                             MetastoreEnum metastoreType,
                             @ShellOption(value = "--scope-id", help = "作用范围id", defaultValue = NULL)
                             String spaceId,
                             @ShellOption(value = "--project-id", help = "作用范围id", defaultValue = NULL)
                             String projectId,
                             @ShellOption(value = "--application-id", help = "作用范围id", defaultValue = NULL)
                             String applicationId){
        doInMinScope(spaceId, projectId, applicationId, (scopeEnum, s) -> metastoreService.createMetastore(metastoreType, yamlFile, scopeEnum.name(), s));
        return TableUtils.execResult("添加元数据成功");
    }

    @ShellMethod(value = "删除元数据", key = "drop-metastore")
    public Table deleteMetastore(@ShellOption(value = "--metastore-id", help = "函数id", valueProvider = MetastoreIdValueProvider.class)
                                @NotBlank(message = "--metastore-id 不能为空")
                                String id,
                                @ShellOption(value = "--metastore-type", valueProvider = MetastoreTypeValueProvider.class)
                                MetastoreEnum metastoreType){
        metastoreService.deleteMetastore(metastoreType, id);
        return TableUtils.execResult("删除元数据成功");
    }

    @ShellMethod(value = "查询元数据", key = "list-metastore")
    public Table listMetastore(@ShellOption(value = "--metastore-type", valueProvider = MetastoreTypeValueProvider.class)
                              MetastoreEnum metastoreType,
                              @ShellOption(value = "--space-id", defaultValue = NULL)
                              String spaceId,
                              @ShellOption(value = "--project-id", defaultValue = NULL)
                              String projectId,
                              @ShellOption(value = "--app-id", defaultValue = NULL)
                              String appId){
        if (ObjectUtils.isEmpty(spaceId) && ObjectUtils.isEmpty(projectId) && ObjectUtils.isEmpty(appId)){
            spaceId = catalogManager.getCurrentSpaceId();
            projectId = catalogManager.getCurrentProjectId();
            appId = catalogManager.getCurrentAppId();
        }

        if (ObjectUtils.isEmpty(spaceId) && ObjectUtils.isEmpty(projectId) && ObjectUtils.isEmpty(appId)) {
            return TableUtils.buildTable(FunctionTable.class, Collections::emptyList);
        }

        List<? extends MetastoreTable> metastoreTableList = metastoreService.listMetastore(metastoreType, spaceId, projectId, appId);
        return TableUtils.buildTable(metastoreType.getMetastoreClazz(), () -> metastoreTableList);
    }
}
