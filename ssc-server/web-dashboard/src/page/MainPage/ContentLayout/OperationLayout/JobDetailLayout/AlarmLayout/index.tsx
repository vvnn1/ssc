import { Menu, MenuProps } from "antd";
import MyLink from "../../../../../../component/MyLink";
import "./index.sass";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import AlarmList from "./AlarmList";
import AlarmRule from "./AlarmRule";

const items: MenuProps["items"] = [
    {
        label: <MyLink to="events">告警事件</MyLink>,
        key: "events",
    },
    {
        label: <MyLink to="rules">告警规则</MyLink>,
        key: "rules",
    },
];

const AlarmLayout = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath(
        "/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/:jobId/:detailTab/:key",
        pathname
    );

    return (
        <div className="development-alarm-layout">
            <Menu
                mode="horizontal"
                items={items}
                defaultSelectedKeys={pathMatch?.params.key ? [pathMatch?.params.key] : []}
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
