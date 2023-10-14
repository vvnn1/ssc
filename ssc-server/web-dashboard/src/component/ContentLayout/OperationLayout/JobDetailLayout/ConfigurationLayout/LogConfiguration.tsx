import { Button, Descriptions, DescriptionsProps, Dropdown, Form, FormInstance, Input, InputNumber, Popconfirm, Select, Space, Switch } from "antd";
import MonacoEditor from "../../../../MonacoEditor";
import LogLevelSelect from "../../../../Select/LogLevelSelect";
import { BarsOutlined, DeleteOutlined } from "../../../../Icon";
import { useState } from "react";

type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

interface Cofniguration {
    enableFile: boolean,
    fileKeepDays: number,
    rootLogLevel: LogLevel,
    classLogLevel: { classPath: string | undefined, logLevel: LogLevel | undefined }[],
    templateType: 'default' | 'custom',
    configXml: string
}

const LogConfiguration = (props: { editing: boolean, form: FormInstance }) => {
    const [data, setData] = useState<Cofniguration>({
        enableFile: true,
        fileKeepDays: 7,
        rootLogLevel: 'INFO',
        classLogLevel: [],
        templateType: 'custom',
        configXml: ''
    });

    const [enableFile, setEnableFile] = useState<boolean>(data.enableFile);

    const { editing, form } = props;
    const items = [];

    if (editing) {
        items.push(
            {
                key: 'log-file',
                label: '日志归档',
                children: (
                    <Space>
                        <Form.Item
                            name="enableFile"
                            initialValue={data.enableFile}
                            valuePropName="checked"
                        >
                            <Switch onChange={setEnableFile} />
                        </Form.Item>
                        <div className="switch-title">开启日志归档</div>
                    </Space>
                )
            }
        );

        if (enableFile) {
            items.push(
                {
                    key: 'file-keep',
                    label: '归档日志有效期',
                    children: (
                        <Form.Item
                            name="fileKeepDays"
                            initialValue={data.fileKeepDays}
                        >
                            <InputNumber addonAfter='天' />
                        </Form.Item>
                    )
                }
            )
        }

        items.push(
            {
                key: 'root-log-level',
                label: '根日志级别',
                children: (
                    <Form.Item
                        name="rootLogLevel"
                        initialValue={data.rootLogLevel}
                    >
                        <LogLevelSelect />
                    </Form.Item>
                )
            },
        );

        items.push(
            {
                key: 'class-log-level',
                label: '类日志级别',
                children: (
                    <Form.List
                        name="classLogLevel"
                        initialValue={[...data.classLogLevel, {}]}
                    >
                        {(fields, { add, remove }) => (
                            <>
                                {
                                    fields.map((field, index) => (
                                        <Form.Item
                                            key={field.key}
                                            style={{ marginBottom: '0', marginTop: index > 0 ? '8px' : '0px' }}
                                        >
                                            <Form.Item name={[field.name, "classPath"]} style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginBottom: '0' }}>
                                                <Input placeholder="Logger name" onChange={index + 1 === fields.length ? () => add() : undefined} />
                                            </Form.Item>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '24px', marginBottom: '0' }}>
                                                <Space.Compact style={{ alignItems: "center", width: '100%' }}>
                                                    <Form.Item name={[field.name, "logLevel"]} style={{ width: '100%' }}>
                                                        <LogLevelSelect placeholder="Logger level" onChange={index + 1 === fields.length ? () => add() : undefined} />
                                                    </Form.Item>
                                                    <Button style={{ marginLeft: "4px" }} disabled={index + 1 === fields.length} onClick={() => remove(field.name)} danger><DeleteOutlined /></Button>
                                                </Space.Compact>
                                            </Form.Item>
                                        </Form.Item>
                                    ))
                                }
                            </>
                        )}
                    </Form.List>
                )
            },
        );

        items.push(
            {
                key: 'log-template',
                label: '日志模板',
                children: (
                    <Form.Item
                        name="templateType"
                        initialValue={data.templateType}
                    >
                        <Select

                            options={
                                [
                                    {
                                        label: '系统模板',
                                        options: [
                                            {
                                                label: 'default',
                                                value: 'default'
                                            }
                                        ]
                                    },
                                    {
                                        label: '用户配置',
                                        options: [
                                            {
                                                label: '自定义模板',
                                                value: 'custom'
                                            }
                                        ]
                                    }
                                ]
                            }
                        />
                    </Form.Item>
                )
            }
        )
    } else {
        if (data.enableFile) {
            items.push(
                {
                    key: 'log-file',
                    label: '日志归档',
                    children: '已开启'
                }
            );
            items.push(
                {
                    key: 'file-keep',
                    label: '归档日志有效期',
                    children: `${data.fileKeepDays} 天`
                }
            );
        }

        items.push(
            {
                key: 'root-log-level',
                label: '根日志级别',
                children: data.rootLogLevel
            },
        );

        items.push(
            ...data.classLogLevel
                .filter(item => item && item.classPath)
                .map(item => {
                    return { key: item.classPath, label: item.classPath, children: item.logLevel as string };
                })
        );

        items.push(
            {
                key: 'log-template',
                label: '日志模板',
                children: data.templateType === 'default' ? 'default' : '自定义模板'
            }
        )
    }

    const onFinish = (value: any) => {
        setData({
            ...data,
            ...value
        })
    }

    return (
        <div className="log-configuration">
            <Form
                form={form}
                component={false}
                size='small'
                onFinish={onFinish}
            >
                <Descriptions
                    column={1}
                    bordered
                    size='small'
                    labelStyle={{ width: 280, fontSize: 12 }}
                    contentStyle={{ fontSize: 12 }}
                    items={items}
                    className='log-configuration-descriptions'
                />
                <div className="template-container">
                    {
                        data.templateType === 'custom' && editing
                            ? (
                                <div className="logging-action">
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'default',
                                                    label: (
                                                        <Popconfirm
                                                            okText="确认"
                                                            cancelText="取消"
                                                            title='如果应用了新模板，您当前的更改将丢失。确定要这样做吗？'
                                                            overlayClassName="ant-popover-rtl"
                                                            onConfirm={() => {
                                                                setData({
                                                                    ...data,
                                                                    configXml: defaultLogXml
                                                                })
                                                            }}
                                                        >
                                                            default
                                                        </Popconfirm>
                                                    ),
                                                }
                                            ]
                                        }}
                                    >
                                        <Button type="link" icon={<BarsOutlined />} size="small">从系统模板复制编辑</Button>
                                    </Dropdown>

                                </div>
                            )
                            : null
                    }
                    <MonacoEditor
                        options={{
                            minimap: {
                                enabled: false
                            },
                            scrollBeyondLastLine: false,
                            lineNumbersMinChars: 4,
                            lineDecorationsWidth: 0,
                        }}
                        height={300}
                        value={data.templateType === 'default' ? defaultLogXml : data.configXml}
                    />
                </div>

            </Form>
        </div>
    )
};

export default LogConfiguration;


const defaultLogXml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
</Configuration>`