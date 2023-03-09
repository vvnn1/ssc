package com.github.martvey.cli.cmd;

import com.github.martvey.cli.constant.GraphFlowEnum;
import com.github.martvey.cli.entity.job.JobTable;
import com.github.martvey.cli.shell.provider.JobIdValueProvider;
import com.github.martvey.cli.shell.provider.VersionIdValueProvider;
import com.github.martvey.cli.shell.provider.YarnDeploymentTargetProvider;
import com.github.martvey.cli.service.JobService;
import com.github.martvey.cli.util.TableUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellCommandGroup;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.shell.table.Table;

import javax.validation.constraints.NotBlank;
import java.util.List;

import static org.springframework.shell.standard.ShellOption.NULL;

@ShellComponent
@ShellCommandGroup("任务命令")
@RequiredArgsConstructor
public class JobCmd {
    private final JobService jobService;

    @ShellMethod(value = "创建job", key = "create-job")
    public Table createJob(@NotBlank(message = "--versionId不能为空")
                           @ShellOption(value = "--version-id", help = "发布的版本号", valueProvider = VersionIdValueProvider.class)
                                   String versionId,
                           @NotBlank(message = "--job-name不能为空")
                           @ShellOption(value = "--job-name", help = "任务名称")
                                   String jobName,
                           @ShellOption(value = "--target", help = "发布模式", valueProvider = YarnDeploymentTargetProvider.class)
                                   String target,
                           @ShellOption(value = "--cluster-id", help = "集群id", defaultValue = NULL)
                                   String clusterId) {
        jobService.createJob(versionId, jobName, clusterId, target);
        return TableUtils.execResult("创建工程成功");
    }

    @ShellMethod(value = "删除job", key = "drop-job")
    public Table dropJob(@ShellOption(value = "--job-id", help = "任务id", valueProvider = JobIdValueProvider.class)
                                 String jobId) {
        jobService.dropJob(jobId);
        return TableUtils.execResult("删除工程成功");
    }

    @ShellMethod(value = "查询job", key = "list-job")
    public Table listJob() {
        List<JobTable> jobTableList = jobService.listJobTable();
        return TableUtils.buildTable(JobTable.class, () -> jobTableList);
    }

    @ShellMethod(value = "运行job", key = "run-job")
    public Table runJob(@ShellOption(value = "--job-id", help = "任务id", valueProvider = JobIdValueProvider.class)
                                String jobId) {
        jobService.runJob(jobId);
        return TableUtils.execResult("运行job成功");
    }

    @ShellMethod(value = "重新运行", key = "rerun-job")
    public Table reRunJob(@ShellOption(value = "--job-id", help = "任务id", valueProvider = JobIdValueProvider.class)
                                  String jobId) {
        jobService.reRunJob(jobId);
        return TableUtils.execResult("重新运行成功");
    }

    @ShellMethod(value = "暂停job", key = "stop-job")
    public Table stopJob(@ShellOption(value = "--job-id", help = "任务id", valueProvider = JobIdValueProvider.class)
                                 String jobId) {
        jobService.stopJob(jobId);
        return TableUtils.execResult("暂停运行成功");
    }

    @ShellMethod(value = "查看job执行计划", key = "show-plan")
    public void showPlan(@ShellOption(value = "--job-id", help = "任务id", valueProvider = JobIdValueProvider.class)
                                 String jobId,
                         @ShellOption(value = "--flow", help = "图形流向", defaultValue = NULL)
                                 GraphFlowEnum  flow) {
        jobService.showPlan(jobId, flow);
    }
}
