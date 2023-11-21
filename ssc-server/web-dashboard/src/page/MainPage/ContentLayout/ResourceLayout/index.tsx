import { Button, Divider, Input, Popconfirm, Space, Table, Tooltip, Upload } from "antd";
import "./index.sass";
import {
    CloseOutlined,
    CopyOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    FileTextOutlined,
    LoadingOutlined,
    WarningFilled,
} from "../../../../component/Icon";
import { useState } from "react";

const { Search } = Input;

type RecordType = "default" | "warning" | "uploading";

interface ResourceRecord {
    key: React.Key;
    name: string;
    type?: RecordType;
    createTime?: string;
    downlaoding?: boolean;
}

type TableProps = Parameters<typeof Table<ResourceRecord>>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const ResourceLayout = () => {
    const [data, setData] = useState<ResourceRecord[]>([
        {
            key: "1",
            name: "John Brown",
            createTime: "2023-08-14 11:44:03",
            downlaoding: false,
        },
        {
            key: "2",
            name: "斯泰尔斯庄园奇案 The Mysterious Affair at Styles.txt",
            type: "warning",
        },
        {
            key: "3",
            name: "flink-doris-connector-1.15-1.2.0.jar",
            type: "uploading",
        },
    ]);

    const onDownloadClick = (record: ResourceRecord) => {
        return () => {
            record.downlaoding = true;
            setData([...data]);
            const id = setInterval(() => {
                record.downlaoding = false;
                setData([...data]);
                clearInterval(id);
            }, 2000);
        };
    };

    const columns: ColumnTypes = [
        {
            title: "名称",
            dataIndex: "name",
            render: (value: string, { type }) => {
                return (
                    <div>
                        <FileTextOutlined className="file-type" />
                        <span className="file-name">{value}</span>
                        {type === "warning" ? (
                            <Tooltip title="文件名称格式不正确，只支持字母（大小写）、数字、下划线（_）、横杠（-）、点（.）">
                                <WarningFilled className="file-name-warning" />
                            </Tooltip>
                        ) : null}

                        {type === "uploading" ? (
                            <>
                                <Tooltip title="正在上传文件...">
                                    <LoadingOutlined className="file-uploading" />
                                </Tooltip>
                                <div className="progress" />
                            </>
                        ) : null}
                        {type === "default" || !type ? (
                            <Tooltip title="prompt text">
                                <CopyOutlined className="file-name-copy" />
                            </Tooltip>
                        ) : null}
                    </div>
                );
            },
            onCell: ({ type }) => {
                if (type === "warning") {
                    return {
                        colSpan: 2,
                    };
                }
                if (type === "uploading") {
                    return {
                        colSpan: 3,
                    };
                }
                return {};
            },
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            sorter: () => -1,
            width: "200px",
            onCell: ({ type }) => {
                if (type === "warning" || type === "uploading") {
                    return {
                        colSpan: 0,
                    };
                }
                return {};
            },
        },
        {
            title: "操作",
            dataIndex: "age",
            width: "360px",
            render: (_, record) => {
                if (record.type === "warning") {
                    return (
                        <>
                            <Button
                                size="small"
                                type="link"
                                icon={<CloseOutlined />}
                            >
                                取消
                            </Button>
                            <Divider type="vertical" />
                            <Popconfirm
                                okText="确认"
                                cancelText="取消"
                                title={
                                    <Input
                                        addonAfter="Str."
                                        style={{ width: 340 }}
                                        defaultValue={record.name}
                                    />
                                }
                                overlayClassName="ant-popover-rtl"
                                icon={<></>}
                                placement="left"
                            >
                                <Button
                                    size="small"
                                    type="link"
                                    icon={<EditOutlined />}
                                >
                                    重命名
                                </Button>
                            </Popconfirm>
                        </>
                    );
                }
                return (
                    <>
                        <Button
                            type="link"
                            loading={record.downlaoding}
                            icon={<DownloadOutlined />}
                            size="small"
                            onClick={onDownloadClick(record)}
                        >
                            下载
                        </Button>
                        <Divider type="vertical" />
                        <Popconfirm
                            okText="确认"
                            cancelText="取消"
                            title="是否要删除此文件？"
                            overlayClassName="ant-popover-rtl"
                        >
                            <Button
                                type="link"
                                icon={<DeleteOutlined />}
                                size="small"
                                danger
                            >
                                删除
                            </Button>
                        </Popconfirm>
                    </>
                );
            },
            onCell: ({ type }) => {
                if (type === "uploading") {
                    return {
                        colSpan: 0,
                    };
                }
                return {};
            },
        },
    ];

    return (
        <div className="resource-layout">
            <div className="header">
                <div className="title">资源管理</div>
                <div className="actions">
                    <Space>
                        <Upload>
                            <Button type="primary">上传资源</Button>
                        </Upload>
                        <Search placeholder="搜索名称" />
                        <div>可将文件拖到下方表格以上传</div>
                    </Space>
                </div>
            </div>
            <div className="content">
                <Table
                    columns={columns}
                    dataSource={data}
                    showSorterTooltip={false}
                    size="small"
                />
            </div>
        </div>
    );
};

export default ResourceLayout;
