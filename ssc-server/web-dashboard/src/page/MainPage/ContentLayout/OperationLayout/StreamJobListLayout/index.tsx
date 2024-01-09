import { Button, ButtonProps, Divider, Input, Select, SelectProps, Space, Table, message } from "antd";
import "./index.sass";
import {
    CancelCircleFilled,
    CheckCircleFilled,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    PlayCircleFilled,
    PlusOutlined,
    SettingOutlined,
} from "../../../../../component/Icon";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeModalOpen } from "../../../../../util";
import DeployModal from "../DeployModal";
import SettingModal from "../SettingModal";
import LaunchModal from "../LaunchModal";
import StopModal from "../StopModal";
import dayjs from "dayjs";

type Status = "starting" | "running" | "stoping" | "stoped" | "finished" | "fail";

const { Search } = Input;

interface Job {
    id: string;
    key: React.Key;
    name: string;
    status: Status;
    healthSorce: number;
    bizDelay: string;
    cpu: number;
    memory: number;
    updateUser: string;
    updateTime: number;
}

type TableProps = Parameters<typeof Table<Job>>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const columnStyle1 = () => ({
    style: {
        order: 0,
        flex: "1 1 200px",
    },
});

const columnStyle2 = () => ({
    style: {
        order: 1,
        flex: "1 1 150px",
    },
});

const columnStyle3 = () => ({
    style: {
        order: 2,
        flex: "1 1 120px",
    },
});

const columnStyle4 = () => ({
    style: {
        order: 3,
        flex: "1 1 80px",
    },
});

const columnStyle5 = () => ({
    style: {
        order: 4,
        flex: "1 1 80px",
    },
});

const columnStyle6 = () => ({
    style: {
        order: 5,
        flex: "1 1 90px",
    },
});

const columnStyle7 = () => ({
    style: {
        order: 6,
        flex: "1 1 150px",
    },
});

const columnStyle8 = () => ({
    style: {
        order: 7,
        flex: "1 1 150px",
    },
});

const columnStyle9 = () => ({
    style: {
        order: 8,
        flex: "1 1 180px",
    },
});

interface StreamJobListLayoutProps {
    collapse?: boolean;
}

