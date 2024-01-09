import { Navigate, NavigateProps, Path, parsePath, useLocation } from "react-router-dom";

const MineNavigate = (props: NavigateProps) => {
    const { search } = useLocation();
    let path: Partial<Path>;
    if (typeof props.to === "string") {
        path = parsePath(props.to);
    } else {
        path = props.to;
    }

    if (path.search) {
        path.search += "&" + search.slice(1);
    } else {
        path.search = search;
    }

    return (
        <Navigate
            {...props}
            to={path}
        />
    );
};

export default MineNavigate;
