package com.github.martvey.ssc.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.flink.client.deployment.ClusterClientFactory;
import org.apache.flink.client.deployment.ClusterClientServiceLoader;
import org.apache.flink.client.deployment.ClusterDescriptor;
import org.apache.flink.client.deployment.DefaultClusterClientServiceLoader;
import org.apache.flink.client.program.ClusterClient;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.util.FlinkRuntimeException;

/**
 * @author martvey
 * @date 2022/5/16 17:52
 */
@Slf4j
public class ClusterClientUtil {
    private static final ClusterClientServiceLoader clusterClientServiceLoader = new DefaultClusterClientServiceLoader();

    public static <ClusterID> void runClusterDescriptorAction(Configuration effectiveConfiguration, ClusterDescriptorAction<ClusterID> action) {
        final ClusterClientFactory<ClusterID> clusterClientFactory = clusterClientServiceLoader.getClusterClientFactory(effectiveConfiguration);
        try (final ClusterDescriptor<ClusterID> clusterDescriptor = clusterClientFactory.createClusterDescriptor(effectiveConfiguration)) {
            action.run(clusterDescriptor, clusterClientFactory);
        }catch (Exception e){
            throw new FlinkRuntimeException(e);
        }
    }

    public static <ClusterID> void runClusterClientAction(Configuration effectiveConfiguration, TrClusterClientAction<ClusterID> action) throws FlinkRuntimeException {
        runClusterDescriptorAction(effectiveConfiguration, (ClusterDescriptorAction<ClusterID>) (clusterDescriptor, clusterClientFactory) -> {
            ClusterID clusterID = clusterClientFactory.getClusterId(effectiveConfiguration);
            try (final ClusterClient<ClusterID> clusterClient = clusterDescriptor.retrieve(clusterID).getClusterClient()) {
                action.run(clusterDescriptor, clusterID, clusterClient);
            }
        });
    }

    public static <ClusterID> void runClusterClientAction(Configuration effectiveConfiguration, ClusterClientAction<ClusterID> action) throws FlinkRuntimeException{
        runClusterClientAction(effectiveConfiguration, (TrClusterClientAction<ClusterID>) (clusterDescriptor, clusterID, clusterClient) -> {
            action.run(clusterClient);
        });
    }

    public interface ClusterDescriptorAction<ClusterID> {
        void run(ClusterDescriptor<ClusterID> clusterDescriptor, ClusterClientFactory<ClusterID> clusterClientFactory) throws Exception;
    }

    public interface TrClusterClientAction<ClusterID>{
        void run(ClusterDescriptor<ClusterID> clusterDescriptor, ClusterID clusterID, ClusterClient<ClusterID> clusterClient) throws Exception;
    }

    public interface ClusterClientAction<ClusterID>{
        void run(ClusterClient<ClusterID> clusterClient) throws Exception;
    }
}
