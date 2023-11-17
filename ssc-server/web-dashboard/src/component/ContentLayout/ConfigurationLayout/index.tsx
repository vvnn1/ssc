import { MenuProps } from "antd";
import "./index.sass";
import WorkSettingLayout from "./WorkSettingLayout";
import AlarmTemplateLayout from "./AlarmTemplateLayout";
import MyLink from "../../MyLink";
import { Route, Routes } from "react-router-dom";
import TabMenu from "../../TabMenu";

const menuItems: MenuProps["items"] = [
    {
        label: <MyLink to="deployment-defaults">作业默认配置</MyLink>,
        key: "deployment-defaults",
    },
    {
        label: <MyLink to="alarm-rules">告警规则模板</MyLink>,
        key: "alarm-rules",
    },
];

const ConfigurationLayout = () => {

    return (
        <div className="configuration-layout">
            <div className="header">
                <div className="title">配置管理</div>
            </div>
            <div className="content">
                <TabMenu menuItems={menuItems} keyPath={"/workspace/:workspaceId/namespace/:namespaceId/configurations/:key"}/>
                <div className="content-container">
                    <Routes>
                        <Route path="deployment-defaults" element={<WorkSettingLayout />} />
                        <Route path="alarm-rules" element={<AlarmTemplateLayout />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default ConfigurationLayout;