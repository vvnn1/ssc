import { Button, Collapse, Dropdown, Input, Modal, Table, Tooltip, message } from "antd";
import "./index.sass";
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    DownOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
} from "../../../../../Icon";
import LaunchModal from "../../../LaunchModal";
import { useState } from "react";
import { changeModalOpen } from "../../../../../../util";

const HistoryLayout = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [launchModalOpen, setLaunchModalOpen] = useState<boolean>(false);
    const [deleteModal, modalContextHolder] = Modal.useModal();

    const onCopy = () => {
        messageApi.success({
            icon: <></>,
            content: (
                <>
                    <CheckCircleOutlined color="#00a700" />
                    已复制到剪切板
                </>
            ),
        });
    };

    const onRestore = () => {
        setLaunchModalOpen(true);
    };

    const onDelete = () => {
        deleteModal.confirm({
            icon: <QuestionCircleOutlined />,
            title: "确认删除？",
            content: "确认要删除该快照吗？",
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            ),
            okText: "确认",
            cancelText: "取消",
            closable: true,
        });
    };

    const dropMenuItems = [
        {
            key: "1",
            label: (
                <Tooltip
                    placement="left"
                    title="oss://ssc-bucket-v2/flink-savepoints/namespaces/ssc-space-default/deployments/2eeb5c2f-b2f1-4bbe-b727-01b105b5a3d2/81aa2e5c-093b-421b-a403-1b0e3dd7dcf8/savepoint-a5808f-026813d96a6a"
                >
                    <Button
                        type="link"
                        size="small"
                        onClick={onCopy}
                    >
                        复制 Savepoint 地址
                    </Button>
                </Tooltip>
            ),
        },
        {
            key: "2",
            label: (
                <Button
                    type="link"
                    size="small"
                    onClick={onRestore}
                >
                    从该快照恢复作业
                </Button>
            ),
        },
        {
            key: "3",
            label: (
                <Button
                    type="link"
                    size="small"
                    danger
                    onClick={onDelete}
                >
                    删除此快照
                </Button>
            ),
        },
    ];

    const items = [
        {
            key: "1",
            label: "系统检查点",
            children: (
                <Table
                    className="checkpoint-table"
                    size="small"
                    columns={[
                        {
                            title: "检查点 ID",
                            width: 100,
                        },
                        {
                            title: "状态",
                            width: 150,
                        },
                        {
                            title: "生成时间",
                            width: 200,
                        },
                        {
                            title: "操作",
                        },
                    ]}
                />
            ),
        },
        {
            key: "2",
            label: "作业快照",
            children: (
                <>
                    <Input
                        className="snapshot-search"
                        placeholder="搜索…"
                        size="small"
                        suffix={<SearchOutlined />}
                    />
                    <Table
                        className="snapshot-table"
                        size="small"
                        columns={[
                            {
                                title: "快照 ID",
                                width: 100,
                                ellipsis: true,
                                dataIndex: "id",
                                render: value => <Tooltip title={value}>{value.substring(0, 8)}…</Tooltip>,
                            },
                            {
                                title: "状态",
                                width: 120,
                                dataIndex: "status",
                                render: value => {
                                    if (value === "success") {
                                        return (
                                            <>
                                                <CheckCircleFilled style={{ color: "#00a700" }} />
                                                &nbsp;&nbsp;已成功
                                            </>
                                        );
                                    }
                                    return <></>;
                                },
                            },
                            {
                                title: "快照类型",
                                width: 150,
                                dataIndex: "type",
                                render: value => {
                                    if (value === "original") {
                                        return "原生类型";
                                    }
                                    return "";
                                },
                            },
                            {
                                title: "来源",
                                width: 150,
                                dataIndex: "trigger",
                                render: value => {
                                    if (value === "handle") {
                                        return "用户手动触发";
                                    }
                                    return "";
                                },
                            },
                            {
                                title: "描述",
                                width: 150,
                                dataIndex: "description",
                            },
                            {
                                title: "生成时间",
                                width: 200,
                                dataIndex: "createTime",
                            },
                            {
                                title: "生成耗时",
                                width: 120,
                                dataIndex: "timeCost",
                            },
                            {
                                title: "操作",
                                width: 100,
                                render: () => {
                                    return (
                                        <Dropdown
                                            placement="bottomLeft"
                                            menu={{ items: dropMenuItems }}
                                        >
                                            <a>
                                                更多 <DownOutlined />
                                            </a>
                                        </Dropdown>
                                    );
                                },
                            },
                        ]}
                        dataSource={[
                            {
                                id: "81aa2e5c-093b-421b-a403-1b0e3dd7dcf8",
                                status: "success",
                                type: "original",
                                trigger: "handle",
                                description: "-",
                                createTime: "2023-11-07 14:57:02",
                                timeCost: "6s",
                            },
                        ]}
                    />
                </>
            ),
        },
    ];
    return (
        <>
            <Collapse
                className="state-history-collapse"
                items={items}
                bordered={false}
                defaultActiveKey={["1", "2"]}
            />
            <LaunchModal
                open={launchModalOpen}
                onCancel={changeModalOpen(false, setLaunchModalOpen)}
            />
            {contextHolder}
            {modalContextHolder}
        </>
    );
};

export default HistoryLayout;
