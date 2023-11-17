import { Button, Space } from "antd";
import MonacoEditor from "../../../../../MonacoEditor";
import "./index.sass";
import { FullscreenOutlined, SyncOutlined } from "../../../../../Icon";

const LaunchLogLayout = () => {
    return (
        <div className="stream-detail-exploration-launch">
            <div className="actions">
                <Space>
                    <Button
                        size="small"
                        icon={<SyncOutlined />}
                    />
                    <Button
                        size="small"
                        icon={<FullscreenOutlined />}
                    />
                </Space>
            </div>
            <MonacoEditor
                options={{
                    minimap: {
                        enabled: false,
                    },
                    lineDecorationsWidth: 0,
                    wordWrap: "on",
                }}
                value={` seconds: [900]
end new OSSLogClient endTimeInMs:[1695779544074], costInMs:[22 ms]end new AbstractVvpLogAppender endTimeInMs:[1695779544079], costInMs:[46 ms]2023-09-27 09:52:24,292 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2023-09-27 09:52:24,305 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Preconfiguration: 
2023-09-27 09:52:24,309 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - 


RESOURCE_PARAMS extraction logs:
jvm_params: -Xmx469762048 -Xms469762048 -XX:MaxDirectMemorySize=134217728 -XX:MaxMetaspaceSize=268435456
dynamic_configs: -D jobmanager.memory.off-heap.size=134217728b -D jobmanager.memory.jvm-overhead.min=201326592b -D jobmanager.memory.jvm-metaspace.size=268435456b -D jobmanager.memory.heap.size=469762048b -D jobmanager.memory.jvm-overhead.max=201326592b
logs: WARN  [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:57: Line is not a key-value pair (missing space after ':'?)
INFO  [] - Loading configuration property: table.exec.operator-name.max-length, 10240
INFO  [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
INFO  [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
INFO  [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
INFO  [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
INFO  [] - Loading configuration property: high-availability.cluster-id, 9ddc3745-7453-4d4b-96ee-965d8b2d5f05
INFO  [] - Loading configuration property: jobmanager.rpc.address, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-jobmanager
INFO  [] - Loading configuration property: taskmanager.network.memory.max, 4g
INFO  [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
INFO  [] - Loading configuration property: high-availability.kubernetes.leader-election.lease-duration, 60 s
INFO  [] - Loading configuration property: kubernetes.cluster-id, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
INFO  [] - Loading configuration property: state.backend.gemini.vm.print.tick, 90
INFO  [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha
INFO  [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
INFO  [] - Loading configuration property: parallelism.default, 1
INFO  [] - Loading configuration property: kubernetes.namespace, vvp-workload
INFO  [] - Loading configuration property: metrics.reporters, jmx,promappmgr
INFO  [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
INFO  [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
INFO  [] - Loading configuration property: taskmanager.memory.process.size, 2048m
INFO  [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint
INFO  [] - Loading configuration property: table.exec.slot-sharing-group.prefer-heap-memory, 512m
INFO  [] - Loading configuration property: execution.checkpointing.tolerable-failed-checkpoints, 2147483647
INFO  [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/tm.yaml
INFO  [] - Loading configuration property: state.backend.incremental, true
INFO  [] - Loading configuration property: web.cancel.enable, false
INFO  [] - Loading configuration property: jobmanager.rpc.port, 6123
INFO  [] - Loading configuration property: execution.checkpointing.interval, 180s
INFO  [] - Loading configuration property: rest.port, 8081
INFO  [] - Loading configuration property: table.exec.state.ttl, 36 h
INFO  [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
INFO  [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
INFO  [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
INFO  [] - Loading configuration property: kubernetes.dns-policy, Default
INFO  [] - Loading configuration property: $internal.pipeline.job-id, 0e4eb4ec61d84ae9bf0edcaee4b7db5f
INFO  [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
INFO  [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
INFO  [] - Loading configuration property: web.submit.enable, false
INFO  [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
INFO  [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
INFO  [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
INFO  [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/jm.yaml
INFO  [] - Loading configuration property: blob.server.port, 6124
INFO  [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
INFO  [] - Loading configuration property: jobmanager.execution.failover-strategy, region
INFO  [] - Loading configuration property: jmx.server.port, 10000,10001-10500
INFO  [] - Loading configuration property: taskmanager.slot.timeout, 60 s
INFO  [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
INFO  [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
INFO  [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
INFO  [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
INFO  [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
INFO  [] - Loading configuration property: state.backend.gemini.restore.file-download.buffer.size, 512kb
INFO  [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
INFO  [] - Loading configuration property: execution.savepoint.ignore-unclaimed-state, true
INFO  [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.1-3-flink-1.17
INFO  [] - Loading configuration property: state.backend.gemini.restore.page-download.buffer.size, 16kb
INFO  [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
INFO  [] - Loading configuration property: high-availability.jobmanager.port, 6123
INFO  [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
INFO  [] - Loading configuration property: akka.ask.timeout, 120 s
INFO  [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
INFO  [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
INFO  [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
INFO  [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
INFO  [] - Loading configuration property: cluster.io-pool.size, 64
INFO  [] - Loading configuration property: execution.target, kubernetes-jobgraph
INFO  [] - Loading configuration property: jobmanager.memory.process.size, 1024m
INFO  [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
INFO  [] - Loading configuration property: taskmanager.rpc.port, 6122
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
INFO  [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
INFO  [] - Loading configuration property: akka.framesize, 100m
INFO  [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
INFO  [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
INFO  [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
INFO  [] - Loading configuration property: kubernetes.job-graph-file, local:///flink/usrlib/0e4eb4ec61d84ae9bf0edcaee4b7db5f.jobgraph
INFO  [] - Loading configuration property: daplatform.support-status, production
INFO  [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
INFO  [] - Loading configuration property: execution.checkpointing.externalized-checkpoint-retention, RETAIN_ON_CANCELLATION
INFO  [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
INFO  [] - Loading configuration property: execution.checkpointing.min-pause, 180s
INFO  [] - Loading configuration property: restart-strategy, fixed-delay
INFO  [] - Loading configuration property: taskmanager.network.retries, 3
INFO  [] - Loading configuration property: table.optimizer.window-join-enabled, false
INFO  [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
INFO  [] - Loading configuration property: high-availability.kubernetes.leader-election.renew-deadline, 60 s
INFO  [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
INFO  [] - The derived from fraction jvm overhead memory (102.400mb (107374184 bytes)) is less than its min value 192.000mb (201326592 bytes), min value will be used instead
INFO  [] - Final Master Memory configuration:
INFO  [] -   Total Process Memory: 1024.000mb (1073741824 bytes)
INFO  [] -     Total Flink Memory: 576.000mb (603979776 bytes)
INFO  [] -       JVM Heap:         448.000mb (469762048 bytes)
INFO  [] -       Off-heap:         128.000mb (134217728 bytes)
INFO  [] -     JVM Metaspace:      256.000mb (268435456 bytes)
INFO  [] -     JVM Overhead:       192.000mb (201326592 bytes)

2023-09-27 09:52:24,310 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2023-09-27 09:52:24,311 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Starting KubernetesJobGraphClusterEntrypoint (Version: 1.17-vvr-8.0.1-3-SNAPSHOT, Scala: 2.12, Rev:f2ca719, Date:2023-09-20T08:17:35+02:00)
2023-09-27 09:52:24,311 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  OS current user: flink
2023-09-27 09:52:24,608 [main] WARN  org.apache.hadoop.util.NativeCodeLoader                      [] - Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
2023-09-27 09:52:24,684 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Current Hadoop/Kerberos user: flink
2023-09-27 09:52:24,684 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JVM: OpenJDK 64-Bit Server VM - "Alibaba" - 1.8/25.102-b52
2023-09-27 09:52:24,689 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Arch: amd64
2023-09-27 09:52:24,689 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Maximum heap size: 436 MiBytes
2023-09-27 09:52:24,690 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JAVA_HOME: /usr/lib/ajdk-8_2_4-b52
2023-09-27 09:52:24,694 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Hadoop version: 3.1.3
2023-09-27 09:52:24,694 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JVM Options:
2023-09-27 09:52:24,694 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xmx469762048
2023-09-27 09:52:24,694 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xms469762048
2023-09-27 09:52:24,694 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:MaxDirectMemorySize=134217728
2023-09-27 09:52:24,695 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:MaxMetaspaceSize=268435456
2023-09-27 09:52:24,695 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog.file=/flink/log/flink--kubernetes-jobgraph-0-job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-548ffb9547-zmtjn.log
2023-09-27 09:52:24,695 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog4j.configuration=file:/flink/conf/log4j2.xml
2023-09-27 09:52:24,695 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog4j.configurationFile=file:/flink/conf/log4j2.xml
2023-09-27 09:52:24,695 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlogback.configurationFile=file:/flink/conf/logback-console.xml
2023-09-27 09:52:24,696 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstdout.file=/flink/log/flink--kubernetes-jobgraph-0-job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-548ffb9547-zmtjn.out
2023-09-27 09:52:24,696 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstderr.file=/flink/log/flink--kubernetes-jobgraph-0-job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-548ffb9547-zmtjn.err
2023-09-27 09:52:24,696 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djavax.net.ssl.keyStoreType=JKS
2023-09-27 09:52:24,696 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djavax.net.ssl.trustStoreType=JKS
2023-09-27 09:52:24,696 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog.file=/flink/log/flink.log
2023-09-27 09:52:24,696 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstdout.file=/flink/log/flink.out
2023-09-27 09:52:24,696 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djdk.tls.ephemeralDHKeySize=2048
2023-09-27 09:52:24,697 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dalicloud.sts.credential.provider=sts.file
2023-09-27 09:52:24,697 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential
2023-09-27 09:52:24,697 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dsts.provider.credential.expire.seconds=900
2023-09-27 09:52:24,697 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -verbose:gc
2023-09-27 09:52:24,697 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:NewRatio=3
2023-09-27 09:52:24,697 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:+PrintGCDetails
2023-09-27 09:52:24,698 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:+PrintGCDateStamps
2023-09-27 09:52:24,698 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:ParallelGCThreads=4
2023-09-27 09:52:24,698 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xss512k
2023-09-27 09:52:24,698 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dfile.encoding=UTF-8
2023-09-27 09:52:24,698 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dkubernetes.max.concurrent.requests=1000
2023-09-27 09:52:24,698 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xloggc:/opt/flink/log/jobmanager-gc.log
2023-09-27 09:52:24,698 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:+UseGCLogFileRotation
2023-09-27 09:52:24,699 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:NumberOfGCLogFiles=2
2023-09-27 09:52:24,699 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:GCLogFileSize=50M
2023-09-27 09:52:24,699 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -javaagent:/flink/opt/flink-resourceplan-applyagent-1.17-vvr-8.0.1-3-SNAPSHOT.jar
2023-09-27 09:52:24,699 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Program Arguments:
2023-09-27 09:52:24,700 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,701 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.off-heap.size=134217728b
2023-09-27 09:52:24,701 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,701 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-overhead.min=201326592b
2023-09-27 09:52:24,701 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,701 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-metaspace.size=268435456b
2023-09-27 09:52:24,701 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,701 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.heap.size=469762048b
2023-09-27 09:52:24,702 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,702 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-overhead.max=201326592b
2023-09-27 09:52:24,702 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Classpath: /flink/lib/celeborn-client-flink-1.17-shaded_2.12-0.3.0-1.2-SNAPSHOT.jar:/flink/lib/flink-cep-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-connector-files-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-csv-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-json-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-datadog-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-graphite-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-influxdb-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-kafka-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-kmonitor-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-log-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-prometheus-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-slf4j-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-statsd-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-queryable-state-runtime_*.jar:/flink/lib/flink-scala_2.12-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-shaded-hadoop-2-uber-3.1.3-10.0-SNAPSHOT.jar:/flink/lib/flink-statebackend-gemini-bundled_1.8-4.0.1-SNAPSHOT.jar:/flink/lib/flink-state-processor-api-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-table-api-java-uber-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-table-planner-loader-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-table-runtime-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/jersey-core-1.9.jar:/flink/lib/log4j-1.2-api-2.17.1.jar:/flink/lib/log4j-api-2.17.1.jar:/flink/lib/log4j-core-2.17.1.jar:/flink/lib/log4j-slf4j-impl-2.17.1.jar:/flink/lib/shuffle-plugin-1.1-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-hdfs-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-kafka-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-oss-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-sls-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/flink-dist-1.17-vvr-8.0.1-3-SNAPSHOT.jar:::::/flink/opt/flink-resourceplan-applyagent-1.17-vvr-8.0.1-3-SNAPSHOT.jar
2023-09-27 09:52:24,702 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2023-09-27 09:52:24,704 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Registered UNIX signal handlers for [TERM, HUP, INT]
2023-09-27 09:52:24,769 [main] WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:57: Line is not a key-value pair (missing space after ':'?)
2023-09-27 09:52:24,776 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2023-09-27 09:52:24,777 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:24,778 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2023-09-27 09:52:24,781 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2023-09-27 09:52:24,782 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2023-09-27 09:52:24,782 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2023-09-27 09:52:24,782 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, 9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:24,782 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-jobmanager
2023-09-27 09:52:24,782 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2023-09-27 09:52:24,782 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2023-09-27 09:52:24,782 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.lease-duration, 60 s
2023-09-27 09:52:24,782 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:24,783 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.vm.print.tick, 90
2023-09-27 09:52:24,783 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha
2023-09-27 09:52:24,783 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2023-09-27 09:52:24,783 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2023-09-27 09:52:24,783 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2023-09-27 09:52:24,783 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2023-09-27 09:52:24,783 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2023-09-27 09:52:24,784 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2023-09-27 09:52:24,784 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2023-09-27 09:52:24,784 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint
2023-09-27 09:52:24,784 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.slot-sharing-group.prefer-heap-memory, 512m
2023-09-27 09:52:24,784 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.tolerable-failed-checkpoints, 2147483647
2023-09-27 09:52:24,784 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/tm.yaml
2023-09-27 09:52:24,784 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.incremental, true
2023-09-27 09:52:24,785 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2023-09-27 09:52:24,785 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2023-09-27 09:52:24,785 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.interval, 180s
2023-09-27 09:52:24,785 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2023-09-27 09:52:24,785 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.state.ttl, 36 h
2023-09-27 09:52:24,785 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2023-09-27 09:52:24,786 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2023-09-27 09:52:24,786 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
2023-09-27 09:52:24,786 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2023-09-27 09:52:24,786 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 0e4eb4ec61d84ae9bf0edcaee4b7db5f
2023-09-27 09:52:24,786 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
2023-09-27 09:52:24,786 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2023-09-27 09:52:24,786 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2023-09-27 09:52:24,787 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2023-09-27 09:52:24,787 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
2023-09-27 09:52:24,787 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2023-09-27 09:52:24,787 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/jm.yaml
2023-09-27 09:52:24,787 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2023-09-27 09:52:24,787 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2023-09-27 09:52:24,787 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2023-09-27 09:52:24,787 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2023-09-27 09:52:24,788 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2023-09-27 09:52:24,788 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:24,788 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2023-09-27 09:52:24,788 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2023-09-27 09:52:24,788 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2023-09-27 09:52:24,788 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2023-09-27 09:52:24,788 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.file-download.buffer.size, 512kb
2023-09-27 09:52:24,788 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
2023-09-27 09:52:24,789 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.savepoint.ignore-unclaimed-state, true
2023-09-27 09:52:24,789 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.1-3-flink-1.17
2023-09-27 09:52:24,789 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.page-download.buffer.size, 16kb
2023-09-27 09:52:24,789 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2023-09-27 09:52:24,789 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2023-09-27 09:52:24,789 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2023-09-27 09:52:24,789 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2023-09-27 09:52:24,790 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2023-09-27 09:52:24,790 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2023-09-27 09:52:24,790 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2023-09-27 09:52:24,790 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2023-09-27 09:52:24,790 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2023-09-27 09:52:24,790 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-jobgraph
2023-09-27 09:52:24,790 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2023-09-27 09:52:24,791 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2023-09-27 09:52:24,791 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2023-09-27 09:52:24,791 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2023-09-27 09:52:24,791 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2023-09-27 09:52:24,791 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2023-09-27 09:52:24,791 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2023-09-27 09:52:24,791 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2023-09-27 09:52:24,791 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
2023-09-27 09:52:24,792 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.job-graph-file, local:///flink/usrlib/0e4eb4ec61d84ae9bf0edcaee4b7db5f.jobgraph
2023-09-27 09:52:24,792 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2023-09-27 09:52:24,792 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
2023-09-27 09:52:24,792 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.externalized-checkpoint-retention, RETAIN_ON_CANCELLATION
2023-09-27 09:52:24,792 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2023-09-27 09:52:24,792 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.min-pause, 180s
2023-09-27 09:52:24,793 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2023-09-27 09:52:24,793 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2023-09-27 09:52:24,793 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.optimizer.window-join-enabled, false
2023-09-27 09:52:24,793 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:24,793 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.renew-deadline, 60 s
2023-09-27 09:52:24,793 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:24,793 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
2023-09-27 09:52:24,794 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.off-heap.size, 134217728b
2023-09-27 09:52:24,794 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-overhead.min, 201326592b
2023-09-27 09:52:24,794 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-metaspace.size, 268435456b
2023-09-27 09:52:24,794 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.heap.size, 469762048b
2023-09-27 09:52:24,794 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-overhead.max, 201326592b
2023-09-27 09:52:25,260 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:25,291 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Starting KubernetesJobGraphClusterEntrypoint.
2023-09-27 09:52:25,338 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Install default filesystem.
2023-09-27 09:52:25,371 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: external-resource-gpu
2023-09-27 09:52:25,376 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-datadog
2023-09-27 09:52:25,377 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-graphite
2023-09-27 09:52:25,377 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-influx
2023-09-27 09:52:25,378 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-jmx
2023-09-27 09:52:25,378 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-log
2023-09-27 09:52:25,379 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-prometheus
2023-09-27 09:52:25,379 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-slf4j
2023-09-27 09:52:25,380 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-sls
2023-09-27 09:52:25,380 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-statsd
2023-09-27 09:52:25,380 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: oss-fs-hadoop
2023-09-27 09:52:25,381 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: pangu-fs
2023-09-27 09:52:25,381 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: s3-fs
start new AbstractVvpLogAppender startTimeInMs:[1695779545462][main:main] Abort continue initialization vvp log appender[OSS_ARCHIVE], currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.fs.osshadoop.OSSFileSystemFactory, class sun.reflect.NativeConstructorAccessorImpl, class sun.reflect.DelegatingConstructorAccessorImpl, class java.lang.reflect.Constructor, class java.lang.Class, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$1, class org.apache.flink.core.plugin.PluginLoader$ContextClassLoaderSettingIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.Iterators$ConcatenatedIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.TransformedIterator, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint], because isInitStrictly=true and the current classloader is different from thread context classloader, current classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2], context classloader:[org.apache.flink.core.plugin.PluginLoader$PluginClassLoader@4cb24e2]
First appender to file:[logs/ssc-m-default/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f/jobmanager-548ffb9547-zmtjn/20230927_095224-0], tid:[7][OSSLogAppender:main] doSend cost time(ms):[688], current log queue size:[71], total received/discarded:[171/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[100]
start new AbstractVvpLogAppender startTimeInMs:[1695779545599][main:main] Abort continue initialization vvp log appender[OSS_ARCHIVE], currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.fs.s3hadoop.common.AbstractS3FileSystemFactory, class sun.reflect.NativeConstructorAccessorImpl, class sun.reflect.DelegatingConstructorAccessorImpl, class java.lang.reflect.Constructor, class java.lang.Class, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$1, class org.apache.flink.core.plugin.PluginLoader$ContextClassLoaderSettingIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.Iterators$ConcatenatedIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.TransformedIterator, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint], because isInitStrictly=true and the current classloader is different from thread context classloader, current classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2], context classloader:[org.apache.flink.core.plugin.PluginLoader$PluginClassLoader@43588265]
2023-09-27 09:52:25,648 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Install security context.
2023-09-27 09:52:25,664 [main] WARN  org.apache.flink.runtime.util.HadoopUtils                    [] - Could not find Hadoop configuration via any of the supported methods (Flink configuration, environment variables).
2023-09-27 09:52:25,691 [main] INFO  org.apache.flink.runtime.security.modules.HadoopModule       [] - Hadoop user set to flink (auth:SIMPLE)
2023-09-27 09:52:25,691 [main] INFO  org.apache.flink.runtime.security.modules.HadoopModule       [] - Kerberos security is disabled.
2023-09-27 09:52:25,700 [main] INFO  org.apache.flink.runtime.security.modules.JaasModule         [] - Jaas file will be created as /opt/flink/flink-tmp-dir/jaas-8006930531137855692.conf.
2023-09-27 09:52:25,713 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Initializing cluster services.
2023-09-27 09:52:25,727 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Using working directory: WorkingDirectory(/opt/flink/flink-tmp-dir/jm_5b06ad48adf60a460443834fe26314c3).
2023-09-27 09:52:25,924 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
start new AbstractVvpLogAppender startTimeInMs:[1695779545965][main:main] Vvp log appender[OSS_ARCHIVE] (buildVersion:1.0.15-withkafka-SNAPSHOT, buildTime:20230206-170622, commitId:3a58395), currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils, class org.apache.flink.runtime.rpc.akka.AkkaRpcSystem, class org.apache.flink.runtime.rpc.akka.CleanupOnCloseRpcSystem, class org.apache.flink.runtime.rpc.RpcUtils, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint$$Lambda$126/1186328673, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext$$Lambda$127/277549599, class javax.security.auth.Subject, class org.apache.hadoop.security.UserGroupInformation, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint], isInitStrictly:[true], instance count:[4], current/context classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2]
start new OSSLogClient startTimeInMs:[1695779545972]First initialize oss client with sts credential, id: [STS.NSjQLU*****]. secret: [4z7S4YWEhc*****], token: [CAIShAJ1q6*****], expire seconds: [900]
end new OSSLogClient endTimeInMs:[1695779545978], costInMs:[6 ms]end new AbstractVvpLogAppender endTimeInMs:[1695779545980], costInMs:[15 ms]2023-09-27 09:52:26,089 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Trying to start actor system, external address 192.168.12.26:6123, bind address 0.0.0.0:6123.
2023-09-27 09:52:26,840 [flink-akka.actor.default-dispatcher-6] INFO  akka.event.slf4j.Slf4jLogger                                 [] - Slf4jLogger started
2023-09-27 09:52:26,871 [flink-akka.actor.default-dispatcher-6] INFO  akka.remote.RemoteActorRefProvider                           [] - Akka Cluster not in use - enabling unsafe features anyway because \`akka.remote.use-unsafe-remote-features-outside-cluster\` has been enabled.
2023-09-27 09:52:26,872 [flink-akka.actor.default-dispatcher-6] INFO  akka.remote.Remoting                                         [] - Starting remoting
2023-09-27 09:52:27,024 [flink-akka.actor.default-dispatcher-6] INFO  akka.remote.Remoting                                         [] - Remoting started; listening on addresses :[akka.tcp://flink@192.168.12.26:6123]
2023-09-27 09:52:27,141 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Actor system started at akka.tcp://flink@192.168.12.26:6123
2023-09-27 09:52:27,201 [main] INFO  org.apache.flink.management.jmx.JMXService                   [] - Started JMX server on port 10000.
2023-09-27 09:52:27,204 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Loading delegation token providers
2023-09-27 09:52:27,207 [main] WARN  org.apache.flink.runtime.util.HadoopUtils                    [] - Could not find Hadoop configuration via any of the supported methods (Flink configuration, environment variables).
2023-09-27 09:52:27,207 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider hadoopfs loaded and initialized
2023-09-27 09:52:27,208 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider hbase is disabled so not loaded
2023-09-27 09:52:27,208 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2023-09-27 09:52:27,209 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2023-09-27 09:52:27,215 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider s3-hadoop loaded and initialized
2023-09-27 09:52:27,216 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider s3-presto loaded and initialized
2023-09-27 09:52:27,216 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token providers loaded successfully
2023-09-27 09:52:27,217 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Loading delegation token receivers
2023-09-27 09:52:27,219 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver hadoopfs loaded and initialized
2023-09-27 09:52:27,219 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver hbase is disabled so not loaded
2023-09-27 09:52:27,219 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2023-09-27 09:52:27,220 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2023-09-27 09:52:27,222 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver s3-hadoop loaded and initialized
2023-09-27 09:52:27,222 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver s3-presto loaded and initialized
2023-09-27 09:52:27,222 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receivers loaded successfully
2023-09-27 09:52:27,222 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Checking provider and receiver instances consistency
2023-09-27 09:52:27,222 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Provider and receiver instances are consistent
2023-09-27 09:52:27,223 [main] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Multiple providers loaded with the same prefix: s3. This might lead to unintended consequences, please consider using only one of them.
2023-09-27 09:52:27,223 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Obtaining delegation tokens
2023-09-27 09:52:27,225 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation tokens obtained successfully
2023-09-27 09:52:27,225 [main] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - No tokens obtained so skipping notifications
2023-09-27 09:52:27,227 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:27,227 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
[OSSLogAppender:main] doSend cost time(ms):[38], current log queue size:[27], total received/discarded:[227/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[200]
2023-09-27 09:52:27,480 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:27,572 [main] INFO  org.apache.flink.fs.osshadoop.OSSFileSystemFactory           [] - fs.oss.accessKeyId is not set, using sts credential fetcher.
2023-09-27 09:52:27,687 [main] WARN  org.apache.hadoop.util.NativeCodeLoader                      [] - Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
2023-09-27 09:52:28,490 [main] INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Created BLOB server storage directory /opt/flink/flink-tmp-dir/jm_5b06ad48adf60a460443834fe26314c3/blobStorage
2023-09-27 09:52:28,494 [main] INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Started BLOB server at 0.0.0.0:6124 - max concurrent requests: 50 - max backlog: 1000
2023-09-27 09:52:28,546 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2023-09-27 09:52:28,546 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2023-09-27 09:52:28,546 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2023-09-27 09:52:28,547 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2023-09-27 09:52:28,547 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2023-09-27 09:52:28,547 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2023-09-27 09:52:28,548 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2023-09-27 09:52:28,548 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2023-09-27 09:52:28,548 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2023-09-27 09:52:28,548 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2023-09-27 09:52:28,548 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2023-09-27 09:52:28,549 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2023-09-27 09:52:28,549 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2023-09-27 09:52:28,579 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.datadog.DatadogHttpReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,585 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.graphite.GraphiteReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,586 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.influxdb.InfluxdbReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,587 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.log.LogReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,588 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,588 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusPushGatewayReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,588 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusPushGatewayLoadBalancedReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,589 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.slf4j.Slf4jReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,589 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.statsd.StatsDReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,590 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.sls.SLSReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
start new AbstractVvpLogAppender startTimeInMs:[1695779548622][main:main] Vvp log appender[OSS_ARCHIVE] (buildVersion:1.0.15-withkafka-SNAPSHOT, buildTime:20230206-170622, commitId:3a58395), currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.metrics.jmx.JMXReporter, class org.apache.flink.metrics.jmx.JMXReporterFactory, class org.apache.flink.metrics.jmx.JMXReporterFactory, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint$$Lambda$126/1186328673, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext$$Lambda$127/277549599, class javax.security.auth.Subject, class org.apache.hadoop.security.UserGroupInformation, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint], isInitStrictly:[true], instance count:[5], current/context classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2]
start new OSSLogClient startTimeInMs:[1695779548638]First initialize oss client with sts credential, id: [STS.NSjQLU*****]. secret: [4z7S4YWEhc*****], token: [CAIShAJ1q6*****], expire seconds: [900]
end new OSSLogClient endTimeInMs:[1695779548641], costInMs:[3 ms]end new AbstractVvpLogAppender endTimeInMs:[1695779548647], costInMs:[25 ms]2023-09-27 09:52:28,663 [main] WARN  org.apache.flink.metrics.jmx.JMXReporter                     [] - JMXReporter port config is deprecated. Please use: Key: 'jmx.server.port' , default: null (fallback keys: []) instead!
2023-09-27 09:52:28,664 [main] WARN  org.apache.flink.management.jmx.JMXService                   [] - JVM-wide JMXServer already started at port: 10000
2023-09-27 09:52:28,684 [main] INFO  org.apache.flink.metrics.prometheus.PrometheusReporter       [] - Started PrometheusReporter HTTP server on port 9999.
2023-09-27 09:52:28,686 [main] INFO  org.apache.flink.runtime.metrics.MetricRegistryImpl          [] - Reporting metrics for reporter jmx of type org.apache.flink.metrics.jmx.JMXReporter.
2023-09-27 09:52:28,686 [main] INFO  org.apache.flink.runtime.metrics.MetricRegistryImpl          [] - Reporting metrics for reporter promappmgr of type org.apache.flink.metrics.prometheus.PrometheusReporter.
2023-09-27 09:52:28,692 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Trying to start actor system, external address 192.168.12.26:0, bind address 0.0.0.0:0.
2023-09-27 09:52:28,708 [flink-metrics-6] INFO  akka.event.slf4j.Slf4jLogger                                 [] - Slf4jLogger started
2023-09-27 09:52:28,710 [flink-metrics-6] INFO  akka.remote.RemoteActorRefProvider                           [] - Akka Cluster not in use - enabling unsafe features anyway because \`akka.remote.use-unsafe-remote-features-outside-cluster\` has been enabled.
2023-09-27 09:52:28,710 [flink-metrics-6] INFO  akka.remote.Remoting                                         [] - Starting remoting
2023-09-27 09:52:28,752 [flink-metrics-6] INFO  akka.remote.Remoting                                         [] - Remoting started; listening on addresses :[akka.tcp://flink-metrics@192.168.12.26:43919]
2023-09-27 09:52:28,759 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Actor system started at akka.tcp://flink-metrics@192.168.12.26:43919
2023-09-27 09:52:28,782 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.metrics.dump.MetricQueryService at akka://flink-metrics/user/rpc/MetricQueryService .
2023-09-27 09:52:28,820 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'ClassesLoaded'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, ClassLoader]
2023-09-27 09:52:28,820 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'ClassesUnloaded'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, ClassLoader]
2023-09-27 09:52:28,820 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, GarbageCollector, ParNew]
2023-09-27 09:52:28,820 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, GarbageCollector, ParNew]
2023-09-27 09:52:28,820 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, GarbageCollector, ConcurrentMarkSweep]
2023-09-27 09:52:28,820 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, GarbageCollector, ConcurrentMarkSweep]
2023-09-27 09:52:28,820 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Heap]
2023-09-27 09:52:28,820 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Heap]
2023-09-27 09:52:28,821 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Heap]
2023-09-27 09:52:28,821 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, NonHeap]
2023-09-27 09:52:28,821 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, NonHeap]
2023-09-27 09:52:28,821 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, NonHeap]
2023-09-27 09:52:28,821 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Metaspace]
2023-09-27 09:52:28,821 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Metaspace]
2023-09-27 09:52:28,821 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Metaspace]
2023-09-27 09:52:28,822 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Direct]
2023-09-27 09:52:28,822 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'MemoryUsed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Direct]
2023-09-27 09:52:28,822 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'TotalCapacity'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Direct]
2023-09-27 09:52:28,822 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Mapped]
2023-09-27 09:52:28,822 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'MemoryUsed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Mapped]
2023-09-27 09:52:28,822 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'TotalCapacity'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Mapped]
2023-09-27 09:52:28,822 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Threads]
2023-09-27 09:52:28,822 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Load'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, CPU]
2023-09-27 09:52:28,822 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, CPU]
2023-09-27 09:52:28,966 [main] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesLeaderElector [] - Create KubernetesLeaderElector job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map with lock identity f275a41f-9d39-4e69-965b-27e4f17fb374.
2023-09-27 09:52:28,975 [main] INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'rest.port' instead of key 'rest.bind-port'
2023-09-27 09:52:28,981 [KubernetesClient-Informer-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:548dea79-9eee-483c-95aa-1f72368c5831
2023-09-27 09:52:29,021 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Upload directory /tmp/flink-web-f44b5947-2cec-4546-8206-167ec4c08a87/flink-web-upload does not exist. 
2023-09-27 09:52:29,029 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Created directory /tmp/flink-web-f44b5947-2cec-4546-8206-167ec4c08a87/flink-web-upload for file uploads.
2023-09-27 09:52:29,032 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Starting rest endpoint.
2023-09-27 09:52:29,259 [main] INFO  org.apache.flink.runtime.webmonitor.WebMonitorUtils          [] - Determined location of main cluster component log file: /flink/log/flink.log
2023-09-27 09:52:29,261 [main] INFO  org.apache.flink.runtime.webmonitor.WebMonitorUtils          [] - Determined location of main cluster component stdout file: /flink/log/flink.out
2023-09-27 09:52:29,281 [pool-8-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesLeaderElector [] - New leader elected f275a41f-9d39-4e69-965b-27e4f17fb374 for job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map.
2023-09-27 09:52:29,294 [main] WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:57: Line is not a key-value pair (missing space after ':'?)
2023-09-27 09:52:29,295 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2023-09-27 09:52:29,295 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:29,295 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2023-09-27 09:52:29,296 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2023-09-27 09:52:29,296 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2023-09-27 09:52:29,296 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2023-09-27 09:52:29,296 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, 9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:29,296 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-jobmanager
2023-09-27 09:52:29,296 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2023-09-27 09:52:29,296 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2023-09-27 09:52:29,296 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.lease-duration, 60 s
2023-09-27 09:52:29,297 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:29,297 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.vm.print.tick, 90
2023-09-27 09:52:29,297 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha
2023-09-27 09:52:29,297 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2023-09-27 09:52:29,297 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2023-09-27 09:52:29,297 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2023-09-27 09:52:29,297 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2023-09-27 09:52:29,297 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2023-09-27 09:52:29,298 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2023-09-27 09:52:29,298 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2023-09-27 09:52:29,298 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint
2023-09-27 09:52:29,298 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.slot-sharing-group.prefer-heap-memory, 512m
2023-09-27 09:52:29,298 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.tolerable-failed-checkpoints, 2147483647
2023-09-27 09:52:29,298 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/tm.yaml
2023-09-27 09:52:29,298 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.incremental, true
2023-09-27 09:52:29,298 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2023-09-27 09:52:29,298 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2023-09-27 09:52:29,299 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.interval, 180s
2023-09-27 09:52:29,299 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2023-09-27 09:52:29,299 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.state.ttl, 36 h
2023-09-27 09:52:29,299 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2023-09-27 09:52:29,299 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2023-09-27 09:52:29,299 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
2023-09-27 09:52:29,299 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2023-09-27 09:52:29,300 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 0e4eb4ec61d84ae9bf0edcaee4b7db5f
2023-09-27 09:52:29,300 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
2023-09-27 09:52:29,300 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2023-09-27 09:52:29,300 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2023-09-27 09:52:29,300 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2023-09-27 09:52:29,300 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
2023-09-27 09:52:29,300 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2023-09-27 09:52:29,300 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/jm.yaml
2023-09-27 09:52:29,301 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2023-09-27 09:52:29,301 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2023-09-27 09:52:29,301 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2023-09-27 09:52:29,301 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2023-09-27 09:52:29,301 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2023-09-27 09:52:29,301 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:29,301 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2023-09-27 09:52:29,302 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2023-09-27 09:52:29,302 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2023-09-27 09:52:29,302 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2023-09-27 09:52:29,302 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.file-download.buffer.size, 512kb
2023-09-27 09:52:29,302 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
2023-09-27 09:52:29,302 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.savepoint.ignore-unclaimed-state, true
2023-09-27 09:52:29,302 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.1-3-flink-1.17
2023-09-27 09:52:29,303 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.page-download.buffer.size, 16kb
2023-09-27 09:52:29,303 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2023-09-27 09:52:29,303 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2023-09-27 09:52:29,303 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2023-09-27 09:52:29,303 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2023-09-27 09:52:29,303 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2023-09-27 09:52:29,303 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2023-09-27 09:52:29,303 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2023-09-27 09:52:29,304 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2023-09-27 09:52:29,304 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2023-09-27 09:52:29,304 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-jobgraph
2023-09-27 09:52:29,304 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2023-09-27 09:52:29,304 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2023-09-27 09:52:29,304 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2023-09-27 09:52:29,304 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2023-09-27 09:52:29,304 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2023-09-27 09:52:29,304 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2023-09-27 09:52:29,305 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2023-09-27 09:52:29,305 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2023-09-27 09:52:29,305 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
2023-09-27 09:52:29,305 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.job-graph-file, local:///flink/usrlib/0e4eb4ec61d84ae9bf0edcaee4b7db5f.jobgraph
2023-09-27 09:52:29,305 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2023-09-27 09:52:29,305 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
2023-09-27 09:52:29,305 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.externalized-checkpoint-retention, RETAIN_ON_CANCELLATION
2023-09-27 09:52:29,305 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2023-09-27 09:52:29,306 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.min-pause, 180s
2023-09-27 09:52:29,306 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2023-09-27 09:52:29,306 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2023-09-27 09:52:29,306 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.optimizer.window-join-enabled, false
2023-09-27 09:52:29,306 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:29,306 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.renew-deadline, 60 s
2023-09-27 09:52:29,306 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:29,306 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
2023-09-27 09:52:29,307 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
[OSSLogAppender:main] doSend cost time(ms):[35], current log queue size:[82], total received/discarded:[382/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[300]
2023-09-27 09:52:29,460 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:29,461 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:29,468 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:29,666 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Rest endpoint listening at 192.168.12.26:8081
2023-09-27 09:52:29,670 [main] INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@75d0cac6.
2023-09-27 09:52:29,672 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Web frontend listening at http://192.168.12.26:8081.
2023-09-27 09:52:29,674 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - http://192.168.12.26:8081 was granted leadership with leaderSessionID=3d05da51-3c2b-400e-ba71-151ada81d509
2023-09-27 09:52:29,687 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'kubernetes.taskmanager.cpu' instead of proper key 'kubernetes.taskmanager.cpu.amount'
2023-09-27 09:52:29,690 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'taskmanager.network.memory.max' instead of proper key 'taskmanager.memory.network.max'
2023-09-27 09:52:29,690 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'taskmanager.network.memory.max' instead of proper key 'taskmanager.memory.network.max'
2023-09-27 09:52:29,703 [main] INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'taskmanager.numberOfTaskSlots' instead of key 'resource-allocation-strategy.dynamic-strategy.prefer-slots'
2023-09-27 09:52:29,704 [main] WARN  org.apache.flink.kubernetes.entrypoint.KubernetesResourceManagerFactory [] - Configured size for 'taskmanager.memory.process.size' is ignored. Total memory size for TaskManagers are dynamically decided in fine-grained resource management.
2023-09-27 09:52:29,747 [main] INFO  org.apache.flink.runtime.highavailability.FileSystemJobResultStore [] - Creating highly available job result storage directory at oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha/job-result-store/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:29,780 [main] INFO  org.apache.flink.fs.osshadoop.StsFetcherCredentialsProvider  [] - Old credential is going to expire. Fetch a new one.
2023-09-27 09:52:30,099 [main] INFO  org.apache.flink.runtime.highavailability.FileSystemJobResultStore [] - Created highly available job result storage directory at oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha/job-result-store/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:30,146 [main] INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@26361572.
2023-09-27 09:52:30,147 [main] INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Starting resource manager service.
2023-09-27 09:52:30,147 [main] INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@5dc8448b.
2023-09-27 09:52:30,149 [KubernetesClient-Informer-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:ce0210e5-a454-4f33-9d2b-0bd5167fe130
2023-09-27 09:52:30,149 [main] INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:30,149 [KubernetesClient-Informer-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:674c228f-2cd7-4983-8ee9-c9089d8b43cc
2023-09-27 09:52:30,150 [main] INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:30,152 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.dispatcher.runner.DefaultDispatcherRunner [] - DefaultDispatcherRunner was granted leadership with leader id 3d05da51-3c2b-400e-ba71-151ada81d509. Creating new DispatcherLeaderProcess.
2023-09-27 09:52:30,156 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.dispatcher.runner.JobDispatcherLeaderProcess [] - Start JobDispatcherLeaderProcess.
2023-09-27 09:52:30,168 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.jobmanager.DefaultJobGraphStore     [] - Retrieved job ids [] from KubernetesStateHandleStore{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}
[OSSLogAppender:main] doSend cost time(ms):[26], current log queue size:[6], total received/discarded:[406/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[400]
2023-09-27 09:52:30,355 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.jobmanager.DefaultJobGraphStore     [] - Added JobGraph(jobId: 0e4eb4ec61d84ae9bf0edcaee4b7db5f) to KubernetesStateHandleStore{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:30,375 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.dispatcher.MiniDispatcher at akka://flink/user/rpc/dispatcher_0 .
2023-09-27 09:52:30,409 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.execution.librarycache.BlobLibraryCacheManager [] - Create a new user code classloader for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f, URLs [file:../usrlib/ververica-connector-common-1.17-vvr-8.0.1-3-SNAPSHOT-jar-with-dependencies.jar].
2023-09-27 09:52:30,455 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.util.EncryptedFlinkUserCodeClassLoader      [] - Successfully loaded flink-decryption library
2023-09-27 09:52:30,461 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@3caee99.
2023-09-27 09:52:30,477 [pool-11-thread-1] INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Resource manager service is granted leadership with session id 3d05da51-3c2b-400e-ba71-151ada81d509.
2023-09-27 09:52:30,531 [pool-11-thread-1] WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:57: Line is not a key-value pair (missing space after ':'?)
2023-09-27 09:52:30,534 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2023-09-27 09:52:30,534 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:30,538 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2023-09-27 09:52:30,539 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2023-09-27 09:52:30,539 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2023-09-27 09:52:30,539 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2023-09-27 09:52:30,539 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, 9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:30,539 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-jobmanager
2023-09-27 09:52:30,539 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2023-09-27 09:52:30,539 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2023-09-27 09:52:30,540 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.lease-duration, 60 s
2023-09-27 09:52:30,540 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:30,540 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.vm.print.tick, 90
2023-09-27 09:52:30,540 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha
2023-09-27 09:52:30,540 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2023-09-27 09:52:30,541 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2023-09-27 09:52:30,541 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2023-09-27 09:52:30,541 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2023-09-27 09:52:30,541 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2023-09-27 09:52:30,541 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2023-09-27 09:52:30,542 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2023-09-27 09:52:30,542 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint
2023-09-27 09:52:30,542 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.slot-sharing-group.prefer-heap-memory, 512m
2023-09-27 09:52:30,542 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.tolerable-failed-checkpoints, 2147483647
2023-09-27 09:52:30,542 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/tm.yaml
2023-09-27 09:52:30,543 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.incremental, true
2023-09-27 09:52:30,543 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2023-09-27 09:52:30,543 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2023-09-27 09:52:30,546 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.interval, 180s
2023-09-27 09:52:30,546 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2023-09-27 09:52:30,547 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.state.ttl, 36 h
2023-09-27 09:52:30,547 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2023-09-27 09:52:30,547 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2023-09-27 09:52:30,547 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
2023-09-27 09:52:30,547 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2023-09-27 09:52:30,547 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 0e4eb4ec61d84ae9bf0edcaee4b7db5f
2023-09-27 09:52:30,547 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
2023-09-27 09:52:30,548 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2023-09-27 09:52:30,548 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2023-09-27 09:52:30,548 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2023-09-27 09:52:30,548 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
2023-09-27 09:52:30,548 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2023-09-27 09:52:30,548 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/jm.yaml
2023-09-27 09:52:30,548 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2023-09-27 09:52:30,548 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2023-09-27 09:52:30,548 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.file-download.buffer.size, 512kb
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.savepoint.ignore-unclaimed-state, true
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.1-3-flink-1.17
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.page-download.buffer.size, 16kb
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2023-09-27 09:52:30,549 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-jobgraph
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.job-graph-file, local:///flink/usrlib/0e4eb4ec61d84ae9bf0edcaee4b7db5f.jobgraph
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2023-09-27 09:52:30,550 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
2023-09-27 09:52:30,551 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.externalized-checkpoint-retention, RETAIN_ON_CANCELLATION
2023-09-27 09:52:30,551 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2023-09-27 09:52:30,554 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.min-pause, 180s
2023-09-27 09:52:30,554 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2023-09-27 09:52:30,554 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2023-09-27 09:52:30,554 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.optimizer.window-join-enabled, false
2023-09-27 09:52:30,554 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:30,554 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.renew-deadline, 60 s
2023-09-27 09:52:30,554 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:30,554 [pool-11-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
2023-09-27 09:52:30,557 [leadershipOperationExecutor-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMasterServiceLeadershipRunner [] - JobMasterServiceLeadershipRunner for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f was granted leadership with leader id 3d05da51-3c2b-400e-ba71-151ada81d509. Creating new JobMasterServiceProcess.
2023-09-27 09:52:30,573 [pool-11-thread-1] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager at akka://flink/user/rpc/resourcemanager_1 .
[OSSLogAppender:main] doSend cost time(ms):[31], current log queue size:[3], total received/discarded:[503/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[500]
2023-09-27 09:52:30,587 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Starting the resource manager.
2023-09-27 09:52:30,593 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.jobmaster.JobMaster at akka://flink/user/rpc/jobmanager_2 .
2023-09-27 09:52:30,601 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Initializing job 'eefef8ed-6597-4099-abe2-ffd3b880146a' (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:52:30,603 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Starting the slot manager.
2023-09-27 09:52:30,605 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Starting tokens update task
2023-09-27 09:52:30,605 [flink-akka.actor.default-dispatcher-6] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - No tokens obtained so skipping notifications
2023-09-27 09:52:30,605 [flink-akka.actor.default-dispatcher-6] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Tokens update task not started because either no tokens obtained or none of the tokens specified its renewal date
2023-09-27 09:52:30,636 [jobmanager-io-thread-1] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'restart-strategy' instead of proper key 'restart-strategy.type'
2023-09-27 09:52:30,637 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using restart back off time strategy FixedDelayRestartBackoffTimeStrategy(maxNumberRestartAttempts=2147483647, backoffTimeMS=10000) for eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:52:30,687 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.checkpoint.DefaultCompletedCheckpointStoreUtils [] - Recovering checkpoints from KubernetesStateHandleStore{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-0e4eb4ec61d84ae9bf0edcaee4b7db5f-config-map'}.
2023-09-27 09:52:30,698 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.checkpoint.DefaultCompletedCheckpointStoreUtils [] - Found 0 checkpoints in KubernetesStateHandleStore{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-0e4eb4ec61d84ae9bf0edcaee4b7db5f-config-map'}.
2023-09-27 09:52:30,698 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.checkpoint.DefaultCompletedCheckpointStoreUtils [] - Trying to fetch 0 checkpoints from storage.
2023-09-27 09:52:30,733 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Created execution graph a8a8736f4c0fef90b72942472a932741 for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:52:30,768 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Running initialization on master for job eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:52:30,769 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Successfully ran initialization on master in 0 ms.
2023-09-27 09:52:30,799 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.scheduler.adapter.DefaultExecutionTopology [] - Built 1 new pipelined regions in 2 ms, total 1 pipelined regions currently.
2023-09-27 09:52:30,885 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using job/cluster config to configure application-defined state backend: BundledGeminiStateBackend{checkpointStreamBackend=File State Backend (checkpoints: 'oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f', savepoints: 'oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05, fileStateThreshold: 20480), realGeminiStateBackend=null
2023-09-27 09:52:30,893 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using application-defined state backend: BundledGeminiStateBackend{checkpointStreamBackend=File State Backend (checkpoints: 'oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f', savepoints: 'oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05, fileStateThreshold: 20480), realGeminiStateBackend=null
2023-09-27 09:52:30,894 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.state.StateBackendLoader            [] - State backend loader loads the state backend as BundledGeminiStateBackend
2023-09-27 09:52:30,905 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using legacy state backend BundledGeminiStateBackend{checkpointStreamBackend=File State Backend (checkpoints: 'oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f', savepoints: 'oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05, fileStateThreshold: 20480), realGeminiStateBackend=null as Job checkpoint storage
2023-09-27 09:52:30,905 [jobmanager-io-thread-1] WARN  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Checkpoint storage passed via StreamExecutionEnvironment is ignored because legacy state backend 'com.alibaba.flink.statebackend.BundledGeminiStateBackend' is used. Legacy state backends can also be used as checkpoint storage and take precedence for backward-compatibility reasons.
2023-09-27 09:52:31,166 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.checkpoint.CheckpointCoordinator    [] - No checkpoint found during restore.
2023-09-27 09:52:31,184 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using failover strategy org.apache.flink.runtime.executiongraph.failover.flip1.RestartPipelinedRegionFailoverStrategy@1fe4fab8 for eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:52:31,262 [KubernetesClient-Informer-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:a5cf1ba3-9d1a-49aa-9f83-d6cc161ae5e1
2023-09-27 09:52:31,262 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:31,262 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Starting execution of job 'eefef8ed-6597-4099-abe2-ffd3b880146a' (0e4eb4ec61d84ae9bf0edcaee4b7db5f) under job master id ba71151ada81d5093d05da513c2b400e.
2023-09-27 09:52:31,268 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Starting scheduling with scheduling strategy [org.apache.flink.runtime.scheduler.strategy.PipelinedRegionSchedulingStrategy]
2023-09-27 09:52:31,269 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Job eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f) switched from state CREATED to RUNNING.
2023-09-27 09:52:31,289 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Source: datagen_source[2732] -> Calc[2733] -> Sink: print_table[2734] (1/1) (a8a8736f4c0fef90b72942472a932741_717c7b8afebbfb7137f6f0f99beb2a94_0_0) switched from CREATED to SCHEDULED.
2023-09-27 09:52:31,375 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Recovered 0 pods from previous attempts, current attempt id is 1.
2023-09-27 09:52:31,378 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Recovered 0 workers from previous attempt.
2023-09-27 09:52:31,416 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Connecting to ResourceManager akka.tcp://flink@192.168.12.26:6123/user/rpc/resourcemanager_1(ba71151ada81d5093d05da513c2b400e)
2023-09-27 09:52:31,424 [flink-akka.actor.default-dispatcher-6] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Resolved ResourceManager address, beginning registration
2023-09-27 09:52:31,429 [KubernetesClient-Informer-thread-1] INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:0216112a-3168-4703-9e82-1fa209881fba
2023-09-27 09:52:31,430 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:31,430 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Registering job manager ba71151ada81d5093d05da513c2b400e@akka.tcp://flink@192.168.12.26:6123/user/rpc/jobmanager_2 for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:52:31,442 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Registered job manager ba71151ada81d5093d05da513c2b400e@akka.tcp://flink@192.168.12.26:6123/user/rpc/jobmanager_2 for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:52:31,450 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - JobManager successfully registered at ResourceManager, leader id: ba71151ada81d5093d05da513c2b400e.
2023-09-27 09:52:31,453 [flink-akka.actor.default-dispatcher-18] INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Received resource requirements from job 0e4eb4ec61d84ae9bf0edcaee4b7db5f: [ResourceRequirement{resourceProfile=ResourceProfile{UNKNOWN}, numberOfRequiredSlots=1}]
2023-09-27 09:52:31,518 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Matching resource requirements against available resources.
2023-09-27 09:52:31,593 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - need request 1 new workers, current worker number 0, declared worker number 1
2023-09-27 09:52:31,595 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Requesting new worker with resource spec WorkerResourceSpec {cpuCores=1.0, taskHeapSize=537.600mb (563714445 bytes), taskOffHeapSize=0 bytes, networkMemSize=158.720mb (166429984 bytes), managedMemSize=634.880mb (665719939 bytes), numSlots=1}, current pending count: 1.
2023-09-27 09:52:31,607 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.externalresource.ExternalResourceUtils [] - Enabled external resources: []
2023-09-27 09:52:31,673 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.kubernetes.utils.KubernetesUtils            [] - The service account configured in pod template will be overwritten to 'vvr-task-manager' because of explicitly configured options.
2023-09-27 09:52:31,673 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.kubernetes.kubeclient.decorators.InitTaskManagerDecorator [] - The restart policy of TaskManager pod will be overwritten to 'never' since it should not be restarted.
2023-09-27 09:52:31,678 [flink-akka.actor.default-dispatcher-17] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'kubernetes.container.image' instead of proper key 'kubernetes.container.image.ref'
2023-09-27 09:52:31,678 [flink-akka.actor.default-dispatcher-17] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'kubernetes.container.image' instead of proper key 'kubernetes.container.image.ref'
2023-09-27 09:52:31,678 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.kubernetes.utils.KubernetesUtils            [] - The main container image configured in pod template will be overwritten to 'vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.1-3-flink-1.17' because of explicitly configured options.
2023-09-27 09:52:31,678 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.kubernetes.utils.KubernetesUtils            [] - The main container image pull policy configured in pod template will be overwritten to 'IfNotPresent' because of explicitly configured options.
2023-09-27 09:52:31,694 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Creating new TaskManager pod with name job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 and resource <2048,1.0>.
2023-09-27 09:52:31,952 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Pod job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 is created.
2023-09-27 09:52:32,145 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Received new TaskManager pod: job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1
2023-09-27 09:52:32,146 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Requested worker job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 with resource spec WorkerResourceSpec {cpuCores=1.0, taskHeapSize=537.600mb (563714445 bytes), taskOffHeapSize=0 bytes, networkMemSize=158.720mb (166429984 bytes), managedMemSize=634.880mb (665719939 bytes), numSlots=1}.`}
            />
        </div>
    );
};

export default LaunchLogLayout;
