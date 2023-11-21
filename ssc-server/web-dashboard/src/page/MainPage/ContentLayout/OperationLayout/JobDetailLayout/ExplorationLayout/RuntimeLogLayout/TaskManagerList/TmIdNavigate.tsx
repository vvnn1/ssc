import { Navigate, Outlet, matchPath, useLocation } from "react-router-dom";

const TmIdNavigate = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath(
        "/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/:jobId/:detailTab/:subTab/:runId/archives/taskmanagers/:tmId/*",
        pathname
    );

    return pathMatch?.params.tmId ? (
        <Outlet />
    ) : (
        <Navigate to="job-0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f-taskmanager-1-1" />
    );
};

export default TmIdNavigate;
