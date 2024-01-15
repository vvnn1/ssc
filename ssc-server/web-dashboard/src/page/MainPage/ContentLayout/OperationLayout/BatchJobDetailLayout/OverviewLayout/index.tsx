import { Card, Descriptions, DescriptionsProps, Divider, message } from "antd";
import SorceBadge from "../../../../../../component/SorceBadge";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleOutlined, ScheduleOutlined } from "../../../../../../component/Icon";
import "./index.sass";
import MyLink from "../../../../../../component/MyLink";

const items: DescriptionsProps["items"] = [
    {
        key: "1",
        label: "运行时长",
        children: "1m 45s",
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
                <MyLink
                    to="configuration"
                    withSearch
                >
                    作业详情
                </MyLink>
                <Divider type="vertical" />
                <a>指标</a>
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
        <div className="batch-job-overview-layout">
            <Card
                title={
                    <>
                        当前作业 ID
                        <Divider type="vertical" />
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
            {contextHolder}
        </div>
    );
};

export default OverviewLayout;
