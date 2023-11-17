import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import SettingCard from "../../../../SettingCard";
import LogLevelSelect from "../../../../Select/LogLevelSelect";
import { DeleteOutlined } from "../../../../Icon";

const LogSetting = () => {
    return (
        <SettingCard title="日志配置">
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item label="根日志等级">
                        <LogLevelSelect
                            size="small"
                            placeholder="请选择根日志等级"
                        />
                    </Form.Item>
                </Col>
            </Row>
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
                                        <Input onChange={index + 1 === fields.length ? () => add() : undefined} />
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

            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        label="输出模板"
                        extra={
                            <>
                                <i>默认值:</i>
                                <code>default</code>
                            </>
                        }
                    >
                        <Select
                            size="small"
                            placeholder="请选择输入模板"
                            options={[
                                {
                                    label: "系统模板",
                                    options: [{ label: "default", value: "jack" }],
                                },
                                {
                                    label: "用户配置",
                                    options: [{ label: "自定义模板", value: "Yiminghe" }],
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </SettingCard>
    );
};

export default LogSetting;
