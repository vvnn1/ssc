import { Alert, Button, Descriptions, DescriptionsProps, Form, FormInstance, Input, Space, Switch } from "antd";
import MonacoEditor from "../../../../../../component/MonacoEditor";
import { useEffect, useState } from "react";
import LogLevelSelect from "../../../../../../component/Select/LogLevelSelect";
import TemplateSelect from "../../../../../../component/Select/TemplateSelect";
import { BarsOutlined, DeleteOutlined } from "../../../../../../component/Icon";
import TemplateDropdown from "../../../../../../component/Dropdown/TemplateDropdown";
import TwigAlert from "../../../../../../component/Alert/TwigAlert";

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

interface Configuration {
    logging: {
        log4jLoggers: { loggerName: string; loggerLevel: string }[];
        loggingProfile: string;
        logReservePolicy: { openHistory: boolean; expirationDays: number };
    };
    labels: {};
}

interface LogConfigurationProps {
    editing: boolean;
    form: FormInstance;
}

function ganerateNormalItems(data: Configuration): DescriptionsProps["items"] {
    const items: DescriptionsProps["items"] = [
        {
            key: "file",
            label: "日志归档",
            children: data.logging.logReservePolicy.openHistory ? "已开启" : "已关闭",
        },
    ];

    if (data.logging.logReservePolicy.openHistory) {
        items.push({
            key: "days",
            label: "归档日志有效期",
            children: `${data.logging.logReservePolicy.expirationDays}天`,
        });
    }

    for (let logger of data.logging.log4jLoggers) {
        if (logger.loggerName === "") {
            items.push({
                key: "root-level",
                label: "根日志级别",
                children: logger.loggerLevel,
            });
        } else {
            items.push({
                key: "level" + logger.loggerName,
                label: logger.loggerName,
                children: logger.loggerLevel,
            });
        }
    }

    items.push({
        key: "template",
        label: "日志模板",
        children: "default",
    });

    return items;
}

function ganerateFormItems(data: Configuration): DescriptionsProps["items"] {
    const items: DescriptionsProps["items"] = [];
    items.push({
        key: "file",
        label: "日志归档",
        children: (
            <Space>
                <Form.Item
                    className="no-margin"
                    name={["logging", "logReservePolicy", "openHistory"]}
                >
                    <Switch />
                </Form.Item>
                <span> 开启日志归档</span>
            </Space>
        ),
    });

    items.push({
        key: "root-level",
        label: "根日志级别",
        children: (
            <Form.Item
                className="no-margin"
                name={["logging", "log4jLoggers", "0", "loggerLevel"]}
            >
                <LogLevelSelect />
            </Form.Item>
        ),
    });

    items.push({
        key: "class-level",
        label: "类日志等级",
        children: (
            <Form.List name={["logging", "log4jLoggers"]}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.slice(1).map((field, index) => (
                            <Form.Item
                                key={field.key}
                                style={{ marginBottom: "0", marginTop: index > 0 ? "8px" : "0px" }}
                            >
                                <Form.Item
                                    name={[field.name, "loggerName"]}
                                    style={{
                                        display: "inline-block",
                                        width: "calc(50% - 12px)",
                                        marginBottom: "0",
                                    }}
                                >
                                    <Input
                                        placeholder="Logger name"
                                        onChange={index + 1 === fields.length ? () => add() : undefined}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{
                                        display: "inline-block",
                                        width: "calc(50% - 12px)",
                                        marginLeft: "24px",
                                        marginBottom: "0",
                                    }}
                                >
                                    <Space.Compact style={{ alignItems: "center", width: "100%" }}>
                                        <Form.Item
                                            name={[field.name, "loggerLevel"]}
                                            style={{ width: "100%", marginBottom: "0" }}
                                        >
                                            <LogLevelSelect
                                                placeholder="Logger level"
                                                onChange={index + 1 === fields.length ? () => add() : undefined}
                                            />
                                        </Form.Item>
                                        <Button
                                            style={{ marginLeft: "4px" }}
                                            disabled={index + 1 === fields.length}
                                            onClick={() => remove(field.name)}
                                            danger
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </Space.Compact>
                                </Form.Item>
                            </Form.Item>
                        ))}
                    </>
                )}
            </Form.List>
        ),
    });

    items.push({
        key: "template",
        label: "日志模板",
        children: (
            <Form.Item
                className="no-margin"
                name={["logging", "loggingProfile"]}
            >
                <TemplateSelect />
            </Form.Item>
        ),
    });

    return items;
}

const LogConfiguration = ({ editing, form }: LogConfigurationProps) => {
    const [data, setData] = useState<Configuration>({
        logging: {
            log4jLoggers: [
                { loggerName: "", loggerLevel: "INFO" },
                { loggerName: "aa", loggerLevel: "TRACE" },
            ],
            loggingProfile: "default",
            logReservePolicy: { openHistory: true, expirationDays: 7 },
        },
        labels: {},
    });

    const [editValue, setEditValue] = useState<string>();

    useEffect(() => {
        if (editing) {
            form.setFieldsValue(data);
        }
    }, [editing]);

    return (
        <div className="log-configuration">
            <Form
                size="small"
                form={form}
            >
                <Descriptions
                    column={1}
                    bordered
                    size="small"
                    labelStyle={{ width: 280, fontSize: 12 }}
                    contentStyle={{ fontSize: 12 }}
                    items={editing ? ganerateFormItems(data) : ganerateNormalItems(data)}
                    className="log-configuration-descriptions"
                />

                {editing ? (
                    <div className="template-container">
                        <TemplateDropdown onConfirm={() => setEditValue(defaultLogXml)} />
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
                            value={editValue}
                        />
                        <TwigAlert />
                    </div>
                ) : (
                    <MonacoEditor
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            scrollBeyondLastLine: false,
                            lineNumbersMinChars: 4,
                            lineDecorationsWidth: 0,
                            readOnly: true,
                        }}
                        height={300}
                        value={defaultLogXml}
                    />
                )}
            </Form>
        </div>
    );
};

export default LogConfiguration;
