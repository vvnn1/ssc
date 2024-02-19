import { Menu, MenuProps } from "antd";
import MyLink from "../../../../../../component/MyLink";
import "./index.sass";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import AlarmList from "./AlarmList";
import AlarmRule from "./AlarmRule";
import TabMenu from "../../../../../../component/TabMenu";

const items: MenuProps["items"] = [
    {
        label: (
            <MyLink
                to="../events"
                withSearch
            >
                告警事件
            </MyLink>
        ),
        key: "events",
    },
    {
        label: (
            <MyLink
                to="../rules"
                withSearch
            >
                告警规则
            </MyLink>
        ),
        key: "rules",
    },
];

const AlarmLayout = () => {
    return (
        <div className="development-alarm-layout">
            <TabMenu
                type="menu"
                menuItems={items}
                keyPath="/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/:jobId/:detailTab/:key"
            />
            <div className="detail-container">
                <Routes>
                    <Route
                        path="events"
                        element={<AlarmList />}
                    />
                    <Route
                        path="rules"
                        element={<AlarmRule />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="events" />}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default AlarmLayout;
