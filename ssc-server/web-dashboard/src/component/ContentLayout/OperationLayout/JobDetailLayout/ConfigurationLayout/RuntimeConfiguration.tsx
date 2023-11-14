import { Descriptions, DescriptionsProps, Form, FormInstance, InputNumber, Select, Tooltip } from "antd";
import { NumberOutlined } from "../../../../Icon";
import MonacoEditor from "../../../../MonacoEditor";
import { useEffect, useState } from "react";
import TimeInputNumber from "../../../../InputNumber/TimeInputNumber";

type RestartStrategy = "failure-rate" | "fixed-delay" | "none";

const RuntimeConfiguration = (props: { editing: boolean, form: FormInstance }) => {
    const [data, setData] = useState<any>({
        "execution.checkpointing.interval": "100s",
        "execution.checkpointing.min-pause": "2s",
        "table.exec.state.ttl": "3s",
        "restart-strategy": "fixed-delay",
        "restart-strategy.fixed-delay.attempts": "14",
        "restart-strategy.fixed-delay.delay": "65s",
        "others": "akka.client-socket-worker-pool.pool-size-min: 1"
    });
    const [restartStrategy, setRestartStrategy] = useState<RestartStrategy>(data["restart-strategy"]);

    const { editing, form } = props;

    useEffect(() => {
        form.setFieldsValue(data);
    }, []);


    const items: DescriptionsProps["items"] = [];
    if (editing) {
        items.push(
            ...[
                {
                    key: "execution.checkpointing.interval",
                    label: "系统检查点间隔",
                    children: (
                        <Form.Item
                            name='execution.checkpointing.interval'
                            initialValue='1s'
                        >
                            <TimeInputNumber
                                inputProps={{
                                    placeholder: "请输入系统检查点间隔，默认值: -"
                                }}
                            />
                        </Form.Item>
                    )
                },
                {
                    key: "execution.checkpointing.min-pause",
                    label: "两次系统检查点之间的最短时间间隔",
                    children: (
                        <Form.Item
                            name='execution.checkpointing.min-pause'
                            initialValue='2s'
                        >
                            <TimeInputNumber
                                inputProps={{
                                    placeholder: "请输入时间间隔，默认值: -"
                                }}
                            />
                        </Form.Item>
                    )
                },
                {
                    key: "table.exec.state.ttl",
                    label: "State 数据过期时间",
                    children: (
                        <Form.Item
                            name='table.exec.state.ttl'
                            initialValue='3s'
                        >
                            <TimeInputNumber
                                inputProps={{
                                    placeholder: "请输入 State 数据过期时间，默认值: 36 h"
                                }}
                            />
                        </Form.Item>
                    )
                },
                {
                    key: "restart-strategy",
                    label: "Flink 重启策略",
                    children: (
                        <Form.Item
                            name='restart-strategy'
                            rules={[
                                {

                                    warningOnly: true,
                                    message: "配置该参数后，Task 失败则 JobManager 进程不会重启，请谨慎选择。",
                                    pattern: /(failure-rate)|(fixed-delay)/
                                }
                            ]}
                        >
                            <Select
                                onChange={setRestartStrategy}
                                popupClassName="custom-content"
                                optionLabelProp="title"
                                allowClear
                                options={[
                                    {
                                        value: "failure-rate",
                                        label: (
                                            <>
                                                Failure Rate
                                                <small className="option-description">基于失败率重启</small>
                                            </>
                                        ),
                                        title: "Failure Rate",
                                    },
                                    {
                                        value: "fixed-delay",
                                        label: (
                                            <>
                                                Fixed Delay
                                                <small className="option-description">固定间隔重启</small>
                                            </>
                                        ),
                                        title: "Fixed Delay",
                                    },
                                    {
                                        value: "none",
                                        label: (
                                            <>
                                                No Restarts
                                                <small className="option-description">作业 task 失败不会重启</small>
                                            </>
                                        ),
                                        title: "No Restarts",
                                    }
                                ]} />
                        </Form.Item>
                    )
                },
            ]
        );

        if (restartStrategy === "failure-rate") {
            items.push(
                ...[
                    {
                        key: "restart-strategy.failure-rate.failure-rate-interval",
                        label: <Tooltip title="检测 Failure Rate 的时间间隔">检测 Failure Rate 的时间间隔</Tooltip>,
                        children: (
                            <Form.Item
                                name="restart-strategy.failure-rate.failure-rate-interval"
                                initialValue='4s'
                            >
                                <TimeInputNumber
                                    inputProps={{
                                        placeholder: "请输入时间间隔"
                                    }}
                                />
                            </Form.Item>
                        )
                    },
                    {
                        key: "restart-strategy.failure-rate.max-failures-per-interval",
                        label: <Tooltip title="作业失败之前，给定时间间隔内的最大重新启动次数">时间间隔内的最大失败次数</Tooltip>,
                        children: (
                            <Form.Item
                                name="restart-strategy.failure-rate.max-failures-per-interval"
                                initialValue='12'
                            >
                                <InputNumber placeholder="请输入最大失败次数" addonAfter={<NumberOutlined />} />
                            </Form.Item>
                        )
                    },
                    {
                        key: "restart-strategy.failure-rate.delay",
                        label: <Tooltip title="连续两次重启之间的延迟">每次重启时间间隔</Tooltip>,
                        children: (
                            <Form.Item
                                name="restart-strategy.failure-rate.delay"
                                initialValue='5s'
                            >
                                <TimeInputNumber
                                    inputProps={{
                                        placeholder: "请输入每次重启时间间隔"
                                    }}
                                />
                            </Form.Item>
                        )
                    }
                ]
            );
        }

        if (restartStrategy === "fixed-delay") {
            items.push(
                ...[
                    {
                        key: "restart-strategy.fixed-delay.attempts",
                        label: "尝试重启的次数",
                        children: (
                            <Form.Item
                                name="restart-strategy.fixed-delay.attempts"
                                initialValue='14'
                            >
                                <InputNumber placeholder="请输入尝试重启的次数" addonAfter={<NumberOutlined />} />
                            </Form.Item>
                        )
                    },
                    {
                        key: "restart-strategy.fixed-delay.delay",
                        label: "每次重启时间间隔",
                        children: (
                            <Form.Item
                                name="restart-strategy.fixed-delay.delay"
                                initialValue='6s'
                            >
                                <TimeInputNumber
                                    inputProps={{
                                        placeholder: "请输入每次重启时间间隔"
                                    }}
                                />
                            </Form.Item>
                        )
                    },
                ]
            );
        }

        items.push(
            {
                key: "others",
                label: "其他配置",
                children: (
                    <Form.Item
                        className="monaco-editor-item"
                        extra="Flink 配置中部分配置会影响已设置的启动资源，请谨慎修改"
                        name='others'
                        initialValue='akka.client-socket-worker-pool.pool-size-min: 1'
                    // rules={[
                    //     {
                    //         type: 'yml',
                    //         message: '不支持的 YAML 语法，请确保键值对之间冒号后存在一个空格（例如，key: value）'
                    //     }
                    // ]}
                    >
                        <MonacoEditor
                            height={150}
                            options={{
                                minimap: {
                                    enabled: false
                                },
                                selectOnLineNumbers: true,
                                lineNumbersMinChars: 3,
                                lineDecorationsWidth: 0,
                                wordWrap: "on",
                                readOnly: false,
                                scrollBeyondLastLine: false,

                            }}
                        />
                    </Form.Item>
                )
            }
        );
    } else {

        items.push(
            ...[
                {
                    key: "execution.checkpointing.interval",
                    label: "系统检查点间隔",
                    children: data["execution.checkpointing.interval"]
                },
                {
                    key: "execution.checkpointing.min-pause",
                    label: "两次系统检查点之间的最短时间间隔",
                    children: data["execution.checkpointing.min-pause"]
                },
                {
                    key: "table.exec.state.ttl",
                    label: "State 数据过期时间",
                    children: data["table.exec.state.ttl"]
                },
                {
                    key: "restart-strategy",
                    label: "Flink 重启策略",
                    children: data["restart-strategy"]
                },
                {
                    key: "restart-strategy.fixed-delay.attempts",
                    label: "尝试重启的次数",
                    children: data["restart-strategy.fixed-delay.attempts"]
                },
                {
                    key: "restart-strategy.fixed-delay.delay",
                    label: "每次重启时间间隔",
                    children: data["restart-strategy.fixed-delay.delay"]
                },
                {
                    key: "restart-strategy.failure-rate.failure-rate-interval",
                    label: "每次重启时间间隔",
                    children: data["restart-strategy.failure-rate.failure-rate-interval"]
                },
                {
                    key: "restart-strategy.failure-rate.max-failures-per-interval",
                    label: "每次重启时间间隔",
                    children: data["restart-strategy.failure-rate.max-failures-per-interval"]
                },
                {
                    key: "restart-strategy.failure-rate.delay",
                    label: "每次重启时间间隔",
                    children: data["restart-strategy.failure-rate.delay"]
                },
            ].filter(item => item.children)
        );

        (data["others"] as string)?.split("\n")
            .filter(item => item)
            .forEach(item => {
                const [key, value] = item.split(":");
                items.push(
                    {
                        key: key,
                        label: key,
                        children: value,
                    }
                );
            });

    }

    const onFinish = (value: any) => {
        setData({
            ...value
        });
    };

    return (
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
                className='runtime-configuration-descriptions'
                items={items}
            />
        </Form>
    );
};

export default RuntimeConfiguration;