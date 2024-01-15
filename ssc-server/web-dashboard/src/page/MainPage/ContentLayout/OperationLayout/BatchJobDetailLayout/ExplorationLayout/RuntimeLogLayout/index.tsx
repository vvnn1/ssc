import { MenuProps } from "antd";
import "./index.sass";
import TabMenu from "../../../../../../../component/TabMenu";
import { Route, Routes } from "react-router-dom";
import MyLink from "../../../../../../../component/MyLink";
import JobManagerLogTable from "./JobManagerLogTable";
import LogDetailLayout from "./LogDetailLayout";
import TaskManagerList from "./TaskManagerList";
import TmIdNavigate from "./TaskManagerList/TmIdNavigate";
import MineNavigate from "../../../../../../../component/MineNavigate";

const menuItems: MenuProps["items"] = [
    {
        key: "jobmanager",
        label: (
            <MyLink
                to="../jobmanager"
                withSearch
            >
                Job Manager
            </MyLink>
        ),
    },
    {
        key: "taskmanagers",
        label: (
            <MyLink
                to="../taskmanagers"
                withSearch
            >
                Task Managers
            </MyLink>
        ),
    },
];

const RuntimeLogLayout = () => {
    return (
        <div className="batch-runtime-log-layout">
            <div className="content">
                <TabMenu
                    menuItems={menuItems}
                    keyPath="/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/:jobId/:detailTab/:subTab/archives/:key/*"
                />
                <div className="tab-content">
                    <Routes>
                        <Route path="jobmanager">
                            <Route
                                path=""
                                element={<JobManagerLogTable />}
                            />
                            <Route
                                path=":logName"
                                element={<LogDetailLayout />}
                            />
                        </Route>
                        <Route
                            path="taskmanagers"
                            element={<TmIdNavigate />}
                        >
                            <Route
                                path=":tmId/*"
                                element={<TaskManagerList />}
                            />
                        </Route>
                        <Route
                            path="*"
                            element={<MineNavigate to="jobmanager" />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default RuntimeLogLayout;
