package com.github.martvey.ssc.entity.job;

import org.apache.flink.api.common.JobID;
import org.apache.flink.client.deployment.ClusterClientFactory;
import org.apache.flink.client.deployment.ClusterDescriptor;
import org.apache.flink.client.deployment.ClusterSpecification;
import org.apache.flink.client.deployment.application.ApplicationConfiguration;
import org.apache.flink.client.program.ClusterClient;
import org.apache.flink.client.program.ClusterClientProvider;
import org.apache.flink.client.program.rest.retry.ExponentialWaitStrategy;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.runtime.client.JobStatusMessage;
import org.apache.flink.util.ExceptionUtils;
import org.apache.flink.util.FlinkException;
import org.apache.flink.util.Preconditions;

import java.util.Collection;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

import static com.github.martvey.ssc.util.ClusterClientUtil.runClusterDescriptorAction;

public class ApplicationRunnable implements Supplier<JobID> {
    private final Configuration configuration;
    private final ApplicationConfiguration applicationConfiguration;
    private JobID jobID;

    public ApplicationRunnable(JobDetail jobDetail) {
        this.configuration = jobDetail.getSourceConfiguration();
        this.applicationConfiguration = ApplicationConfiguration.fromConfiguration(this.configuration);
    }

    @Override
    public JobID get(){
        if (jobID != null){
            return jobID;
        }

        runClusterDescriptorAction(configuration, this::deployApplication);
        return jobID;
    }

    private <ClusterID> void deployApplication(ClusterDescriptor<ClusterID> clusterDescriptor, ClusterClientFactory<ClusterID> clusterClientFactory) throws FlinkException {
        ClusterSpecification clusterSpecification = clusterClientFactory.getClusterSpecification(configuration);
        ClusterClientProvider<ClusterID> clusterClientProvider = clusterDescriptor.deployApplicationCluster(clusterSpecification, applicationConfiguration);

        try(ClusterClient<ClusterID> clusterClient = clusterClientProvider.getClusterClient()){
            waiteUntilJobInitializationFinished(clusterClient);
            Collection<JobStatusMessage> jobStatusMessageCollection = clusterClient
                    .listJobs()
                    .get();

            Preconditions.checkArgument(jobStatusMessageCollection.size() == 1, "存在多个任务！");
            jobID = jobStatusMessageCollection
                    .toArray(new JobStatusMessage[0])[0]
                    .getJobId();
        }catch (Exception e){
            throw new FlinkException("查询集群中任务错误", e);
        }
    }

    private <ClusterID> void waiteUntilJobInitializationFinished(ClusterClient<ClusterID> clusterClient){
        ExponentialWaitStrategy waitStrategy = new ExponentialWaitStrategy(50L, 2_000L);

        try {
            Collection<JobStatusMessage> jobStatusMessages = clusterClient.listJobs().get();
            for(long attempt = 0L; jobStatusMessages.size() == 0; jobStatusMessages = clusterClient.listJobs().get()) {
                TimeUnit.MILLISECONDS.sleep(waitStrategy.sleepTime(attempt++));
            }
        } catch (ExecutionException e) {
            throw new RuntimeException("查询集群中job信息错误",e);
        } catch (Throwable e) {
            ExceptionUtils.checkInterrupted(e);
            throw new RuntimeException("job初始化错误", e);
        }
    }
}
