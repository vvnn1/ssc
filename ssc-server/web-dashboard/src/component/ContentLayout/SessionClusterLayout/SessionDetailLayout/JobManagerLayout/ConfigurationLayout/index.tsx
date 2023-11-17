import { Card, Table } from "antd";
import "./index.sass";

type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;


const columns: ColumnTypes = [
    {
        title: "key",
        dataIndex: "key",
        width: "50%",
        render: (value) => <strong>{value}</strong>
    },
    {
        title: "value",
        dataIndex: "value",
        width: "50%",
        ellipsis: true,
        className: "td-value"
    }
];

const columns2: ColumnTypes = [
    {
        title: "key",
        dataIndex: "key",
        width: "50%",
        render: (value) => <strong>{value}</strong>
    },
    {
        title: "value",
        dataIndex: "value",
        width: "50%",
        className: "td-value"
    }
];

const columns3: ColumnTypes = [
    {
        title: "value",
        dataIndex: "value",
        width: "100%",
    }
];

interface NoStyleTableBodyProps {
    children: React.ReactNode;
}

const NoStyleTableBody: React.FC<NoStyleTableBodyProps> = ({
    children
}) => {
    return (
        <tbody className="ant-table-body">
            {children}
        </tbody>
    );
};

const ConfigurationLayout = () => {
    return (
        <div className="jobmanager-configuration">
            <Card
                title="Configurations"
                type="inner"
                className="configuration-card"
            >
                <Table
                    showHeader={false}
                    columns={columns}
                    dataSource={[
                        { key: "$internal.cluster.deployment.mode", value: "REACTIVE_SESSION" },
                        { key: "blob.server.port", value: "6124" },
                        { key: "cluster.termination-message-path", value: "/flink/log/termination.log" },
                        { key: "env.java.opts", value: "-Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out -Dlog4j.configurationFile=/flink/conf.template/log4j2.xml -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000" },
                        { key: "fs.oss.endpoint", value: "https://oss-cn-hangzhou-internal.aliyuncs.com" },
                        { key: "fs.oss.impl", value: "org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem" },
                        { key: "high-availability", value: "org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory" },
                        { key: "high-availability.cluster-id", value: "c3d0298e-8a85-48b1-a767-659b74d20d1a" },
                        { key: "high-availability.jobmanager.port", value: "6123" },
                        { key: "high-availability.respect-checkpoint-retention-on-shutdown", value: "true" },
                        { key: "high-availability.storageDir", value: "oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/ha" },
                        { key: "jmx.server.port", value: "10000,10001-10500" },
                        { key: "jobmanager.memory.heap.size", value: "3462817376b" },
                        { key: "jobmanager.memory.jvm-metaspace.size", value: "268435456b" },
                        { key: "jobmanager.memory.jvm-overhead.max", value: "429496736b" },
                        { key: "jobmanager.memory.jvm-overhead.min", value: "429496736b" },
                        { key: "jobmanager.memory.off-heap.size", value: "134217728b" },
                        { key: "jobmanager.memory.process.size", value: "4096m" },
                        { key: "jobmanager.rpc.address", value: "sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager" },
                        { key: "jobmanager.rpc.port", value: "6123" },
                        { key: "kubernetes.cluster-id", value: "session-c3d0298e-8a85-48b1-a767-659b74d20d1a" },
                        { key: "kubernetes.jobmanager.service-account", value: "vvp" },
                        { key: "kubernetes.namespace", value: "vvp-workload" },
                        { key: "kubernetes.taskmanager.service-account", value: "vvr-task-manager" },
                        { key: "metrics.reporter.promappmgr.factory.class", value: "org.apache.flink.metrics.prometheus.PrometheusReporterFactory" },
                        { key: "metrics.reporter.promappmgr.port", value: "9999" },
                        { key: "metrics.reporters", value: "promappmgr" },
                        { key: "rest.port", value: "8081" },
                        { key: "restart-strategy", value: "none" },
                        { key: "security.delegation.token.provider.hbase.enabled", value: "******" },
                        { key: "state.backend", value: "com.alibaba.flink.statebackend.GeminiStateBackendFactory" },
                        { key: "state.backend.gemini.snapshot.close.file", value: "true" },
                        { key: "state.checkpoints.dir", value: "oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/checkpoints" },
                        { key: "state.savepoints.dir", value: "oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/sessionclusters/debug-session" },
                        { key: "table.optimizer.window-join-enabled", value: "false" },
                        { key: "taskmanager.memory.process.size", value: "8192m" },
                        { key: "web.cancel.enable", value: "false" },
                        { key: "web.tmpdir", value: "/tmp/flink-web-6fc14187-ac24-445e-837e-167af8be95f8" }
                    ]}
                    size="small"
                    pagination={false}
                    scroll={{ y: 200 }}
                />
            </Card>
            <Card
                title="JVM"
                type="inner"
                className="jvm-card"
            >
                <Table
                    showHeader={false}
                    pagination={false}
                    columns={columns2}
                    dataSource={[
                        {
                            key: "version",
                            value: "OpenJDK 64-Bit Server VM - \"Alibaba\" - 1.8/25.102-b52"
                        },
                        {
                            key: "arch",
                            value: "amd64"
                        },
                        {
                            key: "options",
                            value:
                                `-Xmx3462817376
-Xms3462817376
-XX:MaxMetaspaceSize=268435456
-Dlog.file=/flink/log/flink--standalonesession-0-sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanjfc8p.log
-Dlog4j.configuration=file:/flink/conf.template/log4j-console.properties
-Dlog4j.configurationFile=file:/flink/conf.template/log4j-console.properties
-Dlogback.configurationFile=file:/flink/conf.template/logback-console.xml
-Djavax.net.ssl.keyStoreType=JKS
-Djavax.net.ssl.trustStoreType=JKS
-Dlog.file=/flink/log/flink.log
-Dstdout.file=/flink/log/flink.out
-Dlog4j.configurationFile=/flink/conf.template/log4j2.xml
-Djdk.tls.ephemeralDHKeySize=2048
-Dalicloud.sts.credential.provider=sts.file
-Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential
-Dsts.provider.credential.expire.seconds=900
-Dfile.encoding=UTF-8
-Dkubernetes.max.concurrent.requests=1000`
                            ,
                        }
                    ]}
                    scroll={{ y: 200 }}
                />
            </Card>

            <Card
                title="Classpath"
                type="inner"
            >
                <Table
                    size="small"
                    showHeader={false}
                    pagination={false}
                    scroll={{ y: 200 }}
                    columns={columns3}
                    dataSource={[
                        { value: "/flink/lib/celeborn-client-flink-1.17-shaded_2.12-0.3.0-1.2-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-cep-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-connector-files-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-csv-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-json-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-metrics-datadog-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-metrics-graphite-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-metrics-influxdb-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-metrics-kafka-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-metrics-kmonitor-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-metrics-log-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-metrics-prometheus-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-metrics-slf4j-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-metrics-statsd-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-queryable-state-runtime_*.jar" },
                        { value: "/flink/lib/flink-scala_2.12-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-shaded-hadoop-2-uber-3.1.3-10.0-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-statebackend-gemini-bundled_1.8-4.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-state-processor-api-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-table-api-java-uber-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-table-planner-loader-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-table-runtime-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/jersey-core-1.9.jar" },
                        { value: "/flink/lib/log4j-1.2-api-2.17.1.jar" },
                        { value: "/flink/lib/log4j-api-2.17.1.jar" },
                        { value: "/flink/lib/log4j-core-2.17.1.jar" },
                        { value: "/flink/lib/log4j-slf4j-impl-2.17.1.jar" },
                        { value: "/flink/lib/shuffle-plugin-1.1-SNAPSHOT.jar" },
                        { value: "/flink/lib/vvp-flink-logging-hdfs-1.0.15-withkafka-SNAPSHOT.jar" },
                        { value: "/flink/lib/vvp-flink-logging-kafka-1.0.15-withkafka-SNAPSHOT.jar" },
                        { value: "/flink/lib/vvp-flink-logging-oss-1.0.15-withkafka-SNAPSHOT.jar" },
                        { value: "/flink/lib/vvp-flink-logging-sls-1.0.15-withkafka-SNAPSHOT.jar" },
                        { value: "/flink/lib/flink-dist-1.17-vvr-8.0.1-SNAPSHOT.jar" },
                    ]}
                    components={{
                        body: {
                            wrapper: NoStyleTableBody
                        }
                    }}
                    rowKey={"value"}
                />
            </Card>
        </div>
    );
};

export default ConfigurationLayout;