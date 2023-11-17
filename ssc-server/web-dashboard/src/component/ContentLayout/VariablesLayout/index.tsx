import { Button, Space, Table } from "antd";
import "./index.sass";
import { PlusOutlined } from "../../Icon";


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
        title: "变量名称",
        dataIndex: "name",
        width: "70.125%",
    },
    {
        title: "创建时间",
        dataIndex: "age",
        width: "17.875%",
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

const VariablesLayout = () => {
    return (
        <div className="variables-layout">
            <div className="header">
                <div className="title">变量值</div>
                <div className="actions">
                    <Space>
                        <Button
                            type='primary'
                            icon={<PlusOutlined /> }
                        >
                            <span>新增变量</span>
                        </Button>
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

export default VariablesLayout;