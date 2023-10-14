import { Select, Tooltip } from 'antd';
import './index.sass'
import { CopyOutlined } from '../../../../../Icon';
import TabMenu from '../../../../../TabMenu';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, matchPath, useLocation, useNavigate, useParams } from 'react-router-dom';
import MyLink from '../../../../../MyLink';
import JobManagerLogTable from './JobManagerLogTable';
import LogDetailLayout from './LogDetailLayout';
import TaskManagerList from './TaskManagerList';
import TmIdNavigate from './TaskManagerList/TmIdNavigate';

interface RunningHistory {
    id: string;
    date: string;
}


const RuntimeLogLayout = () => {
    const [runningHistory, setRunningHistory] = useState<RunningHistory[]>([]);
    const {runId} = useParams();
    useEffect(() => {
        setRunningHistory(
            [
                {
                    id: '0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f',
                    date: '2023-09-27 09:52:00'
                },
                {
                    id: '4b66c06e-8f23-4517-9d00-010c4e6ed2ce',
                    date: '2023-09-26 17:46:31'
                }
            ]
        );
    }, []);

    return (
        <div className="runtime-log-layout">
            <div className="header">
                <span>
                    作业&nbsp;:&nbsp;
                    <Select
                        size='small'
                        popupClassName='small'
                        optionLabelProp='echo'
                        options={[
                            {
                                label: '历史运行作业',
                                options: [
                                    {
                                        label: (
                                            <>
                                                启动时间 : 2023-09-27 09:52:00
                                                <small className="nz-option-description with-tag ng-star-inserted">0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f</small>
                                            </>
                                        ),
                                        value: '0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f',
                                        echo: '2023-09-27 09:52:00'

                                    },
                                    {
                                        label: (
                                            <>
                                                启动时间 : 2023-09-26 17:46:31
                                                <small className="nz-option-description with-tag ng-star-inserted">4b66c06e-8f23-4517-9d00-010c4e6ed2ce</small>
                                            </>
                                        ),
                                        value: '4b66c06e-8f23-4517-9d00-010c4e6ed2ce',
                                        echo: '2023-09-26 17:46:31'
                                    }
                                ]
                            }
                        ]}
                        defaultValue={runId}

                    />
                    <Tooltip title="0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f">
                        <CopyOutlined />
                    </Tooltip>
                </span>
            </div>
            <div className="content">
                <TabMenu
                    menuItems={[
                        {
                            key: 'jobmanager',
                            label: <MyLink to="jobmanager">Job Manager</MyLink>
                        },
                        {
                            key: 'taskmanagers',
                            label: <MyLink to="taskmanagers">Task Managers</MyLink>
                        }
                    ]}
                    keyPath='/workspace/:workspace/namespace/:namespace/operations/:jobType/:jobId/:detailTab/:subTab/:runId/archives/:key/*'
                />
                <div className="tab-content">
                    <Routes>
                        <Route path="jobmanager">
                            <Route path='' element={<JobManagerLogTable />} />
                            <Route path=':logName' element={<LogDetailLayout />} />
                        </Route>
                        <Route path="taskmanagers" element={<TmIdNavigate />}>
                            <Route path=':tmId/*' element={<TaskManagerList />} />
                        </Route>
                    </Routes>
                </div>


            </div>
        </div>
    )
};

export default RuntimeLogLayout;