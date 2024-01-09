import { Button, Divider, Space, Tabs, TabsProps } from "antd";
import "./index.sass";
import { BuildOutlined, CancelCircleFilled } from "../../../../../component/Icon";
import ConfigurationLayout from "./ConfigurationLayout";
import { Navigate, Route, Routes, matchPath, useLocation, useNavigate } from "react-router-dom";
import AlarmLayout from "./AlarmLayout";
import DiagnosisLayout from "./DiagnosisLayout";
import AutopilotLayout from "./AutopilotLayout";
import ExplorationLayout from "./ExplorationLayout";
import StateLayout from "./StateLayout";
import EventLayout from "./EventLayout";
import ChartLayout from "./ChartLayout";
import OverviewLayout from "./OverviewLayout";
import { useMineNavigate } from "../../../../../util/navigate";
import MineNavigate from "../../../../../component/MineNavigate";

const menuItems: TabsProps["items"] = [
    {
        label: "部署详情",
        key: "configuration",
        children: "../configuration",
    },
    {
        label: "状态总览",
        key: "overview",
        children: "../overview",
    },
    {
        label: "数据曲线",
        key: "charts",
        children: "../charts",
    },
    {
        label: "运行事件",
        key: "events",
        children: "../events",
    },
    {
        label: "状态集管理",
        key: "states",
        children: "../states/overview",
    },
    {
        label: "作业探查",
        key: "exploration",
        children: "../exploration/running",
    },
    {
        label: "自动调优",
        key: "autopilot",
        children: "../autopilot",
    },
    {
        label: "智能诊断",
        key: "diagnosis",
        children: "../diagnosis",
    },
    {
        label: "告警配置",
        key: "alarm",
        children: "../alarm/events",
    },
];

const JobDetailLayout = () => {
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
        <div className="job-detail-layout">
            <div className="header">
                <div className="title">
                    <div className="name">
                        <BuildOutlined /> Untitled-stream-sql
                    </div>
                    <div className="status">
                        <CancelCircleFilled />
                        已停止
                    </div>
                </div>
                <div className="actions">
                    <Space
                        split={<Divider type="vertical" />}
                        size={4}
                    >
                        <Button type="link">启动</Button>
                        <Button type="link">创建快照</Button>
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
                    defaultActiveKey={pathMatch?.params.key}
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
                            path="charts"
                            element={<ChartLayout />}
                        />
                        <Route
                            path="events"
                            element={<EventLayout />}
                        />
                        <Route path="states">
                            <Route
                                path="*"
                                element={<StateLayout />}
                            />
                        </Route>
                        <Route path="exploration">
                            <Route
                                path="*"
                                element={<ExplorationLayout />}
                            />
                        </Route>
                        <Route
                            path="autopilot"
                            element={<AutopilotLayout />}
                        />
                        <Route
                            path="diagnosis"
                            element={<DiagnosisLayout />}
                        />
                        <Route path="alarm">
                            <Route
                                path="*"
                                element={<AlarmLayout />}
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

export default JobDetailLayout;
