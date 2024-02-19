import { Outlet, matchPath, useLocation } from "react-router-dom";
import MineNavigate from "../../../../../../../component/MineNavigate";

const RunIdNavigate = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath(
        "/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/:jobId/exploration/running",
        pathname
    );
    return pathMatch ? <MineNavigate to="archives/jobmanager" /> : <Outlet />;
};

export default RunIdNavigate;
