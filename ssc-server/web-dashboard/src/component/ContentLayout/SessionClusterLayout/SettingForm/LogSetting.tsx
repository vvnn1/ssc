import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import SettingCard from "../../../SettingCard";
import { DeleteOutlined, DownOutlined, UpOutlined } from "../../../Icon";
import LogLevelSelect from "../../../Select/LogLevelSelect";
import { useState } from "react";

const LogSetting = () => {
    const [templateOpen, setTemplateOpen] = useState<boolean>(false);
    const onTemplateBtnClick = () => {
        setTemplateOpen(!templateOpen);
    }
    return (
        <SettingCard
            title="日志配置"
            className="log-setting-card"
        >
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="根日志等级"
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
                                {
                                    fields.map((field, index) => (
                                        <Form.Item
                                            label={index === 0 ? '类日志等级' : null}
                                            key={field.key}
                                            style={{ marginBottom: '0', marginTop: index > 0 ? '8px' : '0px' }}
                                        >
                                            <Form.Item extra={index + 1 === fields.length ? '类日志名称' : null} style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginBottom: '0' }}>
                                                <Input onChange={index + 1 === fields.length ? () => add() : undefined} />
                                            </Form.Item>
                                            <Form.Item extra={index + 1 === fields.length ? '类日志等级' : null} style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '24px', marginBottom: '0' }}>
                                                <Space.Compact style={{ width: "100%" }}>
                                                    <LogLevelSelect onChange={index + 1 === fields.length ? () => add() : undefined} />
                                                    <Button style={{ marginLeft: "4px" }} disabled={index + 1 === fields.length} onClick={() => remove(field.name)}><DeleteOutlined /></Button>
                                                </Space.Compact>
                                            </Form.Item>
                                        </Form.Item>
                                    ))
                                }
                            </>
                        )}
                    </Form.List>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="输出模板"
                        required
                        extra={<><i>默认值：<code>default</code></i></>}
                    >
                        <Select
                            placeholder="请选择输入模板"
                            options={[
                                {
                                    label: '系统模板',
                                    options: [
                                        {
                                            value: 'default',
                                            label: 'Default'
                                        }
                                    ]
                                },
                                {
                                    label: '用户配置',
                                    options: [
                                        {
                                            value: 'custom',
                                            label: '自定义模板'
                                        }
                                    ]
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col className="template-btn-col" span={8} push={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Button
                        icon={templateOpen ? <UpOutlined/> : <DownOutlined />}
                        type="link"
                        onClick={onTemplateBtnClick}
                    >
                        {templateOpen ? '收起模板' : '显示模板'}
                    </Button>
                </Col>
            </Row>
        </SettingCard>
    )
};

export default LogSetting;