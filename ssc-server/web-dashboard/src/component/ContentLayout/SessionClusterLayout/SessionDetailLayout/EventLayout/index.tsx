import { Input, Space, Table } from "antd";
import { SearchOutlined } from "../../../../Icon";
import "./index.sass";
import MonacoEditor from "../../../../MonacoEditor";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const columns: ColumnTypes = [
    { title: "时间", dataIndex: "name", key: "name", width: 200 },
    { title: "信息", dataIndex: "address", key: "address" },
    {
        title: "操作",
        dataIndex: "",
        key: "x",
        width: 150,
        render: () => <a>复制信息</a>,
    },
];

const data: DataType[] = [
    {
        key: 1,
        name: "2023-09-07 14:14:29",
        age: 32,
        address: "Session cluster has successfully finished.",
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
        key: 2,
        name: "2023-09-07 14:14:26",
        age: 42,
        address: "Awaiting cluster teardown.",
        description: "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
        key: 3,
        name: "2023-09-07 14:13:50",
        age: 29,
        address: "Session cluster was successfully started.",
        description: "This not expandable",
    },
    {
        key: 4,
        name: "2023-09-07 14:13:33",
        age: 32,
        address: "Waiting for a cluster to become ready.",
        description: "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
    },
];

const EventLayout = () => {
    return (
        <div className="session-event-layout">
            <div className="event-filter">
                <Space.Compact className="ant-input-group">
                    <span className="ant-input-group-addon">过滤事件</span>
                    <Input placeholder="输入信息内容搜索" suffix={<SearchOutlined />} />
                </Space.Compact>
            </div>
            <Table
                className="events-table"
                columns={columns}
                size="small"
                expandable={{
                    expandedRowRender: (record) => <MonacoEditor options={{minimap: {enabled: false}}} height={62} value={record.description} />,
                    rowExpandable: (record) => record.name !== "Not Expandable",
                    columnWidth: 60
                }}
                dataSource={data}
            />
        </div>
    );
};


export default EventLayout;