import { Menu, MenuProps } from "antd";
import "./index.sass";
import MetricLayout from "./MetricLayout";
import ConfigurationLayout from "./ConfigurationLayout";
import LogLayout from "./LogLayout";
import LogListLayout from "./LogListLayout";
import StdoutLayout from "./StdoutLayout";
import { Route, Routes, matchPath, useLocation } from "react-router-dom";
import MyLink from "../../../../../../component/MyLink";
import LogDetailLayout from "./LogListLayout/LogDetailLayout";

const items: MenuProps["items"] = [
    {
        label: <MyLink to="metrics">Metrics</MyLink>,
        key: "metrics",
    },
    {
        label: <MyLink to="configuration">配置</MyLink>,
        key: "configuration",
    },
    {
        label: <MyLink to="logs">日志</MyLink>,
        key: "logs",
    },
    {
        label: <MyLink to="stdout">Stdout</MyLink>,
        key: "stdout",
    },
    {
        label: <MyLink to="log-list">日志列表</MyLink>,
        key: "log-list",
    },
];

const JobManagerLayout = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath(
        "/workspace/:workspaceId/namespace/:namespaceId/session-clusters/:sessionName/jobmanager/:key",
        pathname
    );

    return (
        <div className="session-jobmanager-layout">
            <Menu
                className="jobmanager-menu"
                selectedKeys={pathMatch?.params.key ? [pathMatch?.params.key] : []}
                mode="horizontal"
                items={items}
            />
            <div className="jobmanager-content">
                <Routes>
                    <Route
                        path="metrics"
                        element={<MetricLayout />}
                    />
                    <Route
                        path="configuration"
                        element={<ConfigurationLayout />}
                    />
                    <Route
                        path="logs"
                        element={<LogLayout />}
                    />
                    <Route
                        path="stdout"
                        element={<StdoutLayout />}
                    />
                    <Route path="log-list">
                        <Route
                            path=""
                            element={<LogListLayout />}
                        />
                        <Route
                            path=":logName"
                            element={<LogDetailLayout />}
                        />
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default JobManagerLayout;
