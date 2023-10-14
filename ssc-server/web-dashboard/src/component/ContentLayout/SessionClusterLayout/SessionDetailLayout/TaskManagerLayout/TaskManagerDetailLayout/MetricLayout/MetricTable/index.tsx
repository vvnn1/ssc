import { Card, Progress, Table, Tooltip } from "antd";
import './index.sass'
import { InfoCircleOutlined } from "../../../../../../../Icon";

type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const MetricGraph = () => {

    return (
        <div className="taskmanager-metric-graph">
            <div className="graph-title">Total Process Memory</div>
            <div className="graph-title">Total Flink Memory</div>
            <div className="inner-graph blue">
                <div className="graph-title">
                    <span>JVM Heap</span>
                    <code>153 MB / 3.21 GB</code>
                </div>

                <div className="graph-bar grey">
                    <span>Framework Heap</span>
                    <code>128 MB</code>
                </div>
                <div className="graph-bar green">
                    <span>Task Heap</span>
                    <code>3.22 GB</code>
                </div>
                <div className="progress" style={{ width: '4.65207%' }}></div>
            </div>
            <div className="inner-graph yellow">
                <div className="graph-title">Off-Heap Memory</div>
                <div className="graph-bar green">
                    <span>Managed Memory</span>
                    <code>0 B</code>
                </div>
                <div className="inner-graph orange">
                    <div className="graph-title">Direct Memory</div>
                    <div className="graph-bar grey">
                        <span>Framework Off-Heap</span>
                        <code>128 MB</code>
                    </div>
                    <div className="graph-bar cyan">
                        <span>Task Off-Heap</span>
                        <code>0 B</code>
                    </div>
                    <div className="graph-bar orange">
                        <span>Network</span>
                        <code>0 / 712 MB</code>
                    </div>
                </div>
                <br />
                <div className="graph-bar green">
                    <span>JVM Metaspace</span>
                    <code>74.0 MB / 256 MB</code>
                    <div className="progress" style={{ width: '28.9145%' }}></div>
                </div>
                <div className="graph-bar green">
                    <span>JVM Overhead</span>
                    <code>410 MB</code>
                    <div className="progress" style={{ width: '0%' }}></div>
                </div>
            </div>
            <div className="group"></div>
        </div>
    )
};

const columns: ColumnTypes = [
    {
        title: 'Flink Memory Model',
        colSpan: 2,
        width: 260,
        dataIndex: 'graph',
        onCell: (_, index) => index === 0 ? { rowSpan: 8 } : { rowSpan: 0 },
    },
    {
        title: 'Model Name',
        colSpan: 0,
        dataIndex: 'name',
        width: 180,
        className: 'table-header'
    },
    {
        title: <>Effective Configuration <Tooltip title="This column shows the values that are actually used by Flink. These may differ from the configured values; Flink may adjust them to fit the actual setup, and automatically derives values that were not explicitly configured."  ><InfoCircleOutlined /></Tooltip></>,
        width: 180,
        dataIndex: 'total'
    },
    {
        title: 'Metric',
        dataIndex: 'metric',
        onCell: (_, index) => {
            if (index === 0 || index === 3) {
                return { rowSpan: 2 }
            }
            if (index === 1 || index === 4) {
                return { rowSpan: 0 }
            }
            return { rowSpan: 1 }
        }
    }
];

interface MetricDataType {
    name: string;
    total: string;
    metric?: React.ReactNode,
    graph?: React.ReactNode
};

const items: MetricDataType[] = [
    {
        name: 'Framework Heap',
        total: '128 MB',
        metric: (
            <>
                <Progress strokeLinecap="butt" percent={4.65} size='small' style={{ width: '90%', display: 'block' }} strokeColor='#0064c8' trailColor="#f5f5f5" />
                153 MB / 3.21 GB <Tooltip title="The maximum heap displayed might differ from the configured values depending on the used GC algorithm for this process." ><InfoCircleOutlined /></Tooltip>
            </>
        ),
        graph: <MetricGraph />,
    },
    {
        name: 'Task Heap',
        total: '3.22 GB',
    },
    {
        name: 'Managed Memory',
        total: '2.78 GB',
        metric: (
            <>
                <Progress strokeLinecap="butt" percent={0} size='small' style={{ width: '90%', display: 'block' }} strokeColor='#0064c8' trailColor="#f5f5f5" />
                0 B / 3.21 GB
            </>
        ),
    },
    {
        name: 'Framework Off-Heap',
        total: '128 MB',
        metric: <Tooltip title="Metrics related to this configuration parameter cannot be monitored. Flink does not have full control over these memory pools." ><InfoCircleOutlined /></Tooltip>
    },
    {
        name: 'Task Off-Heap',
        total: '0 B',
    },
    {
        name: 'Network',
        total: '712 MB',
        metric: (
            <>
                <Progress strokeLinecap="butt" percent={0} size='small' style={{ width: '90%', display: 'block' }} strokeColor='#0064c8' trailColor="#f5f5f5" />
                0 B / 712 MB
            </>
        ),
    },
    {
        name: 'JVM Metaspace',
        total: '256 MB',
        metric: (
            <>
                <Progress strokeLinecap="butt" percent={28.91} size='small' style={{ width: '90%', display: 'block' }} strokeColor='#0064c8' trailColor="#f5f5f5" />
                74.0 MB / 256 MB
            </>
        ),
    },
    {
        name: 'JVM Overhead',
        total: '410 MB',
        metric: <Tooltip title="Metrics related to this configuration parameter cannot be monitored. Flink does not have full control over these memory pools." ><InfoCircleOutlined /></Tooltip>,
    }
];




const MetricTable = () => {
    return (
        <Card
            className="metric-table-card"
            title="Memory"
            size="small"
        >
            <Table
                className="metrics-table"
                columns={columns}
                size="small"
                bordered
                dataSource={items}
                pagination={false}
                style={{ borderColor: '#dedfe1' }}
                rowKey='name'
            />
        </Card>
    )
};

export default MetricTable;