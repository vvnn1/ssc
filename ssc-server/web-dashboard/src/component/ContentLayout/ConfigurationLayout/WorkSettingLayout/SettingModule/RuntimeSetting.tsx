import { Row, Col, InputNumber, Select, Form } from "antd"
import { NumberOutlined } from "../../../../Icon";
import { useState } from "react";
import SettingCard from "../../../../SettingCard";

const { Option } = Select;

const timeUnitSelector = (
    <Select defaultValue="second" size="small" popupMatchSelectWidth={52} popupClassName="no-padding-select">
        <Option value="day">天</Option>
        <Option value="hour">小时</Option>
        <Option value="minute">分</Option>
        <Option value="second">秒</Option>
        <Option value="hm">毫秒</Option>
        <Option value="wm">微秒</Option>
        <Option value="ns">纳秒</Option>
    </Select>
);

const restartStrategyOptions = [
    {
        value: 'jack',
        label: (
            <>
                Failure Rate
                <small className="option-description">基于失败率重启</small>
            </>
        ),
        title: "Failure Rate",
        strategyModule: (
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        label="检测 Failure Rate 的时间间隔"
                        extra="检测 Failure Rate 的时间间隔"
                    >
                        <InputNumber
                            size="small"
                            placeholder="请输入时间间隔"
                            addonAfter={timeUnitSelector}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="时间间隔内的最大失败次数"
                        extra="作业失败之前，给定时间间隔内的最大重新启动次数"
                    >
                        <InputNumber
                            size="small"
                            placeholder="请输入最大失败次数"
                            addonAfter={<NumberOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="每次重启时间间隔"
                        extra="连续两次重启之间的延迟"
                    >
                        <InputNumber
                            size="small"
                            placeholder="请输入每次重启时间间隔"
                            addonAfter={timeUnitSelector}
                        />
                    </Form.Item>
                </Col>
            </Row>
        )
    },
    {
        value: 'lucy',
        label: (
            <>
                Fixed Delay
                <small className="option-description">固定间隔重启</small>
            </>
        ),
        title: "Fixed Delay",
        strategyModule: (
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        label="尝试重启的次数"
                        extra="Flink 在宣告作业失败之前重试执行的次数。 如果通过检查点激活，则使用 Integer.MAX_VALUE"
                    >
                        <InputNumber
                            size="small"
                            placeholder="请输入尝试重启的次数"
                            addonAfter={<NumberOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="每次重启时间间隔"
                        extra={
                            <>
                                <p>延迟重试意味着在执行失败后，重新执行不会立即开始，而只会在一定的延迟后开始</p>
                                <p>当程序与外部系统进行交互（例如，连接或挂起的事务在尝试重新执行之前应达到超时）时，延迟重试可能会有所帮助。如果通过检查点激活，则使用 10s</p>
                            </>
                        }
                    >
                        <InputNumber
                            size="small"
                            placeholder="请输入每次重启时间间隔"
                            addonAfter={timeUnitSelector}
                        />
                    </Form.Item>
                </Col>
            </Row>
        )
    },
    {
        value: 'Yiminghe',
        label: (
            <>
                No Restarts
                <small className="option-description">作业 task 失败不会重启</small>
            </>
        ),
        title: "No Restarts",
        strategyModule: null
    },
];


interface RuntimeSettingProps {
    onlyStrategy?: boolean;
}

const RuntimeSetting = (props: RuntimeSettingProps) => {
    const [strategyModule, setStrategyModule] = useState<React.ReactElement | null>(null);

    const strategyModuleChange = (_: any, { strategyModule }: any) => {
        setStrategyModule(strategyModule);
    }


    return (
        <SettingCard
            title="运行参数配置"
        >
            <Row gutter={24}>
                {
                    props.onlyStrategy
                        ? null
                        : (
                            <>
                                <Col span={12}>
                                    <Form.Item
                                        label="系统检查点间隔"
                                        labelAlign="left"
                                        extra={<><i>默认值:</i><code>-</code> 定时执行 Checkpoint 的时间间隔，如果不填写，将会使用作业引擎版本的默认值</>}
                                    >
                                        <InputNumber
                                            size="small"
                                            placeholder="请输入系统检查点间隔"
                                            addonAfter={timeUnitSelector}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="两次系统检查点之间的最短时间间隔"
                                        labelAlign="left"
                                        extra={<><i>默认值:</i><code>-</code> 两次系统检查点之间的最短时间间隔，如果 Checkpoint 最大并行度是1，那么这个配置确保两个 Checkpoint 之间有一个最短时间间隔，如果不填写，将会使用作业引擎版本的默认值</>}
                                    >
                                        <InputNumber
                                            size="small"
                                            placeholder="请输入时间间隔"
                                            addonAfter={timeUnitSelector}
                                        />
                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="State 数据过期时间"
                                        labelAlign="left"
                                        extra={<><i>默认值:</i><code>-</code> 设定的 Flink 状态生存时间，状态服务每经过设置的时间就会清理当前存储的状态</>}
                                    >
                                        <InputNumber
                                            size="small"
                                            placeholder="请输入 State 数据过期时间"
                                            addonAfter={timeUnitSelector}
                                        />
                                    </Form.Item>

                                </Col>
                            </>
                        )
                }

                <Col span={24}>
                    <Form.Item
                        label="Flink 重启策略配置"
                        labelAlign="left"
                    >
                        <Select
                            placeholder="请选择一个 Flink 重启策略"
                            size="small"
                            options={restartStrategyOptions}
                            popupClassName="custom-content"
                            optionLabelProp="title"
                            onSelect={strategyModuleChange}
                        />
                    </Form.Item>
                    {
                        strategyModule
                    }
                </Col>
            </Row>
        </SettingCard>
    )
};

export default RuntimeSetting;