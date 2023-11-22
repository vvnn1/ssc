import { Navigate, Outlet, matchPath, useLocation } from "react-router-dom";

const RunIdNavigate = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath(
        "/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/:jobId/exploration/running/:runId/archives/*",
        pathname
    );
    return pathMatch?.params.runId ? (
        <Outlet />
    ) : (
        <Navigate to="0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f/archives/jobmanager" />
    );
};

export default RunIdNavigate;