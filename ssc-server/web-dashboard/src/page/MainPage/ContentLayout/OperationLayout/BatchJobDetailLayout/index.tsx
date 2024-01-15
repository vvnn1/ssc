import { Button, Divider, Space, Tabs, TabsProps } from "antd";
import { CloseCircleFilled, DeploymentUnitOutlined } from "../../../../../component/Icon";
import "./index.sass";
import { Route, Routes, matchPath, useLocation } from "react-router-dom";
import { useMineNavigate } from "../../../../../util/navigate";
import ConfigurationLayout from "./ConfigurationLayout";
import OverviewLayout from "./OverviewLayout";
import EventLayout from "./EventLayout";
import ExplorationLayout from "./ExplorationLayout";
import MineNavigate from "../../../../../component/MineNavigate";

const menuItems: TabsProps["items"] = [
    {
        label: "作业配置",
        key: "configuration",
        children: "../configuration",
    },
    {
        label: "状态总览",
        key: "overview",
        children: "../overview",
    },
    {
        label: "运行事件",
        key: "events",
        children: "../events",
    },
    {
        label: "作业探查",
        key: "exploration",
        children: "../exploration/running",
    },
];

const BatchJobDetailLayout = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath(
        "/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/:jobId/:key/*",
        pathname
    );
    const navigate = useMineNavigate();

    const onTabClick: TabsProps["onTabClick"] = activeKey => {
        const link = menuItems.find(item => item.key === activeKey)?.children as string;
        navigate(link);
    };

    return (
        <div className="batch-job-detail-layout">
            <div className="header">
                <div className="title">
                    <div className="name">
                        <DeploymentUnitOutlined />
                        Untitled-Batch-sql
                    </div>
                    <div className="status">
                        <CloseCircleFilled className="FAILED" />
                        已失败
                    </div>
                </div>
                <div className="actions">
                    <Space
                        split={<Divider type="vertical" />}
                        size={4}
                    >
                        <Button type="link">停止</Button>
                        <Button
                            type="link"
                            danger
                        >
                            删除
                        </Button>
                    </Space>
                </div>
            </div>
            <div className="content">
                <Tabs
                    items={menuItems}
                    activeKey={pathMatch?.params.key}
                    onTabClick={onTabClick}
                />
                <div className="detail-router">
                    <Routes>
                        <Route
                            path="configuration"
                            element={<ConfigurationLayout />}
                        />
                        <Route
                            path="overview"
                            element={<OverviewLayout />}
                        />
                        <Route
                            path="events"
                            element={<EventLayout />}
                        />

                        <Route path="exploration">
                            <Route
                                path="*"
                                element={<ExplorationLayout />}
                            />
                        </Route>
                        <Route
                            path="*"
                            element={<MineNavigate to="configuration" />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default BatchJobDetailLayout;
