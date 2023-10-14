import { Button, Input, Space, Table, Tag } from "antd";
import './index.sass'
import { useHref } from "react-router-dom";

const { Search } = Input;


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
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.age - b.age,
        width: '300px',
    },
    {
        title: '状态',
        dataIndex: 'age',
        filters: [
            {
                text: '启动中',
                value: 'Joe',
            },
            {
                text: '运行中',
                value: 'Category 1',
            },
            {
                text: '停止中',
                value: 'Category 2',
            },
            {
                text: '已停止',
                value: 'Joe',
            },
            {
                text: '已完成',
                value: 'Category 1',
            },
            {
                text: '已失败',
                value: 'Category 2',
            },
        ],
        onFilter: (value: string | number | boolean, record) => record.name.startsWith(value as string),
        width: '150px',
    },
    {
        title: 'CPU',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: '内存',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: '操作',
        dataIndex: 'age',
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

const SessionClusterLayout = () => {
    const onSearch = (value: string) => console.log(value);
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
                            onSearch={onSearch}
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
                />
            </div>
        </div>
    )
};

export default SessionClusterLayout;