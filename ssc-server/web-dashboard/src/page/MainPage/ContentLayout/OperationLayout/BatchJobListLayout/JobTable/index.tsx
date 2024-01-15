import { Button, Divider, Dropdown, MenuProps, Space, Table, TableProps, Tooltip } from "antd";
import "./index.sass";
import {
    CancelCircleFilled,
    CheckCircleFilled,
    CloseCircleFilled,
    DownOutlined,
    LoadingOutlined,
    PlayCircleFilled,
} from "../../../../../../component/Icon";
import { stopPropagationClickWrapper } from "../../../../../../util";

export interface JobTableProps {
    collapse?: boolean;
    onJobLaunchClick: (record: Record) => void;
    onJobDeleteClick: (record: Record) => void;
    onJobDetailClick: (record: Record) => void;
}

export interface Record {
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

const JobTable = (props: Pick<TableProps<Record>, "dataSource" | "expandable"> & JobTableProps) => {
    const { collapse, onJobDeleteClick, onJobLaunchClick, onJobDetailClick } = props;

    const columns: TableProps<Record>["columns"] = [
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
            width: collapse ? undefined : 200,
        },
        {
            title: "状态",
            dataIndex: "status",
            colSpan: 2,
            render: (_, record) => {
                return (
                    <Space split={<Divider type="vertical" />}>
                        <Tooltip title="运行中">
                            <div>
                                <span className="name RUNNING">
                                    <PlayCircleFilled />
                                </span>
                                <span className="count">{record.runningCount}</span>
                            </div>
                        </Tooltip>

                        <Tooltip title="已完成">
                            <div>
                                <span className="name FINISHED">
                                    <CheckCircleFilled />
                                </span>
                                <span className="count">{record.finishedCount}</span>
                            </div>
                        </Tooltip>
                        <Tooltip title="已失败">
                            <div>
                                <span className="name FAILED">
                                    <CloseCircleFilled />
                                </span>
                                <span className="count">{record.failedCount}</span>
                            </div>
                        </Tooltip>
                        <Tooltip title="已停止">
                            <div>
                                <span className="name CANCELLED">
                                    <CancelCircleFilled />
                                </span>
                                <span className="count">{record.cancelledCount}</span>
                            </div>
                        </Tooltip>
                        {record.launchCount > 0 ? (
                            <Tooltip>
                                <div>
                                    <span className="name LAUNCH">
                                        <LoadingOutlined />
                                    </span>
                                    <span className="count">{record.launchCount}</span>
                                </div>
                            </Tooltip>
                        ) : null}
                    </Space>
                );
            },
            onCell: () => ({ colSpan: 2 }),
            width: collapse ? undefined : 150,
            className: collapse ? "hide" : undefined,
        },
        {
            title: "修改人",
            dataIndex: "editor",
            colSpan: 0,
            onCell: () => ({ colSpan: 0 }),
            width: collapse ? undefined : 120,
            className: collapse ? "hide" : undefined,
        },
        {
            title: "修改时间",
            dataIndex: "updateTime",
            colSpan: 2,
            render: value => <span>最近修改：{value}</span>,
            onCell: () => ({ colSpan: 2 }),
            width: collapse ? undefined : 150,
            className: collapse ? "hide" : undefined,
        },
        {
            title: "结束时间",
            dataIndex: "endTime",
            colSpan: 0,
            onCell: () => ({ colSpan: 0 }),
            width: collapse ? undefined : 150,
            className: collapse ? "hide" : undefined,
        },
        {
            title: "操作",
            render: (_, record) => {
                return (
                    <Space>
                        <Button
                            size="small"
                            type="link"
                            onClick={stopPropagationClickWrapper(() => onJobLaunchClick(record))}
                        >
                            启动
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            size="small"
                            type="link"
                            onClick={stopPropagationClickWrapper(() => onJobDetailClick(record))}
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
                                        label: (
                                            <Button
                                                type="link"
                                                onClick={stopPropagationClickWrapper(() => onJobDetailClick(record))}
                                            >
                                                修改部署
                                            </Button>
                                        ),
                                    },
                                    {
                                        key: "delete",
                                        label: (
                                            <Button
                                                type="link"
                                                danger
                                                onClick={stopPropagationClickWrapper(() => onJobDeleteClick(record))}
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
                                onClick={stopPropagationClickWrapper(() => {})}
                            >
                                更多
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                );
            },
            className: collapse ? "hide" : undefined,
        },
    ];

    return (
        <Table
            {...props}
            className="job-table"
            showHeader={false}
            rowClassName="job-row"
            size="small"
            columns={columns}
        />
    );
};

export default JobTable;
