import { Collapse, CollapseProps } from "antd";
import { useState } from "react";
import "./index.sass";
import BasicConfiguration from "./BasicConfiguration";
import ResourceConfiguration from "./ResourceConfiguration";
import LogConfiguration from "./LogConfiguration";
import RuntimeConfiguration from "./RuntimeConfiguration";

const ConfigurationLayout = () => {
    const [activeKey, setActiveKey] = useState<string | string[]>(["1"]);
    const items: CollapseProps["items"] = [
        {
            label: "基础配置",
            children: <BasicConfiguration />,
        },
        {
            label: "资源配置",
            children: <ResourceConfiguration />,
        },
        {
            label: "运行参数配置",
            children: <RuntimeConfiguration />,
        },
        {
            label: "日志配置",
            children: <LogConfiguration />,
        },
    ];

    const onChange = (key: string | string[]) => {
        setActiveKey(key);
    };

    return (
        <div className="batch-configuration-layout">
            <Collapse
                items={items}
                expandIconPosition="end"
                onChange={onChange}
                activeKey={activeKey}
            />
        </div>
    );
};

export default ConfigurationLayout;
