import Layout, { Content } from "antd/es/layout/layout"
import './index.sass'
import MenuSider from "../../component/MenuSider"
import TopHeader from "../../component/TopHeader"
import ResourceLayout from "../../component/ContentLayout/ResourceLayout"
import DashboardLayout from "../../component/ContentLayout/DashboardLayout"
import DataConnectLayout from "../../component/ContentLayout/DataConnectLayout"
import SecurityLayout from "../../component/ContentLayout/SecurityLayout"
import ConfigurationLayout from "../../component/ContentLayout/ConfigurationLayout"
import { Route, Routes } from "react-router-dom"
import SessionClusterLayout from "../../component/ContentLayout/SessionClusterLayout"
import DraftLayout from "../../component/ContentLayout/DraftLayout"
import MetaLayout from "../../component/ContentLayout/MetaLayout"
import ArchiveLayout from "../../component/ContentLayout/ArchiveLayout"
import OperationLayout from "../../component/ContentLayout/OperationLayout"
import SessionCreateLayout from "../../component/ContentLayout/SessionClusterLayout/SessionCreateLayout"
import SessionDetailLayout from "../../component/ContentLayout/SessionClusterLayout/SessionDetailLayout"
import SessionEditorLayout from "../../component/ContentLayout/SessionClusterLayout/SessionEditorLayout"
import JobDetailLayout from "../../component/ContentLayout/OperationLayout/JobDetailLayout"

const MainPage = (): React.ReactElement => {
    return (
        <Layout className="base-layout">
            <TopHeader />
            <Layout hasSider>
                <MenuSider />
                <Content>
                    <Routes>
                        <Route path="dashboard" element={<DashboardLayout />} />
                        <Route path="draft/*"  element={<DraftLayout />} />
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
                        <Route path="metadata" element={<MetaLayout />} />
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
                </Content>
            </Layout>
        </Layout>
    )
};

export default MainPage;