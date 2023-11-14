import { Link, LinkProps, useParams } from "react-router-dom";
import { restoreUrl } from "../../util";

const MyLink = (props: LinkProps & React.RefAttributes<HTMLAnchorElement>) => {
    const urlParams = useParams();

    return (
        <Link {...props} to={restoreUrl(props.to as string, urlParams)}></Link>
    );
};

export default MyLink;