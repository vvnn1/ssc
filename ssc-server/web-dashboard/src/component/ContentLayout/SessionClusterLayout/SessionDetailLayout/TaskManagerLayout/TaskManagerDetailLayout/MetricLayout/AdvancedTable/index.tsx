import { Card, Col, Row, Table } from "antd";
import "./index.sass";

type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const columns1: ColumnTypes = [
    {
        title: "Type",
        dataIndex: "type",
        render: value => <strong>{value}</strong>,
    },
    {
        title: "Committed",
        dataIndex: "committed",
    },
    {
        title: "Used",
        dataIndex: "used",
    },
    {
        title: "Maximum",
        dataIndex: "maximum",
    },
];

const columns2: ColumnTypes = [
    {
        title: "Type",
        dataIndex: "type",
        render: value => <strong>{value}</strong>,
    },
    {
        title: "Count",
        dataIndex: "count",
    },
    {
        title: "Used",
        dataIndex: "used",
    },
    {
        title: "Capacity",
        dataIndex: "capacity",
    },
];

const column3: ColumnTypes = [
    {
        title: "Type",
        dataIndex: "type",
        render: value => <strong>{value}</strong>,
    },
    {
        title: "Count",
        dataIndex: "count",
    },
];

const column4: ColumnTypes = [
    {
        title: "Collector",
        dataIndex: "collector",
        render: value => <strong>{value}</strong>,
    },
    {
        title: "Count",
        dataIndex: "count",
    },
    {
        title: "Time",
        dataIndex: "time",
    },
];

const AdvancedTable = () => {
    return (
        <Card
            title="Advanced"
            size="small"
            className="advanced-table-card"
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Table
                        title={() => "JVM (Heap/Non-Heap) Memory"}
                        columns={columns1}
                        size="small"
                        bordered
                        pagination={false}
                        dataSource={[
                            {
                                type: "Heap",
                                committed: "3.34 GB",
                                used: "35.8 MB",
                                maximum: "3.34 GB",
                            },
                            {
                                type: "Non-Heap",
                                committed: "101 MB",
                                used: "96.9 MB",
                                maximum: "1.48 GB",
                            },
                        ]}
                    />
                </Col>
                <Col span={12}>
                    <Table
                        title={() => "Outside JVM Memory"}
                        columns={columns2}
                        size="small"
                        bordered
                        pagination={false}
                        dataSource={[
                            {
                                type: "Direct",
                                count: "22,794",
                                used: "712 MB",
                                capacity: "712 MB",
                            },
                            {
                                type: "Mapped",
                                count: "0",
                                used: "0 B",
                                capacity: "0 B",
                            },
                        ]}
                    />
                </Col>
            </Row>
            <Row
                gutter={16}
                className="row-2"
            >
                <Col span={12}>
                    <Table
                        title={() => "Netty Shuffle Buffers"}
                        columns={column3}
                        size="small"
                        bordered
                        pagination={false}
                        dataSource={[
                            {
                                type: "Available",
                                count: "22,773",
                            },
                            {
                                type: "Total",
                                count: "22,773",
                            },
                        ]}
                    />
                </Col>
                <Col span={12}>
                    <Table
                        title={() => "Garbage Collection"}
                        columns={column4}
                        size="small"
                        bordered
                        pagination={false}
                        dataSource={[
                            {
                                collector: "ParNew",
                                count: "36",
                                time: "806",
                            },
                            {
                                collector: "ConcurrentMarkSweep",
                                count: "4",
                                time: "394",
                            },
                        ]}
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default AdvancedTable;