const StreamJobListLayout = (props: StreamJobListLayoutProps) => {
    const [deployModalOpen, setDeployModalOpen] = useState<boolean>(false);
    const [settingModalOpen, setSettingModalOpen] = useState<boolean>(false);
    const [launchModalOpen, setLaunchModalOpen] = useState<boolean>(false);
    const [stopModalOpen, setStopModalOpen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<Job[]>([
        {
            id: "9ddc3745-7453-4d4b-96ee-965d8b2d5f05",
            key: "1",
            name: "Untitled-stream-sql",
            status: "running", // 已停止 启动中 运行中 停止中
            healthSorce: 75,
            bizDelay: "",
            cpu: 6,
            memory: 1024,
            updateUser: "vvnnl",
            updateTime: 1695720687,
        },
    ]);
    const navigate = useNavigate();

    const columns: ColumnTypes = [
        {
            title: <span>名称</span>,
            dataIndex: "name",
            render: value => (
                <>
                    <div className="type">SQL</div> <a>{value}</a>
                </>
            ),
            onHeaderCell: columnStyle1,
            onCell: columnStyle1,
            ellipsis: true,
        },
        {
            title: "状态",
            dataIndex: "status",
            filters: [
                {
                    text: "启动中",
                    value: "starting",
                },
                {
                    text: "运行中",
                    value: "running",
                },
                {
                    text: "停止中",
                    value: "stoping",
                },
                {
                    text: "已停止",
                    value: "stoped",
                },
                {
                    text: "已完成",
                    value: "finished",
                },
                {
                    text: "已失败",
                    value: "fail",
                },
            ],
            onFilter: (value: React.Key | boolean, record) => record.status === value,
            render: value => {
                if (value === "starting") {
                    return (
                        <>
                            <LoadingOutlined /> 启动中
                        </>
                    );
                }
                if (value === "running") {
                    return (
                        <>
                            <PlayCircleFilled /> 运行中
                        </>
                    );
                }
                if (value === "stoping") {
                    return (
                        <>
                            <LoadingOutlined /> 停止中
                        </>
                    );
                }
                if (value === "stoped") {
                    return (
                        <>
                            <CancelCircleFilled /> 已停止
                        </>
                    );
                }
                if (value === "finished") {
                    return (
                        <>
                            <CheckCircleFilled /> 已完成
                        </>
                    );
                }
                if (value === "fail") {
                    return <></>;
                }
                return <></>;
            },
            onHeaderCell: columnStyle2,
            onCell: columnStyle2,
        },
        {
            title: "健康分",
            dataIndex: "healthSorce",
            sorter: (a, b) => a.healthSorce - b.healthSorce,
            render: (value, { status }) => {
                if (value > 0) {
                    if (status === "finished") {
                        return <span className="source-circle high disabled">{value}</span>;
                    }
                    return <span className="source-circle high">{value}</span>;
                }
                return <span className="source-circle unknown">-</span>;
            },
            onHeaderCell: columnStyle3,
            onCell: columnStyle3,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "业务延时",
            dataIndex: "bizDelay",
            onHeaderCell: columnStyle4,
            onCell: columnStyle4,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "CPU",
            dataIndex: "cpu",
            sorter: (a, b) => a.cpu - b.cpu,
            render: value => {
                if (value > 0) {
                    return value;
                }
                return "-";
            },
            onHeaderCell: columnStyle5,
            onCell: columnStyle5,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "内存",
            dataIndex: "memory",
            sorter: (a, b) => a.memory - b.memory,
            render: value => {
                if (value > 0) {
                    return <>{value} Gib</>;
                }
                return "-";
            },
            onHeaderCell: columnStyle6,
            onCell: columnStyle6,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "修改人",
            dataIndex: "updateUser",
            onHeaderCell: columnStyle7,
            onCell: columnStyle7,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "修改时间",
            dataIndex: "updateTime",
            sorter: (a, b) => a.updateTime - b.updateTime,
            render: value => <>{dayjs.unix(value).format("MM/DD HH:mm:ss")}</>,
            onHeaderCell: columnStyle8,
            onCell: columnStyle8,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "操作",
            dataIndex: "age",
            render: (_, { status }) => {
                return (
                    <>
                        <Button
                            size="small"
                            type="link"
                            disabled={["running", "starting", "stoping"].includes(status)}
                            onClick={onLaunchButtonClick}
                        >
                            启动
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            size="small"
                            type="link"
                            disabled={["stoped", "stoping", "finished"].includes(status)}
                            onClick={onStopButtonClick}
                        >
                            停止
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            size="small"
                            type="link"
                            danger
                            disabled={["running", "starting", "stoping"].includes(status)}
                            onClick={onDeleteClick}
                        >
                            删除
                        </Button>
                    </>
                );
            },
            onHeaderCell: columnStyle9,
            onCell: columnStyle9,
            className: props.collapse ? "hide" : undefined,
        },
    ];

    const onLaunchButtonClick: ButtonProps["onClick"] = e => {
        e.stopPropagation();
        setLaunchModalOpen(true);
    };

    const onStopButtonClick: ButtonProps["onClick"] = e => {
        e.stopPropagation();
        setStopModalOpen(true);
    };

    const onStopModalOkClick = () => {
        messageApi.info({
            icon: <></>,
            content: (
                <>
                    <ExclamationCircleOutlined color="#0064c8" />
                    作业 Untitled-stream-sql 停止中…
                </>
            ),
        });
        setStopModalOpen(false);
        setData(data => {
            return [
                ...data
                    .filter(item => item.id === "9ddc3745-7453-4d4b-96ee-965d8b2d5f05")
                    .map(item => {
                        item.status = "stoping";
                        return item;
                    }),
            ];
        });

        setTimeout(() => {
            setData(data => {
                return [
                    ...data
                        .filter(item => item.id === "9ddc3745-7453-4d4b-96ee-965d8b2d5f05")
                        .map(item => {
                            item.status = "stoped";
                            return item;
                        }),
                ];
            });
        }, 4000);
    };

    const onLaunchModalOkClick = () => {
        messageApi.info({
            icon: <></>,
            content: (
                <>
                    <ExclamationCircleOutlined color="#0064c8" />
                    作业 Untitled-stream-sql 启动中…
                </>
            ),
        });
        setLaunchModalOpen(false);

        setData(data => {
            return [
                ...data
                    .filter(item => item.id === "9ddc3745-7453-4d4b-96ee-965d8b2d5f05")
                    .map(item => {
                        item.status = "starting";
                        return item;
                    }),
            ];
        });

        setTimeout(() => {
            setData(data => {
                return [
                    ...data
                        .filter(item => item.id === "9ddc3745-7453-4d4b-96ee-965d8b2d5f05")
                        .map(item => {
                            item.status = "running";
                            return item;
                        }),
                ];
            });
        }, 4000);
    };

    const onDeleteClick: ButtonProps["onClick"] = e => {
        e.stopPropagation();
        messageApi.success({
            icon: <></>,
            content: (
                <>
                    <CheckCircleOutlined color="#00a700" /> Session 集群 &#34;kk-test&#34; 已删除
                </>
            ),
        });
    };

    const onJobTypeSelect: SelectProps["onSelect"] = (_, { link }) => {
        navigate(link);
    };

    return (
        <div className="stream-job-list-layout">
            <div className="header">
                <div className="title">作业运维</div>
                <div className="actions">
                    <Space>
                        <Button
                            type="primary"
                            onClick={changeModalOpen(true, setDeployModalOpen)}
                        >
                            {props.collapse ? <PlusOutlined /> : "部署作业"}
                        </Button>
                        <Select
                            defaultValue={"stream"}
                            options={[
                                {
                                    value: "stream",
                                    label: "流作业",
                                    link: "/workspace/:workspaceId/namespace/:namespaceId/operations/stream",
                                },
                                {
                                    value: "batch",
                                    label: "批作业",
                                    link: "/workspace/:workspaceId/namespace/:namespaceId/operations/batch",
                                },
                            ]}
                            onSelect={onJobTypeSelect}
                        />
                        <Search
                            addonBefore={
                                <Select
                                    defaultValue="name"
                                    options={[
                                        {
                                            value: "name",
                                            label: "名称",
                                        },
                                        {
                                            value: "editor",
                                            label: "修改人",
                                        },
                                    ]}
                                />
                            }
                            placeholder="搜索…"
                        />
                        {props.collapse ? null : (
                            <Space.Compact>
                                <Select
                                    suffixIcon={null}
                                    style={{ width: 185 }}
                                    placeholder="标签选择"
                                    dropdownRender={menu => (
                                        <>
                                            <div style={{ padding: "5px 12px", color: "#666" }}>标签名</div>
                                            <Divider style={{ margin: 0 }} />
                                            {menu}
                                        </>
                                    )}
                                />
                                <Button>重置</Button>
                            </Space.Compact>
                        )}
                    </Space>
                    {props.collapse ? null : (
                        <Button
                            icon={<SettingOutlined />}
                            onClick={changeModalOpen(true, setSettingModalOpen)}
                        />
                    )}
                </div>
            </div>
            <div className="content">
                <Table
                    tableLayout="fixed"
                    columns={columns}
                    dataSource={data}
                    showSorterTooltip={false}
                    size="small"
                    onRow={record => {
                        return {
                            onClick: () => navigate(`${record.id}/configuration`),
                        };
                    }}
                />
            </div>

            <DeployModal
                open={deployModalOpen}
                onCancel={changeModalOpen(false, setDeployModalOpen)}
            />
            <SettingModal
                open={settingModalOpen}
                onCancel={changeModalOpen(false, setSettingModalOpen)}
            />
            <LaunchModal
                open={launchModalOpen}
                onCancel={changeModalOpen(false, setLaunchModalOpen)}
                onOk={onLaunchModalOkClick}
            />
            <StopModal
                open={stopModalOpen}
                onCancel={changeModalOpen(false, setStopModalOpen)}
                onOk={onStopModalOkClick}
            />
            {contextHolder}
        </div>
    );
};

export default StreamJobListLayout;
