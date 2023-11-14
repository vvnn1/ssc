import { Button, ButtonProps, Divider, Input, ModalProps, Space, Table, Tag, Tooltip } from "antd";
import './index.sass'
import { useHref, useNavigate } from "react-router-dom";
import { CancelCircleFilled, ClusterOutlined, LoadingOutlined, PlayCircleFilled } from "../../Icon";
import { useState } from "react";
import StopModal from "./StopModal";
import { changeModalOpen } from "../../../util";

const { Search } = Input;

type SessionStatus = 'starting' | 'running' | 'stoping' | 'stoped' | 'fail';

interface SessionCluster {
    key: React.Key;
    id: string;
    name: string;
    status: SessionStatus;
    cpu: number;
    memory: number;
}

type TableProps = Parameters<typeof Table<SessionCluster>>[0];
type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const SessionClusterLayout = () => {
    const [data, setData] = useState<SessionCluster[]>([
        {
            key: '1',
            id: 'ec0549ea-6062-48eb-b41c-00ae409fb605',
            name: 'ssc-session',
            status: 'stoped',
            cpu: 2,
            memory: 2
        },
    ]);

    const [stopModalOpen, setStopModalOpen] = useState<boolean>(false);
    const [stopModalProps, setStopModalProps] = useState<ModalProps>();

    const navigate = useNavigate();
    const columns: ColumnTypes = [
        {
            title: '名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 300,
            ellipsis: true,
            render: (value, { id }) => (
                <>
                    <a><ClusterOutlined /> <Tooltip title={value}>{value}</Tooltip></a><br />
                    <small>{id}</small>
                </>
            ),
        },
        {
            title: '状态',
            dataIndex: 'status',
            filters: [
                {
                    text: '启动中',
                    value: 'starting',
                },
                {
                    text: '运行中',
                    value: 'running',
                },
                {
                    text: '停止中',
                    value: 'stoping',
                },
                {
                    text: '已停止',
                    value: 'stoped',
                },
                {
                    text: '已失败',
                    value: 'fail',
                },
            ],
            onFilter: (value: string | number | boolean, record) => record.status === value,
            width: 150,
            render: (value) => {
                if (value === 'starting') {
                    return <span className="state starting"><LoadingOutlined /> 启动中</span>
                }
                if (value === 'running') {
                    return <span><PlayCircleFilled /> 运行中</span>
                }
                if (value === 'stoping') {
                    return <span><LoadingOutlined /> 停止中</span>
                }
                if (value === 'stoped') {
                    return <span><CancelCircleFilled /> 已停止</span>
                }
                if (value === 'fail') {
                    return <></>
                }
                return <></>
            }
        },
        {
            title: 'CPU',
            dataIndex: 'cpu',
            sorter: (a, b) => a.cpu - b.cpu,
        },
        {
            title: '内存',
            dataIndex: 'memory',
            sorter: (a, b) => a.memory - b.memory,
            render: (value) => (<>{value} GiB</>)
        },
        {
            title: '操作',
            width: 300,
            render: (_, { id, name, status }) => (
                <>
                    <Button type="link" size="small" disabled={['starting', 'running'].includes(status)} onClick={onLaunchClick(id)}>启动</Button>
                    <Divider type="vertical" />
                    <Button type="link" size="small" disabled={["stoped", "stoping"].includes(status)} onClick={onStopClick(id)}>停止</Button>
                    <Divider type="vertical" />
                    <Button type="link" size="small" onClick={onEditClick(name)}>编辑</Button>
                    <Divider type="vertical" />
                    <Button type="link" size="small" danger disabled={['starting', 'running', 'stoping'].includes(status)}>删除</Button>
                </>
            )
        },
    ];

    const onEditClick = (name: string): ButtonProps['onClick'] => {
        return (e) => {
            e.stopPropagation();
            navigate(`../${name}/configure`)
        }
    }

    const onLaunchClick = (id: string): ButtonProps['onClick'] => {
        return (e) => {
            e.stopPropagation();
            setData(data => {
                return [
                    ...data.filter(item => item.id === id)
                        .map(item => {
                            item.status = 'starting';
                            return item;
                        })
                ];
            });

            setTimeout(() => {
                setData(data => {
                    return [
                        ...data.filter(item => item.id === id)
                            .map(item => {
                                item.status = 'running';
                                return item;
                            })
                    ];
                })
            }, 4000);
        }
    }

    const onStopClick = (id: string): ButtonProps['onClick'] => {
        return (e) => {
            e.stopPropagation();
            setStopModalProps({
                onOk: () => {
                    setStopModalOpen(false);
                    setData(data => {
                        return [
                            ...data.filter(item => item.id === id)
                                .map(item => {
                                    item.status = 'stoping';
                                    return item;
                                })
                        ];
                    });

                    setTimeout(() => {
                        setData(data => {
                            return [
                                ...data.filter(item => item.id === id)
                                    .map(item => {
                                        item.status = 'stoped';
                                        return item;
                                    })
                            ];
                        })
                    }, 4000);
                }
            })
            setStopModalOpen(true);
        }
    }

    return (
        <div className="session-layout">
            <div className="header">
                <div className="title">
                    <div className="title">Session 集群</div>
                    <div className="extra"><Tag>请勿生产使用</Tag></div>
                </div>
                <div className="actions">
                    <Space>
                        <Button type='primary' href={useHref('../create-session-cluster')}>创建 Session 集群</Button>
                        <Search
                            placeholder="搜索…"
                        />
                    </Space>
                </div>
            </div>
            <div className="content">
                <Table
                    columns={columns}
                    dataSource={data}
                    showSorterTooltip={false}
                    size='small'
                    onRow={({ name }) => ({
                        onClick: () => navigate(`../${name}/overview`),
                    })}
                />
            </div>
            <StopModal open={stopModalOpen} onCancel={changeModalOpen(false, setStopModalOpen)} {...stopModalProps} />
        </div>
    )
};

export default SessionClusterLayout;