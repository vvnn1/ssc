import { Col, Form, InputNumber, Row, Select } from "antd"
import SettingCard from "../../../SettingCard"
import { NumberOutlined } from "../../../Icon";
import { useState } from "react";
import TimeUnitSelect from "../../../Select/TimeUnitSelect";
import EngineSelect from "../../../Select/EngineSelect";

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
                            addonAfter={
                                <TimeUnitSelect defaultValue="s"
                                    size="small"
                                    popupMatchSelectWidth={52}
                                    popupClassName="no-padding-select" />
                            }
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
                            addonAfter={
                                <TimeUnitSelect defaultValue="s"
                                    size="small"
                                    popupMatchSelectWidth={52}
                                    popupClassName="no-padding-select" />
                            }
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
                            addonAfter={
                                <TimeUnitSelect
                                    defaultValue="s"
                                    size="small"
                                    popupMatchSelectWidth={52}
                                    popupClassName="no-padding-select" />
                            }
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


const NormalSetting = () => {

    const [strategyModule, setStrategyModule] = useState<React.ReactElement | null>(null);

    const strategyModuleChange = (_: any, { strategyModule }: any) => {
        setStrategyModule(strategyModule);
    }

    return (
        <SettingCard
            title="配置"
        >
            <Form.Item
                label="引擎版本"
                name="engineVersion"
            >
                <EngineSelect placeholder="请选择引擎版本" />
            </Form.Item>
            <Form.Item
                label="Flink 重启策略配置"
            >
                <Select
                    options={restartStrategyOptions}
                    placeholder="请选择一个 Flink 重启策略"
                    onSelect={strategyModuleChange}
                    optionLabelProp="title"
                    popupClassName="custom-content"
                />
            </Form.Item>
            {
                strategyModule
            }
        </SettingCard>
    )
};

export default NormalSetting;