package com.github.martvey.cli.cmd;

import com.github.martvey.cli.jsr303.annotation.ScopeInUse;
import com.github.martvey.cli.constant.ScopeEnum;
import com.github.martvey.cli.entity.space.SpaceTable;
import com.github.martvey.cli.shell.provider.SpaceIdValueProvider;
import com.github.martvey.cli.service.SpaceService;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellCommandGroup;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.shell.table.Table;
import org.springframework.util.CollectionUtils;

import java.util.List;

@ShellComponent
@ShellCommandGroup("空间命令")
@RequiredArgsConstructor
public class SpaceCmd {
    private final SpaceService spaceService;

    @ShellMethod(value = "创建空间", key = "create-space")
    public Table createSpace(@ShellOption(value = "--space-name")
                             String spaceName){
        spaceService.createSpace(spaceName);
        return TableUtils.execResult("创建空间成功");
    }

    @ShellMethod(value = "删除空间", key = "drop-space")
    public Table dropSpace(@ShellOption(value = "--space-id",help = "空间id",valueProvider = SpaceIdValueProvider.class)
                           @ScopeInUse(scopeType = ScopeEnum.SPACE, message = "当前{}正被使用")
                           String spaceId){
        spaceService.dropSpace(spaceId);
        return TableUtils.execResult("删除空间成功");
    }

    @ShellMethod(value = "重命名空间", key = "rename-space")
    public Table renameSpace(@ShellOption(value = "--space-id", help = "空间id", valueProvider = SpaceIdValueProvider.class) String spaceId,
                             @ShellOption(value = "--space-name", help = "新空间名称")
                             String spaceName){
        spaceService.renameSpace(spaceId, spaceName);
        return TableUtils.execResult("重命名成功");
    }

    @ShellMethod(value = "查询空间列表", key = "list-space")
    public Table listSpace(){
        List<SpaceTable> spaceTableList = spaceService.listSpace();
        if (CollectionUtils.isEmpty(spaceTableList)){
            return TableUtils.execResult("无空间信息");
        }
        return TableUtils.buildTable(SpaceTable.class, () -> spaceTableList);
    }
}
