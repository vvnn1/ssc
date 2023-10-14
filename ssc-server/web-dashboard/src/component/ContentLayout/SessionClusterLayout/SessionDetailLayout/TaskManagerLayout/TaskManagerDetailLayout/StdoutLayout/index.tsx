import { Button, Space } from "antd";
import { DownloadOutlined, SyncOutlined } from "../../../../../../Icon";
import './index.sass'
import MonacoEditor from "../../../../../../MonacoEditor";

const StdoutLayout = () => {
    return (
        <div className="taskmanager-stdout-layout">
            <MonacoEditor
                options={{
                    minimap: {
                        enabled: false
                    },
                    selectOnLineNumbers: true,
                    lineNumbersMinChars: 5,
                    lineDecorationsWidth: 0,
                    wordWrap: 'on',
                    readOnly: false,
                    scrollBeyondLastLine: false,
                }}
                value={
                    `2023-09-10 16:57:03,461 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2023-09-10 16:57:03,466 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Preconfiguration: 
2023-09-10 16:57:03,466 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - 


RESOURCE_PARAMS extraction logs:
jvm_params: -Xmx3462817376 -Xms3462817376 -XX:MaxMetaspaceSize=268435456
dynamic_configs: -D jobmanager.memory.off-heap.size=134217728b -D jobmanager.memory.jvm-overhead.min=429496736b -D jobmanager.memory.jvm-metaspace.size=268435456b -D jobmanager.memory.heap.size=3462817376b -D jobmanager.memory.jvm-overhead.max=429496736b
logs: INFO  [] - Loading configuration property: blob.server.port, 6124
INFO  [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
INFO  [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out -Dlog4j.configurationFile=/flink/conf.template/log4j2.xml -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
INFO  [] - Loading configuration property: high-availability.cluster-id, c3d0298e-8a85-48b1-a767-659b74d20d1a
INFO  [] - Loading configuration property: jmx.server.port, 10000,10001-10500
INFO  [] - Loading configuration property: jobmanager.rpc.address, sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager
INFO  [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/sessionclusters/debug-session
INFO  [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
INFO  [] - Loading configuration property: kubernetes.cluster-id, session-c3d0298e-8a85-48b1-a767-659b74d20d1a
INFO  [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/ha
INFO  [] - Loading configuration property: kubernetes.namespace, vvp-workload
INFO  [] - Loading configuration property: metrics.reporters, promappmgr
INFO  [] - Loading configuration property: high-availability.jobmanager.port, 6123
INFO  [] - Loading configuration property: taskmanager.memory.process.size, 8192m
INFO  [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
INFO  [] - Loading configuration property: web.cancel.enable, false
INFO  [] - Loading configuration property: jobmanager.memory.process.size, 4096m
INFO  [] - Loading configuration property: jobmanager.rpc.port, 6123
INFO  [] - Loading configuration property: rest.port, 8081
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
INFO  [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
INFO  [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
INFO  [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
INFO  [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
INFO  [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
INFO  [] - Loading configuration property: restart-strategy, none
INFO  [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
INFO  [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
INFO  [] - Loading configuration property: table.optimizer.window-join-enabled, false
INFO  [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/checkpoints
INFO  [] - Final Master Memory configuration:
INFO  [] -   Total Process Memory: 4.000gb (4294967296 bytes)
INFO  [] -     Total Flink Memory: 3.350gb (3597035104 bytes)
INFO  [] -       JVM Heap:         3.225gb (3462817376 bytes)
INFO  [] -       Off-heap:         128.000mb (134217728 bytes)
INFO  [] -     JVM Metaspace:      256.000mb (268435456 bytes)
INFO  [] -     JVM Overhead:       409.600mb (429496736 bytes)

2023-09-10 16:57:03,467 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2023-09-10 16:57:03,468 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Starting StandaloneSessionClusterEntrypoint (Version: 1.17-vvr-8.0.1-SNAPSHOT, Scala: 2.12, Rev:a3a169f, Date:2023-08-13T05:12:39+02:00)
2023-09-10 16:57:03,468 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  OS current user: flink
2023-09-10 16:57:03,761 [main] WARN  org.apache.hadoop.util.NativeCodeLoader                      [] - Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
2023-09-10 16:57:03,901 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Current Hadoop/Kerberos user: flink
2023-09-10 16:57:03,901 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JVM: OpenJDK 64-Bit Server VM - "Alibaba" - 1.8/25.102-b52
2023-09-10 16:57:03,902 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Arch: amd64
2023-09-10 16:57:03,902 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Maximum heap size: 3287 MiBytes
2023-09-10 16:57:03,903 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JAVA_HOME: /usr/lib/ajdk-8_2_4-b52
2023-09-10 16:57:03,910 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Hadoop version: 3.1.3
2023-09-10 16:57:03,911 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JVM Options:
2023-09-10 16:57:03,911 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xmx3462817376
2023-09-10 16:57:03,911 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xms3462817376
2023-09-10 16:57:03,911 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:MaxMetaspaceSize=268435456
2023-09-10 16:57:03,911 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog.file=/flink/log/flink--standalonesession-0-sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanzhll6.log
2023-09-10 16:57:03,911 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog4j.configuration=file:/flink/conf.template/log4j-console.properties
2023-09-10 16:57:03,912 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog4j.configurationFile=file:/flink/conf.template/log4j-console.properties
2023-09-10 16:57:03,912 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlogback.configurationFile=file:/flink/conf.template/logback-console.xml
2023-09-10 16:57:03,912 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djavax.net.ssl.keyStoreType=JKS
2023-09-10 16:57:03,912 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djavax.net.ssl.trustStoreType=JKS
2023-09-10 16:57:03,913 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog.file=/flink/log/flink.log
2023-09-10 16:57:03,913 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstdout.file=/flink/log/flink.out
2023-09-10 16:57:03,913 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog4j.configurationFile=/flink/conf.template/log4j2.xml
2023-09-10 16:57:03,914 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djdk.tls.ephemeralDHKeySize=2048
2023-09-10 16:57:03,914 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dalicloud.sts.credential.provider=sts.file
2023-09-10 16:57:03,914 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential
2023-09-10 16:57:03,914 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dsts.provider.credential.expire.seconds=900
2023-09-10 16:57:03,915 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dfile.encoding=UTF-8
2023-09-10 16:57:03,915 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dkubernetes.max.concurrent.requests=1000
2023-09-10 16:57:03,915 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Program Arguments:
2023-09-10 16:57:03,917 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-10 16:57:03,917 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.off-heap.size=134217728b
2023-09-10 16:57:03,917 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-10 16:57:03,917 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-overhead.min=429496736b
2023-09-10 16:57:03,918 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-10 16:57:03,918 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-metaspace.size=268435456b
2023-09-10 16:57:03,918 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-10 16:57:03,918 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.heap.size=3462817376b
2023-09-10 16:57:03,919 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-10 16:57:03,919 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-overhead.max=429496736b
2023-09-10 16:57:03,919 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     --configDir
2023-09-10 16:57:03,919 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     /flink/conf.template
2023-09-10 16:57:03,919 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     --executionMode
2023-09-10 16:57:03,919 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     cluster
2023-09-10 16:57:03,919 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Classpath: /flink/lib/celeborn-client-flink-1.17-shaded_2.12-0.3.0-1.2-SNAPSHOT.jar:/flink/lib/flink-cep-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-connector-files-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-csv-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-json-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-metrics-datadog-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-metrics-graphite-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-metrics-influxdb-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-metrics-kafka-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-metrics-kmonitor-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-metrics-log-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-metrics-prometheus-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-metrics-slf4j-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-metrics-statsd-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-queryable-state-runtime_*.jar:/flink/lib/flink-scala_2.12-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-shaded-hadoop-2-uber-3.1.3-10.0-SNAPSHOT.jar:/flink/lib/flink-statebackend-gemini-bundled_1.8-4.0.1-SNAPSHOT.jar:/flink/lib/flink-state-processor-api-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-table-api-java-uber-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-table-planner-loader-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/flink-table-runtime-1.17-vvr-8.0.1-SNAPSHOT.jar:/flink/lib/jersey-core-1.9.jar:/flink/lib/log4j-1.2-api-2.17.1.jar:/flink/lib/log4j-api-2.17.1.jar:/flink/lib/log4j-core-2.17.1.jar:/flink/lib/log4j-slf4j-impl-2.17.1.jar:/flink/lib/shuffle-plugin-1.1-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-hdfs-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-kafka-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-oss-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-sls-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/flink-dist-1.17-vvr-8.0.1-SNAPSHOT.jar::::
2023-09-10 16:57:03,919 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2023-09-10 16:57:03,921 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Registered UNIX signal handlers for [TERM, HUP, INT]
2023-09-10 16:57:03,986 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2023-09-10 16:57:03,987 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2023-09-10 16:57:03,987 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2023-09-10 16:57:03,987 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out -Dlog4j.configurationFile=/flink/conf.template/log4j2.xml -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2023-09-10 16:57:03,987 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, c3d0298e-8a85-48b1-a767-659b74d20d1a
2023-09-10 16:57:03,988 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2023-09-10 16:57:03,988 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager
2023-09-10 16:57:03,988 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/sessionclusters/debug-session
2023-09-10 16:57:03,988 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
2023-09-10 16:57:03,988 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, session-c3d0298e-8a85-48b1-a767-659b74d20d1a
2023-09-10 16:57:03,989 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/ha
2023-09-10 16:57:03,989 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2023-09-10 16:57:03,989 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, promappmgr
2023-09-10 16:57:03,989 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2023-09-10 16:57:03,989 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 8192m
2023-09-10 16:57:03,989 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2023-09-10 16:57:03,989 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2023-09-10 16:57:03,990 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 4096m
2023-09-10 16:57:03,990 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2023-09-10 16:57:03,990 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2023-09-10 16:57:03,990 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2023-09-10 16:57:03,990 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
2023-09-10 16:57:03,990 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
2023-09-10 16:57:03,990 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
2023-09-10 16:57:03,990 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
2023-09-10 16:57:03,991 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2023-09-10 16:57:03,991 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, none
2023-09-10 16:57:03,991 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
2023-09-10 16:57:03,999 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2023-09-10 16:57:04,000 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.optimizer.window-join-enabled, false
2023-09-10 16:57:04,000 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/checkpoints
2023-09-10 16:57:04,000 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.off-heap.size, 134217728b
2023-09-10 16:57:04,000 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-overhead.min, 429496736b
2023-09-10 16:57:04,000 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-metaspace.size, 268435456b
2023-09-10 16:57:04,000 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.heap.size, 3462817376b
2023-09-10 16:57:04,001 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-overhead.max, 429496736b
2023-09-10 16:57:04,087 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Starting StandaloneSessionClusterEntrypoint.
2023-09-10 16:57:04,147 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Install default filesystem.
2023-09-10 16:57:04,184 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-sls
2023-09-10 16:57:04,188 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-datadog
2023-09-10 16:57:04,189 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: s3-fs
2023-09-10 16:57:04,189 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-graphite
2023-09-10 16:57:04,189 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: pangu-fs
2023-09-10 16:57:04,190 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-jmx
2023-09-10 16:57:04,190 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-slf4j
2023-09-10 16:57:04,190 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-statsd
2023-09-10 16:57:04,190 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: external-resource-gpu
2023-09-10 16:57:04,191 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: oss-fs-hadoop
2023-09-10 16:57:04,191 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-log
2023-09-10 16:57:04,192 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-prometheus
2023-09-10 16:57:04,192 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-influx
2023-09-10 16:57:04,702 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Install security context.
2023-09-10 16:57:04,726 [main] WARN  org.apache.flink.runtime.util.HadoopUtils                    [] - Could not find Hadoop configuration via any of the supported methods (Flink configuration, environment variables).
2023-09-10 16:57:04,760 [main] INFO  org.apache.flink.runtime.security.modules.HadoopModule       [] - Hadoop user set to flink (auth:SIMPLE)
2023-09-10 16:57:04,761 [main] INFO  org.apache.flink.runtime.security.modules.HadoopModule       [] - Kerberos security is disabled.
2023-09-10 16:57:04,772 [main] INFO  org.apache.flink.runtime.security.modules.JaasModule         [] - Jaas file will be created as /tmp/jaas-5752178548615230629.conf.
2023-09-10 16:57:04,785 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Initializing cluster services.
2023-09-10 16:57:04,800 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Using working directory: WorkingDirectory(/tmp/jm_3ec8af18c317329eb1c17969d9df189e).
2023-09-10 16:57:05,528 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-10 16:57:05,701 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Trying to start actor system, external address sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager:6123, bind address 0.0.0.0:6123.
2023-09-10 16:57:06,985 [flink-akka.actor.default-dispatcher-6] INFO  akka.event.slf4j.Slf4jLogger                                 [] - Slf4jLogger started
2023-09-10 16:57:07,072 [flink-akka.actor.default-dispatcher-6] INFO  akka.remote.RemoteActorRefProvider                           [] - Akka Cluster not in use - enabling unsafe features anyway because \`akka.remote.use-unsafe-remote-features-outside-cluster\` has been enabled.
2023-09-10 16:57:07,072 [flink-akka.actor.default-dispatcher-6] INFO  akka.remote.Remoting                                         [] - Starting remoting
2023-09-10 16:57:07,465 [flink-akka.actor.default-dispatcher-6] INFO  akka.remote.Remoting                                         [] - Remoting started; listening on addresses :[akka.tcp://flink@sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager:6123]
2023-09-10 16:57:07,778 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Actor system started at akka.tcp://flink@sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager:6123
2023-09-10 16:57:08,067 [main] INFO  org.apache.flink.management.jmx.JMXService                   [] - Started JMX server on port 10000.
2023-09-10 16:57:08,071 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Loading delegation token providers
2023-09-10 16:57:08,079 [main] WARN  org.apache.flink.runtime.util.HadoopUtils                    [] - Could not find Hadoop configuration via any of the supported methods (Flink configuration, environment variables).
2023-09-10 16:57:08,079 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider hadoopfs loaded and initialized
2023-09-10 16:57:08,080 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider hbase is disabled so not loaded
2023-09-10 16:57:08,080 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2023-09-10 16:57:08,084 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2023-09-10 16:57:08,084 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2023-09-10 16:57:08,084 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2023-09-10 16:57:08,084 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2023-09-10 16:57:08,084 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2023-09-10 16:57:08,085 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2023-09-10 16:57:08,085 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2023-09-10 16:57:08,086 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2023-09-10 16:57:08,086 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2023-09-10 16:57:08,087 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2023-09-10 16:57:08,088 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2023-09-10 16:57:08,088 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2023-09-10 16:57:08,092 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider s3-hadoop loaded and initialized
2023-09-10 16:57:08,093 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider s3-presto loaded and initialized
2023-09-10 16:57:08,093 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token providers loaded successfully
2023-09-10 16:57:08,096 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Loading delegation token receivers
2023-09-10 16:57:08,097 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver hadoopfs loaded and initialized
2023-09-10 16:57:08,097 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver hbase is disabled so not loaded
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2023-09-10 16:57:08,098 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2023-09-10 16:57:08,099 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver s3-hadoop loaded and initialized
2023-09-10 16:57:08,100 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver s3-presto loaded and initialized
2023-09-10 16:57:08,100 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receivers loaded successfully
2023-09-10 16:57:08,100 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Checking provider and receiver instances consistency
2023-09-10 16:57:08,101 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Provider and receiver instances are consistent
2023-09-10 16:57:08,101 [main] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Multiple providers loaded with the same prefix: s3. This might lead to unintended consequences, please consider using only one of them.
2023-09-10 16:57:08,101 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Obtaining delegation tokens
2023-09-10 16:57:08,103 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation tokens obtained successfully
2023-09-10 16:57:08,103 [main] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - No tokens obtained so skipping notifications
2023-09-10 16:57:08,156 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-10 16:57:08,157 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-10 16:57:09,688 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-10 16:57:10,158 [main] INFO  org.apache.flink.fs.osshadoop.OSSFileSystemFactory           [] - fs.oss.accessKeyId is not set, using sts credential fetcher.
2023-09-10 16:57:10,475 [main] WARN  org.apache.hadoop.util.NativeCodeLoader                      [] - Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
2023-09-10 16:57:12,266 [main] INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Created BLOB server storage directory /tmp/jm_3ec8af18c317329eb1c17969d9df189e/blobStorage
2023-09-10 16:57:12,270 [main] INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Started BLOB server at 0.0.0.0:6124 - max concurrent requests: 50 - max backlog: 1000
2023-09-10 16:57:12,358 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2023-09-10 16:57:12,358 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2023-09-10 16:57:12,358 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2023-09-10 16:57:12,359 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2023-09-10 16:57:12,359 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2023-09-10 16:57:12,360 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2023-09-10 16:57:12,360 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2023-09-10 16:57:12,361 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2023-09-10 16:57:12,361 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2023-09-10 16:57:12,361 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2023-09-10 16:57:12,362 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2023-09-10 16:57:12,362 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2023-09-10 16:57:12,362 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2023-09-10 16:57:12,374 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.datadog.DatadogHttpReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,375 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.graphite.GraphiteReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,376 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.influxdb.InfluxdbReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,377 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.log.LogReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,377 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,378 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusPushGatewayReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,378 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusPushGatewayLoadBalancedReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,378 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.slf4j.Slf4jReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,379 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.statsd.StatsDReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,380 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.sls.SLSReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-10 16:57:12,469 [main] INFO  org.apache.flink.metrics.prometheus.PrometheusReporter       [] - Started PrometheusReporter HTTP server on port 9999.
2023-09-10 16:57:12,476 [main] INFO  org.apache.flink.runtime.metrics.MetricRegistryImpl          [] - Reporting metrics for reporter promappmgr of type org.apache.flink.metrics.prometheus.PrometheusReporter.
2023-09-10 16:57:12,488 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Trying to start actor system, external address sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager:0, bind address 0.0.0.0:0.
2023-09-10 16:57:12,507 [flink-metrics-6] INFO  akka.event.slf4j.Slf4jLogger                                 [] - Slf4jLogger started
2023-09-10 16:57:12,509 [flink-metrics-6] INFO  akka.remote.RemoteActorRefProvider                           [] - Akka Cluster not in use - enabling unsafe features anyway because \`akka.remote.use-unsafe-remote-features-outside-cluster\` has been enabled.
2023-09-10 16:57:12,509 [flink-metrics-6] INFO  akka.remote.Remoting                                         [] - Starting remoting
2023-09-10 16:57:12,567 [flink-metrics-6] INFO  akka.remote.Remoting                                         [] - Remoting started; listening on addresses :[akka.tcp://flink-metrics@sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager:36537]
2023-09-10 16:57:12,576 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Actor system started at akka.tcp://flink-metrics@sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager:36537
2023-09-10 16:57:12,664 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.metrics.dump.MetricQueryService at akka://flink-metrics/user/rpc/MetricQueryService .
2023-09-10 16:57:12,690 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'ClassesLoaded'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, ClassLoader]
2023-09-10 16:57:12,690 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'ClassesUnloaded'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, ClassLoader]
2023-09-10 16:57:12,690 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, GarbageCollector, ParNew]
2023-09-10 16:57:12,690 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, GarbageCollector, ParNew]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, GarbageCollector, ConcurrentMarkSweep]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, GarbageCollector, ConcurrentMarkSweep]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Heap]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Heap]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Heap]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, NonHeap]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, NonHeap]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, NonHeap]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Metaspace]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Metaspace]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Metaspace]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Direct]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'MemoryUsed'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Direct]
2023-09-10 16:57:12,691 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'TotalCapacity'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Direct]
2023-09-10 16:57:12,692 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Mapped]
2023-09-10 16:57:12,692 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'MemoryUsed'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Mapped]
2023-09-10 16:57:12,692 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'TotalCapacity'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Memory, Mapped]
2023-09-10 16:57:12,692 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, Threads]
2023-09-10 16:57:12,692 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Load'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, CPU]
2023-09-10 16:57:12,692 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager, jobmanager, Status, JVM, CPU]
2023-09-10 16:57:12,713 [main] INFO  org.apache.flink.runtime.dispatcher.FileExecutionGraphInfoStore [] - Initializing FileExecutionGraphInfoStore: Storage directory /tmp/executionGraphStore-04d66939-5a1f-4fed-b755-ac6afb3f3585, expiration time 3600000, maximum cache size 52428800 bytes.
2023-09-10 16:57:12,828 [main] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesLeaderElector [] - Create KubernetesLeaderElector session-c3d0298e-8a85-48b1-a767-659b74d20d1a-cluster-config-map with lock identity 2c30c8b9-3d85-46ec-be61-066c5b496365.
2023-09-10 16:57:12,830 [KubernetesClient-Informer-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/session-c3d0298e-8a85-48b1-a767-659b74d20d1a-cluster-config-map, watching id:a38ffa72-54ac-4dff-baad-f4a712248b09
2023-09-10 16:57:12,836 [main] INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'jobmanager.rpc.address' instead of key 'rest.address'
2023-09-10 16:57:12,837 [main] INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'rest.port' instead of key 'rest.bind-port'
2023-09-10 16:57:12,903 [main] INFO  org.apache.flink.runtime.dispatcher.DispatcherRestEndpoint   [] - Upload directory /tmp/flink-web-4fe38d62-28ba-4904-b2d9-36d088eefdb2/flink-web-upload does not exist. 
2023-09-10 16:57:12,903 [main] INFO  org.apache.flink.runtime.dispatcher.DispatcherRestEndpoint   [] - Created directory /tmp/flink-web-4fe38d62-28ba-4904-b2d9-36d088eefdb2/flink-web-upload for file uploads.
2023-09-10 16:57:12,906 [main] INFO  org.apache.flink.runtime.dispatcher.DispatcherRestEndpoint   [] - Starting rest endpoint.
2023-09-10 16:57:13,278 [pool-5-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesLeaderElector [] - New leader elected 2c30c8b9-3d85-46ec-be61-066c5b496365 for session-c3d0298e-8a85-48b1-a767-659b74d20d1a-cluster-config-map.
2023-09-10 16:57:13,379 [main] INFO  org.apache.flink.runtime.webmonitor.WebMonitorUtils          [] - Determined location of main cluster component log file: /flink/log/flink.log
2023-09-10 16:57:13,380 [main] INFO  org.apache.flink.runtime.webmonitor.WebMonitorUtils          [] - Determined location of main cluster component stdout file: /flink/log/flink.out
2023-09-10 16:57:13,472 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2023-09-10 16:57:13,472 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2023-09-10 16:57:13,472 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2023-09-10 16:57:13,472 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out -Dlog4j.configurationFile=/flink/conf.template/log4j2.xml -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2023-09-10 16:57:13,472 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, c3d0298e-8a85-48b1-a767-659b74d20d1a
2023-09-10 16:57:13,472 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2023-09-10 16:57:13,472 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager
2023-09-10 16:57:13,472 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/sessionclusters/debug-session
2023-09-10 16:57:13,472 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
2023-09-10 16:57:13,473 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, session-c3d0298e-8a85-48b1-a767-659b74d20d1a
2023-09-10 16:57:13,473 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/ha
2023-09-10 16:57:13,474 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2023-09-10 16:57:13,474 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, promappmgr
2023-09-10 16:57:13,474 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2023-09-10 16:57:13,474 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 8192m
2023-09-10 16:57:13,475 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2023-09-10 16:57:13,475 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2023-09-10 16:57:13,475 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 4096m
2023-09-10 16:57:13,475 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2023-09-10 16:57:13,477 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2023-09-10 16:57:13,478 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2023-09-10 16:57:13,479 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
2023-09-10 16:57:13,481 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
2023-09-10 16:57:13,481 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
2023-09-10 16:57:13,481 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
2023-09-10 16:57:13,481 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2023-09-10 16:57:13,482 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, none
2023-09-10 16:57:13,482 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
2023-09-10 16:57:13,482 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2023-09-10 16:57:13,482 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.optimizer.window-join-enabled, false
2023-09-10 16:57:13,482 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/checkpoints
2023-09-10 16:57:13,482 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-10 16:57:13,867 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-10 16:57:13,867 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-10 16:57:13,876 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-10 16:57:14,111 [main] INFO  org.apache.flink.runtime.dispatcher.DispatcherRestEndpoint   [] - Rest endpoint listening at sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager:8081
2023-09-10 16:57:14,113 [main] INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@252ec02e.
2023-09-10 16:57:14,113 [main] INFO  org.apache.flink.runtime.dispatcher.DispatcherRestEndpoint   [] - Web frontend listening at http://sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager:8081.
2023-09-10 16:57:14,114 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.dispatcher.DispatcherRestEndpoint   [] - http://sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager:8081 was granted leadership with leaderSessionID=48cda26f-22a9-46c8-9ad9-997fb7c1aee1
2023-09-10 16:57:14,169 [main] INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@6f50d55c.
2023-09-10 16:57:14,169 [main] INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Starting resource manager service.
2023-09-10 16:57:14,169 [main] INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@19b5214b.
2023-09-10 16:57:14,175 [main] INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='session-c3d0298e-8a85-48b1-a767-659b74d20d1a-cluster-config-map'}.
2023-09-10 16:57:14,177 [main] INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='session-c3d0298e-8a85-48b1-a767-659b74d20d1a-cluster-config-map'}.
2023-09-10 16:57:14,178 [KubernetesClient-Informer-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/session-c3d0298e-8a85-48b1-a767-659b74d20d1a-cluster-config-map, watching id:96a54d41-6fa5-404c-8344-ada8410ca572
2023-09-10 16:57:14,184 [KubernetesClient-Informer-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/session-c3d0298e-8a85-48b1-a767-659b74d20d1a-cluster-config-map, watching id:3df84a63-9eed-4b14-95cd-e80ba7cb6a48
2023-09-10 16:57:14,184 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.dispatcher.runner.DefaultDispatcherRunner [] - DefaultDispatcherRunner was granted leadership with leader id 48cda26f-22a9-46c8-9ad9-997fb7c1aee1. Creating new DispatcherLeaderProcess.
2023-09-10 16:57:14,197 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.dispatcher.runner.SessionDispatcherLeaderProcess [] - Start SessionDispatcherLeaderProcess.
2023-09-10 16:57:14,199 [cluster-io-thread-1] INFO  org.apache.flink.runtime.highavailability.FileSystemJobResultStore [] - Creating highly available job result storage directory at oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/ha/job-result-store/c3d0298e-8a85-48b1-a767-659b74d20d1a
2023-09-10 16:57:14,201 [pool-8-thread-1] INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Resource manager service is granted leadership with session id 48cda26f-22a9-46c8-9ad9-997fb7c1aee1.
2023-09-10 16:57:14,273 [cluster-io-thread-1] INFO  org.apache.flink.fs.osshadoop.StsFetcherCredentialsProvider  [] - Old credential is going to expire. Fetch a new one.
2023-09-10 16:57:14,361 [pool-8-thread-1] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.resourcemanager.StandaloneResourceManager at akka://flink/user/rpc/resourcemanager_0 .
2023-09-10 16:57:14,398 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.resourcemanager.StandaloneResourceManager [] - Starting the resource manager.
2023-09-10 16:57:14,407 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Starting tokens update task
2023-09-10 16:57:14,407 [flink-akka.actor.default-dispatcher-6] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - No tokens obtained so skipping notifications
2023-09-10 16:57:14,407 [flink-akka.actor.default-dispatcher-6] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Tokens update task not started because either no tokens obtained or none of the tokens specified its renewal date
2023-09-10 16:57:14,779 [cluster-io-thread-1] INFO  org.apache.flink.runtime.highavailability.FileSystemJobResultStore [] - Created highly available job result storage directory at oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/ha/job-result-store/c3d0298e-8a85-48b1-a767-659b74d20d1a
2023-09-10 16:57:14,987 [cluster-io-thread-3] INFO  org.apache.flink.runtime.dispatcher.runner.SessionDispatcherLeaderProcess [] - Recover all persisted job graphs that are not finished, yet.
2023-09-10 16:57:14,998 [cluster-io-thread-3] INFO  org.apache.flink.runtime.jobmanager.DefaultJobGraphStore     [] - Retrieved job ids [] from KubernetesStateHandleStore{configMapName='session-c3d0298e-8a85-48b1-a767-659b74d20d1a-cluster-config-map'}
2023-09-10 16:57:14,999 [cluster-io-thread-3] INFO  org.apache.flink.runtime.dispatcher.runner.SessionDispatcherLeaderProcess [] - Successfully recovered 0 persisted job graphs.
2023-09-10 16:57:15,084 [cluster-io-thread-3] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.dispatcher.StandaloneDispatcher at akka://flink/user/rpc/dispatcher_1 .
2023-09-10 16:57:15,174 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.resourcemanager.StandaloneResourceManager [] - Registering TaskManager with ResourceID 192.168.12.250:37455-d89fbb (akka.tcp://flink@192.168.12.250:37455/user/rpc/taskmanager_0) at ResourceManager

                    `}
            />
            <Space.Compact
                className='actions'
            >
                <Button size="small" type='primary'><SyncOutlined /></Button>
                <Button size="small" type='primary'><DownloadOutlined /></Button>
            </Space.Compact>
        </div>
    )
};

export default StdoutLayout;