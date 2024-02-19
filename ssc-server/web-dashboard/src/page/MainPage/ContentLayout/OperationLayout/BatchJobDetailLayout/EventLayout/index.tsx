import { Input, Select, SelectProps, Table, Tooltip, message } from "antd";
import "./index.sass";
import { CheckCircleOutlined, SearchOutlined } from "../../../../../../component/Icon";
import MonacoEditor from "../../../../../../component/MonacoEditor";

interface Event {
    key: React.Key;
    id: string;
    dateTime: string;
    message: string;
    extra?: string;
    type?: "log" | "message";
}

type TableProps = Parameters<typeof Table<Event>>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const text = ` seconds: [900]
end new OSSLogClient endTimeInMs:[1704699560185], costInMs:[24 ms]end new AbstractVvpLogAppender endTimeInMs:[1704699560190], costInMs:[75 ms]2024-01-08 15:39:20,486 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2024-01-08 15:39:20,497 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Preconfiguration: 
2024-01-08 15:39:20,497 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - 


RESOURCE_PARAMS extraction logs:
jvm_params: -Xmx469762048 -Xms469762048 -XX:MaxDirectMemorySize=134217728 -XX:MaxMetaspaceSize=268435456
dynamic_configs: -D jobmanager.memory.off-heap.size=134217728b -D jobmanager.memory.jvm-overhead.min=201326592b -D jobmanager.memory.jvm-metaspace.size=268435456b -D jobmanager.memory.heap.size=469762048b -D jobmanager.memory.jvm-overhead.max=201326592b
logs: WARN  [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:45: Line is not a key-value pair (missing space after ':'?)
INFO  [] - Loading configuration property: table.exec.operator-name.max-length, 10240
INFO  [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
INFO  [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
INFO  [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
INFO  [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
INFO  [] - Loading configuration property: high-availability.cluster-id, f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3
INFO  [] - Loading configuration property: jobmanager.rpc.address, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload
INFO  [] - Loading configuration property: taskmanager.network.memory.max, 4g
INFO  [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
INFO  [] - Loading configuration property: kubernetes.cluster-id, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62
INFO  [] - Loading configuration property: high-availability.storageDir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/ha
INFO  [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
INFO  [] - Loading configuration property: parallelism.default, 1
INFO  [] - Loading configuration property: kubernetes.namespace, vvp-workload
INFO  [] - Loading configuration property: metrics.reporters, jmx,promappmgr
INFO  [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
INFO  [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
INFO  [] - Loading configuration property: taskmanager.memory.process.size, 2048m
INFO  [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint
INFO  [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/tm.yaml
INFO  [] - Loading configuration property: web.cancel.enable, false
INFO  [] - Loading configuration property: taskmanager.network.sort-shuffle.min-buffers, 2048
INFO  [] - Loading configuration property: jobmanager.rpc.port, 6123
INFO  [] - Loading configuration property: rest.port, 8081
INFO  [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
INFO  [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
INFO  [] - Loading configuration property: kubernetes.dns-policy, Default
INFO  [] - Loading configuration property: $internal.pipeline.job-id, 7980f044d5f74b11ba8bf13c2c769d62
INFO  [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
INFO  [] - Loading configuration property: web.submit.enable, false
INFO  [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
INFO  [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
INFO  [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/jm.yaml
INFO  [] - Loading configuration property: blob.server.port, 6124
INFO  [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
INFO  [] - Loading configuration property: jobmanager.execution.failover-strategy, region
INFO  [] - Loading configuration property: jmx.server.port, 10000,10001-10500
INFO  [] - Loading configuration property: taskmanager.slot.timeout, 60 s
INFO  [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
INFO  [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
INFO  [] - Loading configuration property: execution.runtime-mode, BATCH
INFO  [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
INFO  [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
INFO  [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.4-flink-1.17
INFO  [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
INFO  [] - Loading configuration property: table.exec.infer-source-parallelism.enabled, false
INFO  [] - Loading configuration property: high-availability.jobmanager.port, 6123
INFO  [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
INFO  [] - Loading configuration property: akka.ask.timeout, 120 s
INFO  [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
INFO  [] - Loading configuration property: jobmanager.archive.fs.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/history
INFO  [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
INFO  [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
INFO  [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
INFO  [] - Loading configuration property: cluster.io-pool.size, 64
INFO  [] - Loading configuration property: execution.target, kubernetes-application
INFO  [] - Loading configuration property: jobmanager.memory.process.size, 1024m
INFO  [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
INFO  [] - Loading configuration property: taskmanager.rpc.port, 6122
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
INFO  [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
INFO  [] - Loading configuration property: akka.framesize, 100m
INFO  [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
INFO  [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
INFO  [] - Loading configuration property: daplatform.support-status, production
INFO  [] - Loading configuration property: pipeline.jars, local:///flink/usrlib/WordCount.jar
INFO  [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
INFO  [] - Loading configuration property: table.exec.operator.object-reuse-enabled, true
INFO  [] - Loading configuration property: restart-strategy, fixed-delay
INFO  [] - Loading configuration property: taskmanager.network.retries, 3
INFO  [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
INFO  [] - Loading configuration property: state.checkpoints.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/checkpoints/jobs/7980f044-d5f7-4b11-ba8b-f13c2c769d62
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
INFO  [] - The derived from fraction jvm overhead memory (102.400mb (107374184 bytes)) is less than its min value 192.000mb (201326592 bytes), min value will be used instead
INFO  [] - Final Master Memory configuration:
INFO  [] -   Total Process Memory: 1024.000mb (1073741824 bytes)
INFO  [] -     Total Flink Memory: 576.000mb (603979776 bytes)
INFO  [] -       JVM Heap:         448.000mb (469762048 bytes)
INFO  [] -       Off-heap:         128.000mb (134217728 bytes)
INFO  [] -     JVM Metaspace:      256.000mb (268435456 bytes)
INFO  [] -     JVM Overhead:       192.000mb (201326592 bytes)

2024-01-08 15:39:20,499 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2024-01-08 15:39:20,499 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Starting KubernetesApplicationClusterEntrypoint (Version: 1.17-vvr-8.0.4-SNAPSHOT, Scala: 2.12, Rev:6a9f16d, Date:2023-11-14T08:07:36+01:00)
2024-01-08 15:39:20,503 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  OS current user: flink
2024-01-08 15:39:20,938 [main] WARN  org.apache.hadoop.util.NativeCodeLoader                      [] - Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
2024-01-08 15:39:21,052 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Current Hadoop/Kerberos user: flink
2024-01-08 15:39:21,053 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JVM: OpenJDK 64-Bit Server VM - Alibaba - 1.8/25.372-b775
2024-01-08 15:39:21,055 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Arch: amd64
2024-01-08 15:39:21,056 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Maximum heap size: 436 MiBytes
2024-01-08 15:39:21,057 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JAVA_HOME: /opt/taobao/install/ajdk_8.20.24/
2024-01-08 15:39:21,065 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Hadoop version: 3.1.3
2024-01-08 15:39:21,066 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  JVM Options:
2024-01-08 15:39:21,066 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xmx469762048
2024-01-08 15:39:21,067 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xms469762048
2024-01-08 15:39:21,067 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:MaxDirectMemorySize=134217728
2024-01-08 15:39:21,068 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:MaxMetaspaceSize=268435456
2024-01-08 15:39:21,068 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog.file=/flink/log/flink--kubernetes-application-0-job-7980f044-d5f7-4b11-ba8b-f13c2c769d62-59b69fbdd7-qf4ch.log
2024-01-08 15:39:21,069 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog4j.configuration=file:/flink/conf/log4j2.xml
2024-01-08 15:39:21,069 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog4j.configurationFile=file:/flink/conf/log4j2.xml
2024-01-08 15:39:21,070 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlogback.configurationFile=file:/flink/conf/logback-console.xml
2024-01-08 15:39:21,070 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstdout.file=/flink/log/flink--kubernetes-application-0-job-7980f044-d5f7-4b11-ba8b-f13c2c769d62-59b69fbdd7-qf4ch.out
2024-01-08 15:39:21,071 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstderr.file=/flink/log/flink--kubernetes-application-0-job-7980f044-d5f7-4b11-ba8b-f13c2c769d62-59b69fbdd7-qf4ch.err
2024-01-08 15:39:21,071 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djavax.net.ssl.keyStoreType=JKS
2024-01-08 15:39:21,071 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djavax.net.ssl.trustStoreType=JKS
2024-01-08 15:39:21,072 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dlog.file=/flink/log/flink.log
2024-01-08 15:39:21,073 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dstdout.file=/flink/log/flink.out
2024-01-08 15:39:21,073 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Djdk.tls.ephemeralDHKeySize=2048
2024-01-08 15:39:21,073 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dalicloud.sts.credential.provider=sts.file
2024-01-08 15:39:21,074 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential
2024-01-08 15:39:21,074 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dsts.provider.credential.expire.seconds=900
2024-01-08 15:39:21,075 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -verbose:gc
2024-01-08 15:39:21,075 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:NewRatio=3
2024-01-08 15:39:21,076 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:+PrintGCDetails
2024-01-08 15:39:21,076 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:+PrintGCDateStamps
2024-01-08 15:39:21,080 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:ParallelGCThreads=4
2024-01-08 15:39:21,081 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xss512k
2024-01-08 15:39:21,082 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dfile.encoding=UTF-8
2024-01-08 15:39:21,082 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Dkubernetes.max.concurrent.requests=1000
2024-01-08 15:39:21,083 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -Xloggc:/opt/flink/log/jobmanager-gc.log
2024-01-08 15:39:21,083 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:+UseGCLogFileRotation
2024-01-08 15:39:21,084 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:NumberOfGCLogFiles=2
2024-01-08 15:39:21,085 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -XX:GCLogFileSize=50M
2024-01-08 15:39:21,085 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -javaagent:/flink/opt/flink-resourceplan-applyagent-1.17-vvr-8.0.4-SNAPSHOT.jar
2024-01-08 15:39:21,086 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Program Arguments:
2024-01-08 15:39:21,088 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2024-01-08 15:39:21,089 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.off-heap.size=134217728b
2024-01-08 15:39:21,089 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2024-01-08 15:39:21,089 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-overhead.min=201326592b
2024-01-08 15:39:21,090 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2024-01-08 15:39:21,090 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-metaspace.size=268435456b
2024-01-08 15:39:21,090 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2024-01-08 15:39:21,092 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.heap.size=469762048b
2024-01-08 15:39:21,092 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     -D
2024-01-08 15:39:21,093 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -     jobmanager.memory.jvm-overhead.max=201326592b
2024-01-08 15:39:21,094 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] -  Classpath: /flink/lib/celeborn-client-flink-1.17-shaded_2.12-0.3.0-1.2-SNAPSHOT.jar:/flink/lib/flink-cep-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-connector-files-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-csv-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-json-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-metrics-datadog-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-metrics-graphite-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-metrics-influxdb-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-metrics-kafka-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-metrics-kmonitor-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-metrics-log-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-metrics-prometheus-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-metrics-slf4j-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-metrics-statsd-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-ml-uber-2.2-vvr-1.1.1-SNAPSHOT.jar:/flink/lib/flink-native-1.17-vvr-8.0.4-SNAPSHOT-linux-x86_64.jar:/flink/lib/flink-queryable-state-runtime_*.jar:/flink/lib/flink-scala_2.12-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-shaded-hadoop-2-uber-3.1.3-10.0-SNAPSHOT.jar:/flink/lib/flink-statebackend-gemini-bundled_1.8-4.0.3-SNAPSHOT.jar:/flink/lib/flink-state-processor-api-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-table-api-java-uber-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-table-planner-loader-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/flink-table-runtime-1.17-vvr-8.0.4-SNAPSHOT.jar:/flink/lib/jersey-core-1.9.jar:/flink/lib/log4j-1.2-api-2.17.1.jar:/flink/lib/log4j-api-2.17.1.jar:/flink/lib/log4j-core-2.17.1.jar:/flink/lib/log4j-slf4j-impl-2.17.1.jar:/flink/lib/shuffle-plugin-1.1-SNAPSHOT.jar:/flink/lib/statefun-flink-core-3.2.0.jar:/flink/lib/vvp-flink-logging-hdfs-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-kafka-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-oss-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/vvp-flink-logging-sls-1.0.15-withkafka-SNAPSHOT.jar:/flink/lib/flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:::::/flink/opt/flink-resourceplan-applyagent-1.17-vvr-8.0.4-SNAPSHOT.jar
2024-01-08 15:39:21,094 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - --------------------------------------------------------------------------------
2024-01-08 15:39:21,097 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Registered UNIX signal handlers for [TERM, HUP, INT]
2024-01-08 15:39:21,148 [main] WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:45: Line is not a key-value pair (missing space after ':'?)
2024-01-08 15:39:21,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2024-01-08 15:39:21,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2024-01-08 15:39:21,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/ha
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2024-01-08 15:39:21,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2024-01-08 15:39:21,152 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2024-01-08 15:39:21,152 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2024-01-08 15:39:21,152 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2024-01-08 15:39:21,152 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint
2024-01-08 15:39:21,152 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/tm.yaml
2024-01-08 15:39:21,152 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2024-01-08 15:39:21,152 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.sort-shuffle.min-buffers, 2048
2024-01-08 15:39:21,152 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2024-01-08 15:39:21,153 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2024-01-08 15:39:21,153 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2024-01-08 15:39:21,153 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2024-01-08 15:39:21,153 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2024-01-08 15:39:21,154 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 7980f044d5f74b11ba8bf13c2c769d62
2024-01-08 15:39:21,155 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2024-01-08 15:39:21,155 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2024-01-08 15:39:21,155 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2024-01-08 15:39:21,155 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2024-01-08 15:39:21,155 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/jm.yaml
2024-01-08 15:39:21,155 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2024-01-08 15:39:21,155 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2024-01-08 15:39:21,156 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2024-01-08 15:39:21,156 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2024-01-08 15:39:21,156 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2024-01-08 15:39:21,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2024-01-08 15:39:21,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2024-01-08 15:39:21,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.runtime-mode, BATCH
2024-01-08 15:39:21,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2024-01-08 15:39:21,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2024-01-08 15:39:21,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.4-flink-1.17
2024-01-08 15:39:21,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2024-01-08 15:39:21,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.infer-source-parallelism.enabled, false
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.archive.fs.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/history
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-application
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2024-01-08 15:39:21,164 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2024-01-08 15:39:21,165 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2024-01-08 15:39:21,165 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2024-01-08 15:39:21,165 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2024-01-08 15:39:21,165 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2024-01-08 15:39:21,165 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2024-01-08 15:39:21,165 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2024-01-08 15:39:21,165 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2024-01-08 15:39:21,165 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: pipeline.jars, local:///flink/usrlib/WordCount.jar
2024-01-08 15:39:21,167 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2024-01-08 15:39:21,167 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator.object-reuse-enabled, true
2024-01-08 15:39:21,167 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2024-01-08 15:39:21,167 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2024-01-08 15:39:21,168 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2024-01-08 15:39:21,168 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/checkpoints/jobs/7980f044-d5f7-4b11-ba8b-f13c2c769d62
2024-01-08 15:39:21,168 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
2024-01-08 15:39:21,168 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.off-heap.size, 134217728b
2024-01-08 15:39:21,168 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-overhead.min, 201326592b
2024-01-08 15:39:21,168 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-metaspace.size, 268435456b
2024-01-08 15:39:21,168 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.heap.size, 469762048b
2024-01-08 15:39:21,168 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading dynamic configuration property: jobmanager.memory.jvm-overhead.max, 201326592b
2024-01-08 15:39:21,890 [main] INFO  org.apache.flink.util.EncryptedFlinkUserCodeClassLoader      [] - Successfully loaded flink-decryption library
2024-01-08 15:39:21,994 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Starting KubernetesApplicationClusterEntrypoint.
2024-01-08 15:39:22,025 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Install default filesystem.
2024-01-08 15:39:22,113 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: oss-fs-hadoop
2024-01-08 15:39:22,125 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-log
2024-01-08 15:39:22,128 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-slf4j
2024-01-08 15:39:22,129 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-cms
2024-01-08 15:39:22,129 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: pangu-fs
2024-01-08 15:39:22,130 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: s3-fs
2024-01-08 15:39:22,130 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: external-resource-gpu
2024-01-08 15:39:22,130 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-jmx
2024-01-08 15:39:22,131 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-sls
2024-01-08 15:39:22,131 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-datadog
2024-01-08 15:39:22,131 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-graphite
2024-01-08 15:39:22,132 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-prometheus
2024-01-08 15:39:22,156 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-statsd
2024-01-08 15:39:22,157 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID not found, creating it: metrics-influx
First appender to file:[logs/ssc-space-default/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/7980f044-d5f7-4b11-ba8b-f13c2c769d62/jobmanager-59b69fbdd7-qf4ch/20240108_153921-0], tid:[7][OSSLogAppender:main] doSend cost time(ms):[1154], current log queue size:[56], total received/discarded:[156/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[100]
start new AbstractVvpLogAppender startTimeInMs:[1704699562325][main:main] Abort continue initialization vvp log appender[OSS_ARCHIVE], currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.fs.osshadoop.OSSFileSystemFactory, class sun.reflect.NativeConstructorAccessorImpl, class sun.reflect.DelegatingConstructorAccessorImpl, class java.lang.reflect.Constructor, class java.lang.Class, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$1, class org.apache.flink.core.plugin.PluginLoader$ContextClassLoaderSettingIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.Iterators$ConcatenatedIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.TransformedIterator, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint], because isInitStrictly=true and the current classloader is different from thread context classloader, current classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2], context classloader:[org.apache.flink.core.plugin.PluginLoader$PluginClassLoader@451816fd]
start new AbstractVvpLogAppender startTimeInMs:[1704699562398][main:main] Abort continue initialization vvp log appender[OSS_ARCHIVE], currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.fs.pangu.PanguFileSystemFactory, class sun.reflect.NativeConstructorAccessorImpl, class sun.reflect.DelegatingConstructorAccessorImpl, class java.lang.reflect.Constructor, class java.lang.Class, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$1, class org.apache.flink.core.plugin.PluginLoader$ContextClassLoaderSettingIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.Iterators$ConcatenatedIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.TransformedIterator, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint], because isInitStrictly=true and the current classloader is different from thread context classloader, current classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2], context classloader:[org.apache.flink.core.plugin.PluginLoader$PluginClassLoader@2d74cbbd]
start new AbstractVvpLogAppender startTimeInMs:[1704699562603][main:main] Abort continue initialization vvp log appender[OSS_ARCHIVE], currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.fs.s3hadoop.common.AbstractS3FileSystemFactory, class sun.reflect.NativeConstructorAccessorImpl, class sun.reflect.DelegatingConstructorAccessorImpl, class java.lang.reflect.Constructor, class java.lang.Class, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$1, class org.apache.flink.core.plugin.PluginLoader$ContextClassLoaderSettingIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.Iterators$ConcatenatedIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.TransformedIterator, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.core.fs.FileSystem, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint], because isInitStrictly=true and the current classloader is different from thread context classloader, current classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2], context classloader:[org.apache.flink.core.plugin.PluginLoader$PluginClassLoader@184751f3]
2024-01-08 15:39:22,705 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Install security context.
2024-01-08 15:39:22,731 [main] WARN  org.apache.flink.runtime.util.HadoopUtils                    [] - Could not find Hadoop configuration via any of the supported methods (Flink configuration, environment variables).
2024-01-08 15:39:22,755 [main] INFO  org.apache.flink.runtime.security.modules.HadoopModule       [] - Hadoop user set to flink (auth:SIMPLE)
2024-01-08 15:39:22,756 [main] INFO  org.apache.flink.runtime.security.modules.HadoopModule       [] - Kerberos security is disabled.
2024-01-08 15:39:22,769 [main] INFO  org.apache.flink.runtime.security.modules.JaasModule         [] - Jaas file will be created as /opt/flink/flink-tmp-dir/jaas-4430261599936268143.conf.
2024-01-08 15:39:22,783 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Initializing cluster services.
2024-01-08 15:39:22,793 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Using working directory: WorkingDirectory(/opt/flink/flink-tmp-dir/jm_93b06903f9668f5d7ad62c00e2d1f42a).
start new AbstractVvpLogAppender startTimeInMs:[1704699563073][main:main] Vvp log appender[OSS_ARCHIVE] (buildVersion:1.0.15-withkafka-SNAPSHOT, buildTime:20230206-170622, commitId:3a58395), currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils, class org.apache.flink.runtime.rpc.akka.AkkaRpcSystem, class org.apache.flink.runtime.rpc.akka.CleanupOnCloseRpcSystem, class org.apache.flink.runtime.rpc.RpcUtils, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint$$Lambda$153/318371990, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext$$Lambda$154/1348421068, class javax.security.auth.Subject, class org.apache.hadoop.security.UserGroupInformation, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint], isInitStrictly:[true], instance count:[5], current/context classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2]
start new OSSLogClient startTimeInMs:[1704699563082]First initialize oss client with sts credential, id: [STS.NTek4H*****]. secret: [Hxf18shXMe*****], token: [CAIShAJ1q6*****], expire seconds: [900]
end new OSSLogClient endTimeInMs:[1704699563087], costInMs:[5 ms]end new AbstractVvpLogAppender endTimeInMs:[1704699563089], costInMs:[16 ms]2024-01-08 15:39:23,229 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Trying to start actor system, external address job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:6123, bind address 0.0.0.0:6123.
2024-01-08 15:39:24,232 [flink-akka.actor.default-dispatcher-5] INFO  akka.event.slf4j.Slf4jLogger                                 [] - Slf4jLogger started
2024-01-08 15:39:24,271 [flink-akka.actor.default-dispatcher-5] INFO  akka.remote.RemoteActorRefProvider                           [] - Akka Cluster not in use - enabling unsafe features anyway because \`akka.remote.use-unsafe-remote-features-outside-cluster\` has been enabled.
2024-01-08 15:39:24,272 [flink-akka.actor.default-dispatcher-5] INFO  akka.remote.Remoting                                         [] - Starting remoting
2024-01-08 15:39:24,541 [flink-akka.actor.default-dispatcher-5] INFO  akka.remote.Remoting                                         [] - Remoting started; listening on addresses :[akka.tcp://flink@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:6123]
2024-01-08 15:39:24,678 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Actor system started at akka.tcp://flink@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:6123
2024-01-08 15:39:24,850 [main] INFO  org.apache.flink.management.jmx.JMXService                   [] - Started JMX server on port 10000.
2024-01-08 15:39:24,854 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Loading delegation token providers
2024-01-08 15:39:24,859 [main] WARN  org.apache.flink.runtime.util.HadoopUtils                    [] - Could not find Hadoop configuration via any of the supported methods (Flink configuration, environment variables).
2024-01-08 15:39:24,860 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider hadoopfs loaded and initialized
2024-01-08 15:39:24,862 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider hbase is disabled so not loaded
2024-01-08 15:39:24,862 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2024-01-08 15:39:24,862 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2024-01-08 15:39:24,862 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2024-01-08 15:39:24,862 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-cms
2024-01-08 15:39:24,863 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2024-01-08 15:39:24,863 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2024-01-08 15:39:24,863 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2024-01-08 15:39:24,863 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2024-01-08 15:39:24,863 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2024-01-08 15:39:24,863 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2024-01-08 15:39:24,863 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2024-01-08 15:39:24,864 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2024-01-08 15:39:24,864 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2024-01-08 15:39:24,864 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2024-01-08 15:39:24,867 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider s3-hadoop loaded and initialized
2024-01-08 15:39:24,869 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token provider s3-presto loaded and initialized
2024-01-08 15:39:24,869 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation token providers loaded successfully
2024-01-08 15:39:24,870 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Loading delegation token receivers
2024-01-08 15:39:24,874 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver hadoopfs loaded and initialized
2024-01-08 15:39:24,876 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver hbase is disabled so not loaded
2024-01-08 15:39:24,876 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2024-01-08 15:39:24,877 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2024-01-08 15:39:24,877 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2024-01-08 15:39:24,877 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-cms
2024-01-08 15:39:24,877 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2024-01-08 15:39:24,877 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2024-01-08 15:39:24,877 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2024-01-08 15:39:24,877 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2024-01-08 15:39:24,878 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2024-01-08 15:39:24,878 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2024-01-08 15:39:24,878 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2024-01-08 15:39:24,879 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2024-01-08 15:39:24,882 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2024-01-08 15:39:24,883 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
2024-01-08 15:39:24,885 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver s3-hadoop loaded and initialized
2024-01-08 15:39:24,889 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receiver s3-presto loaded and initialized
2024-01-08 15:39:24,891 [main] INFO  org.apache.flink.runtime.security.token.DelegationTokenReceiverRepository [] - Delegation token receivers loaded successfully
2024-01-08 15:39:24,891 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Checking provider and receiver instances consistency
2024-01-08 15:39:24,891 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Provider and receiver instances are consistent
2024-01-08 15:39:24,891 [main] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Multiple providers loaded with the same prefix: s3. This might lead to unintended consequences, please consider using only one of them.
2024-01-08 15:39:24,892 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Obtaining delegation tokens
2024-01-08 15:39:24,896 [main] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Delegation tokens obtained successfully
2024-01-08 15:39:24,896 [main] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - No tokens obtained so skipping notifications
[OSSLogAppender:main] doSend cost time(ms):[42], current log queue size:[11], total received/discarded:[211/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[200]
2024-01-08 15:39:24,931 [main] INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'jobmanager.rpc.address' instead of key 'rest.address'
2024-01-08 15:39:24,948 [main] INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Created BLOB server storage directory /opt/flink/flink-tmp-dir/jm_93b06903f9668f5d7ad62c00e2d1f42a/blobStorage
2024-01-08 15:39:24,951 [main] INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Started BLOB server at 0.0.0.0:6124 - max concurrent requests: 50 - max backlog: 1000
2024-01-08 15:39:24,984 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: oss-fs-hadoop
2024-01-08 15:39:24,984 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-log
2024-01-08 15:39:24,984 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-slf4j
2024-01-08 15:39:24,984 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-cms
2024-01-08 15:39:24,984 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: pangu-fs
2024-01-08 15:39:24,984 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: s3-fs
2024-01-08 15:39:24,985 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: external-resource-gpu
2024-01-08 15:39:24,985 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-jmx
2024-01-08 15:39:24,985 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-sls
2024-01-08 15:39:24,986 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-datadog
2024-01-08 15:39:24,986 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-graphite
2024-01-08 15:39:24,986 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-prometheus
2024-01-08 15:39:24,986 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-statsd
2024-01-08 15:39:24,987 [main] INFO  org.apache.flink.core.plugin.DefaultPluginManager            [] - Plugin loader with ID found, reusing it: metrics-influx
start new AbstractVvpLogAppender startTimeInMs:[1704699565023][main:main] Abort continue initialization vvp log appender[OSS_ARCHIVE], currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.metrics.cms.CMSReporterFactory, class sun.reflect.NativeConstructorAccessorImpl, class sun.reflect.DelegatingConstructorAccessorImpl, class java.lang.reflect.Constructor, class java.lang.Class, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$LazyIterator, class java.util.ServiceLoader$1, class org.apache.flink.core.plugin.PluginLoader$ContextClassLoaderSettingIterator, class org.apache.flink.shaded.guava30.com.google.common.collect.Iterators$ConcatenatedIterator, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint$$Lambda$153/318371990, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext$$Lambda$154/1348421068, class javax.security.auth.Subject, class org.apache.hadoop.security.UserGroupInformation, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint], because isInitStrictly=true and the current classloader is different from thread context classloader, current classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2], context classloader:[org.apache.flink.core.plugin.PluginLoader$PluginClassLoader@34070bd2]
2024-01-08 15:39:25,060 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.datadog.DatadogHttpReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2024-01-08 15:39:25,061 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.graphite.GraphiteReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2024-01-08 15:39:25,061 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.influxdb.InfluxdbReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2024-01-08 15:39:25,063 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.log.LogReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2024-01-08 15:39:25,064 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2024-01-08 15:39:25,064 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusPushGatewayReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2024-01-08 15:39:25,065 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.prometheus.PrometheusPushGatewayLoadBalancedReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2024-01-08 15:39:25,066 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.slf4j.Slf4jReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
2024-01-08 15:39:25,066 [main] WARN  org.apache.flink.runtime.metrics.ReporterSetup               [] - Multiple implementations of the same reporter were found in 'lib' and/or 'plugins' directories for org.apache.flink.metrics.statsd.StatsDReporterFactory. It is recommended to remove redundant reporter JARs to resolve used versions' ambiguity.
start new AbstractVvpLogAppender startTimeInMs:[1704699565092][main:main] Vvp log appender[OSS_ARCHIVE] (buildVersion:1.0.15-withkafka-SNAPSHOT, buildTime:20230206-170622, commitId:3a58395), currentStackTrace:[class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil$PrivateSecurityManager, class org.apache.logging.log4j.util.PrivateSecurityManagerStackTraceUtil, class org.apache.logging.log4j.util.StackLocator, class org.apache.logging.log4j.util.StackLocatorUtil, class com.ververica.platform.logging.common.AbstractVvpLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class com.ververica.platform.logging.appender.OSSLogAppender$Builder, class org.apache.logging.log4j.core.config.plugins.util.PluginBuilder, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.config.AbstractConfiguration, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.LoggerContext, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.core.impl.Log4jContextFactory, class org.apache.logging.log4j.LogManager, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.apache.logging.log4j.spi.AbstractLoggerAdapter, class org.apache.logging.slf4j.Log4jLoggerFactory, class org.slf4j.LoggerFactory, class org.slf4j.LoggerFactory, class org.apache.flink.metrics.jmx.JMXReporter, class org.apache.flink.metrics.jmx.JMXReporterFactory, class org.apache.flink.metrics.jmx.JMXReporterFactory, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.metrics.ReporterSetup, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint$$Lambda$153/318371990, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext$$Lambda$154/1348421068, class javax.security.auth.Subject, class org.apache.hadoop.security.UserGroupInformation, class org.apache.flink.runtime.security.contexts.HadoopSecurityContext, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.runtime.entrypoint.ClusterEntrypoint, class org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint], isInitStrictly:[true], instance count:[7], current/context classloader:[sun.misc.Launcher$AppClassLoader@18b4aac2]
start new OSSLogClient startTimeInMs:[1704699565097]First initialize oss client with sts credential, id: [STS.NTek4H*****]. secret: [Hxf18shXMe*****], token: [CAIShAJ1q6*****], expire seconds: [900]
end new OSSLogClient endTimeInMs:[1704699565103], costInMs:[6 ms]end new AbstractVvpLogAppender endTimeInMs:[1704699565104], costInMs:[12 ms]2024-01-08 15:39:25,130 [main] WARN  org.apache.flink.metrics.jmx.JMXReporter                     [] - JMXReporter port config is deprecated. Please use: Key: 'jmx.server.port' , default: null (fallback keys: []) instead!
2024-01-08 15:39:25,130 [main] WARN  org.apache.flink.management.jmx.JMXService                   [] - JVM-wide JMXServer already started at port: 10000
2024-01-08 15:39:25,154 [main] INFO  org.apache.flink.metrics.prometheus.PrometheusReporter       [] - Started PrometheusReporter HTTP server on port 9999.
2024-01-08 15:39:25,157 [main] INFO  org.apache.flink.runtime.metrics.MetricRegistryImpl          [] - Reporting metrics for reporter jmx of type org.apache.flink.metrics.jmx.JMXReporter.
2024-01-08 15:39:25,157 [main] INFO  org.apache.flink.runtime.metrics.MetricRegistryImpl          [] - Reporting metrics for reporter promappmgr of type org.apache.flink.metrics.prometheus.PrometheusReporter.
2024-01-08 15:39:25,165 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Trying to start actor system, external address job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:0, bind address 0.0.0.0:0.
2024-01-08 15:39:25,198 [flink-metrics-6] INFO  akka.event.slf4j.Slf4jLogger                                 [] - Slf4jLogger started
2024-01-08 15:39:25,205 [flink-metrics-6] INFO  akka.remote.RemoteActorRefProvider                           [] - Akka Cluster not in use - enabling unsafe features anyway because \`akka.remote.use-unsafe-remote-features-outside-cluster\` has been enabled.
2024-01-08 15:39:25,205 [flink-metrics-6] INFO  akka.remote.Remoting                                         [] - Starting remoting
2024-01-08 15:39:25,226 [flink-metrics-6] INFO  akka.remote.Remoting                                         [] - Remoting started; listening on addresses :[akka.tcp://flink-metrics@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:34331]
2024-01-08 15:39:25,238 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcServiceUtils        [] - Actor system started at akka.tcp://flink-metrics@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:34331
2024-01-08 15:39:25,261 [main] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.metrics.dump.MetricQueryService at akka://flink-metrics/user/rpc/MetricQueryService .
2024-01-08 15:39:25,310 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'ClassesLoaded'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, ClassLoader]
2024-01-08 15:39:25,313 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'ClassesUnloaded'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, ClassLoader]
2024-01-08 15:39:25,314 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, GarbageCollector, ParNew]
2024-01-08 15:39:25,314 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, GarbageCollector, ParNew]
2024-01-08 15:39:25,314 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, GarbageCollector, ConcurrentMarkSweep]
2024-01-08 15:39:25,314 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, GarbageCollector, ConcurrentMarkSweep]
2024-01-08 15:39:25,314 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Heap]
2024-01-08 15:39:25,315 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Heap]
2024-01-08 15:39:25,315 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Heap]
2024-01-08 15:39:25,315 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, NonHeap]
2024-01-08 15:39:25,315 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, NonHeap]
2024-01-08 15:39:25,315 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, NonHeap]
2024-01-08 15:39:25,315 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Used'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Metaspace]
2024-01-08 15:39:25,316 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Committed'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Metaspace]
2024-01-08 15:39:25,316 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Max'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Metaspace]
2024-01-08 15:39:25,316 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Direct]
2024-01-08 15:39:25,316 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'MemoryUsed'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Direct]
2024-01-08 15:39:25,316 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'TotalCapacity'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Direct]
2024-01-08 15:39:25,316 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Mapped]
2024-01-08 15:39:25,317 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'MemoryUsed'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Mapped]
2024-01-08 15:39:25,317 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'TotalCapacity'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Memory, Mapped]
2024-01-08 15:39:25,317 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Count'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, Threads]
2024-01-08 15:39:25,317 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Load'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, CPU]
2024-01-08 15:39:25,317 [main] WARN  org.apache.flink.metrics.MetricGroup                         [] - Name collision: Group already contains a Metric with the name 'Time'. Metric will not be reported.[job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload, jobmanager, Status, JVM, CPU]
2024-01-08 15:39:25,427 [main] INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'jobmanager.rpc.address' instead of key 'rest.address'
2024-01-08 15:39:25,428 [main] INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'rest.port' instead of key 'rest.bind-port'
2024-01-08 15:39:25,476 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Upload directory /tmp/flink-web-c7aedf1e-ec33-4c38-a9e6-9a9426595f75/flink-web-upload does not exist. 
2024-01-08 15:39:25,477 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Created directory /tmp/flink-web-c7aedf1e-ec33-4c38-a9e6-9a9426595f75/flink-web-upload for file uploads.
2024-01-08 15:39:25,482 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Starting rest endpoint.
2024-01-08 15:39:25,709 [main] INFO  org.apache.flink.runtime.webmonitor.WebMonitorUtils          [] - Determined location of main cluster component log file: /flink/log/flink.log
2024-01-08 15:39:25,709 [main] INFO  org.apache.flink.runtime.webmonitor.WebMonitorUtils          [] - Determined location of main cluster component stdout file: /flink/log/flink.out
2024-01-08 15:39:26,148 [main] WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:45: Line is not a key-value pair (missing space after ':'?)
2024-01-08 15:39:26,149 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2024-01-08 15:39:26,149 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2024-01-08 15:39:26,149 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2024-01-08 15:39:26,149 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2024-01-08 15:39:26,149 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2024-01-08 15:39:26,149 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2024-01-08 15:39:26,149 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3
2024-01-08 15:39:26,149 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/ha
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2024-01-08 15:39:26,150 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2024-01-08 15:39:26,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2024-01-08 15:39:26,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint
2024-01-08 15:39:26,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/tm.yaml
2024-01-08 15:39:26,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2024-01-08 15:39:26,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.sort-shuffle.min-buffers, 2048
2024-01-08 15:39:26,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2024-01-08 15:39:26,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2024-01-08 15:39:26,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2024-01-08 15:39:26,151 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 7980f044d5f74b11ba8bf13c2c769d62
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/jm.yaml
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2024-01-08 15:39:26,157 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.runtime-mode, BATCH
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.4-flink-1.17
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.infer-source-parallelism.enabled, false
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.archive.fs.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/history
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-application
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: pipeline.jars, local:///flink/usrlib/WordCount.jar
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator.object-reuse-enabled, true
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2024-01-08 15:39:26,158 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/checkpoints/jobs/7980f044-d5f7-4b11-ba8b-f13c2c769d62
2024-01-08 15:39:26,159 [main] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
[OSSLogAppender:main] doSend cost time(ms):[22], current log queue size:[47], total received/discarded:[347/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[300]
2024-01-08 15:39:26,325 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Rest endpoint listening at job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:8081
2024-01-08 15:39:26,326 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - http://job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:8081 was granted leadership with leaderSessionID=00000000-0000-0000-0000-000000000000
2024-01-08 15:39:26,334 [main] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Web frontend listening at http://job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:8081.
2024-01-08 15:39:26,354 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'kubernetes.taskmanager.cpu' instead of proper key 'kubernetes.taskmanager.cpu.amount'
2024-01-08 15:39:26,366 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'taskmanager.network.memory.max' instead of proper key 'taskmanager.memory.network.max'
2024-01-08 15:39:26,367 [main] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'taskmanager.network.memory.max' instead of proper key 'taskmanager.memory.network.max'
2024-01-08 15:39:26,391 [main] INFO  org.apache.flink.configuration.Configuration                 [] - Config uses fallback configuration key 'taskmanager.numberOfTaskSlots' instead of key 'resource-allocation-strategy.dynamic-strategy.prefer-slots'
2024-01-08 15:39:26,394 [main] WARN  org.apache.flink.kubernetes.entrypoint.KubernetesResourceManagerFactory [] - Configured size for 'taskmanager.memory.process.size' is ignored. Total memory size for TaskManagers are dynamically decided in fine-grained resource management.
2024-01-08 15:39:26,409 [main] INFO  org.apache.flink.runtime.dispatcher.runner.DefaultDispatcherRunner [] - DefaultDispatcherRunner was granted leadership with leader id 00000000-0000-0000-0000-000000000000. Creating new DispatcherLeaderProcess.
2024-01-08 15:39:26,417 [main] INFO  org.apache.flink.runtime.dispatcher.runner.SessionDispatcherLeaderProcess [] - Start SessionDispatcherLeaderProcess.
2024-01-08 15:39:26,419 [main] INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Starting resource manager service.
2024-01-08 15:39:26,430 [pool-7-thread-1] INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Resource manager service is granted leadership with session id 00000000-0000-0000-0000-000000000000.
2024-01-08 15:39:26,440 [cluster-io-thread-2] INFO  org.apache.flink.runtime.dispatcher.runner.SessionDispatcherLeaderProcess [] - Recover all persisted job graphs that are not finished, yet.
2024-01-08 15:39:26,441 [cluster-io-thread-2] INFO  org.apache.flink.runtime.dispatcher.runner.SessionDispatcherLeaderProcess [] - Successfully recovered 0 persisted job graphs.
2024-01-08 15:39:26,516 [cluster-io-thread-2] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.dispatcher.StandaloneDispatcher at akka://flink/user/rpc/dispatcher_0 .
2024-01-08 15:39:26,542 [pool-7-thread-1] WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:45: Line is not a key-value pair (missing space after ':'?)
2024-01-08 15:39:26,547 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2024-01-08 15:39:26,547 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2024-01-08 15:39:26,547 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2024-01-08 15:39:26,547 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2024-01-08 15:39:26,547 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/ha
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/tm.yaml
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.sort-shuffle.min-buffers, 2048
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2024-01-08 15:39:26,548 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 7980f044d5f74b11ba8bf13c2c769d62
2024-01-08 15:39:26,549 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2024-01-08 15:39:26,549 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2024-01-08 15:39:26,549 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2024-01-08 15:39:26,549 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2024-01-08 15:39:26,549 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/jm.yaml
2024-01-08 15:39:26,549 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2024-01-08 15:39:26,549 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2024-01-08 15:39:26,549 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2024-01-08 15:39:26,549 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2024-01-08 15:39:26,552 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2024-01-08 15:39:26,552 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.runtime-mode, BATCH
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.4-flink-1.17
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.infer-source-parallelism.enabled, false
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.archive.fs.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/history
2024-01-08 15:39:26,553 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-application
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: pipeline.jars, local:///flink/usrlib/WordCount.jar
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator.object-reuse-enabled, true
2024-01-08 15:39:26,554 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2024-01-08 15:39:26,555 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2024-01-08 15:39:26,555 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2024-01-08 15:39:26,555 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/checkpoints/jobs/7980f044-d5f7-4b11-ba8b-f13c2c769d62
2024-01-08 15:39:26,555 [pool-7-thread-1] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
[OSSLogAppender:main] doSend cost time(ms):[19], current log queue size:[36], total received/discarded:[436/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[400]
2024-01-08 15:39:26,576 [pool-7-thread-1] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager at akka://flink/user/rpc/resourcemanager_1 .
2024-01-08 15:39:26,644 [flink-akka.actor.default-dispatcher-5] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Starting the resource manager.
2024-01-08 15:39:26,658 [flink-akka.actor.default-dispatcher-5] INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Starting the slot manager.
2024-01-08 15:39:26,660 [flink-akka.actor.default-dispatcher-5] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Starting tokens update task
2024-01-08 15:39:26,661 [flink-akka.actor.default-dispatcher-5] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - No tokens obtained so skipping notifications
2024-01-08 15:39:26,661 [flink-akka.actor.default-dispatcher-5] WARN  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Tokens update task not started because either no tokens obtained or none of the tokens specified its renewal date
2024-01-08 15:39:26,684 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.client.ClientUtils                          [] - Starting program (detached: true)
2024-01-08 15:39:26,801 [flink-akka.actor.default-dispatcher-16] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'restart-strategy' instead of proper key 'restart-strategy.type'
Executing WordCount example with default input data set.
Use --input to specify file input.
Printing result to stdout. Use --output to specify output path.
2024-01-08 15:39:26,979 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.api.java.utils.PlanGenerator                [] - The job has 0 registered types and 0 default Kryo serializers
2024-01-08 15:39:27,097 [flink-akka.actor.default-dispatcher-16] WARN  org.apache.flink.configuration.GlobalConfiguration           [] - Error while trying to split key and value in configuration file /flink/conf/flink-conf.yaml:45: Line is not a key-value pair (missing space after ':'?)
2024-01-08 15:39:27,098 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator-name.max-length, 10240
2024-01-08 15:39:27,098 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.jobmanager, -Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2024-01-08 15:39:27,098 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
2024-01-08 15:39:27,098 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.entry.path, /flink/bin/docker-entrypoint.sh
2024-01-08 15:39:27,099 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
2024-01-08 15:39:27,099 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out  -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
2024-01-08 15:39:27,099 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.cluster-id, f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3
2024-01-08 15:39:27,099 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.address, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload
2024-01-08 15:39:27,099 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.max, 4g
2024-01-08 15:39:27,099 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.save-application-status-to-configmap.enabled, true
2024-01-08 15:39:27,099 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.cluster-id, job-7980f044-d5f7-4b11-ba8b-f13c2c769d62
2024-01-08 15:39:27,100 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.storageDir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/ha
2024-01-08 15:39:27,100 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: io.tmp.dirs, /opt/flink/flink-tmp-dir
2024-01-08 15:39:27,100 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: parallelism.default, 1
2024-01-08 15:39:27,100 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.namespace, vvp-workload
2024-01-08 15:39:27,100 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporters, jmx,promappmgr
2024-01-08 15:39:27,100 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.fine-grained-resource-management.enabled, true
2024-01-08 15:39:27,100 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.thread-dump.stacktrace-max-depth, 32
2024-01-08 15:39:27,100 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.memory.process.size, 2048m
2024-01-08 15:39:27,100 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.internal.jobmanager.entrypoint.class, org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.taskmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/tm.yaml
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.cancel.enable, false
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.sort-shuffle.min-buffers, 2048
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.rpc.port, 6123
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: rest.port, 8081
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image.pull-policy, IfNotPresent
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.delay, 10 s
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.dns-policy, Default
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: $internal.pipeline.job-id, 7980f044d5f74b11ba8bf13c2c769d62
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.cpu, 1.0
2024-01-08 15:39:27,101 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: web.submit.enable, false
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.legacy-cast-behaviour, enabled
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.service-account, vvp
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.pod-template-file.jobmanager, /vvp/data/appmanager/f3a01a9d-dc95-4368-9b74-e3770f8ae8d7/jm.yaml
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: blob.server.port, 6124
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.port, 10000-10240
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.failover-strategy, region
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jmx.server.port, 10000,10001-10500
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.slot.timeout, 60 s
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.jobmanager.labels, sigma.ali/disable-default-pdb-strategy:true
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.taskmanager.cpu, 1.0
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.runtime-mode, BATCH
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.jmx.factory.class, org.apache.flink.metrics.jmx.JMXReporterFactory
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.watch.heartbeat.interval, 10 s
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.container.image, vvp-asi-registry-vpc.cn-hangzhou.cr.aliyuncs.com/vvp-prod/flink:vvr-8.0.4-flink-1.17
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.numberOfTaskSlots, 1
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.infer-source-parallelism.enabled, false
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: high-availability.jobmanager.port, 6123
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.rest-service.exposed.type, Headless_ClusterIP
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.ask.timeout, 120 s
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.enable-jvm-direct-memory-limit, true
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.archive.fs.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/history
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.memory.floating-buffers-per-gate, 256
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy.fixed-delay.attempts, 2147483647
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: cluster.io-pool.size, 64
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: execution.target, kubernetes-application
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.memory.process.size, 1024m
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: jobmanager.execution.attempts-history-size, 100
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.rpc.port, 6122
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: kubernetes.log4j.config-file-name, log4j2.xml
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: akka.framesize, 100m
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: slotmanager.number-of-slots.max, 5000
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: internal.cluster.execution-mode, DETACHED
2024-01-08 15:39:27,102 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: daplatform.support-status, production
2024-01-08 15:39:27,103 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: pipeline.jars, local:///flink/usrlib/WordCount.jar
2024-01-08 15:39:27,103 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
2024-01-08 15:39:27,103 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: table.exec.operator.object-reuse-enabled, true
2024-01-08 15:39:27,109 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: restart-strategy, fixed-delay
2024-01-08 15:39:27,110 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: taskmanager.network.retries, 3
2024-01-08 15:39:27,110 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: env.java.opts.taskmanager, -Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M
2024-01-08 15:39:27,110 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: state.checkpoints.dir, oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/checkpoints/jobs/7980f044-d5f7-4b11-ba8b-f13c2c769d62
2024-01-08 15:39:27,110 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.configuration.GlobalConfiguration           [] - Loading configuration property: metrics.reporter.promappmgr.scope.variables.excludes, task_attempt_id
[OSSLogAppender:main] doSend cost time(ms):[42], current log queue size:[19], total received/discarded:[519/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[500]
2024-01-08 15:39:27,219 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.client.deployment.application.executors.EmbeddedExecutor [] - Job 7980f044d5f74b11ba8bf13c2c769d62 is submitted.
2024-01-08 15:39:27,220 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.client.deployment.application.executors.EmbeddedExecutor [] - Submitting Job with JobId=7980f044d5f74b11ba8bf13c2c769d62.
2024-01-08 15:39:27,250 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.dispatcher.StandaloneDispatcher     [] - Received JobGraph submission 'Flink Java Job at Mon Jan 08 15:39:26 CST 2024' (7980f044d5f74b11ba8bf13c2c769d62).
2024-01-08 15:39:27,252 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.dispatcher.StandaloneDispatcher     [] - Submitting job 'Flink Java Job at Mon Jan 08 15:39:26 CST 2024' (7980f044d5f74b11ba8bf13c2c769d62).
2024-01-08 15:39:27,270 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.execution.librarycache.BlobLibraryCacheManager [] - Create a new user code classloader for job 7980f044d5f74b11ba8bf13c2c769d62, URLs [file:/opt/flink/flink-tmp-dir/jm_93b06903f9668f5d7ad62c00e2d1f42a/blobStorage/job_7980f044d5f74b11ba8bf13c2c769d62/blob_p-83ad684aae54d4e9f12896b07a8fa10f6d3d97cd-22ade5220f1fc9b7b5ec38a16ee65b18, file:../usrlib/WordCount.jar].
2024-01-08 15:39:27,278 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.jobmaster.JobMasterServiceLeadershipRunner [] - JobMasterServiceLeadershipRunner for job 7980f044d5f74b11ba8bf13c2c769d62 was granted leadership with leader id 00000000-0000-0000-0000-000000000000. Creating new JobMasterServiceProcess.
2024-01-08 15:39:27,306 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Starting RPC endpoint for org.apache.flink.runtime.jobmaster.JobMaster at akka://flink/user/rpc/jobmanager_2 .
2024-01-08 15:39:27,329 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Initializing job 'Flink Java Job at Mon Jan 08 15:39:26 CST 2024' (7980f044d5f74b11ba8bf13c2c769d62).
2024-01-08 15:39:27,382 [jobmanager-io-thread-1] WARN  org.apache.flink.configuration.Configuration                 [] - Config uses deprecated configuration key 'restart-strategy' instead of proper key 'restart-strategy.type'
2024-01-08 15:39:27,384 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using restart back off time strategy FixedDelayRestartBackoffTimeStrategy(maxNumberRestartAttempts=2147483647, backoffTimeMS=10000) for Flink Java Job at Mon Jan 08 15:39:26 CST 2024 (7980f044d5f74b11ba8bf13c2c769d62).
2024-01-08 15:39:27,451 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Created execution graph ff20d4a3c7c1ef3ea257cd637f0fe145 for job 7980f044d5f74b11ba8bf13c2c769d62.
2024-01-08 15:39:27,481 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Running initialization on master for job Flink Java Job at Mon Jan 08 15:39:26 CST 2024 (7980f044d5f74b11ba8bf13c2c769d62).
2024-01-08 15:39:27,489 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Successfully ran initialization on master in 8 ms.
2024-01-08 15:39:27,533 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.scheduler.adapter.DefaultExecutionTopology [] - Built 1 new pipelined regions in 1 ms, total 1 pipelined regions currently.
2024-01-08 15:39:27,550 [jobmanager-io-thread-1] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Using failover strategy org.apache.flink.runtime.executiongraph.failover.flip1.RestartPipelinedRegionFailoverStrategy@7c652103 for Flink Java Job at Mon Jan 08 15:39:26 CST 2024 (7980f044d5f74b11ba8bf13c2c769d62).
2024-01-08 15:39:27,588 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Starting execution of job 'Flink Java Job at Mon Jan 08 15:39:26 CST 2024' (7980f044d5f74b11ba8bf13c2c769d62) under job master id 00000000000000000000000000000000.
2024-01-08 15:39:27,601 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Starting scheduling with scheduling strategy [org.apache.flink.runtime.scheduler.strategy.PipelinedRegionSchedulingStrategy]
2024-01-08 15:39:27,602 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Job Flink Java Job at Mon Jan 08 15:39:26 CST 2024 (7980f044d5f74b11ba8bf13c2c769d62) switched from state CREATED to RUNNING.
2024-01-08 15:39:27,606 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - CHAIN DataSource (at getDefaultTextLineDataSet(WordCountData.java:70) (org.apache.flink.api.java.io.CollectionInputFormat)) -> FlatMap (FlatMap at main(WordCount.java:84)) -> Combine (SUM(1), at main(WordCount.java:87) (1/1) (ff20d4a3c7c1ef3ea257cd637f0fe145_fd45fe622194bc593afd3c364fbcb1d9_0_0) switched from CREATED to SCHEDULED.
2024-01-08 15:39:27,608 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Reduce (SUM(1), at main(WordCount.java:87) (1/1) (ff20d4a3c7c1ef3ea257cd637f0fe145_33d0b8d77106e28f601999533204794c_0_0) switched from CREATED to SCHEDULED.
2024-01-08 15:39:27,608 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - DataSink (collect()) (1/1) (ff20d4a3c7c1ef3ea257cd637f0fe145_1094e98ff47b4eb72feb20095f70db58_0_0) switched from CREATED to SCHEDULED.
2024-01-08 15:39:27,651 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Connecting to ResourceManager akka.tcp://flink@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:6123/user/rpc/resourcemanager_*(00000000000000000000000000000000)
2024-01-08 15:39:27,672 [flink-akka.actor.default-dispatcher-16] INFO  org.apache.flink.api.java.ExecutionEnvironment               [] - Job has been submitted with JobID 7980f044d5f74b11ba8bf13c2c769d62
2024-01-08 15:39:27,674 [flink-akka.actor.default-dispatcher-16] WARN  org.apache.flink.client.deployment.application.ApplicationDispatcherBootstrap [] - Application failed unexpectedly: 
java.util.concurrent.CompletionException: org.apache.flink.client.deployment.application.ApplicationExecutionException: Could not execute application.
	at java.util.concurrent.CompletableFuture.encodeThrowable(CompletableFuture.java:292) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture.completeThrowable(CompletableFuture.java:308) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture.uniCompose(CompletableFuture.java:957) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture$UniCompose.tryFire(CompletableFuture.java:940) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture.postComplete(CompletableFuture.java:488) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture.completeExceptionally(CompletableFuture.java:1990) ~[?:1.8.0_372]
	at org.apache.flink.client.deployment.application.ApplicationDispatcherBootstrap.runApplicationEntryPoint(ApplicationDispatcherBootstrap.java:337) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.deployment.application.ApplicationDispatcherBootstrap.lambda$runApplicationAsync$2(ApplicationDispatcherBootstrap.java:254) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511) ~[?:1.8.0_372]
	at java.util.concurrent.FutureTask.run(FutureTask.java:266) ~[?:1.8.0_372]
	at org.apache.flink.runtime.concurrent.akka.ActorSystemScheduledExecutorAdapter$ScheduledFutureTask.run(ActorSystemScheduledExecutorAdapter.java:171) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.concurrent.akka.ClassLoadingUtils.runWithContextClassLoader(ClassLoadingUtils.java:68) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.concurrent.akka.ClassLoadingUtils.lambda$withContextClassLoader$0(ClassLoadingUtils.java:41) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.dispatch.TaskInvocation.run(AbstractDispatcher.scala:49) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.dispatch.ForkJoinExecutorConfigurator$AkkaForkJoinTask.exec(ForkJoinExecutorConfigurator.scala:48) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at java.util.concurrent.ForkJoinTask.doExec(ForkJoinTask.java:289) [?:1.8.0_372]
	at java.util.concurrent.ForkJoinPool$WorkQueue.runTask(ForkJoinPool.java:1056) [?:1.8.0_372]
	at java.util.concurrent.ForkJoinPool.runWorker(ForkJoinPool.java:1692) [?:1.8.0_372]
	at java.util.concurrent.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:175) [?:1.8.0_372]
Caused by: org.apache.flink.client.deployment.application.ApplicationExecutionException: Could not execute application.
	... 13 more
Caused by: org.apache.flink.client.program.ProgramInvocationException: The main method caused an error: Job was submitted in detached mode. Results of job execution, such as accumulators, runtime, etc. are not available. Please make sure your program doesn't call an eager execution function [collect, print, printToErr, count]. 
	at org.apache.flink.client.program.PackagedProgram.callMainMethod(PackagedProgram.java:389) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.program.PackagedProgram.invokeInteractiveModeForExecution(PackagedProgram.java:235) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.ClientUtils.executeProgram(ClientUtils.java:106) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.deployment.application.ApplicationDispatcherBootstrap.runApplicationEntryPoint(ApplicationDispatcherBootstrap.java:301) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	... 12 more
Caused by: org.apache.flink.api.common.InvalidProgramException: Job was submitted in detached mode. Results of job execution, such as accumulators, runtime, etc. are not available. Please make sure your program doesn't call an eager execution function [collect, print, printToErr, count]. 
	at org.apache.flink.core.execution.DetachedJobExecutionResult.getAccumulatorResult(DetachedJobExecutionResult.java:56) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.api.java.DataSet.collect(DataSet.java:419) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.api.java.DataSet.print(DataSet.java:1748) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.examples.java.wordcount.WordCount.main(WordCount.java:96) ~[?:?]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[?:1.8.0_372]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:82) ~[?:1.8.0_372]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[?:1.8.0_372]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[?:1.8.0_372]
	at org.apache.flink.client.program.PackagedProgram.callMainMethod(PackagedProgram.java:372) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.program.PackagedProgram.invokeInteractiveModeForExecution(PackagedProgram.java:235) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.ClientUtils.executeProgram(ClientUtils.java:106) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.deployment.application.ApplicationDispatcherBootstrap.runApplicationEntryPoint(ApplicationDispatcherBootstrap.java:301) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	... 12 more
2024-01-08 15:39:27,693 [flink-akka.actor.default-dispatcher-16] ERROR org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Fatal error occurred in the cluster entrypoint.
java.util.concurrent.CompletionException: org.apache.flink.client.deployment.application.ApplicationExecutionException: Could not execute application.
	at java.util.concurrent.CompletableFuture.encodeThrowable(CompletableFuture.java:292) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture.completeThrowable(CompletableFuture.java:308) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture.uniCompose(CompletableFuture.java:957) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture$UniCompose.tryFire(CompletableFuture.java:940) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture.postComplete(CompletableFuture.java:488) ~[?:1.8.0_372]
	at java.util.concurrent.CompletableFuture.completeExceptionally(CompletableFuture.java:1990) ~[?:1.8.0_372]
	at org.apache.flink.client.deployment.application.ApplicationDispatcherBootstrap.runApplicationEntryPoint(ApplicationDispatcherBootstrap.java:337) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.deployment.application.ApplicationDispatcherBootstrap.lambda$runApplicationAsync$2(ApplicationDispatcherBootstrap.java:254) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511) ~[?:1.8.0_372]
	at java.util.concurrent.FutureTask.run(FutureTask.java:266) ~[?:1.8.0_372]
	at org.apache.flink.runtime.concurrent.akka.ActorSystemScheduledExecutorAdapter$ScheduledFutureTask.run(ActorSystemScheduledExecutorAdapter.java:171) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.concurrent.akka.ClassLoadingUtils.runWithContextClassLoader(ClassLoadingUtils.java:68) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.concurrent.akka.ClassLoadingUtils.lambda$withContextClassLoader$0(ClassLoadingUtils.java:41) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.dispatch.TaskInvocation.run(AbstractDispatcher.scala:49) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.dispatch.ForkJoinExecutorConfigurator$AkkaForkJoinTask.exec(ForkJoinExecutorConfigurator.scala:48) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at java.util.concurrent.ForkJoinTask.doExec(ForkJoinTask.java:289) [?:1.8.0_372]
	at java.util.concurrent.ForkJoinPool$WorkQueue.runTask(ForkJoinPool.java:1056) [?:1.8.0_372]
	at java.util.concurrent.ForkJoinPool.runWorker(ForkJoinPool.java:1692) [?:1.8.0_372]
	at java.util.concurrent.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:175) [?:1.8.0_372]
Caused by: org.apache.flink.client.deployment.application.ApplicationExecutionException: Could not execute application.
	... 13 more
Caused by: org.apache.flink.client.program.ProgramInvocationException: The main method caused an error: Job was submitted in detached mode. Results of job execution, such as accumulators, runtime, etc. are not available. Please make sure your program doesn't call an eager execution function [collect, print, printToErr, count]. 
	at org.apache.flink.client.program.PackagedProgram.callMainMethod(PackagedProgram.java:389) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.program.PackagedProgram.invokeInteractiveModeForExecution(PackagedProgram.java:235) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.ClientUtils.executeProgram(ClientUtils.java:106) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.deployment.application.ApplicationDispatcherBootstrap.runApplicationEntryPoint(ApplicationDispatcherBootstrap.java:301) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	... 12 more
Caused by: org.apache.flink.api.common.InvalidProgramException: Job was submitted in detached mode. Results of job execution, such as accumulators, runtime, etc. are not available. Please make sure your program doesn't call an eager execution function [collect, print, printToErr, count]. 
	at org.apache.flink.core.execution.DetachedJobExecutionResult.getAccumulatorResult(DetachedJobExecutionResult.java:56) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.api.java.DataSet.collect(DataSet.java:419) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.api.java.DataSet.print(DataSet.java:1748) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.examples.java.wordcount.WordCount.main(WordCount.java:96) ~[?:?]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[?:1.8.0_372]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:82) ~[?:1.8.0_372]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[?:1.8.0_372]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[?:1.8.0_372]
	at org.apache.flink.client.program.PackagedProgram.callMainMethod(PackagedProgram.java:372) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.program.PackagedProgram.invokeInteractiveModeForExecution(PackagedProgram.java:235) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.ClientUtils.executeProgram(ClientUtils.java:106) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.client.deployment.application.ApplicationDispatcherBootstrap.runApplicationEntryPoint(ApplicationDispatcherBootstrap.java:301) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	... 12 more
[OSSLogAppender] on shutdown...
[OSSLogAppender] on shutdown...
2024-01-08 15:39:27,711 [KubernetesApplicationClusterEntrypoint shutdown hook] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Shutting KubernetesApplicationClusterEntrypoint down with application status UNKNOWN. Diagnostics Cluster entrypoint has been closed externally..
[OSSLogAppender] on shutdown...2024-01-08 15:39:27,720 [KubernetesApplicationClusterEntrypoint shutdown hook] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Shutting down rest endpoint.

2024-01-08 15:39:27,743 [BlobServer shutdown hook] INFO  org.apache.flink.runtime.blob.BlobServer                     [] - Stopped BLOB server at 0.0.0.0:6124
[Thread-0:main] doSend cost time(ms):[33], current log queue size:[1], total received/discarded:[546/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[545]
[Thread-0:main] finally close(), total received/discarded:[546/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[545]
[OSSLogAppender] finish shutdown...
First appender to file:[logs/ssc-space-default/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/7980f044-d5f7-4b11-ba8b-f13c2c769d62/jobmanager-59b69fbdd7-qf4ch/20240108_153927-1], tid:[59][Thread-7:main] doSend cost time(ms):[166], current log queue size:[0], total received/discarded:[1/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[1]
[Thread-7:main] finally close(), total received/discarded:[1/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[1]
[OSSLogAppender] finish shutdown...
First appender to file:[logs/ssc-space-default/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/7980f044-d5f7-4b11-ba8b-f13c2c769d62/jobmanager-59b69fbdd7-qf4ch/20240108_153927-2], tid:[28][Thread-4:main] doSend cost time(ms):[141], current log queue size:[0], total received/discarded:[16/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[16]
[Thread-4:main] finally close(), total received/discarded:[16/0],exceptionReceived/exceptionDiscarded:[0/0], total send:[16]
[OSSLogAppender] finish shutdown...
2024-01-08 15:39:28,178 [flink-akka.actor.default-dispatcher-5] INFO  org.apache.flink.kubernetes.KubernetesResourceManagerDriver  [] - Recovered 0 pods from previous attempts, current attempt id is 1.
2024-01-08 15:39:28,178 [flink-akka.actor.default-dispatcher-5] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Recovered 0 workers from previous attempt.
2024-01-08 15:39:28,195 [flink-akka.actor.default-dispatcher-5] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Resolved ResourceManager address, beginning registration
2024-01-08 15:39:28,199 [flink-akka.actor.default-dispatcher-18] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Registering job manager 00000000000000000000000000000000@akka.tcp://flink@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:6123/user/rpc/jobmanager_2 for job 7980f044d5f74b11ba8bf13c2c769d62.
2024-01-08 15:39:28,210 [flink-akka.actor.default-dispatcher-5] INFO  org.apache.flink.runtime.resourcemanager.active.ActiveResourceManager [] - Registered job manager 00000000000000000000000000000000@akka.tcp://flink@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:6123/user/rpc/jobmanager_2 for job 7980f044d5f74b11ba8bf13c2c769d62.
2024-01-08 15:39:28,216 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - JobManager successfully registered at ResourceManager, leader id: 00000000000000000000000000000000.
2024-01-08 15:39:28,222 [flink-akka.actor.default-dispatcher-5] INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Received resource requirements from job 7980f044d5f74b11ba8bf13c2c769d62: [ResourceRequirement{resourceProfile=ResourceProfile{UNKNOWN}, numberOfRequiredSlots=1}]
2024-01-08 15:39:28,268 [Thread-25] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Removing cache directory /tmp/flink-web-c7aedf1e-ec33-4c38-a9e6-9a9426595f75/flink-web-ui
2024-01-08 15:39:28,269 [Thread-25] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - http://job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:8081 lost leadership
2024-01-08 15:39:28,269 [Thread-25] INFO  org.apache.flink.runtime.jobmaster.MiniDispatcherRestEndpoint [] - Shut down complete.
2024-01-08 15:39:28,269 [Thread-25] INFO  org.apache.flink.runtime.entrypoint.component.DispatcherResourceManagerComponent [] - Closing components.
2024-01-08 15:39:28,270 [Thread-25] INFO  org.apache.flink.runtime.dispatcher.runner.SessionDispatcherLeaderProcess [] - Stopping SessionDispatcherLeaderProcess.
2024-01-08 15:39:28,273 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.dispatcher.StandaloneDispatcher     [] - Stopping dispatcher akka.tcp://flink@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:6123/user/rpc/dispatcher_0.
2024-01-08 15:39:28,273 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.dispatcher.StandaloneDispatcher     [] - Stopping all currently running jobs of dispatcher akka.tcp://flink@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:6123/user/rpc/dispatcher_0.
2024-01-08 15:39:28,274 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Stopping the JobMaster for job 'Flink Java Job at Mon Jan 08 15:39:26 CST 2024' (7980f044d5f74b11ba8bf13c2c769d62).
2024-01-08 15:39:28,278 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.dispatcher.StandaloneDispatcher     [] - Job 7980f044d5f74b11ba8bf13c2c769d62 reached terminal state SUSPENDED.
2024-01-08 15:39:28,284 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Job Flink Java Job at Mon Jan 08 15:39:26 CST 2024 (7980f044d5f74b11ba8bf13c2c769d62) switched from state RUNNING to SUSPENDED.
org.apache.flink.util.FlinkException: Scheduler is being stopped.
	at org.apache.flink.runtime.scheduler.SchedulerBase.closeAsyncInternal(SchedulerBase.java:712) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.scheduler.SchedulerBase.closeAsync(SchedulerBase.java:689) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.jobmaster.JobMaster.stopScheduling(JobMaster.java:1183) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.jobmaster.JobMaster.stopJobExecution(JobMaster.java:1146) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.jobmaster.JobMaster.onStop(JobMaster.java:468) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.rpc.RpcEndpoint.internalCallOnStop(RpcEndpoint.java:239) ~[flink-dist-1.17-vvr-8.0.4-SNAPSHOT.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.rpc.akka.AkkaRpcActor$StartedState.lambda$terminate$0(AkkaRpcActor.java:578) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.concurrent.akka.ClassLoadingUtils.runWithContextClassLoader(ClassLoadingUtils.java:83) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.rpc.akka.AkkaRpcActor$StartedState.terminate(AkkaRpcActor.java:577) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at org.apache.flink.runtime.rpc.akka.AkkaRpcActor.handleControlMessage(AkkaRpcActor.java:196) ~[flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.japi.pf.UnitCaseStatement.apply(CaseStatements.scala:24) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.japi.pf.UnitCaseStatement.apply(CaseStatements.scala:20) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at scala.PartialFunction.applyOrElse(PartialFunction.scala:127) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at scala.PartialFunction.applyOrElse$(PartialFunction.scala:126) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.japi.pf.UnitCaseStatement.applyOrElse(CaseStatements.scala:20) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at scala.PartialFunction$OrElse.applyOrElse(PartialFunction.scala:175) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at scala.PartialFunction$OrElse.applyOrElse(PartialFunction.scala:176) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.actor.Actor.aroundReceive(Actor.scala:537) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.actor.Actor.aroundReceive$(Actor.scala:535) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.actor.AbstractActor.aroundReceive(AbstractActor.scala:220) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.actor.ActorCell.receiveMessage(ActorCell.scala:579) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.actor.ActorCell.invoke(ActorCell.scala:547) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.dispatch.Mailbox.processMailbox(Mailbox.scala:270) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.dispatch.Mailbox.run(Mailbox.scala:231) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at akka.dispatch.Mailbox.exec(Mailbox.scala:243) [flink-rpc-akka_0d4d9078-1888-408a-bb4c-040ad0770f4d.jar:1.17-vvr-8.0.4-SNAPSHOT]
	at java.util.concurrent.ForkJoinTask.doExec(ForkJoinTask.java:289) [?:1.8.0_372]
	at java.util.concurrent.ForkJoinPool$WorkQueue.runTask(ForkJoinPool.java:1056) [?:1.8.0_372]
	at java.util.concurrent.ForkJoinPool.runWorker(ForkJoinPool.java:1692) [?:1.8.0_372]
	at java.util.concurrent.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:175) [?:1.8.0_372]
2024-01-08 15:39:28,292 [Thread-25] INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Stopping resource manager service.
2024-01-08 15:39:28,292 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Clearing resource requirements of job 7980f044d5f74b11ba8bf13c2c769d62
2024-01-08 15:39:28,293 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedTaskManagerTracker [] - Clear all pending allocations for job 7980f044d5f74b11ba8bf13c2c769d62.
2024-01-08 15:39:28,294 [pool-7-thread-1] INFO  org.apache.flink.runtime.resourcemanager.ResourceManagerServiceImpl [] - Resource manager service is not running. Ignore revoking leadership.
2024-01-08 15:39:28,305 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - CHAIN DataSource (at getDefaultTextLineDataSet(WordCountData.java:70) (org.apache.flink.api.java.io.CollectionInputFormat)) -> FlatMap (FlatMap at main(WordCount.java:84)) -> Combine (SUM(1), at main(WordCount.java:87) (1/1) (ff20d4a3c7c1ef3ea257cd637f0fe145_fd45fe622194bc593afd3c364fbcb1d9_0_0) switched from SCHEDULED to CANCELING.
2024-01-08 15:39:28,305 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - CHAIN DataSource (at getDefaultTextLineDataSet(WordCountData.java:70) (org.apache.flink.api.java.io.CollectionInputFormat)) -> FlatMap (FlatMap at main(WordCount.java:84)) -> Combine (SUM(1), at main(WordCount.java:87) (1/1) (ff20d4a3c7c1ef3ea257cd637f0fe145_fd45fe622194bc593afd3c364fbcb1d9_0_0) switched from CANCELING to CANCELED.
2024-01-08 15:39:28,313 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Stopping credential renewal
2024-01-08 15:39:28,314 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.security.token.DefaultDelegationTokenManager [] - Stopped credential renewal
2024-01-08 15:39:28,314 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Closing the slot manager.
2024-01-08 15:39:28,314 [flink-akka.actor.default-dispatcher-17] INFO  org.apache.flink.runtime.resourcemanager.slotmanager.FineGrainedSlotManager [] - Suspending the slot manager.
2024-01-08 15:39:28,315 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Discarding the results produced by task execution ff20d4a3c7c1ef3ea257cd637f0fe145_fd45fe622194bc593afd3c364fbcb1d9_0_0.
2024-01-08 15:39:28,317 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Reduce (SUM(1), at main(WordCount.java:87) (1/1) (ff20d4a3c7c1ef3ea257cd637f0fe145_33d0b8d77106e28f601999533204794c_0_0) switched from SCHEDULED to CANCELING.
2024-01-08 15:39:28,318 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Reduce (SUM(1), at main(WordCount.java:87) (1/1) (ff20d4a3c7c1ef3ea257cd637f0fe145_33d0b8d77106e28f601999533204794c_0_0) switched from CANCELING to CANCELED.
2024-01-08 15:39:28,325 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Discarding the results produced by task execution ff20d4a3c7c1ef3ea257cd637f0fe145_33d0b8d77106e28f601999533204794c_0_0.
2024-01-08 15:39:28,325 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - DataSink (collect()) (1/1) (ff20d4a3c7c1ef3ea257cd637f0fe145_1094e98ff47b4eb72feb20095f70db58_0_0) switched from SCHEDULED to CANCELING.
2024-01-08 15:39:28,325 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - DataSink (collect()) (1/1) (ff20d4a3c7c1ef3ea257cd637f0fe145_1094e98ff47b4eb72feb20095f70db58_0_0) switched from CANCELING to CANCELED.
2024-01-08 15:39:28,326 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Discarding the results produced by task execution ff20d4a3c7c1ef3ea257cd637f0fe145_1094e98ff47b4eb72feb20095f70db58_0_0.
2024-01-08 15:39:28,327 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.executiongraph.ExecutionGraph       [] - Job 7980f044d5f74b11ba8bf13c2c769d62 has been suspended.
2024-01-08 15:39:28,328 [flink-akka.actor.default-dispatcher-19] INFO  org.apache.flink.runtime.jobmaster.JobMaster                 [] - Close ResourceManager connection 93b06903f9668f5d7ad62c00e2d1f42a: Stopping JobMaster for job 'Flink Java Job at Mon Jan 08 15:39:26 CST 2024' (7980f044d5f74b11ba8bf13c2c769d62).
2024-01-08 15:39:28,336 [cluster-io-thread-5] INFO  org.apache.flink.runtime.dispatcher.StandaloneDispatcher     [] - Stopped dispatcher akka.tcp://flink@job-7980f044-d5f7-4b11-ba8b-f13c2c769d62.vvp-workload:6123/user/rpc/dispatcher_0.
2024-01-08 15:39:28,349 [cluster-io-thread-6] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Stopping Akka RPC service.
2024-01-08 15:39:28,354 [cluster-io-thread-6] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Stopping Akka RPC service.
2024-01-08 15:39:28,395 [flink-metrics-6] WARN  akka.actor.CoordinatedShutdown                               [] - Could not addJvmShutdownHook, due to: Shutdown in progress
2024-01-08 15:39:28,397 [flink-metrics-6] INFO  akka.actor.CoordinatedShutdown                               [] - Running CoordinatedShutdown with reason [ActorSystemTerminateReason]
2024-01-08 15:39:28,410 [flink-metrics-6] INFO  akka.remote.RemoteActorRefProvider$RemotingTerminator        [] - Shutting down remote daemon.
2024-01-08 15:39:28,412 [flink-metrics-6] INFO  akka.remote.RemoteActorRefProvider$RemotingTerminator        [] - Remote daemon shut down; proceeding with flushing remote transports.
2024-01-08 15:39:28,421 [flink-akka.actor.default-dispatcher-19] WARN  akka.actor.CoordinatedShutdown                               [] - Could not addJvmShutdownHook, due to: Shutdown in progress
2024-01-08 15:39:28,422 [flink-akka.actor.default-dispatcher-19] INFO  akka.actor.CoordinatedShutdown                               [] - Running CoordinatedShutdown with reason [ActorSystemTerminateReason]
2024-01-08 15:39:28,427 [flink-akka.actor.default-dispatcher-19] INFO  akka.remote.RemoteActorRefProvider$RemotingTerminator        [] - Shutting down remote daemon.
2024-01-08 15:39:28,428 [flink-akka.actor.default-dispatcher-19] INFO  akka.remote.RemoteActorRefProvider$RemotingTerminator        [] - Remote daemon shut down; proceeding with flushing remote transports.
2024-01-08 15:39:28,454 [flink-metrics-6] INFO  akka.remote.RemoteActorRefProvider$RemotingTerminator        [] - Remoting shut down.
2024-01-08 15:39:28,461 [flink-akka.actor.default-dispatcher-19] INFO  akka.remote.RemoteActorRefProvider$RemotingTerminator        [] - Remoting shut down.
2024-01-08 15:39:28,474 [flink-akka.actor.default-dispatcher-5] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Stopped Akka RPC service.
2024-01-08 15:39:28,487 [main] INFO  org.apache.flink.runtime.entrypoint.ClusterEntrypoint        [] - Terminating cluster entrypoint process KubernetesApplicationClusterEntrypoint with exit code 1445.
2024-01-08 15:39:28,487 [flink-metrics-6] INFO  org.apache.flink.runtime.rpc.akka.AkkaRpcService             [] - Stopped Akka RPC service.
`;

