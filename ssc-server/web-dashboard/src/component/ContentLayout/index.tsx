import { Route, Routes } from "react-router-dom";
import ArchiveLayout from "./ArchiveLayout";
import ConfigurationLayout from "./ConfigurationLayout";
import DashboardLayout from "./DashboardLayout";
import DataConnectLayout from "./DataConnectLayout";
import DraftLayout from "./DraftLayout";
import MetaLayout from "./MetaLayout";
import OperationLayout from "./OperationLayout";
import JobDetailLayout from "./OperationLayout/JobDetailLayout";
import ResourceLayout from "./ResourceLayout";
import SecurityLayout from "./SecurityLayout";
import SessionClusterLayout from "./SessionClusterLayout";
import SessionCreateLayout from "./SessionClusterLayout/SessionCreateLayout";
import SessionDetailLayout from "./SessionClusterLayout/SessionDetailLayout";
import SessionEditorLayout from "./SessionClusterLayout/SessionEditorLayout";
import DocumentLayout from "../DocumentLayout";
import { FileSearchOutlined } from "../Icon";
import { FloatButton } from "antd";
import { createContext, useState } from "react";


export const DocumentContext = createContext((open:boolean) => {});

const ContentLayout = () => {
    const [open, setOpen] = useState<boolean>(false);

    const changeDocumentOpen = (open:boolean) => {
        return () => {
            setOpen(open);
        }
    }

    return (
        <DocumentContext.Provider value={setOpen}>
            <Routes>
                <Route path="dashboard" element={<DashboardLayout />} />
                <Route path="draft/*" element={<DraftLayout />} />
                <Route path="operations">
                    <Route path=":jobType">
                        <Route path="" element={<OperationLayout />} />
                        <Route path=":jobId">
                            <Route path="*" element={<JobDetailLayout />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="resource" element={<ResourceLayout />} />
                <Route path="connectors">
                    <Route path="*" element={<DataConnectLayout />} />
                </Route>
                <Route path="metadata">
                    <Route path="*" element={<MetaLayout />} />
                </Route>
                <Route path="session-clusters">
                    <Route path="list" element={<SessionClusterLayout />} />
                    <Route path="create-session-cluster" element={<SessionCreateLayout />} />
                    <Route path=":sessionName">
                        <Route path="configure" element={<SessionEditorLayout />} />
                        <Route path="*" element={<SessionDetailLayout />} />
                    </Route>
                </Route>
                <Route path="security">
                    <Route path="*" element={<SecurityLayout />} />
                </Route>
                <Route path="configurations">
                    <Route path="*" element={<ConfigurationLayout />} />
                </Route>
                <Route path="migration" element={<ArchiveLayout />} />
            </Routes>

            <FloatButton type="primary" icon={<FileSearchOutlined />} onClick={changeDocumentOpen(true)}/>
            <DocumentLayout open={open} onCancel={changeDocumentOpen(false)}/>
        </DocumentContext.Provider>

    )
}

export default ContentLayout;