import { Breadcrumb, Descriptions, DescriptionsProps, Menu, MenuProps } from "antd";
import { DownOutlined, LeftSquareFilled, UpOutlined } from "../../../../../../../component/Icon";
import "./index.sass";
import MyLink from "../../../../../../../component/MyLink";
import MetricLayout from "./MetricLayout";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import LogLayout from "./LogLayout";
import ThreadDumpLayout from "./ThreadDumpLayout";
import StdoutLayout from "./StdoutLayout";
import LogListLayout from "./LogListLayout";
import LogDetailLayout from "./LogListLayout/LogDetailLayout";

const items: DescriptionsProps["items"] = [
    {
        key: "1",
        label: "Path",
        children: "akka.tcp://flink@192.168.12.8:36357/user/rpc/taskmanager_0",
        span: 2,
    },
    {
        key: "2",
        label: "Free/All Slots",
        children: "1 / 1",
    },
    {
        key: "3",
        label: "Last Heartbeat",
        children: "09-12 16:39:19",
    },
    {
        key: "4",
        label: "Data Port",
        children: "44535",
    },
    {
        key: "5",
        label: "CPU Cores",
        children: "2",
    },
    {
        key: "6",
        label: "Physical Memory",
        children: "8.25 GB",
    },
    {
        key: "7",
        label: "JVM Heap Size",
        children: "3.34 GB",
    },
    {
        key: "8",
        label: "Flink Managed Memory",
        children: "2.78 GB",
    },
];

const items2: MenuProps["items"] = [
    {
        label: <MyLink to="metrics">Metrics</MyLink>,
        key: "metrics",
    },
    {
        label: <MyLink to="logs">日志</MyLink>,
        key: "logs",
    },
    {
        label: <MyLink to="thread-dump">Thread Dump</MyLink>,
        key: "thread-dump",
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

const TaskManagerDetailLayout = () => {
    const taskManagerName = "192.168.12.8:36357-4bc04f";

    const [selectedKeys, setSelectKeys] = useState<string[]>([]);
    const [showDescription, setShowDescription] = useState<boolean>(true);
    const { pathname } = useLocation();

    useEffect(() => {
        const defaultSelectedKey: string[] = [];
        const pathMatch = matchPath(
            "/workspace/:workspaceId/namespace/:namespaceId/session-clusters/debug-session/taskmanager/:taskmanager/:key",
            pathname
        );
        if (pathMatch?.params.key) {
            defaultSelectedKey.push(pathMatch.params.key);
        }

        setSelectKeys(defaultSelectedKey);
    }, [pathname]);

    const onClick: MenuProps["onClick"] = e => {
        setSelectKeys([e.key]);
    };

    const switchDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        <div className="taskmanager-detail-layout">
            <div className="taskmanager-breadcrumb">
                <Breadcrumb
                    items={[
                        {
                            title: (
                                <>
                                    <LeftSquareFilled /> TaskManagers
                                </>
                            ),
                        },
                        {
                            title: taskManagerName,
                        },
                    ]}
                />
                {showDescription ? (
                    <DownOutlined
                        className="toggle-overview"
                        onClick={switchDescription}
                    />
                ) : (
                    <UpOutlined
                        className="toggle-overview"
                        onClick={switchDescription}
                    />
                )}
            </div>
            {showDescription ? (
                <Descriptions
                    bordered
                    items={items}
                    size="small"
                />
            ) : null}
            <div className="taskmanager-detail-container">
                <Menu
                    className="taskmanager-menu"
                    onClick={onClick}
                    selectedKeys={selectedKeys}
                    mode="horizontal"
                    items={items2}
                />
                <div className="taskmanager-content">
                    <Routes>
                        <Route
                            path="metrics"
                            element={<MetricLayout />}
                        />
                        <Route
                            path="logs"
                            element={<LogLayout />}
                        />
                        <Route
                            path="thread-dump"
                            element={<ThreadDumpLayout />}
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
                        <Route
                            path="*"
                            element={<Navigate to="metrics" />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default TaskManagerDetailLayout;
