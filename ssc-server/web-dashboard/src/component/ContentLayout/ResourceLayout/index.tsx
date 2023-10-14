import { Button, Divider, Input, Space, Table, Tooltip } from "antd";
import './index.sass'
import { CopyOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, FileTextOutlined } from "../../Icon";

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
        render: (value: any) => {
            return (
                <div>
                    <FileTextOutlined className="file-type" />
                    <span className="file-name">{value}</span>
                    <Tooltip title="prompt text">
                        <CopyOutlined className="file-name-copy" />
                    </Tooltip>
                </div>
            )
        }
    },
    {
        title: '创建时间',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
        width: '200px',
    },
    {
        title: '操作',
        dataIndex: 'age',
        width: '360px',
        render: () => (
            <>
                <Button type="link" icon={<DownloadOutlined />} size="small">下载</Button>
                <Divider type="vertical" />
                <Button type="link" icon={<DeleteOutlined />} size="small" danger>删除</Button>
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


const ResourceLayout = () => {
    const onSearch = (value: string) => console.log(value);

    return (
        <div className="resource-layout">
            <div className="header">
                <div className="title">资源管理</div>
                <div className="actions">
                    <Space>
                        <Button type='primary'>上传资源</Button>
                        <Search
                            placeholder="搜索名称"
                            onSearch={onSearch}
                        />
                        <div>
                            可将文件拖到下方表格以上传
                        </div>
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

export default ResourceLayout;