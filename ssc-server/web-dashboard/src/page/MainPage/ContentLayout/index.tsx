import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ArchiveLayout from "./ArchiveLayout";
import ConfigurationLayout from "./ConfigurationLayout";
import DashboardLayout from "./DashboardLayout";
import DataConnectLayout from "./DataConnectLayout";
import DraftLayout from "./DraftLayout";
import MetaLayout from "./MetaLayout";
import OperationLayout from "./OperationLayout";
import ResourceLayout from "./ResourceLayout";
import SecurityLayout from "./SecurityLayout";
import SessionClusterLayout from "./SessionClusterLayout";
import SessionDetailLoadingLayout from "./SessionClusterLayout/SessionDetailLayout/LoadingLayout";
import SessionCreateLoadingLayout from "./SessionClusterLayout/SessionCreateLayout/LoadingLayout";
import SessionEditorLoadingLayout from "./SessionClusterLayout/SessionEditorLayout/LoadingLayout";
const SessionCreateLayout = lazy(() => import("./SessionClusterLayout/SessionCreateLayout"));
const SessionDetailLayout = lazy(() => import("./SessionClusterLayout/SessionDetailLayout"));
const SessionEditorLayout = lazy(() => import("./SessionClusterLayout/SessionEditorLayout"));

const ContentLayout = () => {
    return (
        <Routes>
            <Route
                path="dashboard"
                element={<DashboardLayout />}
            />
            <Route
                path="draft/*"
                element={<DraftLayout />}
            />
            <Route path="operations">
                <Route
                    path="*"
                    element={<OperationLayout />}
                />
            </Route>
            <Route
                path="resource"
                element={<ResourceLayout />}
            />
            <Route path="connectors">
                <Route
                    path="*"
                    element={<DataConnectLayout />}
                />
            </Route>
            <Route path="metadata">
                <Route
                    path="*"
                    element={<MetaLayout />}
                />
            </Route>
            <Route path="session-clusters">
                <Route
                    path="list"
                    element={<SessionClusterLayout />}
                />
                <Route
                    path="create-session-cluster"
                    element={
                        <Suspense fallback={<SessionCreateLoadingLayout />}>
                            <SessionCreateLayout />
                        </Suspense>
                    }
                />
                <Route path=":sessionName">
                    <Route
                        path="configure"
                        element={
                            <Suspense fallback={<SessionEditorLoadingLayout />}>
                                <SessionEditorLayout />
                            </Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<SessionDetailLoadingLayout />}>
                                <SessionDetailLayout />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
            <Route path="security">
                <Route
                    path="*"
                    element={<SecurityLayout />}
                />
            </Route>
            <Route path="configurations">
                <Route
                    path="*"
                    element={<ConfigurationLayout />}
                />
            </Route>
            <Route
                path="migration"
                element={<ArchiveLayout />}
            />
            <Route
                path="*"
                element={<Navigate to="dashboard" />}
            />
        </Routes>
    );
};

export default ContentLayout;
