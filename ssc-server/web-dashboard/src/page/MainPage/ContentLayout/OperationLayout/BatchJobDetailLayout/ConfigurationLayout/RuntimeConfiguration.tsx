import { Collapse, CollapseProps, Descriptions, DescriptionsProps } from "antd";

const descItems: DescriptionsProps["items"] = [
    { key: "", label: "table.exec.operator-name.max-length", children: "10240" },
    {
        key: "",
        label: "env.java.opts.jobmanager",
        children:
            "-Xloggc:/opt/flink/log/jobmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M",
    },
    { key: "", label: "metrics.reporter.promappmgr.port", children: "9999" },
    { key: "", label: "metrics.reporter.jmx.port", children: "10000-10240" },
    {
        key: "",
        label: "env.java.opts",
        children:
            "-verbose:gc -XX:NewRatio=3 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:ParallelGCThreads=4 -Xss512k",
    },
    { key: "", label: "jobmanager.execution.failover-strategy", children: "region" },
    { key: "", label: "jobmanager.rpc.address", children: "localhost" },
    { key: "", label: "taskmanager.network.memory.max", children: "4g" },
    { key: "", label: "taskmanager.slot.timeout", children: "60 s" },
    { key: "", label: "kubernetes.jobmanager.labels", children: "sigma.ali/disable-default-pdb-strategy:true" },
    {
        key: "",
        label: "metrics.reporter.jmx.factory.class",
        children: "org.apache.flink.metrics.jmx.JMXReporterFactory",
    },
    { key: "", label: "akka.watch.heartbeat.interval", children: "10 s" },
    {
        key: "",
        label: "high-availability.storageDir",
        children:
            "oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/ha",
    },
    { key: "", label: "io.tmp.dirs", children: "/opt/flink/flink-tmp-dir" },
    { key: "", label: "parallelism.default", children: "1" },
    { key: "", label: "metrics.reporters", children: "jmx,promappmgr" },
    { key: "", label: "cluster.fine-grained-resource-management.enabled", children: "true" },
    { key: "", label: "cluster.thread-dump.stacktrace-max-depth", children: "32" },
    { key: "", label: "taskmanager.numberOfTaskSlots", children: "1" },
    { key: "", label: "akka.ask.timeout", children: "120 s" },
    { key: "", label: "jobmanager.memory.enable-jvm-direct-memory-limit", children: "true" },
    {
        key: "",
        label: "jobmanager.archive.fs.dir",
        children: "oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/history",
    },
    { key: "", label: "taskmanager.memory.process.size", children: "1728m" },
    { key: "", label: "taskmanager.network.memory.floating-buffers-per-gate", children: "256" },
    { key: "", label: "security.delegation.token.provider.hbase.enabled", children: "false" },
    { key: "", label: "restart-strategy.fixed-delay.attempts", children: "2147483647" },
    { key: "", label: "cluster.io-pool.size", children: "64" },
    { key: "", label: "jobmanager.memory.process.size", children: "4096m" },
    { key: "", label: "taskmanager.network.sort-shuffle.min-buffers", children: "2048" },
    { key: "", label: "jobmanager.rpc.port", children: "6123" },
    { key: "", label: "jobmanager.execution.attempts-history-size", children: "100" },
    {
        key: "",
        label: "metrics.reporter.promappmgr.factory.class",
        children: "org.apache.flink.metrics.prometheus.PrometheusReporterFactory",
    },
    { key: "", label: "akka.framesize", children: "100m" },
    { key: "", label: "slotmanager.number-of-slots.max", children: "5000" },
    { key: "", label: "restart-strategy.fixed-delay.delay", children: "10 s" },
    { key: "", label: "kubernetes.dns-policy", children: "Default" },
    { key: "", label: "daplatform.support-status", children: "production" },
    { key: "", label: "fs.oss.endpoint", children: "https://oss-cn-hangzhou-internal.aliyuncs.com" },
    { key: "", label: "table.exec.legacy-cast-behaviour", children: "enabled" },
    { key: "", label: "table.exec.operator.object-reuse-enabled", children: "true" },
    { key: "", label: "restart-strategy", children: "fixed-delay" },
    { key: "", label: "taskmanager.network.retries", children: "3" },
    {
        key: "",
        label: "env.java.opts.taskmanager",
        children:
            "-Xloggc:/opt/flink/log/taskmanager-gc.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=2 -XX:GCLogFileSize=50M",
    },
    {
        key: "",
        label: "state.checkpoints.dir",
        children:
            "oss://ssc-bucket-v2/flink-jobs/namespaces/ssc-space-default/deployments/f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3/checkpoints/jobs/7980f044-d5f7-4b11-ba8b-f13c2c769d62",
    },
    { key: "", label: "metrics.reporter.promappmgr.scope.variables.excludes", children: "task_attempt_id" },
];

const items: CollapseProps["items"] = [
    {
        label: "自定义参数",
        children: <div className="no-data">暂无数据</div>,
        className: "custom-collapse-item",
    },
    {
        label: "全量参数",
        children: (
            <Descriptions
                column={1}
                bordered
                size="small"
                labelStyle={{ width: 280, fontSize: 12 }}
                contentStyle={{ fontSize: 12 }}
                items={descItems}
            />
        ),
        className: "all-collapse-item",
    },
];

const RuntimeConfiguration = () => {
    return (
        <Collapse
            items={items}
            expandIconPosition="end"
            className="runtime-configuration-collapse"
        />
    );
};

export default RuntimeConfiguration;
