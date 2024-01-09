import { Collapse, CollapseProps, Descriptions, Modal, ModalProps } from "antd";
import "./index.sass";
import MonacoEditor from "../../../../../../component/MonacoEditor";

const items: CollapseProps["items"] = [
    {
        key: "1",
        label: "基础配置",
        children: (
            <>
                <MonacoEditor
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        scrollBeyondLastLine: false,
                        lineNumbersMinChars: 4,
                        lineDecorationsWidth: 0,
                    }}
                    height={250}
                    value={`--********************************************************************--
-- Author:         1840755998634838
-- Created Time:   2023-11-03 15:13:45
-- Description:    Write your description here
-- Hints:          You can use SET statements to modify the configuration
--********************************************************************--
CREATE TEMPORARY TABLE datagen_source (
    id INT,
    score INT
) WITH (
    'connector' = 'datagen',
    'rows-per-second' = '1',
    'fields.id.start' = '1',
    'fields.id.end' = '50',
    'fields.id.kind'='sequence',
    'fields.score.kind'='random',
    'fields.score.min'='70',
    'fields.score.max'='100'
);

CREATE TEMPORARY TABLE print_sink(
    id INT,
    score INT
) WITH (
    'connector' = 'print'
);
INSERT INTO print_sink SELECT id,score from datagen_source;`}
                />
                <Descriptions
                    column={1}
                    bordered
                    size="small"
                    labelStyle={{ width: 280, fontSize: 12 }}
                    contentStyle={{ fontSize: 12 }}
                    items={[
                        {
                            key: 1,
                            label: "Session 集群",
                            children: "ssc-session",
                        },
                        {
                            key: 2,
                            label: "引擎版本",
                            children: "vvr-8.0.1-flink-1.17",
                        },
                        {
                            key: 3,
                            label: "附加依赖文件",
                            children: "-",
                        },
                    ]}
                />
            </>
        ),
    },
    {
        key: "2",
        label: "资源配置",
        children: (
            <Descriptions
                column={1}
                bordered
                size="small"
                labelStyle={{ width: 280, fontSize: 12 }}
                contentStyle={{ fontSize: 12 }}
                items={[
                    {
                        key: 1,
                        label: "资源模式",
                        children: "基础模式",
                    },
                    {
                        key: 2,
                        label: "并发度",
                        children: "1",
                    },
                    {
                        key: 3,
                        label: "每个 TaskManager Slot 数",
                        children: "1",
                    },
                ]}
            />
        ),
    },
    {
        key: "3",
        label: "运动参数配置",
        className: "parameters-panel",
        children: (
            <Collapse
                items={[
                    {
                        key: 1,
                        label: "自定义参数",
                        children: (
                            <Descriptions
                                column={1}
                                bordered
                                size="small"
                                labelStyle={{ width: 280, fontSize: 12 }}
                                contentStyle={{ fontSize: 12 }}
                                items={[
                                    {
                                        key: 1,
                                        label: "execution.checkpointing.interval",
                                        children: "180s",
                                    },
                                    {
                                        key: 2,
                                        label: "table.exec.state.ttl",
                                        children: "36 h",
                                    },
                                    {
                                        key: 3,
                                        label: "restart-strategy.fixed-delay.delay",
                                        children: "10 s",
                                    },
                                    {
                                        key: 4,
                                        label: "restart-strategy",
                                        children: "fixed-delay",
                                    },
                                    {
                                        key: 5,
                                        label: "restart-strategy.fixed-delay.attempts",
                                        children: "2147483647",
                                    },
                                    {
                                        key: 6,
                                        label: "execution.checkpointing.min-pause",
                                        children: "180s",
                                    },
                                ]}
                            />
                        ),
                    },
                    {
                        key: 2,
                        label: "全量参数",
                        children: (
                            <Descriptions
                                column={1}
                                bordered
                                size="small"
                                labelStyle={{ width: 280, fontSize: 12 }}
                                contentStyle={{ fontSize: 12 }}
                                items={[
                                    { key: "1", label: "table.exec.operator-name.max-length", children: "10240" },
                                    {
                                        key: "2",
                                        label: "env.java.opts.jobmanager",
                                        children:
                                            "-Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M",
                                    },
                                    { key: "3", label: "metrics.reporter.promappmgr.port", children: "9999" },
                                    {
                                        key: "4",
                                        label: "env.java.opts",
                                        children:
                                            "-verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k",
                                    },
                                    { key: "5", label: "jobmanager.rpc.address", children: "localhost" },
                                    { key: "6", label: "taskmanager.network.memory.max", children: "4g" },
                                    {
                                        key: "7",
                                        label: "high-availability.kubernetes.leader-election.lease-duration",
                                        children: "60 s",
                                    },
                                    { key: "8", label: "state.backend.gemini.vm.print.tick", children: "90" },
                                    {
                                        key: "9",
                                        label: "high-availability.storageDir",
                                        children:
                                            "oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/2eeb5c2f-b2f1-4bbe-b727-01b105b5a3d2/ha",
                                    },
                                    { key: "0", label: "io.tmp.dirs", children: "/opt/flink/flink-tmp-dir" },
                                    { key: "10", label: "parallelism.default", children: "1" },
                                    { key: "11", label: "metrics.reporters", children: "jmx,promappmgr" },
                                    {
                                        key: "12",
                                        label: "cluster.fine-grained-resource-management.enabled",
                                        children: "true",
                                    },
                                    { key: "13", label: "cluster.thread-dump.stacktrace-max-depth", children: "32" },
                                    { key: "14", label: "taskmanager.memory.process.size", children: "1728m" },
                                    {
                                        key: "15",
                                        label: "table.exec.slot-sharing-group.prefer-heap-memory",
                                        children: "512m",
                                    },
                                    {
                                        key: "16",
                                        label: "execution.checkpointing.tolerable-failed-checkpoints",
                                        children: "2147483647",
                                    },
                                    { key: "17", label: "state.backend.incremental", children: "true" },
                                    { key: "18", label: "jobmanager.rpc.port", children: "6123" },
                                    { key: "19", label: "execution.checkpointing.interval", children: "180s" },
                                    { key: "20", label: "table.exec.state.ttl", children: "36 h" },
                                    { key: "21", label: "restart-strategy.fixed-delay.delay", children: "10 s" },
                                    { key: "22", label: "state.backend.gemini.snapshot.close.file", children: "true" },
                                    { key: "23", label: "kubernetes.dns-policy", children: "Default" },
                                    { key: "24", label: "table.exec.legacy-cast-behaviour", children: "enabled" },
                                    {
                                        key: "25",
                                        label: "state.backend",
                                        children: "com.flink.statebackend.GeminiStateBackendFactory",
                                    },
                                    { key: "26", label: "metrics.reporter.jmx.port", children: "10000-10240" },
                                    { key: "27", label: "jobmanager.execution.failover-strategy", children: "region" },
                                    { key: "28", label: "taskmanager.slot.timeout", children: "60 s" },
                                    {
                                        key: "29",
                                        label: "state.savepoints.dir",
                                        children:
                                            "oss://ssc-bucket-v2/flink-savepoints/namespaces/ssc-space-default/deployments/2eeb5c2f-b2f1-4bbe-b727-01b105b5a3d2",
                                    },
                                    {
                                        key: "30",
                                        label: "kubernetes.jobmanager.labels",
                                        children: "sigma.ali/disable-default-pdb-strategy:true",
                                    },
                                    {
                                        key: "31",
                                        label: "metrics.reporter.jmx.factory.class",
                                        children: "org.apache.flink.metrics.jmx.JMXReporterFactory",
                                    },
                                    { key: "32", label: "akka.watch.heartbeat.interval", children: "10 s" },
                                    {
                                        key: "33",
                                        label: "state.backend.gemini.restore.file-download.buffer.size",
                                        children: "512kb",
                                    },
                                    {
                                        key: "34",
                                        label: "fs.oss.impl",
                                        children: "org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem",
                                    },
                                    {
                                        key: "35",
                                        label: "state.backend.gemini.restore.page-download.buffer.size",
                                        children: "16kb",
                                    },
                                    { key: "36", label: "taskmanager.numberOfTaskSlots", children: "1" },
                                    { key: "37", label: "akka.ask.timeout", children: "120 s" },
                                    {
                                        key: "38",
                                        label: "jobmanager.memory.enable-jvm-direct-memory-limit",
                                        children: "true",
                                    },
                                    {
                                        key: "39",
                                        label: "taskmanager.network.memory.floating-buffers-per-gate",
                                        children: "256",
                                    },
                                    {
                                        key: "40",
                                        label: "security.delegation.token.provider.hbase.enabled",
                                        children: "false",
                                    },
                                    {
                                        key: "41",
                                        label: "restart-strategy.fixed-delay.attempts",
                                        children: "2147483647",
                                    },
                                    { key: "42", label: "cluster.io-pool.size", children: "64" },
                                    { key: "43", label: "jobmanager.memory.process.size", children: "4096m" },
                                    { key: "44", label: "jobmanager.execution.attempts-history-size", children: "100" },
                                    {
                                        key: "45",
                                        label: "metrics.reporter.promappmgr.factory.class",
                                        children: "org.apache.flink.metrics.prometheus.PrometheusReporterFactory",
                                    },
                                    { key: "46", label: "akka.framesize", children: "100m" },
                                    { key: "47", label: "slotmanager.number-of-slots.max", children: "5000" },
                                    { key: "48", label: "daplatform.support-status", children: "production" },
                                    {
                                        key: "49",
                                        label: "high-availability",
                                        children:
                                            "org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory",
                                    },
                                    {
                                        key: "51",
                                        label: "execution.checkpointing.externalized-checkpoint-retention",
                                        children: "RETAIN_ON_CANCELLATION",
                                    },
                                    {
                                        key: "52",
                                        label: "fs.oss.endpoint",
                                        children: "https://oss-cn-hangzhou-internal.aliyuncs.com",
                                    },
                                    { key: "53", label: "restart-strategy", children: "fixed-delay" },
                                    { key: "54", label: "execution.checkpointing.min-pause", children: "180s" },
                                    { key: "55", label: "taskmanager.network.retries", children: "3" },
                                    { key: "56", label: "table.optimizer.window-join-enabled", children: "false" },
                                    {
                                        key: "57",
                                        label: "env.java.opts.taskmanager",
                                        children:
                                            "-Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M",
                                    },
                                    {
                                        key: "58",
                                        label: "high-availability.kubernetes.leader-election.renew-deadline",
                                        children: "60 s",
                                    },
                                    {
                                        key: "59",
                                        label: "state.checkpoints.dir",
                                        children:
                                            "oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/2eeb5c2f-b2f1-4bbe-b727-01b105b5a3d2/checkpoints/jobs/a5808f14-0762-4e85-8974-ed63e167fe42",
                                    },
                                    {
                                        key: "60",
                                        label: "metrics.reporter.promappmgr.scope.variables.excludes",
                                        children: "task_attempt_id",
                                    },
                                ]}
                            />
                        ),
                    },
                ]}
                expandIconPosition="end"
                size="small"
            />
        ),
    },
];

const DetailModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            title="作业详情"
            width={900}
            footer={null}
            className="job-detail-modal"
        >
            <Collapse
                items={items}
                expandIconPosition="end"
                size="small"
            />
        </Modal>
    );
};

export default DetailModal;
