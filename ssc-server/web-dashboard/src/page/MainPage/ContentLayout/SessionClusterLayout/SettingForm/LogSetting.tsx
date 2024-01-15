import { Alert, Button, Col, Dropdown, Form, Input, Popconfirm, Row, Select, Space } from "antd";
import SettingCard from "../../../../../component/SettingCard";
import { BarsOutlined, DeleteOutlined, DownOutlined, UpOutlined } from "../../../../../component/Icon";
import LogLevelSelect from "../../../../../component/Select/LogLevelSelect";
import { useState } from "react";
import MonacoEditor from "../../../../../component/MonacoEditor";
import TwigAlert from "../../../../../component/Alert/TwigAlert";

const defaultLog = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
</Configuration>`;

const LogSetting = () => {
    const [templateOpen, setTemplateOpen] = useState<boolean>(false);
    const [templateModel, setTemplateModel] = useState<"default" | "custom">();
    const onTemplateBtnClick = () => {
        setTemplateOpen(!templateOpen);
    };
    return (
        <SettingCard
            title="日志配置"
            className="log-setting-card"
        >
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="根日志等级"
                        name="rootLogLevel"
                    >
                        <LogLevelSelect placeholder="请选择根日志等级" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.List
                        name="names2"
                        initialValue={[{}]}
                    >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        label={index === 0 ? "类日志等级" : null}
                                        key={field.key}
                                        style={{ marginBottom: "0", marginTop: index > 0 ? "8px" : "0px" }}
                                    >
                                        <Space.Compact style={{ width: "100%" }}>
                                            <Form.Item
                                                extra={index + 1 === fields.length ? "类日志名称" : null}
                                                style={{
                                                    display: "inline-block",
                                                    width: "calc(50% - 12px)",
                                                    marginBottom: "0",
                                                }}
                                            >
                                                <Input
                                                    onChange={index + 1 === fields.length ? () => add() : undefined}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                extra={index + 1 === fields.length ? "类日志等级" : null}
                                                style={{
                                                    display: "inline-block",
                                                    width: "calc(50% - 12px)",
                                                    marginLeft: "24px",
                                                    marginBottom: "0",
                                                }}
                                            >
                                                <LogLevelSelect
                                                    onChange={index + 1 === fields.length ? () => add() : undefined}
                                                />
                                            </Form.Item>
                                            <Button
                                                style={{ marginLeft: "4px" }}
                                                disabled={index + 1 === fields.length}
                                                onClick={() => remove(field.name)}
                                            >
                                                <DeleteOutlined />
                                            </Button>
                                        </Space.Compact>
                                    </Form.Item>
                                ))}
                            </>
                        )}
                    </Form.List>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="输出模板"
                        required
                    >
                        <Select
                            placeholder="请选择输入模板"
                            allowClear
                            onChange={setTemplateModel}
                            options={[
                                {
                                    label: "系统模板",
                                    options: [
                                        {
                                            value: "default",
                                            label: "Default",
                                        },
                                    ],
                                },
                                {
                                    label: "用户配置",
                                    options: [
                                        {
                                            value: "custom",
                                            label: "自定义模板",
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col
                    className="template-btn-col"
                    span={8}
                    push={8}
                    style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
                >
                    {templateModel === "default" ? (
                        <Button
                            icon={templateOpen ? <UpOutlined /> : <DownOutlined />}
                            type="link"
                            onClick={onTemplateBtnClick}
                        >
                            {templateOpen ? "收起模板" : "显示模板"}
                        </Button>
                    ) : null}

                    {templateModel === "custom" ? (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "default",
                                        label: (
                                            <Popconfirm
                                                okText="确认"
                                                cancelText="取消"
                                                title="如果应用了新模板，您当前的更改将丢失。确定要这样做吗？"
                                                overlayClassName="ant-popover-rtl"
                                            >
                                                default
                                            </Popconfirm>
                                        ),
                                    },
                                ],
                            }}
                        >
                            <Button
                                type="link"
                                icon={<BarsOutlined />}
                                size="small"
                            >
                                从系统模板复制编辑
                            </Button>
                        </Dropdown>
                    ) : null}
                </Col>
                <Col span={24}>
                    {templateModel === "custom" || templateOpen ? (
                        <Form.Item noStyle>
                            <div style={{ border: "1px solid #dedede", marginBottom: 12 }}>
                                <MonacoEditor
                                    options={{
                                        minimap: {
                                            enabled: false,
                                        },
                                        scrollBeyondLastLine: false,
                                        lineNumbers: "off",
                                    }}
                                    height={300}
                                    value={defaultLog}
                                />
                            </div>
                        </Form.Item>
                    ) : null}
                </Col>
                {templateModel === "custom" ? (
                    <Col span={24}>
                        <TwigAlert />
                    </Col>
                ) : null}
            </Row>
        </SettingCard>
    );
};

export default LogSetting;
