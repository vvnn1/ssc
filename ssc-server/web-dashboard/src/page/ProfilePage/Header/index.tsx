import { Button } from "antd";
import { ArrowLeftOutlined } from "../../../component/Icon";
import "./index.sass";
import UserDropdown from "../../../component/UserDropdown";
import TopHeader from "../../../component/TopHeader";
import { useHref, useParams } from "react-router-dom";
import { restoreUrl } from "../../../util";

const Header = () => {
    const params = useParams();
    return (
        <TopHeader
            leftNode={
                <Button
                    type="link"
                    size="small"
                    icon={<ArrowLeftOutlined />}
                    href={useHref(restoreUrl("/workspace/:workspaceId/namespace/:namespaceId/dashboard", params))}
                >
                    返回
                </Button>
            }
            rightNode={<UserDropdown />}
        />
    );
};

export default Header;
