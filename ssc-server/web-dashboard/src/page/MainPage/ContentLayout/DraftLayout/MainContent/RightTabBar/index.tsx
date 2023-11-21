import React, { useState } from "react";
import { ApartmentOutlined, ControlOutlined, HistoryOutlined } from "../../../../../../component/Icon";
import "./index.sass";
import ConfigurationTab from "./ConfigurationTab";
import StructureTab from "./StructureTab";
import VersionTab from "./VersionTab";

interface RightTabBarProps {
    onPanelChange: (panel: React.ReactNode) => void;
}

const RightTabBar = (props: RightTabBarProps) => {
    const [activeLabel, setActiveLabel] = useState<string>();

    const changeActiveLabel = (label: string, activePanel: React.ReactNode) => {
        return () => {
            if (activeLabel === label) {
                setActiveLabel(undefined);
                props.onPanelChange(undefined);
            } else {
                setActiveLabel(label);
                props.onPanelChange(activePanel);
            }
        };
    };

    return (
        <div className="tabs-bar-right">
            <div
                id="draft-configurations"
                className={`tabs-bar-tab-label ${
                    activeLabel === "draft-configurations" ? "tabs-bar-tab-label-activated" : ""
                }`}
                onClick={changeActiveLabel("draft-configurations", <ConfigurationTab />)}
            >
                <span className="tabs-bar-tab-icon">
                    <ControlOutlined />
                </span>
                <span className="tabs-bar-tab-title">更多配置</span>
            </div>
            <div
                id="structure"
                className={`tabs-bar-tab-label ${activeLabel === "structure" ? "tabs-bar-tab-label-activated" : ""}`}
                onClick={changeActiveLabel("structure", <StructureTab />)}
            >
                <span className="tabs-bar-tab-icon">
                    <ApartmentOutlined />
                </span>
                <span className="tabs-bar-tab-title">代码结构</span>
            </div>
            <div
                id="versions"
                className={`tabs-bar-tab-label ${activeLabel === "versions" ? "tabs-bar-tab-label-activated" : ""}`}
                onClick={changeActiveLabel("versions", <VersionTab />)}
            >
                <span className="tabs-bar-tab-icon">
                    <HistoryOutlined />
                </span>
                <span className="tabs-bar-tab-title">版本信息</span>
            </div>
        </div>
    );
};

export default RightTabBar;
