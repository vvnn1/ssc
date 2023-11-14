import { Button, ButtonProps, Divider, Select, Space, Table, message } from 'antd'
import './index.sass'
import { CancelCircleFilled, CheckCircleFilled, CheckCircleOutlined, ExclamationCircleOutlined, LoadingOutlined, PlayCircleFilled, SettingOutlined } from '../../Icon'
import { useState } from 'react';
import Search from 'antd/es/input/Search';
import { useNavigate, useParams } from 'react-router-dom';
import { changeModalOpen } from '../../../util';
import DeployModal from './DeployModal';
import SettingModal from './SettingModal';
import LaunchModal from './LaunchModal';
import StopModal from './StopModal';
import dayjs from 'dayjs';

type Status = 'starting' | 'running' | 'stoping' | 'stoped' | 'finished' | 'fail';

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
type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const OperationLayout = () => {
    const [deployModalOpen, setDeployModalOpen] = useState<boolean>(false);
    const [settingModalOpen, setSettingModalOpen] = useState<boolean>(false);
    const [launchModalOpen, setLaunchModalOpen] = useState<boolean>(false);
    const [stopModalOpen, setStopModalOpen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<Job[]>([
        {
            id: '9ddc3745-7453-4d4b-96ee-965d8b2d5f05',
            key: '1',
            name: 'Untitled-stream-sql',
            status: 'running',// 已停止 启动中 运行中 停止中
            healthSorce: 75,
            bizDelay: '',
            cpu: 6,
            memory: 1024,
            updateUser: 'vvnnl',
            updateTime: 1695720687,
        }
    ]);
    const navigate = useNavigate();
    const { jobType } = useParams();

    const columns: ColumnTypes = [
        {
            title: '名称',
            dataIndex: 'name',
            render: (value) => <><div className="type">SQL</div> <a>{value}</a></>
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
                    text: '已完成',
                    value: 'finished',
                },
                {
                    text: '已失败',
                    value: 'fail',
                },
            ],
            onFilter: (value: React.Key | boolean, record) => record.status === value,
            width: '12.15%',
            render: (value) => {
                if (value === 'starting') {
                    return <><LoadingOutlined /> 启动中</>
                }
                if (value === 'running') {
                    return <><PlayCircleFilled /> 运行中</>
                }
                if (value === 'stoping') {
                    return <><LoadingOutlined /> 停止中</>
                }
                if (value === 'stoped') {
                    return <><CancelCircleFilled /> 已停止</>
                }
                if (value === 'finished') {
                    return <><CheckCircleFilled/> 已完成</>
                }
                if (value === 'fail') {
                    return <></>
                }
                return <></>
            } 
        },
        {
            title: '健康分',
            dataIndex: 'healthSorce',
            sorter: (a, b) => a.healthSorce - b.healthSorce,
            width: '10.2%',
            render: (value, {status}) => {
                if (value > 0) {
                    if(status === "finished"){
                        return <span className="source-circle high disabled">{value}</span>
                    }
                    return <span className="source-circle high">{value}</span>
                }
                return <span className="source-circle unknown">-</span>
            }
        },
        {
            title: '业务延时',
            dataIndex: 'bizDelay',
            width: '7.3%',
        },
        {
            title: 'CPU',
            dataIndex: 'cpu',
            sorter: (a, b) => a.cpu - b.cpu,
            width: '7.5%',
            render: (value) => {
                if (value > 0) {
                    return value;
                }
                return "-";
            }
        },
        {
            title: '内存',
            dataIndex: 'memory',
            sorter: (a, b) => a.memory - b.memory,
            width: '8.25%',
            render: (value) => {
                if (value > 0) {
                    return <>{value} Gib</>;
                }
                return "-";
            }
        },
        {
            title: '修改人',
            dataIndex: 'updateUser',
            width: '12.2%',

        },
        {
            title: '修改时间',
            dataIndex: 'updateTime',
            sorter: (a, b) => a.updateTime - b.updateTime,
            width: '12%',
            render: (value) => <>{dayjs.unix(value).format('MM/DD HH:mm:ss')}</>
        },
        {
            title: '操作',
            dataIndex: 'age',
            render: (_, { id, status }) => {
                return (
                    <>
                        <Button size="small" type="link" disabled={['running', 'starting', 'stoping'].includes(status)} onClick={onLaunchButtonClick}>启动</Button>
                        <Divider type="vertical" />
                        <Button size="small" type="link" disabled={['stoped', 'stoping', 'finished'].includes(status)} onClick={onStopButtonClick}>停止</Button>
                        <Divider type="vertical" />
                        <Button size="small" type="link" danger disabled={['running', 'starting', 'stoping'].includes(status)} onClick={onDeleteClick}>删除</Button>
                    </>
                )
            },
        },
    ];

    const onLaunchButtonClick: ButtonProps['onClick'] = (e) => {
        e.stopPropagation();
        setLaunchModalOpen(true);
    }

    const onStopButtonClick: ButtonProps['onClick'] = (e) => {
        e.stopPropagation();
        setStopModalOpen(true);
    }

    const onStopModalOkClick = () => {
        messageApi.info({
            icon: <></>,
            content: <><ExclamationCircleOutlined color="#0064c8" />作业 Untitled-stream-sql 停止中…</>
        });
        setStopModalOpen(false);
        setData(data => {
            return [
                ...data.filter(item => item.id === '9ddc3745-7453-4d4b-96ee-965d8b2d5f05')
                    .map(item => {
                        item.status = 'stoping';
                        return item;
                    })
            ];
        });

        setTimeout(() => {
            setData(data => {
                return [
                    ...data.filter(item => item.id === '9ddc3745-7453-4d4b-96ee-965d8b2d5f05')
                        .map(item => {
                            item.status = 'stoped';
                            return item;
                        })
                ];
            })
        }, 4000);
    }

    const onLaunchModalOkClick = () => {
        messageApi.info({
            icon: <></>,
            content: <><ExclamationCircleOutlined color="#0064c8" />作业 Untitled-stream-sql 启动中…</>
        });
        setLaunchModalOpen(false);

        setData(data => {
            return [
                ...data.filter(item => item.id === '9ddc3745-7453-4d4b-96ee-965d8b2d5f05')
                    .map(item => {
                        item.status = 'starting';
                        return item;
                    })
            ];
        });

        setTimeout(() => {
            setData(data => {
                return [
                    ...data.filter(item => item.id === '9ddc3745-7453-4d4b-96ee-965d8b2d5f05')
                        .map(item => {
                            item.status = 'running';
                            return item;
                        })
                ];
            })
        }, 4000);
    }

    const onDeleteClick: ButtonProps['onClick'] = (e) => {
        e.stopPropagation();
        messageApi.success({
            icon: <></>,
            content: <><CheckCircleOutlined color="#00a700" /> Session 集群 "kk-test" 已删除</>
        });
    }

    return (
        <div className="development-layout">
            <div className="header">
                <div className="title">作业运维</div>
                <div className="actions">
                    <Space>
                        <Button type='primary' onClick={changeModalOpen(true, setDeployModalOpen)}>部署作业</Button>
                        <Select
                            defaultValue={jobType}
                            options={[
                                { value: 'stream', label: '流作业' },
                                { value: 'batch', label: '批作业' },
                            ]}
                        />
                        <Search
                            placeholder="搜索…"
                        />
                    </Space>

                    <Button icon={<SettingOutlined />} onClick={changeModalOpen(true, setSettingModalOpen)} />
                </div>

            </div>
            <div className="content">
                <Table
                    columns={columns}
                    dataSource={data}
                    showSorterTooltip={false}
                    size='small'
                    onRow={(record) => {
                        return {
                            onClick: () => navigate(`${record.id}/configuration`)
                        }
                    }}
                />
            </div>

            <DeployModal open={deployModalOpen} onCancel={changeModalOpen(false, setDeployModalOpen)} />
            <SettingModal open={settingModalOpen} onCancel={changeModalOpen(false, setSettingModalOpen)} />
            <LaunchModal open={launchModalOpen} onCancel={changeModalOpen(false, setLaunchModalOpen)} onOk={onLaunchModalOkClick}/>
            <StopModal open={stopModalOpen} onCancel={changeModalOpen(false, setStopModalOpen)} onOk={onStopModalOkClick} />
            {contextHolder}
        </div>
    )
};

export default OperationLayout;