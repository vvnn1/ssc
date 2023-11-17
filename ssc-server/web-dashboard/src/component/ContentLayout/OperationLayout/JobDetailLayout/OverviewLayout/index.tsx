import { Card, Descriptions, DescriptionsProps, Divider, Table, message } from "antd";
import "./index.sass";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleOutlined, ScheduleOutlined } from "../../../../Icon";
import SorceBadge from "../../../../SorceBadge";
import StateBadge from "../../../../StateBadge";

const items: DescriptionsProps["items"] = [
    {
        key: "1",
        label: "健康分",
        children: (
            <SorceBadge
                sorce={0}
                model="disabled"
            />
        ),
    },
    {
        key: "2",
        label: "重启次数",
        children: "-",
    },
    {
        key: "3",
        label: "操作",
        children: (
            <>
                <a>作业详情</a>
                <Divider type="vertical" />
                <a>Flink UI</a>
            </>
        ),
    },
    {
        key: "4",
        label: "Used / Total Slots",
        children: "-",
    },
    {
        key: "5",
        label: "启动时间",
        children: "11-03 15:39:59",
    },
    {
        key: "6",
        label: "结束时间",
        children: "11-03 15:41:22",
    },
];

const OverviewLayout = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const onCopy = () => {
        messageApi.success({
            icon: <></>,
            content: (
                <>
                    <CheckCircleOutlined color="#00a700" />
                    作业 ID 已复制
                </>
            ),
        });
    };

    return (
        <div className="development-overview-layout">
            <Card
                title={
                    <>
                        当前作业 <Divider type="vertical" />{" "}
                        <CopyToClipboard
                            text="d740d2cc-c085-4d22-b620-7e1d5c68454b"
                            onCopy={onCopy}
                        >
                            <span className="id">d740d2cc-c085-4d22-b620-7e1d5c68454b</span>
                        </CopyToClipboard>
                    </>
                }
                size="small"
            >
                <Descriptions
                    size="small"
                    bordered
                    items={items}
                />
                <div className="job-detail-chart-container">
                    <div className="no-chart">
                        <ScheduleOutlined />
                        无法获取运行图
                    </div>
                </div>
            </Card>
            <Card
                title="历史运行作业"
                size="small"
            >
                <Table
                    size="small"
                    columns={[
                        {
                            title: "创建时间",
                            dataIndex: "createTime",
                        },
                        {
                            title: "停止时间",
                            dataIndex: "stopTime",
                        },
                        {
                            title: "状态",
                            dataIndex: "status",
                            render: () => <StateBadge state="FINISHED" />,
                        },
                        {
                            title: "操作",
                            render: () => (
                                <>
                                    <a>详情</a>
                                    <Divider type="vertical" />
                                    <a>事件</a>
                                </>
                            ),
                        },
                    ]}
                    dataSource={[
                        {
                            createTime: "2023-11-03 15:37:41",
                            stopTime: "2023-11-03 15:39:41",
                            status: "FINISHED",
                        },
                    ]}
                    pagination={false}
                />
            </Card>
            {contextHolder}
        </div>
    );
};

export default OverviewLayout;
