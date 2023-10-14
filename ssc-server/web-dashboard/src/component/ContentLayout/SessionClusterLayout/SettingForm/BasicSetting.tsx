import { Button, Form, Input, Select, Space } from "antd";
import SettingCard from "../../../SettingCard";
import { DeleteOutlined } from "../../../Icon";

const statusSelectOptions = [
    {
        label: "STOPPED",
        value: "stopped"
    },
    {
        label: "RUNNING",
        value: "running"
    }
];


const statusItemExtra = (
    <div>
        <p style={{marginBottom: '1em'}}>
            设置当前集群的期望运行状态
        </p>
        <ul>
            <li style={{margin: '0 0 0 20px', padding: '0 0 0 4px'}}><strong>RUNNING</strong> 当集群配置完成后保持运行状态。</li>
            <li style={{margin: '0 0 0 20px', padding: '0 0 0 4px'}}><strong>STOPPED</strong> 当集群配置完成后保持停止状态，同样会停止所有在运行中的作业。</li>
        </ul>
    </div>
)

const BasicSetting = () => {

    return (
        <SettingCard
            title="基础配置"
            className="basic-setting-card"
        >
            <Form.Item
                label="名称"
                required
            >
                <Input size="small" placeholder="请输入名称" />
            </Form.Item>

            <Form.Item
                label="状态"
                required
                extra={statusItemExtra}
            >
                <Select
                    size="small"
                    options={statusSelectOptions}
                />
            </Form.Item>
            <Form.List
                name="names"
                initialValue={[{}]}
            >
                {(fields, { add, remove }) => (
                    <>
                        {
                            fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? '标签' : null}
                                    key={field.key}
                                    style={{ marginBottom: '0', marginTop: index > 0 ? '8px' : '0px' }}
                                >
                                    <Form.Item extra={index + 1 === fields.length ? '标签名' : null} style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginBottom: '0' }}>
                                        <Input size="small" onChange={index + 1 === fields.length ? () => add() : undefined} />
                                    </Form.Item>
                                    <Form.Item extra={index + 1 === fields.length ? '标签值' : null} style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '24px', marginBottom: '0' }}>
                                        <Space.Compact style={{ width: "100%" }}>
                                            <Input size="small" onChange={index + 1 === fields.length ? () => add() : undefined} />
                                            <Button size="small" style={{ marginLeft: "4px" }} disabled={index + 1 === fields.length} onClick={() => remove(field.name)}><DeleteOutlined /></Button>
                                        </Space.Compact>
                                    </Form.Item>
                                </Form.Item>
                            ))
                        }
                    </>
                )}
            </Form.List>


        </SettingCard>
    )
};

export default BasicSetting;
