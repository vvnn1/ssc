import { Divider, Dropdown, Input, MenuProps, Select, Space, Table } from 'antd';
import './index.sass'
import { DownOutlined, SearchOutlined } from '../../../../Icon';
import DetailModal from '../DetailModal';
import { useState } from 'react';
import { changeModalOpen } from '../../../../../util';

const EventLayout = () => {
    const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <span style={{ color: '#0064c8' }}>作业详情</span>,
            onClick: changeModalOpen(true, setDetailModalOpen)
        },
        {
            key: '2',
            label: <span style={{ color: '#0064c8' }}>搜索该作业事件</span>
        }
    ];

    return (
        <div className="development-event-layout">
            <Input className="search-input" suffix={<SearchOutlined />} placeholder='输入信息内容或作业 ID' />

            <Table
                size='small'
                columns={[
                    {
                        width: 65,
                    },
                    {
                        title: '时间',
                        width: 200,
                        dataIndex: 'date'
                    },
                    {
                        title: '信息',
                        dataIndex: 'message'
                    },
                    {
                        title: '操作',
                        className: 'operator',
                        render: () => (
                            <>
                                <a>复制信息</a><Divider type="vertical" />
                                <Dropdown
                                    menu={{ items }}
                                >
                                    <a>更多<DownOutlined /></a>
                                </Dropdown>
                            </>
                        )
                    }
                ]}
                dataSource={[
                    {
                        key: '1',
                        date: '2023-09-27 09:54:21',
                        message: 'Transition to TERMINATED completed.',
                    },
                    {
                        key: '2',
                        date: '	2023-09-27 09:54:10',
                        message: 'Awaiting cluster teardown.',
                    }
                ]}
            />
            <DetailModal open={detailModalOpen} onCancel={changeModalOpen(false, setDetailModalOpen)} />
        </div>
    )
};

export default EventLayout;