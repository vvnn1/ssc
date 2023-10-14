import { MouseEventHandler, useState } from "react";
import { AppstoreOutlined, DatabaseOutlined, FileOutlined } from "../../../Icon"
import './index.sass'
import DraftTabPanel from "./LeftTabPanel/DraftTabPanel";
import MetaTabPanel from "./LeftTabPanel/MetaTabPanel";
import MethodTabPanel from "./LeftTabPanel/MethodTabPanel";

interface LeftTabProps {
    activeTabPanel: (tabPanel:React.ReactNode) => void;
}
const LeftTabBar = (props: LeftTabProps) => {
    const {activeTabPanel} = props;
    const [activeTabId, setActiveTabId] = useState<string>('draft');

    const onTabClick = (tabPanel: React.ReactNode): MouseEventHandler<HTMLDivElement> => {
        return (e) => {
            setActiveTabId(e.currentTarget.id);
            activeTabPanel(tabPanel);
        }
    }

    const generateClassName = (id:string) => {
        if(activeTabId === id) {
            return ["tabs-bar-tab-label", "tabs-bar-tab-label-activated"].join(" ");
        } else {
            return "tabs-bar-tab-label";
        }
    }

    return (
        <div className="draft-lef-tab-bar">
            <div className={generateClassName("draft")} id="draft" onClick={onTabClick(<DraftTabPanel/>)}>
                <span className="tabs-bar-tab-icon">
                    <FileOutlined />
                </span>
                <span className="tabs-bar-tab-title"> 作业草稿 </span>
            </div>
            <div className={generateClassName("catalogs")} id="catalogs" onClick={onTabClick(<MetaTabPanel/>)}>
                <span className="tabs-bar-tab-icon">
                    <DatabaseOutlined />
                </span>
                <span className="tabs-bar-tab-title"> 元数据 </span>
            </div>
            <div className={generateClassName("udf")} id="udf" onClick={onTabClick(<MethodTabPanel/>)}>
                <span className="tabs-bar-tab-icon">
                    <AppstoreOutlined />
                </span>
                <span className="tabs-bar-tab-title"> 函数 </span>
            </div>
        </div>
    )
};

export default LeftTabBar;