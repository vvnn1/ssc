import { Route, Routes, useParams, useHref } from "react-router-dom";
import { ArrowLeftOutlined, CheckCircleFilled } from "../../../Icon";
import TabMenu from "../../../TabMenu";
import { Button, Divider, MenuProps, Popconfirm, Space } from "antd";
import MyLink from "../../../MyLink";
import './index.sass'
import OverviewLayout from "./OverviewLayout";
import ScrollPin from "../../../ScrollPin";
import { useRef, useState } from "react";
import EventLayout from "./EventLayout";
import JobManagerLayout from "./JobManagerLayout";
import TaskManagerLayout from "./TaskManagerLayout";
import TaskManagerDetailLayout from "./TaskManagerLayout/TaskManagerDetailLayout";
import StopModal from "../StopModal";

const menuItems: MenuProps['items'] = [
    {
        label: <MyLink to='overview'>集群总览</MyLink>,
        key: 'overview',
    },
    {
        label: <MyLink to='event'>运行事件</MyLink>,
        key: 'event',
    },
    {
        label: <MyLink to='jobmanager/metrics'>Job Manager</MyLink>,
        key: 'jobmanager',
    },
    {
        label: <MyLink to='taskmanager'>Task Manager</MyLink>,
        key: 'taskmanager',
    },
];

const SessionDetailLayout = () => {
    const { sessionName } = useParams();
    const contentRef = useRef<HTMLDivElement>(null);
    const [stopModalOpen, setStopModalOpen] = useState<boolean>(false);

    const changeStopModalOpen = (open: boolean) => {
        return () => {
            setStopModalOpen(open);
        }
    }

    return (
        <div className="session-detail-layout">
            <div className="header">
                <div className="title">
                    <MyLink className="left-arrow" to={'../../list'}>
                        <ArrowLeftOutlined />
                    </MyLink>

                    {sessionName}
                </div>
                <div className="extra">
                    <div className="status">
                        <CheckCircleFilled /> 运行中
                    </div>
                    <div className="actions">
                        <Space split={<Divider type="vertical" />} size={0}>
                            <Button type="link" size="small">启动</Button>
                            <Button type="link" size="small" onClick={changeStopModalOpen(true)}>停止</Button>
                            <Button type="link" size="small" href={useHref('configure')}>编辑</Button>
                            <Popconfirm
                                title="确定删除这个 Session 集群？"
                                onConfirm={() => { }}
                                onCancel={() => { }}
                                okText="确认"
                                cancelText="取消"
                                overlayClassName="ant-popover-rtl"
                                placement="left"
                            >
                                <Button type="link" size="small" danger>删除</Button>
                            </Popconfirm>


                        </Space>
                    </div>
                </div>

            </div>
            <div className="content">
                <div className="session-cluster-detail-navigator">
                    <TabMenu menuItems={menuItems} keyPath={`/workspace/:workspaceId/namespace/:namespaceId/session-clusters/${sessionName}/:key/*`} />
                </div>
                <ScrollPin containerRef={contentRef} />
                <div className="content-container" ref={contentRef}>
                    <Routes>
                        <Route>
                            <Route path="overview" element={<OverviewLayout />} />
                            <Route path="event" element={<EventLayout />} />
                            <Route path="jobmanager">
                                <Route path="*" element={<JobManagerLayout />} />
                            </Route>
                            <Route path="taskmanager">
                                <Route path="" element={<TaskManagerLayout />} />
                                <Route path=":taskmanager">
                                    <Route path="*" element={<TaskManagerDetailLayout />} />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </div>
            </div>
            <StopModal open={stopModalOpen} onCancel={changeStopModalOpen(false)} />
        </div>
    )
};


export default SessionDetailLayout;