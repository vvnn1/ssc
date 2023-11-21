import { Descriptions, Tooltip } from "antd";

const systemCheckpoints = (
    <Descriptions
        size="small"
        layout="vertical"
        bordered
        items={[
            {
                key: "1",
                label: "快照 ID",
                children: "-",
                span: 1,
            },
            {
                key: "2",
                label: "完成时间",
                children: "-",
                span: 1,
            },
            {
                key: "3",
                label: "持续时间",
                children: "0ms",
                span: 1,
            },
        ]}
    />
);

const lastSucceedSnapshot = (
    <Descriptions
        size="small"
        layout="vertical"
        bordered
        items={[
            {
                key: "1",
                label: "快照 ID",
                children: (
                    <Tooltip title="81aa2e5c-093b-421b-a403-1b0e3dd7dcf8">81aa2e5c-093b-421b-a403-1b0e3dd7dcf8</Tooltip>
                ),
            },
            {
                key: "2",
                label: "完成时间",
                children: "2023-11-07 14:57:08",
            },
            {
                key: "3",
                label: "持续时间",
                children: "6s",
            },
        ]}
    />
);

const lastFailedSnapshot = (
    <Descriptions
        size="small"
        layout="vertical"
        bordered
        items={[
            {
                key: "1",
                label: "快照 ID",
                children: "-",
            },
            {
                key: "2",
                label: "完成时间",
                children: "-",
            },
            {
                key: "3",
                label: "失败时间",
                children: "-",
            },
        ]}
    />
);
const OverviewLayout = () => {
    return (
        <>
            <Descriptions
                title="系统检查点"
                size="small"
                colon={false}
                layout="vertical"
                items={[
                    {
                        label: <></>,
                        key: "1",
                        span: 3,
                        children: systemCheckpoints,
                    },
                ]}
            />
            <Descriptions
                title={
                    <>
                        作业快照<span>触发次数：1</span>
                        <span>触发次数：1</span>
                        <span>已完成：1</span>
                        <span>已完成：1</span>
                    </>
                }
                size="small"
                layout="vertical"
                items={[
                    {
                        key: "1",
                        label: "上次快照生成成功",
                        span: 3,
                        children: lastSucceedSnapshot,
                    },
                    {
                        key: "2",
                        label: "上次快照生成失败",
                        span: 3,
                        children: lastFailedSnapshot,
                    },
                ]}
            />
        </>
    );
};

export default OverviewLayout;
