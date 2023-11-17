import { Button, Checkbox, Form, InputNumber, Select, Switch, Tooltip } from "antd";
import AlarmCard from "./AlarmCard";
import { DownOutlined, QuestionCircleOutlined, UpOutlined } from "../../../../Icon";
import { useState } from "react";
import ConcatManageModal from "./ContactManagerModal";

const options = [
    { label: "DingTalk", value: "DingTalk" },
    { label: "Email", value: "Email" },
    { label: "SMS", value: "SMS" },
    { label: "Webhook", value: "Webhook" },
    { label: "Phone", value: "Phone" },
];

interface NotifiAvenueItemProps {
    strict: boolean;
}

const NotifiAvenueItem = (props: NotifiAvenueItemProps) => {
    const [noDataSwitch, setNoDataSwitch] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);

    const changeAdvancedOpen = () => {
        setAdvancedOpen(!advancedOpen);
    };

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        };
    };
    return (
        <AlarmCard title="通知方式">
            <Form.Item
                label={
                    <>
                        通知方式&nbsp;
                        <Tooltip title="请确保创建并添加可用的通知对象，否则将导致告警通知方式失败">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </>
                }
                required={props.strict}
                rules={[
                    {
                        required: true,
                        message: "请选择通知方式",
                    },
                ]}
            >
                <Checkbox.Group options={options} />
            </Form.Item>
            <Form.Item
                label={
                    <>
                        通知对象 &nbsp;{" "}
                        <Tooltip title="支持同时通知多个通知对象，请在多选框中输入联系人，联系人组，Webhook，钉钉机器人名称">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </>
                }
                required={props.strict}
            >
                <div style={{ display: "flex" }}>
                    <Select
                        placeholder="请选择联系人组"
                        mode="multiple"
                        options={[
                            {
                                label: "联系人",
                                options: [
                                    {
                                        label: "王",
                                        value: "a",
                                    },
                                    {
                                        label: "李",
                                        value: "b",
                                    },
                                ],
                            },
                            {
                                label: "联系人组",
                                options: [
                                    {
                                        label: "tt",
                                        value: "t",
                                    },
                                ],
                            },
                            {
                                label: "WebHook",
                                options: [
                                    {
                                        label: "test",
                                        value: "e",
                                    },
                                ],
                            },
                            {
                                label: "钉钉机器人",
                                options: [
                                    {
                                        label: "aaa",
                                        value: "f",
                                    },
                                ],
                            },
                        ]}
                    />
                    <Button
                        type="link"
                        onClick={changeModalOpen(true)}
                    >
                        通知对象管理
                    </Button>
                </div>
            </Form.Item>

            <Form.Item
                label={
                    <Button
                        icon={<>高级设置</>}
                        type="link"
                        className="button_label"
                        onClick={changeAdvancedOpen}
                    >
                        {advancedOpen ? <DownOutlined /> : <UpOutlined />}
                    </Button>
                }
                colon={false}
                className="advanced-setting"
                labelAlign="left"
                wrapperCol={{ span: 24 }}
            >
                <Form.Item
                    label={
                        <>
                            警告降噪&nbsp;
                            <Tooltip title="降低短期 failover 或毛刺延迟导致的告警噪声">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </>
                    }
                    labelCol={{ span: 4 }}
                    labelAlign="right"
                    wrapperCol={{ span: 20 }}
                    hidden={!advancedOpen}
                >
                    <Switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                    />
                </Form.Item>
                <Form.Item
                    label={
                        <>
                            无数据告警&nbsp;{" "}
                            <Tooltip title="监测作业在非运行状态的无数据指标上报情景">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </>
                    }
                    labelCol={{ span: 4 }}
                    labelAlign="right"
                    wrapperCol={{ span: 20 }}
                    hidden={!advancedOpen}
                >
                    <Switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        onChange={setNoDataSwitch}
                    />
                </Form.Item>

                {noDataSwitch ? (
                    <Form.Item
                        label={<></>}
                        labelCol={{ span: 4 }}
                        colon={false}
                    >
                        连续{" "}
                        <InputNumber
                            style={{ width: 80 }}
                            defaultValue={3}
                        />{" "}
                        分钟无数据，则发送无数据告警
                    </Form.Item>
                ) : null}
            </Form.Item>
            <ConcatManageModal
                open={modalOpen}
                onCancel={changeModalOpen(false)}
            />
        </AlarmCard>
    );
};

export default NotifiAvenueItem;
