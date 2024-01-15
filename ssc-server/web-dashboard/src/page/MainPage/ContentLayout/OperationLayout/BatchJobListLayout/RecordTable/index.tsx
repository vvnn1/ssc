import { Button, ButtonProps, Divider, Space, Table, TableProps, Tooltip } from "antd";
import {
    CancelCircleFilled,
    CheckCircleFilled,
    CloseCircleFilled,
    LoadingOutlined,
    PlayCircleFilled,
} from "../../../../../../component/Icon";
import { useNavigate } from "react-router-dom";
import { stopPropagationClickWrapper } from "../../../../../../util";
import "./index.sass";

export interface Record {
    key: React.Key;
    id: string;
    createTime: string;
    status: string;
    editor: string;
    updateTime: string;
    endTime: string;
}

interface RecordTableProps {
    collapse?: boolean;
    onRecordCancelClick: (record: Record) => void;
    onRecordDeleteClick: (record: Record) => void;
}

function switchStatusIcon(value: string): React.ReactNode {
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
}

const RecordTable = (props: Pick<TableProps<Record>, "dataSource"> & RecordTableProps) => {
    const { collapse, onRecordCancelClick, onRecordDeleteClick, dataSource } = props;
    const navigate = useNavigate();

    const columns: TableProps<Record>["columns"] = [
        {
            title: " ",
            width: 32,
        },
        {
            title: "创建时间",
            width: collapse ? undefined : 200,
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
            width: collapse ? undefined : 150,
            dataIndex: "status",
            render: switchStatusIcon,
        },
        {
            title: "修改人",
            width: collapse ? undefined : 120,
            dataIndex: "editor",
            ellipsis: true,
            render: value => <Tooltip title={value}>{value}</Tooltip>,
            className: collapse ? "hide" : undefined,
        },
        {
            title: "修改时间",
            width: collapse ? undefined : 150,
            dataIndex: "updateTime",
            className: collapse ? "hide" : undefined,
        },
        {
            title: "结束时间",
            width: collapse ? undefined : 150,
            dataIndex: "endTime",
            className: collapse ? "hide" : undefined,
        },
        {
            title: "操作",
            render: (_, record) => {
                return (
                    <Space split={<Divider type="vertical" />}>
                        <Button
                            type="link"
                            disabled={!(record.status === "running" || record.status === "launch")}
                            onClick={stopPropagationClickWrapper(() => onRecordCancelClick(record))}
                        >
                            停止
                        </Button>

                        <Button
                            danger
                            type="link"
                            disabled={record.status === "running" || record.status === "launch"}
                            onClick={stopPropagationClickWrapper(() => onRecordDeleteClick(record))}
                        >
                            删除
                        </Button>
                    </Space>
                );
            },
            className: props.collapse ? "hide" : undefined,
        },
    ];

    return (
        <Table
            className="record-table"
            columns={columns}
            size="small"
            dataSource={dataSource}
            pagination={false}
            rowClassName="record-row"
            onRow={record => {
                return {
                    onClick: () => navigate(`${record.id}/configuration`),
                };
            }}
        />
    );
};

export default RecordTable;
