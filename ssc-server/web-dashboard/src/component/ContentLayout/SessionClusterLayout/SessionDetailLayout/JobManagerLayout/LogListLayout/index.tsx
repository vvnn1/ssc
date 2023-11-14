import { Table } from "antd";
import "./index.sass";
import MyLink from "../../../../../MyLink";

type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const columns: ColumnTypes = [
    {
        title: "Log Name",
        width: "50%",
        dataIndex: "name",
        render: (value) => <MyLink to={value}>{value}</MyLink>
    },
    {
        title: "Last Modified Time",
        width: "25%",
        dataIndex: "updateTime",
        sorter: () => 1
    },
    {
        title: "Size (KB)",
        width: "25%",
        dataIndex: "size",
        sorter: () => 1
    }
];

const LogListLayout = () => {
    return (
        <div className="jobmanager-loglist-layout">
            <Table 
                bordered
                className="log-list-table"
                columns={columns}
                size="small"
                dataSource={[
                    {
                        name: "flink.log",
                        updateTime: "2023-09-10 16:57:15",
                        size: "64.03"
                    },
                    {
                        name: "flink.out",
                        updateTime: "2023-09-10 16:57:03",
                        size: "0"
                    }
                ]}
                pagination={false}
                rowKey='name'
            />
        </div>
    );
};


export default LogListLayout;