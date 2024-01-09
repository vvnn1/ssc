import {
    Badge,
    Button,
    ButtonProps,
    Checkbox,
    Divider,
    Dropdown,
    DropdownProps,
    Input,
    MenuProps,
    Modal,
    Select,
    SelectProps,
    Space,
    Table,
    Tag,
    Tooltip,
    message,
} from "antd";
import { changeModalOpen, uuid } from "../../../../../util";
import DeployModal from "../DeployModal";
import { useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import {
    CancelCircleFilled,
    CheckCircleFilled,
    CloseCircleFilled,
    CloseOutlined,
    DownOutlined,
    FilterOutlined,
    LoadingOutlined,
    PlayCircleFilled,
    PlusOutlined,
    QuestionCircleFilled,
    QuestionCircleOutlined,
    QuestionOutlined,
    RightOutlined,
    SearchOutlined,
    SwapOutlined,
} from "../../../../../component/Icon";
import moment from "moment";

interface BatchJob {
    key: React.Key;
    name: string;
    runningCount: number;
    finishedCount: number;
    failedCount: number;
    cancelledCount: number;
    launchCount: number;
    editor: string;
    updateTime: string;
    endTime: string;
}

interface BatchJobRecord {
    key: React.Key;
    id: string;
    createTime: string;
    status: string;
    editor: string;
    updateTime: string;
    endTime: string;
}

type BatchTableProps = Parameters<typeof Table<BatchJob>>[0];
type JobColumnTypes = Exclude<BatchTableProps["columns"], undefined>;

type RecordTableProps = Parameters<typeof Table<BatchJobRecord>>[0];
type RecordColumnTypes = Exclude<RecordTableProps["columns"], undefined>;

interface BatchJobListLayoutProps {
    collapse?: boolean;
}

const BatchJobListLayout = (props: BatchJobListLayoutProps) => {
    const [deployModalOpen, setDeployModalOpen] = useState<boolean>(false);
    const [modal, modalContextHolder] = Modal.useModal();
    const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
    const [batchJobData, setBatchJobData] = useState<BatchJob[]>([
        {
            key: "0",
            name: "test_kkk",
            runningCount: 0,
            finishedCount: 0,
            failedCount: 1,
            cancelledCount: 0,
            launchCount: 0,
            editor: "wang",
            updateTime: "01-04 15:35 ",
            endTime: "01-04 17:42 ",
        },
    ]);

    const [batchRecordData, setBatchRecordData] = useState<BatchJobRecord[]>([
        {
            key: "7980f044-d5f7-4b11-ba8b-f13c2c769d62",
            id: "7980f044-d5f7-4b11-ba8b-f13c2c769d62",
            createTime: "01-04 15:45",
            status: "failed",
            editor: "1840755998634838",
            updateTime: "01-04 15:47",
            endTime: "01-04 15:47",
        },
    ]);

    const navigate = useNavigate();

    const onJobTypeSelect: SelectProps["onSelect"] = (_, { link }) => {
        navigate(link);
    };

    const onJobDeleteClick = (name: string): ButtonProps["onClick"] => {
        return e => {
            e.stopPropagation();
            modal.confirm({
                icon: <QuestionCircleOutlined />,
                title: "删除作业",
                content: `确定删除选择的作业 ${name} 吗？`,
                footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                ),
                okButtonProps: {
                    danger: true,
                },
                closable: true,
            });
        };
    };

    const onJobLaunchClick = (name: string): ButtonProps["onClick"] => {
        return e => {
            e.stopPropagation();
            modal.confirm({
                icon: <QuestionCircleOutlined />,
                title: "作业启动",
                content: `你确定要启动作业 ${name} 吗？`,
                footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                ),
                closable: true,
                onOk: () => {
                    const uid = uuid();
                    const jobRecord: BatchJobRecord = {
                        key: uid,
                        id: uid,
                        createTime: moment().format("MM-DD HH:mm"),
                        status: "launch",
                        editor: "1840755998634838",
                        updateTime: moment().format("MM-DD HH:mm"),
                        endTime: "-",
                    };

                    setBatchJobData(batchJobData => {
                        return [
                            {
                                ...batchJobData[0],
                                launchCount: batchJobData[0].launchCount + 1,
                            },
                        ];
                    });

                    setBatchRecordData(batchRecordData => {
                        return [jobRecord, ...batchRecordData];
                    });

                    const id = setInterval(() => {
                        jobRecord.status = "failed";
                        jobRecord.endTime = moment().format("MM-DD HH:mm");
                        jobRecord.updateTime = moment().format("MM-DD HH:mm");

                        setBatchJobData(batchJobData => {
                            return [
                                {
                                    ...batchJobData[0],
                                    launchCount: batchJobData[0].launchCount - 1,
                                    failedCount: batchJobData[0].failedCount + 1,
                                },
                            ];
                        });

                        setBatchRecordData(batchRecordData => {
                            return [...batchRecordData];
                        });

                        clearInterval(id);
                    }, 10000);
                },
            });
        };
    };

    const onRecordCancelClick = (createTime: string): ButtonProps["onClick"] => {
        return e => {
            e.stopPropagation();
            modal.confirm({
                icon: <QuestionCircleOutlined />,
                title: "停止作业",
                content: `确认要停止该作业吗？（创建于 ${createTime}）？`,
                footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                ),
                closable: true,
            });
        };
    };

    const onRecordDeleteClick = (createTime: string): ButtonProps["onClick"] => {
        return e => {
            e.stopPropagation();
            modal.confirm({
                icon: <QuestionCircleOutlined />,
                title: "删除作业",
                content: `确认要删除该作业吗？（创建于 ${createTime}）`,
                footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                ),
                okButtonProps: {
                    danger: true,
                },
                closable: true,
            });
        };
    };

    const jobColumns: JobColumnTypes = [
        {
            title: "名称",
            dataIndex: "name",
            render: value => {
                return (
                    <div>
                        <span className="type">JAR</span>
                        <Tooltip
                            title={
                                <div>
                                    test_kk
                                    <br />
                                    f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3
                                </div>
                            }
                        >
                            {value}
                        </Tooltip>
                    </div>
                );
            },
            // width: 200,
        },
        {
            title: "状态",
            dataIndex: "status",
            colSpan: 2,
            render: (_, record) => {
                return (
                    <Space>
                        <Tooltip title="运行中">
                            <div>
                                <span className="name RUNNING">
                                    <PlayCircleFilled />
                                </span>
                                <span className="count">{record.runningCount}</span>
                            </div>
                        </Tooltip>
                        <Divider type="vertical" />
                        <Tooltip title="已完成">
                            <div>
                                <span className="name FINISHED">
                                    <CheckCircleFilled />
                                </span>
                                <span className="count">{record.finishedCount}</span>
                            </div>
                        </Tooltip>
                        <Divider type="vertical" />
                        <Tooltip title="已失败">
                            <div>
                                <span className="name FAILED">
                                    <CloseCircleFilled />
                                </span>
                                <span className="count">{record.failedCount}</span>
                            </div>
                        </Tooltip>
                        <Divider type="vertical" />
                        <Tooltip title="已停止">
                            <div>
                                <span className="name CANCELLED">
                                    <CancelCircleFilled />
                                </span>
                                <span className="count">{record.cancelledCount}</span>
                            </div>
                        </Tooltip>
                        {record.launchCount > 0 ? (
                            <>
                                <Divider type="vertical" />
                                <Tooltip>
                                    <div>
                                        <span className="name LAUNCH">
                                            <LoadingOutlined />
                                        </span>
                                        <span className="count">{record.launchCount}</span>
                                    </div>
                                </Tooltip>
                            </>
                        ) : null}
                    </Space>
                );
            },
            onCell: () => ({ colSpan: 2 }),
            // width: 150,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "修改人",
            dataIndex: "editor",
            colSpan: 0,
            onCell: () => ({ colSpan: 0 }),
            // width: 120,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "修改时间",
            dataIndex: "updateTime",
            colSpan: 2,
            render: value => <span>最近修改：{value}</span>,
            onCell: () => ({ colSpan: 2 }),
            // width: 150,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "结束时间",
            dataIndex: "endTime",
            colSpan: 0,
            onCell: () => ({ colSpan: 0 }),
            // width: 150,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "操作",
            render: (_, record) => {
                return (
                    <Space>
                        <Button
                            size="small"
                            type="link"
                            onClick={onJobLaunchClick(record.name)}
                        >
                            启动
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            size="small"
                            type="link"
                        >
                            详情
                        </Button>
                        <Divider type="vertical" />
                        <Dropdown
                            rootClassName="batch-more-actions-dropdown"
                            menu={{
                                items: [
                                    {
                                        key: "edit",
                                        label: <Button type="link">修改部署</Button>,
                                    },
                                    {
                                        key: "delete",
                                        label: (
                                            <Button
                                                type="link"
                                                danger
                                                onClick={onJobDeleteClick(record.name)}
                                            >
                                                删除
                                            </Button>
                                        ),
                                    },
                                ],
                            }}
                        >
                            <Button
                                size="small"
                                type="link"
                            >
                                更多
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                );
            },
            className: props.collapse ? "hide" : undefined,
        },
    ];

    const recordColumns: RecordColumnTypes = [
        {
            title: " ",
            width: 32,
        },
        {
            title: "创建时间",
            // width: 200,
            dataIndex: "createTime",
            render: value => (
                <Tooltip
                    placement="topLeft"
                    title="作业 ID: 6b98e781-541c-408c-bd90-0cddbb4864dd"
                >
                    <a>{value}</a>
                </Tooltip>
            ),
        },
        {
            title: "状态",
            // width: 150,
            dataIndex: "status",
            render: value => {
                switch (value) {
                    case "running":
                        return (
                            <div className="status">
                                <span className="icon RUNNING">
                                    <PlayCircleFilled />
                                </span>
                                <span className="desc">运行中</span>
                            </div>
                        );
                    case "launch":
                        return (
                            <div className="status">
                                <span className="LAUNCH">
                                    <LoadingOutlined />
                                </span>
                                <span className="desc">启动中</span>
                            </div>
                        );
                    case "finished":
                        return (
                            <div className="status">
                                <span className="icon FINISHED">
                                    <CheckCircleFilled />
                                </span>
                                <span className="desc">已完成</span>
                            </div>
                        );
                    case "failed":
                        return (
                            <Tooltip
                                placement="right"
                                title="FlinkJobManagerStartFailed: Main method error, please check your code and parameters. Detailed context: Caused by: org.apache.flink.client.program.ProgramInvocationException: The main method caused an error: Job was submitted in detached mode. Results of job execution, such as accumulators, runtime, etc. are not available."
                            >
                                <div className="status">
                                    <span className="icon FAILED">
                                        <CloseCircleFilled />
                                    </span>
                                    <span className="desc">已失败</span>
                                </div>
                            </Tooltip>
                        );
                    case "cancelled":
                        return (
                            <div className="status">
                                <span className="icon FINISHED">
                                    <CancelCircleFilled />
                                </span>
                                <span className="desc">已停止</span>
                            </div>
                        );
                }
            },
        },
        {
            title: "修改人",
            // width: 120,
            dataIndex: "editor",
            ellipsis: true,
            render: value => <Tooltip title={value}>{value}</Tooltip>,
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "修改时间",
            // width: 150,
            dataIndex: "updateTime",
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "结束时间",
            // width: 150,
            dataIndex: "endTime",
            className: props.collapse ? "hide" : undefined,
        },
        {
            title: "操作",
            render: (_, record) => {
                return (
                    <Space>
                        <Button
                            type="link"
                            disabled={!(record.status === "running" || record.status === "launch")}
                            onClick={onRecordCancelClick(record.createTime)}
                        >
                            停止
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            danger
                            type="link"
                            disabled={record.status === "running" || record.status === "launch"}
                            onClick={onRecordDeleteClick(record.createTime)}
                        >
                            删除
                        </Button>
                    </Space>
                );
            },
            className: props.collapse ? "hide" : undefined,
        },
    ];

    const handleMenuClick: MenuProps["onClick"] = e => {};

    const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
        if (info.source === "trigger" || nextOpen) {
            setFilterDropdownOpen(nextOpen);
        }
    };

    return (
        <div className="batch-job-list-layout">
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
                            defaultValue={"batch"}
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
                        {props.collapse ? (
                            <Input
                                suffix={<SearchOutlined />}
                                placeholder="搜索…"
                            />
                        ) : (
                            <>
                                <Space.Compact className="ant-input-group">
                                    <span className="ant-input-group-addon">
                                        <SwapOutlined />
                                    </span>
                                    <Select
                                        defaultValue="name_asc"
                                        options={[
                                            {
                                                label: "按名称升序",
                                                value: "name_asc",
                                            },
                                            {
                                                label: "按名称降序",
                                                value: "name_desc",
                                            },
                                            {
                                                label: "按修改时间升序",
                                                value: "edit_asc",
                                            },
                                            {
                                                label: "按修改时间降序",
                                                value: "edit_desc",
                                            },
                                        ]}
                                        style={{ width: 170 }}
                                    />
                                </Space.Compact>
                                <Space.Compact className="ant-input-group">
                                    <span className="ant-input-group-addon">
                                        <Dropdown
                                            trigger={["click", "hover"]}
                                            open={filterDropdownOpen}
                                            overlayClassName="batch-job-filter-dropdown"
                                            menu={{
                                                items: [
                                                    {
                                                        type: "group",
                                                        label: "Type",
                                                        children: [
                                                            {
                                                                key: "sql",
                                                                label: <Checkbox>SQL</Checkbox>,
                                                            },
                                                            {
                                                                key: "jar",
                                                                label: <Checkbox>JAR</Checkbox>,
                                                            },
                                                            {
                                                                key: "python",
                                                                label: <Checkbox>PYTHON</Checkbox>,
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        type: "group",
                                                        label: "状态",
                                                        children: [
                                                            {
                                                                key: "launch",
                                                                label: <Checkbox>启动中</Checkbox>,
                                                            },
                                                            {
                                                                key: "running",
                                                                label: <Checkbox>运行中</Checkbox>,
                                                            },
                                                            {
                                                                key: "canceling",
                                                                label: <Checkbox>停止中</Checkbox>,
                                                            },
                                                            {
                                                                key: "cancelled",
                                                                label: <Checkbox>已停止</Checkbox>,
                                                            },
                                                            {
                                                                key: "finished",
                                                                label: <Checkbox>已完成</Checkbox>,
                                                            },
                                                            {
                                                                key: "failed",
                                                                label: <Checkbox>已失败</Checkbox>,
                                                            },
                                                        ],
                                                    },
                                                ],
                                                onClick: handleMenuClick,
                                            }}
                                            onOpenChange={handleOpenChange}
                                            dropdownRender={menu => {
                                                return (
                                                    <>
                                                        <ul className="ant-dropdown-menu">
                                                            <li className="checkbox-list">{menu}</li>
                                                            <li className="actions">
                                                                <Button type="link">重置</Button>
                                                            </li>
                                                        </ul>
                                                    </>
                                                );
                                            }}
                                        >
                                            <Badge
                                                dot={true}
                                                color="#2281d4"
                                            >
                                                <FilterOutlined style={{ color: "#2281d4" }} />
                                            </Badge>
                                        </Dropdown>
                                    </span>
                                    <Space.Compact>
                                        <Input
                                            style={{ width: 140 }}
                                            placeholder="搜索…"
                                        />
                                        <Button type="primary">查询</Button>
                                    </Space.Compact>
                                </Space.Compact>
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
                            </>
                        )}
                    </Space>
                </div>
            </div>
            <div className="content">
                <div className="screening">
                    {props.collapse ? null : (
                        <>
                            <Tag>所有作业</Tag>
                            <RightOutlined />
                        </>
                    )}

                    <Tag
                        className={props.collapse ? "collapsed-tag" : undefined}
                        closable
                    >
                        状态: 启动中,运行中,停止中,已停止,已完成,已失败
                    </Tag>
                    <Tag
                        className={props.collapse ? "collapsed-tag" : undefined}
                        closable
                    >
                        类型: SQLSCRIPT,JAR,PYTHON
                    </Tag>
                    <Button
                        size="small"
                        type="link"
                    >
                        清除
                    </Button>
                </div>
                <Table
                    rowClassName="job-row"
                    size="small"
                    columns={jobColumns}
                    dataSource={batchJobData}
                    expandable={{
                        expandedRowRender: () => (
                            <Table
                                pagination={false}
                                size="small"
                                rowClassName="record-row"
                                columns={recordColumns}
                                dataSource={batchRecordData}
                                onRow={record => {
                                    return {
                                        onClick: () => navigate(`${record.id}/configuration`),
                                    };
                                }}
                            />
                        ),
                        rowExpandable: record => record.name !== "Not Expandable",
                        expandIcon: ({ expanded, onExpand, record }) => (
                            <RightOutlined
                                className={expanded ? "expanded" : undefined}
                                onClick={e => onExpand(record, e)}
                            />
                        ),
                        columnWidth: 32,
                        expandRowByClick: true,
                    }}
                />
            </div>
            <DeployModal
                open={deployModalOpen}
                onCancel={changeModalOpen(false, setDeployModalOpen)}
            />
            {modalContextHolder}
        </div>
    );
};

export default BatchJobListLayout;
