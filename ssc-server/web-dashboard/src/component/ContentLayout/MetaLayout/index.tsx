import { Button, ConfigProvider, Input, Space, Table } from 'antd'
import './index.sass'
import { PlusOutlined, ReloadOutlined, SearchOutlined } from '../../Icon'
import MetaTree from '../DraftLayout/LeftTabBar/LeftTabPanel/MetaTabPanel/MetaTree'
import ScrollPin from '../../ScrollPin'
import { useRef, useState } from 'react'
import CreateCatalogModal from './CreateCatalogModal'


interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

type TableProps = Parameters<typeof Table<DataType>>[0];
type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const columns: ColumnTypes = [
    {
        title: 'Catalog 名称',
        dataIndex: 'name',
        width: '35%',
    },
    {
        title: '类型',
        dataIndex: 'age',
        width: '35%',
    },
    {
        title: '操作',
        dataIndex: 'age',
        render: () => (
            <>
                <Button type="link" size="small">查看</Button>
                <Button type="link" size="small">删除</Button>
            </>
        )
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const MetaLayout = () => {
    const treeContainerRef = useRef<HTMLDivElement>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        }
    }

    return (
        <div className="meta-layout">
            <div className="panel side panel-ttb">
                <div className="panel-bar header panel panel-ltr">
                    <span className="title">元数据</span>
                    <div className="actions">
                        <Button
                            className="ant-btn-icon-only"
                            type='text'
                            size="small"
                        >
                            <ReloadOutlined />
                        </Button>
                        <Button
                            className="ant-btn-icon-only"
                            type='text'
                            size="small"
                        >
                            <PlusOutlined />
                        </Button>

                    </div>
                </div>
                <div className="panel-bar searchbar panel panel-ltr">
                    <Input suffix={<SearchOutlined />} placeholder="搜索名称…" />
                </div>
                <div className="panel tree panel-ltr" ref={treeContainerRef}>
                    <ScrollPin containerRef={treeContainerRef} />
                    <MetaTree />
                </div>
            </div>
            <div className="panel main panel-ttb">
                <div className="header">
                    <div className="title">
                        <span>Catalog 列表</span>
                    </div>
                    <div className="actions">
                        <Space>
                            <Button type='primary' onClick={changeModalOpen(true)}>创建 Catalog</Button>
                            <Input suffix={<SearchOutlined />} placeholder="搜索…" />
                        </Space>
                    </div>
                </div>
                <div className="content">
                    <Table
                        className="meta-table"
                        columns={columns}
                        dataSource={data}
                        showSorterTooltip={false}
                        size='small'
                    />
                </div>
            </div>

            <CreateCatalogModal open={modalOpen} onCancel={changeModalOpen(false)} />
        </div>
    )
};

export default MetaLayout;