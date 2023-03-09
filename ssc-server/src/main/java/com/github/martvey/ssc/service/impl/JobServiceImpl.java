package com.github.martvey.ssc.service.impl;


import com.github.martvey.ssc.constant.ClusterStatusEnum;
import com.github.martvey.ssc.constant.JobStatusEnum;
import com.github.martvey.ssc.dao.ClusterDao;
import com.github.martvey.ssc.dao.JobDao;
import com.github.martvey.ssc.dao.VersionDao;
import com.github.martvey.ssc.entity.cluster.ClusterDetail;
import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.entity.job.*;
import com.github.martvey.ssc.entity.version.VersionDO;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.exception.SscClientException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.JobService;
import com.github.martvey.ssc.util.ClusterClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.common.JobID;
import org.apache.flink.client.cli.ClientOptions;
import org.apache.flink.client.program.PackagedProgram;
import org.apache.flink.client.program.PackagedProgramUtils;
import org.apache.flink.client.program.ProgramInvocationException;
import org.apache.flink.configuration.*;
import org.apache.flink.core.fs.FileSystem;
import org.apache.flink.core.fs.Path;
import org.apache.flink.runtime.jobgraph.JobGraph;
import org.apache.flink.runtime.jobgraph.jsonplan.JsonPlanGenerator;
import org.apache.flink.util.FileUtils;
import org.apache.flink.util.FlinkRuntimeException;
import org.apache.flink.util.Preconditions;
import org.apache.flink.yarn.configuration.YarnDeploymentTarget;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

import static com.github.martvey.ssc.util.ClusterClientUtil.runClusterClientAction;
import static com.github.martvey.ssc.util.PipelineJarUtil.downloadJar;
import static org.apache.flink.client.deployment.application.ApplicationConfiguration.APPLICATION_ARGS;


