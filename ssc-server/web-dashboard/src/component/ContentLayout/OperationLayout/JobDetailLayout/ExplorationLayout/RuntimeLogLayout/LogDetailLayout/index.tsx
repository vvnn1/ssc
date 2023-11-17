import { Breadcrumb, Pagination } from "antd";
import "./index.sass";
import { LeftSquareFilled } from "../../../../../../Icon";
import MonacoEditor from "../../../../../../MonacoEditor";
import { useHref } from "react-router-dom";

const LogDetailLayout = () => {
    return (
        <div className="job-detail-exploration-jm-log-detail">
            <div className="breadcrumb">
                <Breadcrumb
                    items={[
                        {
                            title: (
                                <>
                                    <LeftSquareFilled /> 日志列表
                                </>
                            ),
                            href: useHref("../."),
                        },
                        {
                            title: "20230927_095224-0",
                        },
                    ]}
                />

                <Pagination
                    simple
                    defaultCurrent={2}
                    total={50}
                />
            </div>
            <div className="editor-container">
                <MonacoEditor
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        lineDecorationsWidth: 0,
                        wordWrap: "on",
                    }}
                    value={`2023-09-27 09:52:24,292 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2023-09-27 09:52:24,305 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Preconfiguration: 
2023-09-27 09:52:24,309 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - 


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

2023-09-27 09:52:24,310 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2023-09-27 09:52:24,311 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Starting KubernetesJobGraphClusterEntrypoint (Version: 1.17-vvr-8.0.1-3-SNAPSHOT, Scala: 2.12, Rev:f2ca719, Date:2023-09-20T08:17:35+02:00)
2023-09-27 09:52:24,311 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  OS current user: flink
2023-09-27 09:52:24,608 WARN  org.apache.hadoop.util.NativeCodeLoader                      [] - Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
2023-09-27 09:52:24,684 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Current Hadoop/Kerberos user: flink
2023-09-27 09:52:24,684 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JVM: OpenJDK 64-Bit Server VM - "Alibaba" - 1.8/25.102-b52
2023-09-27 09:52:24,689 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Arch: amd64
2023-09-27 09:52:24,689 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Maximum heap size: 436 MiBytes
2023-09-27 09:52:24,690 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JAVA_HOME: /usr/lib/ajdk-8_2_4-b52
2023-09-27 09:52:24,694 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Hadoop version: 3.1.3
2023-09-27 09:52:24,694 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JVM Options:
2023-09-27 09:52:24,694 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xmx469762048
2023-09-27 09:52:24,694 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xms469762048
2023-09-27 09:52:24,694 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:MaxDirectMemorySize=134217728
2023-09-27 09:52:24,695 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:MaxMetaspaceSize=268435456
2023-09-27 09:52:24,695 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog.file=/flink/log/flink--kubernetes-jobgraph-0-job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-548ffb9547-zmtjn.log
2023-09-27 09:52:24,695 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog4j.configuration=file:/flink/conf/log4j2.xml
2023-09-27 09:52:24,695 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog4j.configurationFile=file:/flink/conf/log4j2.xml
2023-09-27 09:52:24,695 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlogback.configurationFile=file:/flink/conf/logback-console.xml
2023-09-27 09:52:24,696 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstdout.file=/flink/log/flink--kubernetes-jobgraph-0-job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-548ffb9547-zmtjn.out
2023-09-27 09:52:24,696 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstderr.file=/flink/log/flink--kubernetes-jobgraph-0-job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-548ffb9547-zmtjn.err
2023-09-27 09:52:24,696 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djavax.net.ssl.keyStoreType=JKS
2023-09-27 09:52:24,696 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djavax.net.ssl.trustStoreType=JKS
2023-09-27 09:52:24,696 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog.file=/flink/log/flink.log
2023-09-27 09:52:24,696 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstdout.file=/flink/log/flink.out
2023-09-27 09:52:24,696 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djdk.tls.ephemeralDHKeySize=2048
2023-09-27 09:52:24,697 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dalicloud.sts.credential.provider=sts.file
2023-09-27 09:52:24,697 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential
2023-09-27 09:52:24,697 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dsts.provider.credential.expire.seconds=900
2023-09-27 09:52:24,697 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -verbose:gc
2023-09-27 09:52:24,697 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:NewRatio=3
2023-09-27 09:52:24,697 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:+PrintGCDetails
2023-09-27 09:52:24,698 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:+PrintGCDateStamps
2023-09-27 09:52:24,698 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:ParallelGCThreads=4
2023-09-27 09:52:24,698 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xss512k
2023-09-27 09:52:24,698 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dfile.encoding=UTF-8
2023-09-27 09:52:24,698 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dkubernetes.max.concurrent.requests=1000
2023-09-27 09:52:24,698 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xloggc:/opt/flink/log/jobmanager-gc.log
2023-09-27 09:52:24,698 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:+UseGCLogFileRotation
2023-09-27 09:52:24,699 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:NumberOfGCLogFiles=2
2023-09-27 09:52:24,699 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:GCLogFileSize=50M
2023-09-27 09:52:24,699 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -javaagent:/flink/opt/flink-resourceplan-applyagent-1.17-vvr-8.0.1-3-SNAPSHOT.jar
2023-09-27 09:52:24,699 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Program Arguments:
2023-09-27 09:52:24,700 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,701 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.off-heap.size=134217728b
2023-09-27 09:52:24,701 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,701 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-overhead.min=201326592b
2023-09-27 09:52:24,701 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,701 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-metaspace.size=268435456b
2023-09-27 09:52:24,701 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,701 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.heap.size=469762048b
2023-09-27 09:52:24,702 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2023-09-27 09:52:24,702 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-overhead.max=201326592b
2023-09-27 09:52:24,702 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Classpath: /flink/lib/celeborn-client-flink-1.17-shaded_2.12-0.3.0-1.2-SNAPSHOT.jar:/flink/lib/flink-cep-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-connector-files-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-csv-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-json-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-datadog-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-graphite-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-influxdb-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-kafka-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-kmonitor-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-log-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-prometheus-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-slf4j-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-metrics-statsd-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-queryable-state-runtime_*.jar:/flink/lib/flink-scala_2.12-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-shaded-hadoop-2-uber-3.1.3-10.0-SNAPSHOT.jar:/flink/lib/flink-statebackend-gemini-bundled_1.8-4.0.1-SNAPSHOT.jar:/flink/lib/flink-state-processor-api-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-table-api-java-uber-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-table-planner-loader-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/flink-table-runtime-1.17-vvr-8.0.1-3-SNAPSHOT.jar:/flink/lib/jersey-core-1.9.jar:/flink/lib/log4j-1.2-api-2.17.1.jar:/flink/lib/log4j-api-2.17.1.jar:/flink/lib/log4j-core-2.17.1.jar:/flink/lib/log4j-slf4j-impl-2.17.1.jar:/flink/lib/shuffle-plugin-1.1-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-hdfs-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-kafka-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-oss-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-sls-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/flink-dist-1.17-vvr-8.0.1-3-SNAPSHOT.jar:::::/flink/opt/flink-resourceplan-applyagent-1.17-vvr-8.0.1-3-SNAPSHOT.jar
2023-09-27 09:52:24,702 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2023-09-27 09:52:24,704 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Registered UNIX signal handlers for [TERM, HUP, INT]
2023-09-27 09:52:24,769 WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:57: Line is not a key-value pair (missing space after ':'?)
2023-09-27 09:52:24,776 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2023-09-27 09:52:24,777 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:24,778 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2023-09-27 09:52:24,781 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2023-09-27 09:52:24,782 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2023-09-27 09:52:24,782 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2023-09-27 09:52:24,782 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, 9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:24,782 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-jobmanager
2023-09-27 09:52:24,782 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2023-09-27 09:52:24,782 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2023-09-27 09:52:24,782 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.lease-duration, 60 s
2023-09-27 09:52:24,782 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:24,783 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.vm.print.tick, 90
2023-09-27 09:52:24,783 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha
2023-09-27 09:52:24,783 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2023-09-27 09:52:24,783 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2023-09-27 09:52:24,783 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2023-09-27 09:52:24,783 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2023-09-27 09:52:24,783 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2023-09-27 09:52:24,784 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2023-09-27 09:52:24,784 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2023-09-27 09:52:24,784 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint
2023-09-27 09:52:24,784 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.slot-sharing-group.prefer-heap-memory, 512m
2023-09-27 09:52:24,784 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.tolerable-failed-checkpoints, 2147483647
2023-09-27 09:52:24,784 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/tm.yaml
2023-09-27 09:52:24,784 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.incremental, true
2023-09-27 09:52:24,785 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2023-09-27 09:52:24,785 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2023-09-27 09:52:24,785 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.interval, 180s
2023-09-27 09:52:24,785 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2023-09-27 09:52:24,785 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.state.ttl, 36 h
2023-09-27 09:52:24,785 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2023-09-27 09:52:24,786 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2023-09-27 09:52:24,786 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
2023-09-27 09:52:24,786 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2023-09-27 09:52:24,786 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 0e4eb4ec61d84ae9bf0edcaee4b7db5f
2023-09-27 09:52:24,786 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
2023-09-27 09:52:24,786 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2023-09-27 09:52:24,786 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2023-09-27 09:52:24,787 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2023-09-27 09:52:24,787 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
2023-09-27 09:52:24,787 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2023-09-27 09:52:24,787 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/jm.yaml
2023-09-27 09:52:24,787 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2023-09-27 09:52:24,787 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2023-09-27 09:52:24,787 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2023-09-27 09:52:24,787 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2023-09-27 09:52:24,788 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2023-09-27 09:52:24,788 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:24,788 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2023-09-27 09:52:24,788 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2023-09-27 09:52:24,788 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2023-09-27 09:52:24,788 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2023-09-27 09:52:24,788 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.file-download.buffer.size, 512kb
2023-09-27 09:52:24,788 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
2023-09-27 09:52:24,789 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.savepoint.ignore-unclaimed-state, true
2023-09-27 09:52:24,789 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.1-3-flink-1.17
2023-09-27 09:52:24,789 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.page-download.buffer.size, 16kb
2023-09-27 09:52:24,789 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2023-09-27 09:52:24,789 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2023-09-27 09:52:24,789 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2023-09-27 09:52:24,789 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2023-09-27 09:52:24,790 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2023-09-27 09:52:24,790 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2023-09-27 09:52:24,790 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2023-09-27 09:52:24,790 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2023-09-27 09:52:24,790 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2023-09-27 09:52:24,790 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-jobgraph
2023-09-27 09:52:24,790 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2023-09-27 09:52:24,791 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2023-09-27 09:52:24,791 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2023-09-27 09:52:24,791 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2023-09-27 09:52:24,791 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2023-09-27 09:52:24,791 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2023-09-27 09:52:24,791 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2023-09-27 09:52:24,791 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2023-09-27 09:52:24,791 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
2023-09-27 09:52:24,792 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.job-graph-file, local:///flink/usrlib/0e4eb4ec61d84ae9bf0edcaee4b7db5f.jobgraph
2023-09-27 09:52:24,792 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2023-09-27 09:52:24,792 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
2023-09-27 09:52:24,792 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.externalized-checkpoint-retention, RETAIN_ON_CANCELLATION
2023-09-27 09:52:24,792 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2023-09-27 09:52:24,792 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.min-pause, 180s
2023-09-27 09:52:24,793 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2023-09-27 09:52:24,793 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2023-09-27 09:52:24,793 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.optimizer.window-join-enabled, false
2023-09-27 09:52:24,793 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:24,793 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.renew-deadline, 60 s
2023-09-27 09:52:24,793 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:24,793 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
2023-09-27 09:52:24,794 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.off-heap.size, 134217728b
2023-09-27 09:52:24,794 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-overhead.min, 201326592b
2023-09-27 09:52:24,794 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-metaspace.size, 268435456b
2023-09-27 09:52:24,794 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.heap.size, 469762048b
2023-09-27 09:52:24,794 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-overhead.max, 201326592b
2023-09-27 09:52:25,260 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:25,291 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Starting KubernetesJobGraphClusterEntrypoint.
2023-09-27 09:52:25,338 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Install default filesystem.
2023-09-27 09:52:25,371 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: external-resource-gpu
2023-09-27 09:52:25,376 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-datadog
2023-09-27 09:52:25,377 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-graphite
2023-09-27 09:52:25,377 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-influx
2023-09-27 09:52:25,378 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-jmx
2023-09-27 09:52:25,378 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-log
2023-09-27 09:52:25,379 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-prometheus
2023-09-27 09:52:25,379 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-slf4j
2023-09-27 09:52:25,380 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-sls
2023-09-27 09:52:25,380 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-statsd
2023-09-27 09:52:25,380 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: oss-fs-hadoop
2023-09-27 09:52:25,381 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: pangu-fs
2023-09-27 09:52:25,381 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: s3-fs
2023-09-27 09:52:25,648 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Install security context.
2023-09-27 09:52:25,664 WARN  org.apache.flink.runtime.util.HadoopUtils                    [] - Could not find Hadoop configuration via any of the supported methods (Flink configuration, environment variables).
2023-09-27 09:52:25,691 INFO  org.apache.flink.runtime.security.modules.HadoopModule       [] - Hadoop user set to flink (auth:SIMPLE)
2023-09-27 09:52:25,691 INFO  org.apache.flink.runtime.security.modules.HadoopModule       [] - Kerberos security is disabled.
2023-09-27 09:52:25,700 INFO  org.apache.flink.runtime.security.modules.JaasModule         [] - Jaas file will be created as /opt/flink/flink-tmp-dir/jaas-8006930531137855692.conf.
2023-09-27 09:52:25,713 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Initializing cluster services.
2023-09-27 09:52:25,727 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Using working directory: WorkingDirectory(/opt/flink/flink-tmp-dir/jm_5b06ad48adf60a460443834fe26314c3).
2023-09-27 09:52:25,924 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:27,201 INFO  org.apache.flink.management.jmx.JMXService                   [] - Started JMX server on port 10000.
2023-09-27 09:52:27,204 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Loading delegation token providers
2023-09-27 09:52:27,207 WARN  org.apache.flink.runtime.util.HadoopUtils                    [] - Could not find Hadoop configuration via any of the supported methods (Flink configuration, environment variables).
2023-09-27 09:52:27,207 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider hadoopfs loaded and initialized
2023-09-27 09:52:27,208 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider hbase is disabled so not loaded
2023-09-27 09:52:27,208 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2023-09-27 09:52:27,209 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2023-09-27 09:52:27,215 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider s3-hadoop loaded and initialized
2023-09-27 09:52:27,216 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider s3-presto loaded and initialized
2023-09-27 09:52:27,216 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token providers loaded successfully
2023-09-27 09:52:27,217 INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Loading delegation token receivers
2023-09-27 09:52:27,219 INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver hadoopfs loaded and initialized
2023-09-27 09:52:27,219 INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver hbase is disabled so not loaded
2023-09-27 09:52:27,219 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2023-09-27 09:52:27,220 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2023-09-27 09:52:27,222 INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver s3-hadoop loaded and initialized
2023-09-27 09:52:27,222 INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver s3-presto loaded and initialized
2023-09-27 09:52:27,222 INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receivers loaded successfully
2023-09-27 09:52:27,222 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Checking provider and receiver instances consistency
2023-09-27 09:52:27,222 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Provider and receiver instances are consistent
2023-09-27 09:52:27,223 WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Multiple providers loaded with the same prefix: s3. This might lead to unintended consequences, please consider using only one of them.
2023-09-27 09:52:27,223 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Obtaining delegation tokens
2023-09-27 09:52:27,225 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation tokens obtained successfully
2023-09-27 09:52:27,225 WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - No tokens obtained so skipping notifications
2023-09-27 09:52:27,227 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:27,227 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:27,480 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:28,490 INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Created BLOB server storage directory /opt/flink/flink-tmp-dir/jm_5b06ad48adf60a460443834fe26314c3/blobStorage
2023-09-27 09:52:28,494 INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Started BLOB server at 0.0.0.0:6124 - max concurrent requests: 50 - max backlog: 1000
2023-09-27 09:52:28,546 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2023-09-27 09:52:28,546 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2023-09-27 09:52:28,546 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2023-09-27 09:52:28,547 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2023-09-27 09:52:28,547 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2023-09-27 09:52:28,547 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2023-09-27 09:52:28,548 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2023-09-27 09:52:28,548 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2023-09-27 09:52:28,548 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2023-09-27 09:52:28,548 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2023-09-27 09:52:28,548 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2023-09-27 09:52:28,549 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2023-09-27 09:52:28,549 INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2023-09-27 09:52:28,579 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.datadog.DatadogHttpReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,585 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.graphite.GraphiteReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,586 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.influxdb.InfluxdbReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,587 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.log.LogReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,588 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,588 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusPushGatewayReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,588 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusPushGatewayLoadBalancedReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,589 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.slf4j.Slf4jReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,589 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.statsd.StatsDReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,590 WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.sls.SLSReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2023-09-27 09:52:28,664 WARN  org.apache.flink.management.jmx.JMXService                   [] - JVM-wide JMXServer already started at port: 10000
2023-09-27 09:52:28,684 INFO  org.apache.flink.metrics.prometheus.PrometheusReporter       [] - Started PrometheusReporter HTTP server on port 9999.
2023-09-27 09:52:28,686 INFO  org.apache.flink.runtime.metrics.MetricRegistryImpl          [] - Reporting metrics for reporter jmx of type org.apache.flink.metrics.jmx.JMXReporter.
2023-09-27 09:52:28,686 INFO  org.apache.flink.runtime.metrics.MetricRegistryImpl          [] - Reporting metrics for reporter promappmgr of type org.apache.flink.metrics.prometheus.PrometheusReporter.
2023-09-27 09:52:28,820 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'ClassesLoaded'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, ClassLoader]
2023-09-27 09:52:28,820 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'ClassesUnloaded'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, ClassLoader]
2023-09-27 09:52:28,820 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, GarbageCollector, ParNew]
2023-09-27 09:52:28,820 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, GarbageCollector, ParNew]
2023-09-27 09:52:28,820 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, GarbageCollector, ConcurrentMarkSweep]
2023-09-27 09:52:28,820 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, GarbageCollector, ConcurrentMarkSweep]
2023-09-27 09:52:28,820 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Heap]
2023-09-27 09:52:28,820 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Heap]
2023-09-27 09:52:28,821 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Heap]
2023-09-27 09:52:28,821 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, NonHeap]
2023-09-27 09:52:28,821 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, NonHeap]
2023-09-27 09:52:28,821 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, NonHeap]
2023-09-27 09:52:28,821 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Metaspace]
2023-09-27 09:52:28,821 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Metaspace]
2023-09-27 09:52:28,821 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Metaspace]
2023-09-27 09:52:28,822 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Direct]
2023-09-27 09:52:28,822 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'MemoryUsed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Direct]
2023-09-27 09:52:28,822 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'TotalCapacity'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Direct]
2023-09-27 09:52:28,822 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Mapped]
2023-09-27 09:52:28,822 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'MemoryUsed'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Mapped]
2023-09-27 09:52:28,822 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'TotalCapacity'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Memory, Mapped]
2023-09-27 09:52:28,822 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, Threads]
2023-09-27 09:52:28,822 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Load'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, CPU]
2023-09-27 09:52:28,822 WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[192.168.12.26, jobmanager, Status, JVM, CPU]
2023-09-27 09:52:28,966 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesLeaderElector [] - Create KubernetesLeaderElector job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map with lock identity f275a41f-9d39-4e69-965b-27e4f17fb374.
2023-09-27 09:52:28,975 INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'rest.port' instead of key 'rest.bind-port'
2023-09-27 09:52:28,981 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:548dea79-9eee-483c-95aa-1f72368c5831
2023-09-27 09:52:29,021 INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Upload directory /tmp/flink-web-f44b5947-2cec-4546-8206-167ec4c08a87/flink-web-upload does not exist. 
2023-09-27 09:52:29,029 INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Created directory /tmp/flink-web-f44b5947-2cec-4546-8206-167ec4c08a87/flink-web-upload for file uploads.
2023-09-27 09:52:29,032 INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Starting rest endpoint.
2023-09-27 09:52:29,259 INFO  org.apache.flink.runtime.webmonitor.WebMonitorUtils          [] - Determined location of main cluster component log file: /flink/log/flink.log
2023-09-27 09:52:29,261 INFO  org.apache.flink.runtime.webmonitor.WebMonitorUtils          [] - Determined location of main cluster component stdout file: /flink/log/flink.out
2023-09-27 09:52:29,281 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesLeaderElector [] - New leader elected f275a41f-9d39-4e69-965b-27e4f17fb374 for job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map.
2023-09-27 09:52:29,294 WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:57: Line is not a key-value pair (missing space after ':'?)
2023-09-27 09:52:29,295 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2023-09-27 09:52:29,295 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:29,295 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2023-09-27 09:52:29,296 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2023-09-27 09:52:29,296 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2023-09-27 09:52:29,296 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2023-09-27 09:52:29,296 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, 9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:29,296 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-jobmanager
2023-09-27 09:52:29,296 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2023-09-27 09:52:29,296 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2023-09-27 09:52:29,296 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.lease-duration, 60 s
2023-09-27 09:52:29,297 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:29,297 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.vm.print.tick, 90
2023-09-27 09:52:29,297 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha
2023-09-27 09:52:29,297 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2023-09-27 09:52:29,297 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2023-09-27 09:52:29,297 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2023-09-27 09:52:29,297 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2023-09-27 09:52:29,297 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2023-09-27 09:52:29,298 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2023-09-27 09:52:29,298 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2023-09-27 09:52:29,298 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint
2023-09-27 09:52:29,298 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.slot-sharing-group.prefer-heap-memory, 512m
2023-09-27 09:52:29,298 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.tolerable-failed-checkpoints, 2147483647
2023-09-27 09:52:29,298 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/tm.yaml
2023-09-27 09:52:29,298 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.incremental, true
2023-09-27 09:52:29,298 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2023-09-27 09:52:29,298 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2023-09-27 09:52:29,299 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.interval, 180s
2023-09-27 09:52:29,299 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2023-09-27 09:52:29,299 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.state.ttl, 36 h
2023-09-27 09:52:29,299 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2023-09-27 09:52:29,299 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2023-09-27 09:52:29,299 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
2023-09-27 09:52:29,299 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2023-09-27 09:52:29,300 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 0e4eb4ec61d84ae9bf0edcaee4b7db5f
2023-09-27 09:52:29,300 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
2023-09-27 09:52:29,300 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2023-09-27 09:52:29,300 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2023-09-27 09:52:29,300 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2023-09-27 09:52:29,300 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
2023-09-27 09:52:29,300 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2023-09-27 09:52:29,300 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/jm.yaml
2023-09-27 09:52:29,301 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2023-09-27 09:52:29,301 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2023-09-27 09:52:29,301 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2023-09-27 09:52:29,301 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2023-09-27 09:52:29,301 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2023-09-27 09:52:29,301 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:29,301 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2023-09-27 09:52:29,302 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2023-09-27 09:52:29,302 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2023-09-27 09:52:29,302 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2023-09-27 09:52:29,302 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.file-download.buffer.size, 512kb
2023-09-27 09:52:29,302 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
2023-09-27 09:52:29,302 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.savepoint.ignore-unclaimed-state, true
2023-09-27 09:52:29,302 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.1-3-flink-1.17
2023-09-27 09:52:29,303 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.page-download.buffer.size, 16kb
2023-09-27 09:52:29,303 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2023-09-27 09:52:29,303 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2023-09-27 09:52:29,303 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2023-09-27 09:52:29,303 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2023-09-27 09:52:29,303 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2023-09-27 09:52:29,303 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2023-09-27 09:52:29,303 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2023-09-27 09:52:29,304 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2023-09-27 09:52:29,304 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2023-09-27 09:52:29,304 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-jobgraph
2023-09-27 09:52:29,304 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2023-09-27 09:52:29,304 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2023-09-27 09:52:29,304 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2023-09-27 09:52:29,304 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2023-09-27 09:52:29,304 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2023-09-27 09:52:29,304 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2023-09-27 09:52:29,305 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2023-09-27 09:52:29,305 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2023-09-27 09:52:29,305 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
2023-09-27 09:52:29,305 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.job-graph-file, local:///flink/usrlib/0e4eb4ec61d84ae9bf0edcaee4b7db5f.jobgraph
2023-09-27 09:52:29,305 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2023-09-27 09:52:29,305 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
2023-09-27 09:52:29,305 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.externalized-checkpoint-retention, RETAIN_ON_CANCELLATION
2023-09-27 09:52:29,305 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2023-09-27 09:52:29,306 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.min-pause, 180s
2023-09-27 09:52:29,306 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2023-09-27 09:52:29,306 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2023-09-27 09:52:29,306 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.optimizer.window-join-enabled, false
2023-09-27 09:52:29,306 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:29,306 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.renew-deadline, 60 s
2023-09-27 09:52:29,306 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:29,306 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
2023-09-27 09:52:29,307 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:29,460 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:29,461 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:29,468 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'high-availability' instead of proper key 'high-availability.type'
2023-09-27 09:52:29,666 INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Rest endpoint listening at 192.168.12.26:8081
2023-09-27 09:52:29,670 INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@75d0cac6.
2023-09-27 09:52:29,672 INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Web frontend listening at http://192.168.12.26:8081.
2023-09-27 09:52:29,674 INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - http://192.168.12.26:8081 was granted leadership with leaderSessionID=3d05da51-3c2b-400e-ba71-151ada81d509
2023-09-27 09:52:29,687 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'kubernetes.taskmanager.cpu' instead of proper key 'kubernetes.taskmanager.cpu.amount'
2023-09-27 09:52:29,690 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'taskmanager.network.memory.max' instead of proper key 'taskmanager.memory.network.max'
2023-09-27 09:52:29,690 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'taskmanager.network.memory.max' instead of proper key 'taskmanager.memory.network.max'
2023-09-27 09:52:29,703 INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'taskmanager.numberOfTaskSlots' instead of key 'resource-allocation-strategy.dynamic-strategy.prefer-slots'
2023-09-27 09:52:29,704 WARN  org.apache.flink.kubernetes.entrypoint.KubernetesResourceManagerFactory [] - Configured size for 'taskmanager.memory.process.size' is ignored. Total memory size for TaskManagers are dynamically decided in fine-grained resource management.
2023-09-27 09:52:29,747 INFO  org.apache.flink.runtime.highavailability.FileSystemJobResultStore [] - Creating highly available job result storage directory at oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha/job-result-store/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:30,099 INFO  org.apache.flink.runtime.highavailability.FileSystemJobResultStore [] - Created highly available job result storage directory at oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha/job-result-store/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:30,146 INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@26361572.
2023-09-27 09:52:30,147 INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Starting resource manager service.
2023-09-27 09:52:30,147 INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@5dc8448b.
2023-09-27 09:52:30,149 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:ce0210e5-a454-4f33-9d2b-0bd5167fe130
2023-09-27 09:52:30,149 INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:30,149 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:674c228f-2cd7-4983-8ee9-c9089d8b43cc
2023-09-27 09:52:30,150 INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:30,152 INFO  org.apache.flink.runtime.dispatcher.runner.DefaultDispatcherRunner [] - DefaultDispatcherRunner was granted leadership with leader id 3d05da51-3c2b-400e-ba71-151ada81d509. Creating new DispatcherLeaderProcess.
2023-09-27 09:52:30,156 INFO  org.apache.flink.runtime.dispatcher.runner.JobDispatcherLeaderProcess [] - Start JobDispatcherLeaderProcess.
2023-09-27 09:52:30,168 INFO  org.apache.flink.runtime.jobmanager.DefaultJobGraphStore     [] - Retrieved job ids [] from KubernetesStateHandleStore{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}
2023-09-27 09:52:30,355 INFO  org.apache.flink.runtime.jobmanager.DefaultJobGraphStore     [] - Added JobGraph(jobId: 0e4eb4ec61d84ae9bf0edcaee4b7db5f) to KubernetesStateHandleStore{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:30,409 INFO  org.apache.flink.runtime.execution.librarycache.BlobLibraryCacheManager [] - Create a new user code classloader for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f, URLs [file:../usrlib/ververica-connector-common-1.17-vvr-8.0.1-3-SNAPSHOT-jar-with-dependencies.jar].
2023-09-27 09:52:30,455 INFO  org.apache.flink.util.EncryptedFlinkUserCodeClassLoader      [] - Successfully loaded flink-decryption library
2023-09-27 09:52:30,461 INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Starting DefaultLeaderElectionService with org.apache.flink.runtime.leaderelection.MultipleComponentLeaderElectionDriverAdapter@3caee99.
2023-09-27 09:52:30,477 INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Resource manager service is granted leadership with session id 3d05da51-3c2b-400e-ba71-151ada81d509.
2023-09-27 09:52:30,531 WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:57: Line is not a key-value pair (missing space after ':'?)
2023-09-27 09:52:30,534 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2023-09-27 09:52:30,534 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:30,538 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2023-09-27 09:52:30,539 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2023-09-27 09:52:30,539 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2023-09-27 09:52:30,539 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2023-09-27 09:52:30,539 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, 9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:30,539 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-jobmanager
2023-09-27 09:52:30,539 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2023-09-27 09:52:30,539 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2023-09-27 09:52:30,540 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.lease-duration, 60 s
2023-09-27 09:52:30,540 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:30,540 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.vm.print.tick, 90
2023-09-27 09:52:30,540 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/ha
2023-09-27 09:52:30,540 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2023-09-27 09:52:30,541 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2023-09-27 09:52:30,541 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2023-09-27 09:52:30,541 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2023-09-27 09:52:30,541 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2023-09-27 09:52:30,541 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2023-09-27 09:52:30,542 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2023-09-27 09:52:30,542 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesJobGraphClusterEntrypoint
2023-09-27 09:52:30,542 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.slot-sharing-group.prefer-heap-memory, 512m
2023-09-27 09:52:30,542 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.tolerable-failed-checkpoints, 2147483647
2023-09-27 09:52:30,542 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/tm.yaml
2023-09-27 09:52:30,543 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.incremental, true
2023-09-27 09:52:30,543 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2023-09-27 09:52:30,543 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2023-09-27 09:52:30,546 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.interval, 180s
2023-09-27 09:52:30,546 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2023-09-27 09:52:30,547 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.state.ttl, 36 h
2023-09-27 09:52:30,547 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2023-09-27 09:52:30,547 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2023-09-27 09:52:30,547 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
2023-09-27 09:52:30,547 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2023-09-27 09:52:30,547 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 0e4eb4ec61d84ae9bf0edcaee4b7db5f
2023-09-27 09:52:30,547 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
2023-09-27 09:52:30,548 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2023-09-27 09:52:30,548 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2023-09-27 09:52:30,548 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2023-09-27 09:52:30,548 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory
2023-09-27 09:52:30,548 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2023-09-27 09:52:30,548 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/12cb8683-786f-4d78-a813-15d24019cee5/jm.yaml
2023-09-27 09:52:30,548 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2023-09-27 09:52:30,548 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2023-09-27 09:52:30,548 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.file-download.buffer.size, 512kb
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.savepoint.ignore-unclaimed-state, true
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.1-3-flink-1.17
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.backend.gemini.restore.page-download.buffer.size, 16kb
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2023-09-27 09:52:30,549 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-jobgraph
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.job-graph-file, local:///flink/usrlib/0e4eb4ec61d84ae9bf0edcaee4b7db5f.jobgraph
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2023-09-27 09:52:30,550 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
2023-09-27 09:52:30,551 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.externalized-checkpoint-retention, RETAIN_ON_CANCELLATION
2023-09-27 09:52:30,551 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2023-09-27 09:52:30,554 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.checkpointing.min-pause, 180s
2023-09-27 09:52:30,554 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2023-09-27 09:52:30,554 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2023-09-27 09:52:30,554 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.optimizer.window-join-enabled, false
2023-09-27 09:52:30,554 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2023-09-27 09:52:30,554 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.kubernetes.leader-election.renew-deadline, 60 s
2023-09-27 09:52:30,554 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f
2023-09-27 09:52:30,554 INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
2023-09-27 09:52:30,557 INFO  org.apache.flink.runtime.jobmaster.JobMasterServiceLeadershipRunner [] - JobMasterServiceLeadershipRunner for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f was granted leadership with leader id 3d05da51-3c2b-400e-ba71-151ada81d509. Creating new JobMasterServiceProcess.
2023-09-27 09:52:30,587 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Starting the resource manager.
2023-09-27 09:52:30,601 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Initializing job 'eefef8ed-6597-4099-abe2-ffd3b880146a' (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:52:30,603 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Starting the slot manager.
2023-09-27 09:52:30,605 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Starting tokens update task
2023-09-27 09:52:30,605 WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - No tokens obtained so skipping notifications
2023-09-27 09:52:30,605 WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Tokens update task not started because either no tokens obtained or none of the tokens specified its renewal date
2023-09-27 09:52:30,636 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'restart-strategy' instead of proper key 'restart-strategy.type'
2023-09-27 09:52:30,637 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using restart back off time strategy FixedDelayRestartBackoffTimeStrategy(maxNumberRestartAttempts=2147483647, backoffTimeMS=10000) for eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:52:30,687 INFO  org.apache.flink.runtime.checkpoint.DefaultCompletedCheckpointStoreUtils [] - Recovering checkpoints from KubernetesStateHandleStore{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-0e4eb4ec61d84ae9bf0edcaee4b7db5f-config-map'}.
2023-09-27 09:52:30,698 INFO  org.apache.flink.runtime.checkpoint.DefaultCompletedCheckpointStoreUtils [] - Found 0 checkpoints in KubernetesStateHandleStore{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-0e4eb4ec61d84ae9bf0edcaee4b7db5f-config-map'}.
2023-09-27 09:52:30,698 INFO  org.apache.flink.runtime.checkpoint.DefaultCompletedCheckpointStoreUtils [] - Trying to fetch 0 checkpoints from storage.
2023-09-27 09:52:30,733 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Created execution graph a8a8736f4c0fef90b72942472a932741 for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:52:30,768 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Running initialization on master for job eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:52:30,769 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Successfully ran initialization on master in 0 ms.
2023-09-27 09:52:30,799 INFO  org.apache.flink.runtime.scheduler.adapter.DefaultExecutionTopology [] - Built 1 new pipelined regions in 2 ms, total 1 pipelined regions currently.
2023-09-27 09:52:30,885 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using job/cluster config to configure application-defined state backend: BundledGeminiStateBackend{checkpointStreamBackend=File State Backend (checkpoints: 'oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f', savepoints: 'oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05, fileStateThreshold: 20480), realGeminiStateBackend=null
2023-09-27 09:52:30,893 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using application-defined state backend: BundledGeminiStateBackend{checkpointStreamBackend=File State Backend (checkpoints: 'oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f', savepoints: 'oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05, fileStateThreshold: 20480), realGeminiStateBackend=null
2023-09-27 09:52:30,894 INFO  org.apache.flink.runtime.state.StateBackendLoader            [] - State backend loader loads the state backend as BundledGeminiStateBackend
2023-09-27 09:52:30,905 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using legacy state backend BundledGeminiStateBackend{checkpointStreamBackend=File State Backend (checkpoints: 'oss://ssc-b/flink-jobs/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/checkpoints/jobs/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f', savepoints: 'oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/deployments/9ddc3745-7453-4d4b-96ee-965d8b2d5f05, fileStateThreshold: 20480), realGeminiStateBackend=null as Job checkpoint storage
2023-09-27 09:52:30,905 WARN  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Checkpoint storage passed via StreamExecutionEnvironment is ignored because legacy state backend 'com.alibaba.flink.statebackend.BundledGeminiStateBackend' is used. Legacy state backends can also be used as checkpoint storage and take precedence for backward-compatibility reasons.
2023-09-27 09:52:31,166 INFO  org.apache.flink.runtime.checkpoint.CheckpointCoordinator    [] - No checkpoint found during restore.
2023-09-27 09:52:31,184 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using failover strategy org.apache.flink.runtime.executiongraph.failover.flip1.RestartPipelinedRegionFailoverStrategy@1fe4fab8 for eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:52:31,262 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:a5cf1ba3-9d1a-49aa-9f83-d6cc161ae5e1
2023-09-27 09:52:31,262 INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:31,262 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Starting execution of job 'eefef8ed-6597-4099-abe2-ffd3b880146a' (0e4eb4ec61d84ae9bf0edcaee4b7db5f) under job master id ba71151ada81d5093d05da513c2b400e.
2023-09-27 09:52:31,268 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Starting scheduling with scheduling strategy [org.apache.flink.runtime.scheduler.strategy.PipelinedRegionSchedulingStrategy]
2023-09-27 09:52:31,269 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Job eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f) switched from state CREATED to RUNNING.
2023-09-27 09:52:31,289 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Source: datagen_source[2732] -> Calc[2733] -> Sink: print_table[2734] (1/1) (a8a8736f4c0fef90b72942472a932741_717c7b8afebbfb7137f6f0f99beb2a94_0_0) switched from CREATED to SCHEDULED.
2023-09-27 09:52:31,375 INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Recovered 0 pods from previous attempts, current attempt id is 1.
2023-09-27 09:52:31,378 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Recovered 0 workers from previous attempt.
2023-09-27 09:52:31,416 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Connecting to ResourceManager akka.tcp://flink@192.168.12.26:6123/user/rpc/resourcemanager_1(ba71151ada81d5093d05da513c2b400e)
2023-09-27 09:52:31,424 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Resolved ResourceManager address, beginning registration
2023-09-27 09:52:31,429 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Starting to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:0216112a-3168-4703-9e82-1fa209881fba
2023-09-27 09:52:31,430 INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Starting DefaultLeaderRetrievalService with KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:52:31,430 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Registering job manager ba71151ada81d5093d05da513c2b400e@akka.tcp://flink@192.168.12.26:6123/user/rpc/jobmanager_2 for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:52:31,442 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Registered job manager ba71151ada81d5093d05da513c2b400e@akka.tcp://flink@192.168.12.26:6123/user/rpc/jobmanager_2 for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:52:31,450 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - JobManager successfully registered at ResourceManager, leader id: ba71151ada81d5093d05da513c2b400e.
2023-09-27 09:52:31,453 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Received resource requirements from job 0e4eb4ec61d84ae9bf0edcaee4b7db5f: [ResourceRequirement{resourceProfile=ResourceProfile{UNKNOWN}, numberOfRequiredSlots=1}]
2023-09-27 09:52:31,518 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Matching resource requirements against available resources.
2023-09-27 09:52:31,593 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - need request 1 new workers, current worker number 0, declared worker number 1
2023-09-27 09:52:31,595 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Requesting new worker with resource spec WorkerResourceSpec {cpuCores=1.0, taskHeapSize=537.600mb (563714445 bytes), taskOffHeapSize=0 bytes, networkMemSize=158.720mb (166429984 bytes), managedMemSize=634.880mb (665719939 bytes), numSlots=1}, current pending count: 1.
2023-09-27 09:52:31,607 INFO  org.apache.flink.runtime.externalresource.ExternalResourceUtils [] - Enabled external resources: []
2023-09-27 09:52:31,673 INFO  org.apache.flink.kubernetes.utils.KubernetesUtils            [] - The service account configured in pod template will be overwritten to 'vvr-task-manager' because of explicitly configured options.
2023-09-27 09:52:31,673 INFO  org.apache.flink.kubernetes.kubeclient.decorators.InitTaskManagerDecorator [] - The restart policy of TaskManager pod will be overwritten to 'never' since it should not be restarted.
2023-09-27 09:52:31,678 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'kubernetes.container.image' instead of proper key 'kubernetes.container.image.ref'
2023-09-27 09:52:31,678 WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'kubernetes.container.image' instead of proper key 'kubernetes.container.image.ref'
2023-09-27 09:52:31,678 INFO  org.apache.flink.kubernetes.utils.KubernetesUtils            [] - The main container image configured in pod template will be overwritten to 'vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.1-3-flink-1.17' because of explicitly configured options.
2023-09-27 09:52:31,678 INFO  org.apache.flink.kubernetes.utils.KubernetesUtils            [] - The main container image pull policy configured in pod template will be overwritten to 'IfNotPresent' because of explicitly configured options.
2023-09-27 09:52:31,694 INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Creating new TaskManager pod with name job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 and resource <2048,1.0>.
2023-09-27 09:52:31,952 INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Pod job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 is created.
2023-09-27 09:52:32,145 INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Received new TaskManager pod: job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1
2023-09-27 09:52:32,146 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Requested worker job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 with resource spec WorkerResourceSpec {cpuCores=1.0, taskHeapSize=537.600mb (563714445 bytes), taskOffHeapSize=0 bytes, networkMemSize=158.720mb (166429984 bytes), managedMemSize=634.880mb (665719939 bytes), numSlots=1}.
2023-09-27 09:52:49,554 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Registering TaskManager with ResourceID job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 (akka.tcp://flink@192.168.12.27:6122/user/rpc/taskmanager_0) at ResourceManager
2023-09-27 09:52:49,575 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Registering task executor job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 under daa3758ce54c839ded61da4ae007e111 at the slot manager.
2023-09-27 09:52:49,577 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.DefaultSlotStatusSyncer [] - Starting allocation of slot 7aa630a49b31b0a9959b949374996b62 from job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f with resource profile ResourceProfile{cpuCores=1, taskHeapMemory=537.600mb (563714445 bytes), taskOffHeapMemory=0 bytes, managedMemory=634.880mb (665719939 bytes), networkMemory=158.720mb (166429984 bytes)}.
2023-09-27 09:52:49,615 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Worker job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 is registered.
2023-09-27 09:52:49,618 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Worker job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 with resource spec WorkerResourceSpec {cpuCores=1.0, taskHeapSize=537.600mb (563714445 bytes), taskOffHeapSize=0 bytes, networkMemSize=158.720mb (166429984 bytes), managedMemSize=634.880mb (665719939 bytes), numSlots=1} was requested in current attempt. Current pending count after registering: 0.
2023-09-27 09:52:49,674 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Source: datagen_source[2732] -> Calc[2733] -> Sink: print_table[2734] (1/1) (a8a8736f4c0fef90b72942472a932741_717c7b8afebbfb7137f6f0f99beb2a94_0_0) switched from SCHEDULED to DEPLOYING.
2023-09-27 09:52:49,674 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Deploying Source: datagen_source[2732] -> Calc[2733] -> Sink: print_table[2734] (1/1) (attempt #0) with attempt id a8a8736f4c0fef90b72942472a932741_717c7b8afebbfb7137f6f0f99beb2a94_0_0 and vertex id 717c7b8afebbfb7137f6f0f99beb2a94_0 to job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 @ 192.168.12.27 (dataPort=45869) with allocation id 7aa630a49b31b0a9959b949374996b62
2023-09-27 09:52:49,984 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Source: datagen_source[2732] -> Calc[2733] -> Sink: print_table[2734] (1/1) (a8a8736f4c0fef90b72942472a932741_717c7b8afebbfb7137f6f0f99beb2a94_0_0) switched from DEPLOYING to INITIALIZING.
2023-09-27 09:52:50,384 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Source: datagen_source[2732] -> Calc[2733] -> Sink: print_table[2734] (1/1) (a8a8736f4c0fef90b72942472a932741_717c7b8afebbfb7137f6f0f99beb2a94_0_0) switched from INITIALIZING to RUNNING.
2023-09-27 09:53:17,972 WARN  org.apache.flink.runtime.taskmanager.TaskManagerLocation     [] - No hostname could be resolved for the IP address 192.168.12.27, using IP address as host name. Local input split assignment (such as for HDFS files) may be impacted.
2023-09-27 09:54:10,532 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Job eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f) switched from state RUNNING to CANCELLING.
2023-09-27 09:54:10,533 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Source: datagen_source[2732] -> Calc[2733] -> Sink: print_table[2734] (1/1) (a8a8736f4c0fef90b72942472a932741_717c7b8afebbfb7137f6f0f99beb2a94_0_0) switched from RUNNING to CANCELING.
2023-09-27 09:54:10,557 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Source: datagen_source[2732] -> Calc[2733] -> Sink: print_table[2734] (1/1) (a8a8736f4c0fef90b72942472a932741_717c7b8afebbfb7137f6f0f99beb2a94_0_0) switched from CANCELING to CANCELED.
2023-09-27 09:54:10,562 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Clearing resource requirements of job 0e4eb4ec61d84ae9bf0edcaee4b7db5f
2023-09-27 09:54:10,563 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedTaskManagerTracker [] - Clear all pending allocations for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:54:10,566 INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Job eefef8ed-6597-4099-abe2-ffd3b880146a (0e4eb4ec61d84ae9bf0edcaee4b7db5f) switched from state CANCELLING to CANCELED.
2023-09-27 09:54:10,567 INFO  org.apache.flink.runtime.checkpoint.CheckpointCoordinator    [] - Stopping checkpoint coordinator for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:54:10,596 INFO  org.apache.flink.runtime.dispatcher.MiniDispatcher           [] - Job 0e4eb4ec61d84ae9bf0edcaee4b7db5f reached terminal state CANCELED.
2023-09-27 09:54:10,941 INFO  org.apache.flink.runtime.dispatcher.MiniDispatcher           [] - Job 0e4eb4ec61d84ae9bf0edcaee4b7db5f has been registered for cleanup in the JobResultStore after reaching a terminal state.
2023-09-27 09:54:10,945 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Stopping the JobMaster for job 'eefef8ed-6597-4099-abe2-ffd3b880146a' (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:54:10,966 INFO  org.apache.flink.runtime.checkpoint.DefaultCompletedCheckpointStore [] - Shutting down
2023-09-27 09:54:10,966 INFO  org.apache.flink.runtime.checkpoint.DefaultCompletedCheckpointStore [] - Retaining checkpoints {}
2023-09-27 09:54:10,967 INFO  org.apache.flink.kubernetes.highavailability.KubernetesCheckpointIDCounter [] - Shutting down.
2023-09-27 09:54:10,967 INFO  org.apache.flink.kubernetes.highavailability.KubernetesCheckpointIDCounter [] - Removing counter from ConfigMap job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-0e4eb4ec61d84ae9bf0edcaee4b7db5f-config-map
2023-09-27 09:54:11,002 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Disconnect TaskExecutor job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1 because: Stopping JobMaster for job 'eefef8ed-6597-4099-abe2-ffd3b880146a' (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:54:11,003 INFO  org.apache.flink.runtime.jobmaster.slotpool.DefaultDeclarativeSlotPool [] - Releasing slot [7aa630a49b31b0a9959b949374996b62].
2023-09-27 09:54:11,008 INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Close ResourceManager connection 5b06ad48adf60a460443834fe26314c3: Stopping JobMaster for job 'eefef8ed-6597-4099-abe2-ffd3b880146a' (0e4eb4ec61d84ae9bf0edcaee4b7db5f).
2023-09-27 09:54:11,009 INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Stopping DefaultLeaderRetrievalService.
2023-09-27 09:54:11,010 INFO  org.apache.flink.kubernetes.highavailability.KubernetesLeaderRetrievalDriver [] - Stopping KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:54:11,011 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Stopped to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:0216112a-3168-4703-9e82-1fa209881fba
2023-09-27 09:54:11,011 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Disconnect job manager ba71151ada81d5093d05da513c2b400e@akka.tcp://flink@192.168.12.26:6123/user/rpc/jobmanager_2 for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f from the resource manager.
2023-09-27 09:54:11,011 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedTaskManagerTracker [] - Clear all pending allocations for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:54:11,011 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedTaskManagerTracker [] - Clear all pending allocations for job 0e4eb4ec61d84ae9bf0edcaee4b7db5f.
2023-09-27 09:54:11,012 INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Stopping DefaultLeaderRetrievalService.
2023-09-27 09:54:11,012 INFO  org.apache.flink.kubernetes.highavailability.KubernetesLeaderRetrievalDriver [] - Stopping KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:54:11,012 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Stopped to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:a5cf1ba3-9d1a-49aa-9f83-d6cc161ae5e1
2023-09-27 09:54:11,018 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.DefaultSlotStatusSyncer [] - Freeing slot 7aa630a49b31b0a9959b949374996b62.
2023-09-27 09:54:11,044 INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Stopping DefaultLeaderElectionService.
2023-09-27 09:54:11,324 INFO  org.apache.flink.runtime.jobmanager.DefaultJobGraphStore     [] - Removed job graph 0e4eb4ec61d84ae9bf0edcaee4b7db5f from KubernetesStateHandleStore{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:54:11,432 INFO  org.apache.flink.runtime.dispatcher.MiniDispatcher           [] - Shutting down cluster after job with state CANCELED, jobCancelled: true, executionMode: DETACHED
2023-09-27 09:54:11,518 INFO  org.apache.flink.kubernetes.utils.KubernetesUtilsInternal    [] - Write {diagnostics=null, applicationStatus=CANCELED} to ConfigMap application-status successfully
2023-09-27 09:54:11,519 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Shutting KubernetesJobGraphClusterEntrypoint down with application status CANCELED. Diagnostics null.
2023-09-27 09:54:11,521 INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Shutting down rest endpoint.
2023-09-27 09:54:11,549 INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Removing cache directory /tmp/flink-web-f44b5947-2cec-4546-8206-167ec4c08a87/flink-web-ui
2023-09-27 09:54:11,549 INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Stopping DefaultLeaderElectionService.
2023-09-27 09:54:11,576 INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Shut down complete.
2023-09-27 09:54:11,578 INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Shut down cluster because application is in CANCELED, diagnostics null.
2023-09-27 09:54:11,578 INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Deregistering Flink Kubernetes cluster, clusterId: job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f, diagnostics: 
2023-09-27 09:54:11,618 INFO  org.apache.flink.runtime.entrypoint.component.DispatcherResourceManagerComponent [] - Closing components.
2023-09-27 09:54:11,618 INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Stopping DefaultLeaderRetrievalService.
2023-09-27 09:54:11,618 INFO  org.apache.flink.kubernetes.highavailability.KubernetesLeaderRetrievalDriver [] - Stopping KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:54:11,619 INFO  org.apache.flink.runtime.leaderretrieval.DefaultLeaderRetrievalService [] - Stopping DefaultLeaderRetrievalService.
2023-09-27 09:54:11,619 INFO  org.apache.flink.kubernetes.highavailability.KubernetesLeaderRetrievalDriver [] - Stopping KubernetesLeaderRetrievalDriver{configMapName='job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map'}.
2023-09-27 09:54:11,619 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Stopped to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:674c228f-2cd7-4983-8ee9-c9089d8b43cc
2023-09-27 09:54:11,619 INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Stopping DefaultLeaderElectionService.
2023-09-27 09:54:11,619 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Stopped to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:ce0210e5-a454-4f33-9d2b-0bd5167fe130
2023-09-27 09:54:11,648 INFO  org.apache.flink.runtime.dispatcher.runner.JobDispatcherLeaderProcess [] - Stopping JobDispatcherLeaderProcess.
2023-09-27 09:54:11,649 INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Stopping resource manager service.
2023-09-27 09:54:11,650 INFO  org.apache.flink.runtime.leaderelection.DefaultLeaderElectionService [] - Stopping DefaultLeaderElectionService.
2023-09-27 09:54:11,650 INFO  org.apache.flink.runtime.dispatcher.MiniDispatcher           [] - Stopping dispatcher akka.tcp://flink@192.168.12.26:6123/user/rpc/dispatcher_0.
2023-09-27 09:54:11,650 INFO  org.apache.flink.runtime.dispatcher.MiniDispatcher           [] - Stopping all currently running jobs of dispatcher akka.tcp://flink@192.168.12.26:6123/user/rpc/dispatcher_0.
2023-09-27 09:54:11,656 INFO  org.apache.flink.runtime.dispatcher.MiniDispatcher           [] - Stopped dispatcher akka.tcp://flink@192.168.12.26:6123/user/rpc/dispatcher_0.
2023-09-27 09:54:11,663 INFO  org.apache.flink.runtime.jobmanager.DefaultJobGraphStore     [] - Stopping DefaultJobGraphStore.
2023-09-27 09:54:11,692 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Stopping credential renewal
2023-09-27 09:54:11,692 INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Stopped credential renewal
2023-09-27 09:54:11,692 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Closing the slot manager.
2023-09-27 09:54:11,692 INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Suspending the slot manager.
2023-09-27 09:54:11,695 INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Stopped BLOB server at 0.0.0.0:6124
2023-09-27 09:54:11,696 INFO  org.apache.flink.kubernetes.highavailability.KubernetesMultipleComponentLeaderElectionHaServices [] - Close and clean up all data for KubernetesMultipleComponentLeaderElectionHaServices.
2023-09-27 09:54:11,696 INFO  org.apache.flink.runtime.leaderelection.DefaultMultipleComponentLeaderElectionService [] - Closing DefaultMultipleComponentLeaderElectionService.
2023-09-27 09:54:11,696 INFO  org.apache.flink.kubernetes.highavailability.KubernetesMultipleComponentLeaderElectionDriver [] - Closing org.apache.flink.kubernetes.highavailability.KubernetesMultipleComponentLeaderElectionDriver@21fb5ade.
2023-09-27 09:54:11,697 INFO  org.apache.flink.kubernetes.kubeclient.resources.KubernetesConfigMapSharedInformer [] - Stopped to watch for vvp-workload/job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-cluster-config-map, watching id:548dea79-9eee-483c-95aa-1f72368c5831
2023-09-27 09:54:11,729 INFO  org.apache.flink.kubernetes.highavailability.KubernetesMultipleComponentLeaderElectionHaServices [] - Finished cleaning up the high availability data.
2023-09-27 09:54:11,947 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Terminating cluster entrypoint process KubernetesJobGraphClusterEntrypoint with exit code 0.
2023-09-27 09:54:11,947 INFO  org.apache.flink.kubernetes.utils.KubernetesUtilsInternal    [] - Waiting for cluster entrypoint process to be terminated by Kubernetes.
2023-09-27 09:54:14,427 INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - RECEIVED SIGNAL 15: SIGTERM. Shutting down as requested.`}
                />
            </div>
        </div>
    );
};

export default LogDetailLayout;
