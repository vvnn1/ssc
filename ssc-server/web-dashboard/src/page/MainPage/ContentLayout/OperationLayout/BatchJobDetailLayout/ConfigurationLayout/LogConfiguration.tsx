import { Descriptions, DescriptionsProps } from "antd";
import MonacoEditor from "../../../../../../component/MonacoEditor";

const defaultLogXml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Configuration packages="com.ververica.platform.logging.appender" xmlns="http://logging.apache.org/log4j/2.0/config" strict="true" monitorInterval="30">
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
    <Appender name="OSS_ARCHIVE" type="OSS">
    <Layout pattern="%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n" type="PatternLayout" charset="UTF-8"/>
    <Property name="namespace">ssc-space-default</Property>
    <Property name="deploymentId">f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3</Property>
    <Property name="jobId">7980f044-d5f7-4b11-ba8b-f13c2c769d62</Property>
    <Property name="baseUri">oss://ssc-bucket-v2</Property>
    <Property name="endpoint">https://oss-cn-hangzhou-internal.aliyuncs.com</Property>
    <Property name="accessKeyId"></Property>
    <Property name="secretAccessKey"></Property>
    <Property name="flushIntervalSeconds">10</Property>
    <Property name="flushIntervalEventCount">100</Property>
    <Property name="rollingBytes">104857600</Property>
</Appender></Appenders>
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
        </Logger><Root level="INFO">
            <AppenderRef ref="StdOut"/>
            <AppenderRef ref="OSS_ARCHIVE"/>
		<AppenderRef ref="RollingFile"/>
        </Root>
    </Loggers>
</Configuration>
`;

const items: DescriptionsProps["items"] = [
    {
        key: "file",
        label: "日志归档",
        children: "已开启",
    },
    {
        key: "days",
        label: "归档日志有效期",
        children: "7天",
    },
    {
        key: "level",
        label: "根日志级别",
        children: "INFO",
    },
    {
        key: "template",
        label: "日志模板",
        children: "查看以下内容",
    },
];

const LogConfiguration = () => {
    return (
        <div className="log-configuration">
            <Descriptions
                column={1}
                bordered
                size="small"
                labelStyle={{ width: 280, fontSize: 12 }}
                contentStyle={{ fontSize: 12 }}
                items={items}
                className="log-configuration-descriptions"
            />
            <MonacoEditor
                options={{
                    minimap: {
                        enabled: false,
                    },
                    scrollBeyondLastLine: false,
                    lineNumbersMinChars: 4,
                    lineDecorationsWidth: 0,
                }}
                height={300}
                value={defaultLogXml}
            />
        </div>
    );
};

export default LogConfiguration;
