import { Button, Space, Table } from "antd";
import "./index.sass";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

type TableProps = Parameters<typeof Table<DataType>>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const columns: ColumnTypes = [
    {
        title: "名称",
        dataIndex: "name",
        width: "26.5%",
    },
    {
        title: "指标",
        dataIndex: "age",
        width: "26.5%",
    },
    {
        title: "描述",
        dataIndex: "age",
        width: "26.75%",
    },
    {
        title: "创建时间",
        dataIndex: "age",
        width: "10.75%",
    },
    {
        title: "操作",
        dataIndex: "age",
    },
];

const data: DataType[] = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
    },
    {
        key: "4",
        name: "Jim Red",
        age: 32,
        address: "London No. 2 Lake Park",
    },
];

const WarnLayout = () => {
    return (
        <div className="warn-layout">
            <div className="header">
                <div className="title">告警模板</div>
                <div className="actions">
                    <Space>
                        <Button type='primary'>添加告警模板</Button>
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
    );
};

export default WarnLayout;