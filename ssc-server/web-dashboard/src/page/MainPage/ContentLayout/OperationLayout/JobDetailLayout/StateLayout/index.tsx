import { Menu } from "antd";
import "./index.sass";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import OverviewLayout from "./OverviewLayout";
import HistoryLayout from "./HistoryLayout";
import ConfigureLayout from "./ConfigureLayout";
import MyLink from "../../../../../../component/MyLink";

const menuItems = [
    {
        key: "overview",
        label: <MyLink to="overview">总览</MyLink>,
    },
    {
        key: "history",
        label: <MyLink to="history">历史</MyLink>,
    },
    {
        key: "configure",
        label: <MyLink to="configure">配置</MyLink>,
    },
];

const StateLayout = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath(
        "/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/:jobId/states/:key",
        pathname
    );

    return (
        <div className="development-state-layout">
            <Menu
                items={menuItems}
                selectedKeys={pathMatch?.params.key ? [pathMatch?.params.key] : []}
                mode="horizontal"
            />
            <div className="detail-container">
                <Routes>
                    <Route
                        path="overview"
                        element={<OverviewLayout />}
                    />
                    <Route
                        path="history"
                        element={<HistoryLayout />}
                    />
                    <Route
                        path="configure"
                        element={<ConfigureLayout />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="overview" />}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default StateLayout;
