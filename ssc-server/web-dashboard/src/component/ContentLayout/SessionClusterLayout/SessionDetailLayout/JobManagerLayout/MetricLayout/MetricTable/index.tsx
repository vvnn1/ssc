import { Progress, Table, Tooltip } from "antd";
import "./index.sass";
import { InfoCircleOutlined } from "../../../../../../Icon";


type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;


const MetricGraph = () => {

    return (
        <div className="jobmanager-metric-graph">
            <div className="graph-title">Total Process Memory</div>
            <div className="graph-title">Total Flink Memory</div>
            <div className="graph-bar blue">
                <span>JVM Heap</span>
                <code>68.0 MB / 3.21 GB</code>
                <div className="progress" style={{ width: "4.65207%" }}></div>
            </div>
            <div className="inner-graph yellow">
                <div className="graph-title">Off-Heap</div>
                <div className="graph-bar orange">
                    <span>Off-Heap Memory</span>
                    <code>128 MB</code>
                </div>
                <br />
                <div className="graph-bar green">
                    <span>JVM Metaspace</span>
                    <code>74.0 MB / 256 MB</code>
                    <div className="progress" style={{ width: "28.9145%" }}></div>
                </div>
                <div className="graph-bar green">
                    <span>JVM Overhead</span>
                    <code>410 MB</code>
                    <div className="progress" style={{ width: "0%" }}></div>
                </div>
            </div>
            <div className="group"></div>
        </div>
    );
};


interface MetricDataType {
    name: string;
    total: string;
    metric: React.ReactNode,
    graph?: React.ReactNode
}

const items: MetricDataType[] = [
    {
        name: "JVM Heap",
        total: "3.22 GB",
        metric: (
            <>
                <Progress strokeLinecap="butt" percent={4.65} size='small' style={{ width: "90%", display: "block" }} strokeColor='#0064c8' trailColor="#f5f5f5" />
                153 MB / 3.21 GB <Tooltip title="The maximum heap displayed might differ from the configured values depending on the used GC algorithm for this process."  ><InfoCircleOutlined /></Tooltip>
            </>
        ),
        graph: <MetricGraph />,
    },
    {
        name: "Off-Heap Memory",
        total: "128 MB",
        metric: <Tooltip title="Metrics related to this configuration parameter cannot be monitored. Flink does not have full control over these memory pools"  ><InfoCircleOutlined /></Tooltip>,
    },
    {
        name: "JVM Metaspace",
        total: "256 MB",
        metric: (
            <>
                <Progress strokeLinecap="butt" percent={28.91} size='small' style={{ width: "90%", display: "block" }} strokeColor='#0064c8' trailColor="#f5f5f5" />
                74.0 MB / 256 MB
            </>
        ),
    },
    {
        name: "JVM Overhead",
        total: "410 MB",
        metric: <Tooltip title="Metrics related to this configuration parameter cannot be monitored. Flink does not have full control over these memory pools"  ><InfoCircleOutlined /></Tooltip>,
    }
];

const columns: ColumnTypes = [
    {
        title: "Flink Memory Model",
        colSpan: 2,
        width: 220,
        dataIndex: "graph",
        onCell: (_, index) => index === 0 ? { rowSpan: 4 } : { rowSpan: 0 },
    },
    {
        title: "Model Name",
        colSpan: 0,
        dataIndex: "name",
        width: 160,
        className: "table-header"
    },
    {
        title: <>Effective Configuration <Tooltip title="This column shows the values that are actually used by Flink. These may differ from the configured values; Flink may adjust them to fit the actual setup, and automatically derives values that were not explicitly configured."  ><InfoCircleOutlined /></Tooltip></>,
        width: 200,
        dataIndex: "total"
    },
    {
        title: "Metric",
        dataIndex: "metric",
    }
];

const MetricTable = () => {
    return (
        <Table
            className="metrics-table"
            columns={columns}
            size="small"
            bordered
            dataSource={items}
            pagination={false}
            style={{ borderColor: "#dedfe1" }}
            rowKey='name'
        />
    );
};

export default MetricTable;