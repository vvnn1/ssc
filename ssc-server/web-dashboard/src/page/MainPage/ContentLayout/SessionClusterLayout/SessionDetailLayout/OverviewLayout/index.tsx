import { Descriptions, DescriptionsProps, Tabs, TabsProps } from "antd";
import "./index.sass";
import MonacoEditor from "../../../../../../component/MonacoEditor";

const xml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Configuration xmlns="http://logging.apache.org/log4j/2.0/config" strict="true" monitorInterval="30">
    <Appenders>
        <Appender name="StdOut" type="Console">
            <Layout pattern="%d{yyyy-MM-dd HH:mm:ss,SSS} [%-tn] %-5p %-60c %x - %m%n" type="PatternLayout" charset="UTF-8"/>
        </Appender>
        <Appender name="RollingFile" type="RollingFile" fileName="\${sys:log.file}" filePattern="\${sys:log.file}.%i">
            <Layout pattern="%d{yyyy-MM-dd HH:mm:ss,SSS} [%-tn] %-5p %-60c %x - %m%n" type="PatternLayout" charset="UTF-8"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="5 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="1"/>
        </Appender>
        <Appender name="StdOutErrConsoleAppender" type="Console">
            <Layout pattern="%m" type="PatternLayout" charset="UTF-8"/>
        </Appender>
        <Appender name="StdOutFileAppender" type="RollingFile" fileName="\${sys:stdout.file}" filePattern="\${sys:stdout.file}.%i">
            <Layout pattern="%m" type="PatternLayout" charset="UTF-8"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="5 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="2"/>
        </Appender>
        <Appender name="StdErrFileAppender" type="RollingFile" fileName="\${sys:stderr.file}" filePattern="\${sys:stderr.file}.%i">
            <Layout pattern="%m" type="PatternLayout" charset="UTF-8"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="5 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="2"/>
        </Appender>
    </Appenders>
    <Loggers>
        <Logger level="INFO" name="org.apache.hadoop"/>
        <Logger level="INFO" name="org.apache.kafka"/>
        <Logger level="INFO" name="org.apache.zookeeper"/>
        <Logger level="INFO" name="akka"/>
        <Logger level="ERROR" name="org.jboss.netty.channel.DefaultChannelPipeline"/>
        <Logger level="ERROR" name="com.ververica.platform.logging.appender.oss"/>
        <Logger level="ERROR" name="org.apache.flink.fs.osshadoop.shaded.com.aliyun.oss"/>
        <Logger level="OFF" name="org.apache.flink.runtime.rest.handler.job.JobDetailsHandler"/>
        <Logger level="INFO" name="StdOutErrRedirector.StdOut" additivity="false">
            <AppenderRef ref="StdOutFileAppender"/>
            <AppenderRef ref="StdOutErrConsoleAppender"/>
        </Logger>
        <Logger level="INFO" name="StdOutErrRedirector.StdErr" additivity="false">
            <AppenderRef ref="StdErrFileAppender"/>
            <AppenderRef ref="StdOutErrConsoleAppender"/>
        </Logger>
        {%- for name, level in userConfiguredLoggers -%}
        <Logger level="{{ level }}" name="{{ name }}"/>
        {%- endfor -%}
        <Root level="{{ rootLoggerLogLevel }}">
            <AppenderRef ref="StdOut"/>
            <AppenderRef ref="RollingFile"/>
        </Root>
    </Loggers>
</Configuration>
`;

const sessionItems: DescriptionsProps["items"] = [
    {
        key: "1",
        label: "Deployment Target",
        children: "vvp-workload (8d8475c7-48e5-4cac-9436-3936fc0e4ad5)",
        span: 3,
    },
    {
        key: "2",
        label: "Desired State",
        children: "STOPPED",
        span: 3,
    },
    {
        key: "3",
        label: "Number of Task Managers",
        children: "1",
        span: 3,
    },
    {
        key: "4",
        label: "Job Manager CPU",
        children: "1",
        span: 3,
    },
    {
        key: "5",
        label: "Job Manager Memory",
        children: "4GiB",
        span: 3,
    },
    {
        key: "6",
        label: "Task Manager CPU",
        children: "2",
        span: 3,
    },
    {
        key: "7",
        label: "Task Manager Memory",
        children: "8GiB",
        span: 3,
    },
];

const artifactItems = [
    {
        key: "1",
        label: "Engine Version",
        children: "vvr-8.0.1-flink-1.17",
        span: 1,
    },
];

const FlinkItems = [
    {
        key: "1",
        label: "metrics.reporters",
        children: "promappmgr",
        span: 3,
    },
    {
        key: "2",
        label: "metrics.reporter.promappmgr.port",
        children: "9999",
        span: 3,
    },
    {
        key: "3",
        label: "metrics.reporter.promappmgr.factory.class",
        children: "org.apache.flink.metrics.prometheus.PrometheusReporterFactory",
        span: 3,
    },
    {
        key: "4",
        label: "restart-strategy",
        children: "none",
        span: 3,
    },
];

const loggingItems = [
    {
        key: "1",
        label: "root",
        children: "INFO",
        span: 3,
    },
];

const OverviewLayout = () => {
    const items: DescriptionsProps["items"] = [
        {
            key: "1",
            label: "创建时间",
            children: "09-07 10:26:31",
        },
        {
            key: "2",
            label: "修改时间",
            children: "09-07 14:14:29",
        },

        {
            key: "36",
            label: "操作",
            children: "",
            labelStyle: { visibility: "hidden", borderRight: "none" },
        },
        {
            key: "4",
            label: "Used / Total Slots",
            children: "-",
        },
        {
            key: "5",
            label: "Taskmanagers",
            children: "-",
        },
        {
            key: "6",
            label: "Jobs",
            children: "-",
        },
    ];

    const tabItems: TabsProps["items"] = [
        {
            key: "1",
            label: " Session 集群配置 ",
            children: (
                <Descriptions
                    bordered
                    items={sessionItems}
                    size="small"
                />
            ),
        },
        {
            key: "2",
            label: "Artifact 配置",
            children: (
                <Descriptions
                    bordered
                    items={artifactItems}
                    size="small"
                />
            ),
        },
        {
            key: "3",
            label: "Flink 配置",
            children: (
                <Descriptions
                    bordered
                    items={FlinkItems}
                    size="small"
                />
            ),
        },
        {
            key: "4",
            label: "日志配置 | default",
            children: (
                <MonacoEditor
                    language="xml"
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        selectOnLineNumbers: true,
                        lineNumbersMinChars: 2,
                        lineDecorationsWidth: 0,
                        wordWrap: "on",
                        readOnly: false,
                        scrollBeyondLastLine: false,
                    }}
                    value={xml}
                    height={1052}
                />
            ),
        },
        {
            key: "5",
            label: "Logging Level 配置",
            children: (
                <Descriptions
                    bordered
                    items={loggingItems}
                    size="small"
                />
            ),
        },
    ];

    return (
        <div className="session-overview-layout">
            <div className="description">
                <Descriptions
                    bordered
                    items={items}
                    size="small"
                />
            </div>
            <Tabs
                className="configuration-tabs"
                items={tabItems}
                defaultActiveKey="1"
            />
        </div>
    );
};

export default OverviewLayout;
