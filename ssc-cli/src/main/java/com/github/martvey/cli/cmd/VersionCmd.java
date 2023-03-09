package com.github.martvey.cli.cmd;

import com.github.martvey.cli.entity.version.VersionTable;
import com.github.martvey.cli.shell.provider.AppIdValueProvider;
import com.github.martvey.cli.shell.provider.VersionIdValueProvider;
import com.github.martvey.cli.service.VersionService;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellCommandGroup;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.shell.table.Table;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.List;

import static com.github.martvey.cli.util.CatalogUtils.getDefaultAppId;
import static org.springframework.shell.standard.ShellOption.NULL;

@ShellComponent
@ShellCommandGroup("版本命令")
@RequiredArgsConstructor
public class VersionCmd {
    private final VersionService versionService;

    @ShellMethod(value = "创建版本", key = "create-version")
    public Table createVersion(@ShellOption(value = "--app-id", help = "应用id", valueProvider = AppIdValueProvider.class, defaultValue = NULL)
                               String appId,
                               @ShellOption(value = "--version", help = "发布的版本号")
                               String versionName){
        if (ObjectUtils.isEmpty(appId)){
            appId = getDefaultAppId();
        }
        versionService.createVersion(appId, versionName);
        return TableUtils.execResult("创建版本成功");
    }

    @ShellMethod(value = "查询版本列表", key = "list-version")
    public Table listVersion(@ShellOption(value = "--app-id", help = "应用id", valueProvider = AppIdValueProvider.class, defaultValue = NULL)
                             String appId){
        if (ObjectUtils.isEmpty(appId)){
            appId = getDefaultAppId();
        }
        List<VersionTable> versionTableList = versionService.listVersion(appId);
        if (CollectionUtils.isEmpty(versionTableList)){
            return TableUtils.execResult("无版本信息");
        }
        return TableUtils.buildTable(VersionTable.class, () -> versionTableList);
    }

    @ShellMethod(value = "删除版本", key = "drop-version")
    public Table dropVersion(@ShellOption(value = "--version-id", help = "发布的版本id", valueProvider = VersionIdValueProvider.class)
                             String versionId){
        versionService.dropVersion(versionId);
        return TableUtils.execResult("删除版本成功");
    }
}
