import { Menu, MenuProps } from "antd";
import "./index.sass";
import MyLink from "../../../../../../component/MyLink";
import { Route, Routes, matchPath, useLocation } from "react-router-dom";
import RuntimeLogLayout from "./RuntimeLogLayout";
import LaunchLogLayout from "./LaunchLogLayout";
import ExceptionLayout from "./ExceptionLayout";
import RunDefaultNavigate from "./RuntimeLogLayout/RunDefaultNavigate";

const items: MenuProps["items"] = [
    {
        label: (
            <MyLink
                to="../running"
                withSearch
            >
                运行日志
            </MyLink>
        ),
        key: "running",
    },
    {
        label: (
            <MyLink
                to="../starting"
                withSearch
            >
                启动日志
            </MyLink>
        ),
        key: "starting",
    },
    {
        label: (
            <MyLink
                to="../exceptions"
                withSearch
            >
                异常信息
            </MyLink>
        ),
        key: "exceptions",
    },
];
const ExplorationLayout = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath(
        "/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/:jobId/:detailTab/:key/*",
        pathname
    );

    return (
        <div className="batch-exploration-layout">
            <Menu
                className="vertical-mode"
                mode="inline"
                items={items}
                defaultSelectedKeys={pathMatch?.params.key ? [pathMatch?.params.key] : []}
            />
            <Routes>
                <Route
                    path="running"
                    element={<RunDefaultNavigate />}
                >
                    <Route path="archives">
                        <Route
                            path="*"
                            element={<RuntimeLogLayout />}
                        />
                    </Route>
                </Route>

                <Route
                    path="starting"
                    element={<LaunchLogLayout />}
                />
                <Route
                    path="exceptions"
                    element={<ExceptionLayout />}
                />
            </Routes>
        </div>
    );
};

export default ExplorationLayout;