const dataSource: Event[] = [
    {
        key: "1",
        id: "1",
        dateTime: "2024-01-08 15:39:38",
        message: "Awaiting cluster teardown.",
    },
    {
        key: "2",
        id: "2",
        dateTime: "2024-01-08 15:39:35",
        message: "Terminating a job due to an unrecoverable failure.",
    },
    {
        key: "3",
        id: "3",
        dateTime: "2024-01-08 15:39:35",
        message:
            "Main method error, please check your code and parameters. Detailed context: " +
            "Caused by: org.apache.flink.client.program.ProgramInvocationException: The main method caused an error: Job was submitted in detached mode. " +
            "Results of job execution, such as accumulators, runtime, etc. are not available.",
        extra:
            "Main method error, please check your code and parameters. Detailed context: " +
            "Caused by: org.apache.flink.client.program.ProgramInvocationException: The main method caused an error: Job was submitted in detached mode. " +
            "Results of job execution, such as accumulators, runtime, etc. are not available.",
        type: "message",
    },
    {
        key: "4",
        id: "4",
        dateTime: "2024-01-08 15:39:31",
        message:
            "Some pod containers have been restarted unexpectedly. Containers reported the following reasons: [Error]. " +
            "Please check the Kubernetes pod logs if your application does not reach its desired state.",
        extra: text,
        type: "log",
    },
    {
        key: "5",
        id: "5",
        dateTime: "2024-01-08 15:38:36",
        message: "Waiting for a cluster to become ready.",
    },
    {
        key: "6",
        id: "6",
        dateTime: "2024-01-08 15:38:36",
        message: "Attempting to launch a cluster. This operation is idempotent.",
    },
    {
        key: "7",
        id: "7",
        dateTime: "2024-01-08 15:38:33",
        message: "Waiting for a job to start.",
    },
    {
        key: "8",
        id: "8",
        dateTime: "	2024-01-08 15:38:29",
        message: "Creating a new job.",
    },
];

