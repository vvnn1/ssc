import { Col, Form, Input, InputNumber, Row, Select, TimePicker, Tooltip } from "antd";
import AlarmCard from "./AlarmCard";
import { BaseSyntheticEvent, useRef } from "react";
import { QuestionCircleOutlined } from "../../../../Icon";

interface AlarmRuleItemProps {
    strict: boolean;
}

const AlarmRuleItem = (props: AlarmRuleItemProps) => {
    const zIndexTarget = useRef<HTMLDivElement | null>(null);

    const onMouseEnterZIndex = (event: BaseSyntheticEvent) => {
        const mouseOnTarget = event.currentTarget;
        if (zIndexTarget.current === mouseOnTarget) {
            return;
        }

        if (zIndexTarget.current !== null) {
            zIndexTarget.current.className = "";
        }

        mouseOnTarget.className = "top-z-index";

        zIndexTarget.current = mouseOnTarget;
    };

    const zIndexWrapper = (node: React.ReactNode): React.ReactElement => {
        return (
            <div
                onMouseEnter={onMouseEnterZIndex}
                style={{ display: "flex" }}
            >
                {node}
            </div>
        );
    };

    return (
        <AlarmCard title="具体规则">
            <Form.Item
                label="规则名称"
                required
                rules={[
                    {
                        required: true,
                        message: "请输入规则名称",
                    },
                    {
                        message: "以字母开头，仅包含小写英文字母、数字、下划线（_）, 长度限制为3-64个字符",
                    },
                ]}
            >
                <Input placeholder="请输入规则名称" />
            </Form.Item>
            <Form.Item
                label="描述"
                required={props.strict}
                rules={[
                    {
                        required: true,
                        message: "请输入规则说明",
                    },
                ]}
            >
                <Input placeholder="请输入描述" />
            </Form.Item>
            <Form.Item
                label="内容"
                required={props.strict}
            >
                <div className="rule-content-form">
                    <Row>
                        <Col span={10}>
                            <Form.Item
                                colon={false}
                                label="指标"
                            >
                                {zIndexWrapper(
                                    <Select
                                        defaultValue="a"
                                        options={[
                                            {
                                                label: "Restart Count in 1 Minute",
                                                value: "a",
                                            },
                                            {
                                                label: "Checkpoint Count in 5 Minutes",
                                                value: "b",
                                            },
                                            {
                                                label: "Emit Delay",
                                                value: "c",
                                            },
                                            {
                                                label: "IN RPS",
                                                value: "d",
                                            },
                                            {
                                                label: "OUT RPS",
                                                value: "e",
                                            },
                                            {
                                                label: "Source Idle Time",
                                                value: "f",
                                            },
                                            {
                                                label: "Job Failed",
                                                value: "g",
                                            },
                                        ]}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                colon={false}
                                label="时间差"
                            >
                                {zIndexWrapper(<InputNumber defaultValue={1} />)}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                colon={false}
                                label="运算符"
                            >
                                {zIndexWrapper(
                                    <Select
                                        defaultValue={"re"}
                                        options={[
                                            {
                                                label: ">=",
                                                value: "re",
                                            },
                                            {
                                                label: "<=",
                                                value: "le",
                                            },
                                        ]}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                colon={false}
                                label="阈值"
                            >
                                {zIndexWrapper(
                                    <InputNumber
                                        placeholder="阈值"
                                        suffix="次"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </Form.Item>
            <Form.Item
                label="生效时间"
                required={props.strict}
            >
                <TimePicker format="HH:mm" /> - <TimePicker format="HH:mm" />
            </Form.Item>
            <Form.Item
                label={
                    <>
                        告警频率&nbsp;
                        <Tooltip title="连续 n 分钟内只发一次告警">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </>
                }
                extra="最大支持 1 天(1440 分钟)"
                required={props.strict}
            >
                <Input
                    type="number"
                    suffix="分钟"
                    placeholder="请输入分钟数"
                />
            </Form.Item>
        </AlarmCard>
    );
};

export default AlarmRuleItem;
