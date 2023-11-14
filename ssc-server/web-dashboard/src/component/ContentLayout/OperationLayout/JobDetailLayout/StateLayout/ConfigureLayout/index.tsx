import { Alert, Button, Checkbox, Dropdown, Form, InputNumber, Space, Switch, message } from "antd";
import "./index.sass";
import InputCron from "../../../../../InputCron";
import { CheckCircleOutlined, DownOutlined } from "../../../../../Icon";
import { useState } from "react";
import { checkedChangeWrapper } from "../../../../../../util";
const items = [
    {
        key: "1",
        label: "每隔 4 小时执行"
    },
    {
        key: "2",
        label: "每天 2 点执行"
    },
    {
        key: "3",
        label: "每天 5 点和 17 点执行"
    },
    {
        key: "4",
        label: "每周日 17 点执行"
    }
];

const ConfigureLayout = () => {
    const [autoCreate, setAutoCreate] = useState<boolean>(false);
    const [autoClean, setAutoClean] = useState<boolean>(false);
    const [saveCountChecked, setSaveCountChecked] = useState<boolean>(false);
    const [saveTimeChecked, setSaveTimeChecked] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onSaveClick = () => {
        messageApi.success({
            icon: <></>,
            content: <><CheckCircleOutlined color="#00a700" />配置成功</>
        });
    };

    return (
        <div className="state-configure-layout">
            <div className="form-wrapper">
                <div className="form-content">
                    <Form>
                        <Form.Item
                            label="作业快照定时自动生成"
                        >
                            <Switch
                                checkedChildren="开"
                                unCheckedChildren="关"
                                defaultChecked={autoCreate}
                                onChange={setAutoCreate}
                            />
                        </Form.Item>
                        {
                            autoCreate ? (
                                <Space.Compact style={{ width: "100%" }}>
                                    <Form.Item
                                        label="周期设置"
                                        extra="最小间隔为十分钟。如果输入的 cron 表达式小于 10min，默认按 10min 触发"
                                        style={{ flex: "1" }}
                                    >
                                        <InputCron />
                                    </Form.Item>
                                    <Dropdown
                                        menu={{ items }}
                                    >
                                        <Button style={{ marginLeft: 12 }} className="quick-cron-setting-btn">快捷设置 <DownOutlined /></Button>
                                    </Dropdown>
                                </Space.Compact>
                            ) : null
                        }
                        <Form.Item
                            label="作业快照定时自动清理"
                        >
                            <Switch
                                checkedChildren="开"
                                unCheckedChildren="关"
                                onChange={setAutoClean}
                            />
                        </Form.Item>
                        {
                            autoClean ? (
                                <>
                                    <Alert
                                        showIcon
                                        banner
                                        message={<strong>注意</strong>}
                                        type='warning'
                                        description={(
                                            <div className="warn-inner">
                                                <span>1.快照清理会根据个数或保存时长来一同决定，满足其中一个条件即会被清理。</span>
                                                <span>2.快照清理不包含手动点击触发生成的作业快照，此类快照只能在快照查看页面手动删除。</span>
                                            </div>
                                        )}
                                    />
                                    <Form.Item
                                        label="定时自动清理规则"
                                        className='autoclear-ruler-item'
                                    >
                                        <Form.Item>
                                            <Checkbox
                                                onChange={checkedChangeWrapper(setSaveCountChecked)}
                                            >
                                                历史快照保存个数
                                            </Checkbox>
                                        </Form.Item>

                                        {
                                            saveCountChecked ? (
                                                <Form.Item
                                                    extra="平台会根据此个数定期进行判断，在可以删除对应快照时清理"
                                                >
                                                    <InputNumber style={{ width: 90 }} />
                                                </Form.Item>
                                            ) : null
                                        }

                                        <Form.Item>
                                            <Checkbox
                                                onChange={checkedChangeWrapper(setSaveTimeChecked)}
                                            >
                                                历史快照保存最长时间（单位：小时）
                                            </Checkbox>
                                        </Form.Item>

                                        {
                                            saveTimeChecked ? (
                                                <Form.Item
                                                    extra="平台会根据此时长定期进行判断，在可以删除对应快照时清理"
                                                >
                                                    <InputNumber style={{ width: 90 }} />
                                                </Form.Item>
                                            ) : null
                                        }
                                    </Form.Item>
                                </>
                            ) : null
                        }
                    </Form>
                </div>
                <div className="form-footer">
                    <Space>
                        <Button type="primary" onClick={onSaveClick}>保存更改</Button>
                        <Button>重置</Button>
                    </Space>
                </div>
            </div>
            {contextHolder}
        </div>
    );
};

export default ConfigureLayout;