import { Select } from "antd";
import "./index.sass";
import TaskManagerTable from "./TaskManagerTable";
import { Route, Routes, useParams } from "react-router-dom";
import LogDetailLayout from "../LogDetailLayout";

const TaskManagerList = () => {
    const {tmId} = useParams();

    return (
        <div className="job-detail-exploration-tm-list">
            <div className="breadcrumb">
                <span>当前 TaskManager : </span>
                <Select
                    size='small'
                    showSearch
                    popupClassName='small'
                    options={[
                        {
                            label: "job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1",
                            value: "job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1"
                        }
                    ]}
                    popupMatchSelectWidth={370}
                    defaultValue={tmId}
                />
            </div>
            <div className="container">
                <Routes>
                    <Route path='' element={<TaskManagerTable />} />
                    <Route path=':logName' element={<LogDetailLayout />} />
                </Routes>
            </div>
        </div>
    );
};

export default TaskManagerList;