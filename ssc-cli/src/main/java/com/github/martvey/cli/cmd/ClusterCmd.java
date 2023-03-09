package com.github.martvey.cli.cmd;

import com.github.martvey.cli.entity.cluster.ClusterTable;
import com.github.martvey.cli.service.ClusterService;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellCommandGroup;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.shell.table.Table;

@ShellComponent
@ShellCommandGroup("集群命令")
@RequiredArgsConstructor
public class ClusterCmd {
    private final ClusterService clusterService;

    @ShellMethod(key = "create-cluster", value = "创建集群")
    public Table createCluster(@ShellOption(value = {"--cluster-name"}, help = "集群名称") String clusterName,
                               @ShellOption(value = {"--jm-memory"}, help = "jm大小") String jmMemory,
                               @ShellOption(value = {"--tm-memory"}, help = "tm大小") String tmMemory,
                               @ShellOption(value = {"--slots"}, help = "槽数") Integer slots){
        clusterService.createCluster(clusterName, jmMemory, tmMemory, slots);
        return TableUtils.execResult("创建集群成功");
    }

    @ShellMethod(key = "drop-cluster", value = "删除集群")
    public Table dropCluster(@ShellOption(value = "--cluster-id", help = "集群id") String id){
        clusterService.deleteCluster(id);
        return TableUtils.execResult("删除集群成功");
    }

    @ShellMethod(key = "run-cluster", value = "运行集群")
    public Table runCluster(@ShellOption(value = "--cluster-id", help = "集群id") String id){
        clusterService.runCluster(id);
        return TableUtils.execResult("运行集群成功");
    }

    @ShellMethod(key = "cancel-cluster", value = "关闭集群")
    public Table cancelCluster(@ShellOption(value = "--cluster-id", help = "集群id") String id){
        clusterService.cancelCluster(id);
        return TableUtils.execResult("关闭集群成功");
    }

    @ShellMethod(key = "list-cluster", value = "查询集群")
    public Table listCluster(){
        return TableUtils.buildTable(ClusterTable.class, clusterService::listCluster);
    }
}
