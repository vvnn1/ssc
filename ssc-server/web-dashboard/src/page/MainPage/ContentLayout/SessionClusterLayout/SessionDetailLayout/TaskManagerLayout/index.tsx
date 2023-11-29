import { Table, Tooltip } from "antd";
import "./index.sass";
import MyLink from "../../../../../../component/MyLink";

type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const columns: ColumnTypes = [
    {
        title: "Path, ID",
        render: (_, record) => (
            <MyLink to={`${record.ip}/metrics`}>
                <Tooltip title="192.168.0.187:43945-f87d5f">
                    <span>{record.ip}</span>
                </Tooltip>
                <br />
                <Tooltip title="akka.tcp://flink@192.168.0.187:43945/user/rpc/taskmanager_0">
                    <span>{record.url}</span>
                </Tooltip>
            </MyLink>
        ),
        ellipsis: true,
    },
    {
        title: "Data Port",
        dataIndex: "port",
        sorter: () => 1,
    },
    {
        title: "Last Heartbeat",
        dataIndex: "lastHeartbeat",
        sorter: () => 1,
    },
    {
        title: "Free/All Slots",
        dataIndex: "slots",
    },
    {
        title: "CPU Cores",
        dataIndex: "cores",
        sorter: () => 1,
    },
    {
        title: "Physical MEM",
        dataIndex: "physicalMem",
        sorter: () => 1,
    },
    {
        title: "JVM Heap",
        dataIndex: "heap",
        sorter: () => 1,
    },
    {
        title: "Managed MEM",
        dataIndex: "managedMem",
        sorter: () => 1,
    },
];

const TaskManagerLayout = () => {
    return (
        <div className="taskmanager-layout">
            <Table
                columns={columns}
                size="small"
                dataSource={[
                    {
                        id: <></>,
                        ip: "192.168.12.250:37455-d89fbb",
                        url: "akka.tcp://flink@192.168.12.250:37455/user/rpc/taskmanager_0",
                        port: "39009",
                        lastHeartbeat: "09-10 21:14:34",
                        slots: "1 / 1",
                        cores: "2",
                        physicalMem: "8.2 GB",
                        heap: "3.34 GB",
                        managedMem: "2.78 GB",
                    },
                ]}
                pagination={false}
                rowKey={"port"}
            />
        </div>
    );
};

export default TaskManagerLayout;
