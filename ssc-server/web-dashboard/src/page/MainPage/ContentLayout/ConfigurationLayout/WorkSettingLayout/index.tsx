import { Tabs, TabsProps } from "antd";
import "./index.sass";
import StreamWorkTab from "./StreamWorkTab";
import BatchWorkTab from "./BatchWorkTab";

const tabItems: TabsProps["items"] = [
    {
        key: "1",
        label: "流作业",
        children: <StreamWorkTab />,
    },
    {
        key: "2",
        label: "批作业",
        children: <BatchWorkTab />,
    },
];

const WorkSettingLayout = () => {
    return (
        <Tabs
            className="work-setting-tab"
            defaultActiveKey="1"
            items={tabItems}
            size="small"
            style={{ height: "100%" }}
        />
    );
};

export default WorkSettingLayout;
