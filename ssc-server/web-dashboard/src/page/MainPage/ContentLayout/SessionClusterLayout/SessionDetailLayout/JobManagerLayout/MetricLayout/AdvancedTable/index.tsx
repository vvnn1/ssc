import { Card, Col, Row, Table } from "antd";
import "./index.sass";

type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const jvmMemoryColumns: ColumnTypes = [
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

const outJvmMemoryColumns: ColumnTypes = [
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

const garbageColumns: ColumnTypes = [
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
            className="advanced-card"
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Table
                        bordered
                        title={() => "JVM (Heap/Non-Heap) Memory"}
                        size="small"
                        columns={jvmMemoryColumns}
                        dataSource={[
                            {
                                type: "Heap",
                                committed: "3.21 GB",
                                used: "51.0 MB",
                                maximum: "3.21 GB",
                            },
                            {
                                type: "Non-Heap",
                                committed: "102 MB",
                                used: "98.0 MB",
                                maximum: "1.48 GB",
                            },
                        ]}
                        pagination={false}
                        rowKey="type"
                    />
                </Col>
                <Col span={12}>
                    <Table
                        bordered
                        title={() => "Outside JVM Memory"}
                        size="small"
                        columns={outJvmMemoryColumns}
                        dataSource={[
                            {
                                type: "Direct",
                                count: "21",
                                used: "571 KB",
                                capacity: "572 KB",
                            },
                            {
                                type: "Mapped",
                                count: "0",
                                used: "0 B",
                                capacity: "0 B",
                            },
                        ]}
                        pagination={false}
                        rowKey="type"
                    />
                </Col>
                <Col
                    span={24}
                    className="garbage-col"
                >
                    <Table
                        bordered
                        title={() => "Garbage Collection"}
                        size="small"
                        columns={garbageColumns}
                        dataSource={[
                            {
                                collector: "ConcurrentMarkSweep",
                                count: "2",
                                time: "139",
                            },
                            {
                                collector: "ParNew",
                                count: "3",
                                time: "396",
                            },
                        ]}
                        pagination={false}
                        rowKey="collector"
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default AdvancedTable;