const filterOptions: SelectProps["options"] = [
    {
        value: "auto",
        label: "自动调优",
    },
    {
        value: "other",
        label: "其他",
    },
];

const EventLayout = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const onCopyClick = () => {
        messageApi.success({
            icon: <></>,
            content: (
                <>
                    <CheckCircleOutlined color="#00a700" />
                    已复制到剪切板
                </>
            ),
        });
    };

    const columns: ColumnTypes = [
        {
            title: "时间",
            width: 200,
            dataIndex: "dateTime",
        },
        {
            title: "信息",
            dataIndex: "message",
            ellipsis: true,
            render: value => (
                <Tooltip
                    placement="topLeft"
                    title={value}
                >
                    {value}
                </Tooltip>
            ),
        },
        {
            title: "操作",
            className: "operator",
            render: () => <a onClick={onCopyClick}>复制信息</a>,
        },
    ];

    return (
        <div className="batch-event-layout">
            <Input
                addonBefore={
                    <Select
                        placeholder="过滤"
                        options={filterOptions}
                        popupMatchSelectWidth={80}
                    />
                }
                className="search-input"
                suffix={<SearchOutlined />}
                placeholder="输入信息内容或作业 ID"
            />

            <Table
                size="small"
                expandable={{
                    expandedRowRender: record => (
                        <MonacoEditor
                            value={record.extra}
                            height={record.type === "log" ? 360 : 100}
                            options={{
                                minimap: {
                                    enabled: false,
                                },
                                lineDecorationsWidth: 0,
                                wordWrap: "on",
                                readOnly: true,
                            }}
                        />
                    ),
                    rowExpandable: record => !!record.extra,
                    columnWidth: 64,
                }}
                columns={columns}
                dataSource={dataSource}
            />
            {contextHolder}
        </div>
    );
};

export default EventLayout;
