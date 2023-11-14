import { Col, Form, InputNumber, Row } from "antd";
import SettingCard from "../../../SettingCard";
import { NumberOutlined } from "../../../Icon";
import MemoryInputNumber from "../../../InputNumber/MemoryInputNumber";

const ResourceSetting = () => {
    return (
        <SettingCard
            title="资源配置"
        >
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item
                        label="Task Managers 数量"
                        extra="默认与并行度一致"
                        name="tmNum"
                    >
                        <InputNumber
                            size="small"
                            placeholder="请输入 Task Managers 数量"
                            addonAfter={<NumberOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        required
                        label="JobManager CPU Cores"
                        extra="最小值：1"
                        name="jmCpu"
                    >
                        <InputNumber
                            size="small"
                            placeholder="请选择 Job Manager CPUs"
                            addonAfter={"Core"}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        required
                        label="JobManager Memory"
                        extra={<>推荐值:<code>4GiB</code>最小值：1GiB。建议使用 GiB/MiB 单位，例如：1024MiB，1.5GiB</>}
                        name="jmMemory"
                    >
                        <MemoryInputNumber
                            inputProps={{
                                placeholder: "请输入 Job Manager 内存"
                            }}
                            selectProps={{
                                defaultValue: "GiB"
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        required
                        label="TaskManager CPU Cores"
                        extra="最小值：1"
                        name="tmCpu"
                    >
                        <InputNumber
                            size="small"
                            placeholder="请输入 Task Manager CPUs"
                            addonAfter={"Core"}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        required
                        label="TaskManager Memory"
                        extra={<>推荐值:<code>8GiB</code>最小值：1GiB。建议使用 GiB/MiB 单位，例如：1024MiB，1.5GiB</>}
                        name="tmMemory"
                    >

                        <MemoryInputNumber
                            inputProps={{
                                placeholder: "请输入 Task Manager 内存"
                            }}
                            selectProps={{
                                defaultValue: "GiB"
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </SettingCard>
    );
};

export default ResourceSetting;