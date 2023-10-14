import { Col, Form, Input, Row, Select } from "antd"
import SettingCard from "../../../../SettingCard"
import LogLevelSelect from "../../../../Select/LogLevelSelect"

const LogSetting = () => {
    return (
        <SettingCard
            title="日志配置"
        >
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="根日志等级"
                    >
                        <LogLevelSelect size="small" placeholder="请选择根日志等级" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="类日志等级"
                style={{ marginBottom: 0 }}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            extra="类日志名称"
                        >
                            <Input size="small" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            extra="类日志等级"
                        >
                            <LogLevelSelect size="small" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form.Item>

            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        label="输出模板"
                        extra={<><i>默认值:</i><code>default</code></>}
                    >
                        <Select
                            size="small"
                            placeholder="请选择输入模板"
                            options={[
                                {
                                    label: '系统模板',
                                    options: [
                                        { label: 'default', value: 'jack' },
                                    ],
                                },
                                {
                                    label: '用户配置',
                                    options: [{ label: '自定义模板', value: 'Yiminghe' }],
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </SettingCard>
    )
};

export default LogSetting;