@Service
@Slf4j
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobDao jobDao;
    private final VersionDao versionDao;
    private final ClusterDao clusterDao;
    private ExecutorService executorService;

    @Override
    public void createJob(JobInsert insert) {
        try {
            String versionId = insert.getVersionId();
            VersionDO versionDO = versionDao.getVersionDOById(versionId);

            Preconditions.checkNotNull(versionDO, "不存在此版本");

            Configuration mergedConfiguration = new Configuration(versionDO.getConfiguration());
            enrichDeploymentConfiguration(insert, mergedConfiguration);

            insert.setConfiguration(mergedConfiguration);

            resolveJobPlan(insert);

            jobDao.insertJob(insert);
        } catch (DaoException e) {
            log.error("创建job任务错误", e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public JobDetail getJobDetail(String id) {
        try {
            return jobDao.getJobDetail(id);
        } catch (DaoException e) {
            log.error("查询job详情失败，id={}", id, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void updateJobStatus(JobStatusUpdate update) {
        try {
            jobDao.updateJobStatus(update);
        } catch (DaoException e) {
            log.error("更新job状态失败，update={}", update, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void deleteJob(String id) {
        try {
            JobDetail jobDetail = jobDao.getJobDetail(id);
            JobStatusEnum jobStatus = jobDetail.getJobStatus();
            boolean canDeleted = jobStatus != JobStatusEnum.RUNNING && jobStatus != JobStatusEnum.UPDATING;
            if (!canDeleted) {
                throw new SscClientException(SscErrorCode.BAD_REQUEST, "job状态为" + jobStatus.name() + "，无法删除");
            }
            jobDao.deleteJob(id);
        } catch (DaoException e) {
            log.error("删除job失败，id={}", id, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public List<JobVO> listJob() {
        try {
            return jobDao.listJob();
        } catch (DaoException e) {
            log.error("列出job失败", e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void jobRun(String id) {
        JobDetail jobDetail = getJobDetail(id);
        final YarnDeploymentTarget yarnDeploymentTarget = jobDetail.getYarnDeploymentTarget();
        Preconditions.checkState(jobDetail.getJobStatus() != JobStatusEnum.RUNNING, "job已在运行中");

        try {
            switch (yarnDeploymentTarget) {
                case PER_JOB:
                case SESSION:
                    YarnXXRunnable preJobRunnable = new YarnXXRunnable(jobDetail);
                    runAsync(preJobRunnable, jobDetail);
                    break;
                case APPLICATION:
                    ApplicationRunnable applicationRunnable = new ApplicationRunnable(jobDetail);
                    runAsync(applicationRunnable, jobDetail);
                    break;
                default:
                    throw new RuntimeException("没有匹配的发布模式");
            }
        } catch (Exception e) {
            log.error("生产job错误，id={}", id, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }

    }

    @Override
    public void jobStop(String id) {
        JobDetail jobDetail = getJobDetail(id);
        Preconditions.checkState(jobDetail.getJobStatus() == JobStatusEnum.RUNNING, "job未运行");

        log.debug("需要暂停的任务详情\n{}", jobDetail);

        Configuration configuration = jobDetail.getConfiguration();
        Duration clientTimeout = configuration.get(ClientOptions.CLIENT_TIMEOUT);
        String savePointDir = configuration.get(CheckpointingOptions.SAVEPOINT_DIRECTORY);
        JobID jobID = jobDetail.getJobID();

        log.debug("Yarn中的JobID={}", jobID);

        try {
            runClusterClientAction(configuration, clusterClient -> {
                String savepointPath = clusterClient.stopWithSavepoint(jobID, false, savePointDir)
                        .get(clientTimeout.toMillis(), TimeUnit.MILLISECONDS);
                log.debug("暂停job成功,savepoint保存至:{}", savepointPath);
            });
        } catch (FlinkRuntimeException e) {
            log.error("停止job错误，id={}", id, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public void jobCancel(String id) {
        JobDetail jobDetail = getJobDetail(id);
        Preconditions.checkState(jobDetail.getJobStatus() == JobStatusEnum.RUNNING, "job未运行");

        log.debug("需要关闭的任务详情\n{}", jobDetail);

        Configuration configuration = jobDetail.getConfiguration();
        Duration clientTimeout = configuration.get(ClientOptions.CLIENT_TIMEOUT);
        JobID jobID = jobDetail.getJobID();

        try {
            runClusterClientAction(configuration, clusterClient -> clusterClient.cancel(jobID).get(clientTimeout.toMillis(), TimeUnit.MILLISECONDS));
        } catch (FlinkRuntimeException e) {
            log.error("关闭job失败，id={}", id, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @Override
    public JobPlanInfo getJobPlanInfo(String id) {
        JobDetail jobDetail = getJobDetail(id);
        return jobDetail.getJobPlan();
    }

    private void runAsync(Supplier<JobID> supplier, JobDetail jobDetail) {
        CompletableFuture.supplyAsync(supplier, executorService)
                .whenComplete((ignore, throwable) -> {
                    if (throwable != null) {
                        log.error("job提交运行错误", throwable);
                        JobStatusUpdate statusUpdate = JobStatusUpdate.builder(jobDetail).jobStatus(JobStatusEnum.FAILED).build();
                        updateJobStatus(statusUpdate);
                    }
                })
                .thenAcceptAsync(jobID -> monitor(jobDetail, jobID), executorService);
    }

    private void monitor(JobDetail jobDetail, JobID jobID) {
        try {
            ClusterClientUtil.runClusterClientAction(jobDetail.getSourceConfiguration(), (clusterDescriptor, clusterID, clusterClient) -> {
                new FlinkJobStatusMonitor<>(jobDetail, this, jobID, clusterDescriptor, clusterID, clusterClient).watch();
                if (jobDetail.getYarnDeploymentTarget() == YarnDeploymentTarget.PER_JOB) {
                    clusterClient.shutDownCluster();
                }
            });
        } catch (FlinkRuntimeException e) {
            log.error("监控集群错误", e);
        }
    }

    private void enrichDeploymentConfiguration(JobInsert insert, Configuration configuration) {
        String clusterId = insert.getClusterId();
//        String jobName = insert.getJobName();

        YarnDeploymentTarget yarnDeploymentTarget = insert.getYarnDeploymentTarget();
        String defaultFileSystem = configuration.get(CoreOptions.DEFAULT_FILESYSTEM_SCHEME);
        String savePointDir = defaultFileSystem + configuration.get(CheckpointingOptions.SAVEPOINT_DIRECTORY) + Path.SEPARATOR + insert.getId();
        String checkPointDir = defaultFileSystem + configuration.get(CheckpointingOptions.CHECKPOINTS_DIRECTORY) + Path.SEPARATOR + insert.getId();



//        ConfigUtils.encodeArrayToConfig(configuration, APPLICATION_ARGS, new String[]{"-D","deployment.job-name=" + jobName}, Objects::toString);
        configuration.set(DeploymentOptions.TARGET, yarnDeploymentTarget.getName());
        configuration.set(CheckpointingOptions.SAVEPOINT_DIRECTORY, savePointDir);
        configuration.set(CheckpointingOptions.CHECKPOINTS_DIRECTORY, checkPointDir);
        if (yarnDeploymentTarget == YarnDeploymentTarget.SESSION) {
            ClusterDetail clusterDetail = clusterDao.getClusterDetailById(clusterId);
            Preconditions.checkNotNull(clusterDetail, "集群信息为空");
            Preconditions.checkArgument(clusterDetail.getClusterStatus() == ClusterStatusEnum.RUNNING, "集群未启动");
            configuration.addAll(clusterDetail.getConfiguration());
        }
    }

    private void resolveJobPlan(JobInsert insert) {
        Configuration configuration = insert.getConfiguration();
        Integer parallelism = configuration.get(CoreOptions.DEFAULT_PARALLELISM);
        List<String> pipelineJars = configuration.get(PipelineOptions.JARS);
        String[] args = ConfigUtils.decodeListFromConfig(configuration, APPLICATION_ARGS, String::new).toArray(new String[0]);

        Preconditions.checkArgument(pipelineJars.size() == 1, "只能有一个pipelineJar");

        String pipelineJar = pipelineJars.get(0);
        try {
            File jarFile = downloadJar(pipelineJar);
            PackagedProgram packagedProgram = PackagedProgram.newBuilder()
                    .setJarFile(jarFile)
                    .setArguments(args)
                    .setConfiguration(configuration).build();

            JobGraph jobGraph = PackagedProgramUtils.createJobGraph(packagedProgram, configuration, parallelism, true);
            String generatePlan = JsonPlanGenerator.generatePlan(jobGraph);
            JobPlanInfo jobPlanInfo = new JobPlanInfo(HtmlUtils.htmlUnescape(generatePlan));
            insert.setJobPlan(jobPlanInfo);
        } catch (IOException e) {
            log.error("下载jar失败，jobInsert={}", insert, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        } catch (ProgramInvocationException e) {
            log.error("构建program失败，jobInsert={}", insert, e);
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }
    }

    @PostConstruct
    public void init() {
        executorService = Executors.newCachedThreadPool();
    }

    @PreDestroy
    public void preDestroy() {
        executorService.shutdown();
    }
}
