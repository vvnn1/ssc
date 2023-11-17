import { Divider, Dropdown, Popconfirm, Table, Tag, Typography } from "antd";
import "./index.sass";
import { DownOutlined, PlusOutlined } from "../../../../../Icon";
import AlarmDrawer from "../../../../ConfigurationLayout/AlarmTemplateLayout/AlarmDrawer";
import { useState } from "react";

const AlarmRule = () => {
    const [templateDrawerOpen, setTemplateDrawerOpen] = useState<boolean>(false);
    const [ruleDrawerOpen, setRuleDrawerOpen] = useState<boolean>(false);

    const changeTemplateDrawerOpen = (open: boolean) => {
        return () => {
            setTemplateDrawerOpen(open);
        };
    };

    const changeRuleDrawerOpen = (open: boolean) => {
        return () => {
            setRuleDrawerOpen(open);
        };
    };

    return (
        <div className="alarm-rule-layout">
            <div className="custom-template">
                <Dropdown
                    menu={{
                        items: [
                            {
                                label: (
                                    <>
                                        <PlusOutlined /> 自定义规则
                                    </>
                                ),
                                key: "1",
                                onClick: changeRuleDrawerOpen(true),
                            },
                            {
                                type: "divider",
                            },
                            {
                                label: (
                                    <>
                                        <PlusOutlined /> 自定义模板
                                    </>
                                ),
                                key: "2",
                                children: [
                                    {
                                        key: "2-1",
                                        label: (
                                            <span style={{ color: "#0070cc" }}>
                                                <PlusOutlined /> 添加规则模板
                                            </span>
                                        ),
                                        onClick: changeTemplateDrawerOpen(true),
                                    },
                                    {
                                        key: "2-2",
                                        label: (
                                            <>
                                                <PlusOutlined /> test
                                            </>
                                        ),
                                        onClick: changeRuleDrawerOpen(true),
                                    },
                                ],
                            },
                        ],
                    }}
                >
                    <a>
                        <PlusOutlined />
                        添加告警规则
                        <DownOutlined />
                    </a>
                </Dropdown>
            </div>

            <Table
                bordered
                size="middle"
                columns={[
                    {
                        title: "规则名称",
                        dataIndex: "name",
                    },
                    {
                        title: "指标",
                        dataIndex: "criteria",
                    },
                    {
                        title: "规则状态",
                        width: 100,
                        dataIndex: "status",
                        render: value => <Tag color="blue">{value}</Tag>,
                    },
                    {
                        title: "描述",
                        dataIndex: "desc",
                    },
                    {
                        title: "创建时间",
                        width: 180,
                        dataIndex: "createTime",
                    },
                    {
                        title: "操作",
                        width: 200,
                        render: () => (
                            <div>
                                <Typography.Link disabled>启动</Typography.Link>
                                <Divider type="vertical" />
                                <Popconfirm
                                    okText="确认"
                                    cancelText="取消"
                                    title="确定停止当前规则吗?"
                                    overlayClassName="ant-popover-rtl"
                                >
                                    <Typography.Link>停止</Typography.Link>
                                </Popconfirm>

                                <Divider type="vertical" />
                                <a onClick={changeRuleDrawerOpen(true)}>编辑</a>
                                <Divider type="vertical" />
                                <Popconfirm
                                    okText="确认"
                                    cancelText="取消"
                                    title="确定删除当前规则吗?"
                                    overlayClassName="ant-popover-rtl"
                                >
                                    <a>删除</a>
                                </Popconfirm>
                            </div>
                        ),
                    },
                ]}
                dataSource={[
                    {
                        name: "wss",
                        criteria: "Restart Count in 1 Minute",
                        status: "已启用",
                        desc: "大苏打阿斯顿阿斯顿",
                        createTime: "2023-10-07 14:55:03",
                    },
                ]}
            />

            <AlarmDrawer
                open={ruleDrawerOpen}
                onClose={changeRuleDrawerOpen(false)}
                model="create-rule"
                title="创建规则"
            />
            <AlarmDrawer
                open={templateDrawerOpen}
                onClose={changeTemplateDrawerOpen(false)}
                model="create-template"
                title="创建告警规则模板"
            />
        </div>
    );
};

export default AlarmRule;
