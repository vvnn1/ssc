import { Link, LinkProps, Path, parsePath, useLocation, useParams } from "react-router-dom";
import { restoreUrl } from "../../util";
import qs from "querystring";

const MyLink = (props: LinkProps & React.RefAttributes<HTMLAnchorElement> & { withSearch?: boolean }) => {
    const urlParams = useParams();
    const { search } = useLocation();

    let path: Partial<Path>;
    if (typeof props.to === "string") {
        path = parsePath(props.to);
    } else {
        path = props.to;
    }

    if (props.withSearch) {
        if (path.search) {
            const reBuildSearch = {
                ...qs.parse(search.slice(1)),
                ...qs.parse(path.search.slice(1)),
            };
            path.search = "?" + qs.stringify(reBuildSearch);
        } else {
            path.search = search;
        }
    }

    if (path.pathname) {
        path.pathname = restoreUrl(path.pathname, urlParams); //generatePath
    }

    return (
        <Link
            {...props}
            to={path}
        ></Link>
    );
};

export default MyLink;
