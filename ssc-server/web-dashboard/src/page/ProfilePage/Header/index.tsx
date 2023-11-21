import { Button } from "antd";
import { ArrowLeftOutlined } from "../../../component/Icon";
import "./index.sass";
import UserDropdown from "../../../component/UserDropdown";
import TopHeader from "../../../component/TopHeader";
import { useHref } from "react-router-dom";

const Header = () => {
    return (
        <TopHeader
            leftNode={
                <Button
                    type="link"
                    size="small"
                    icon={<ArrowLeftOutlined />}
                    href={useHref("/workspace/:workspace/namespace/:namespace/dashboard")}
                >
                    返回
                </Button>
            }
            rightNode={<UserDropdown />}
        />
    );
};

export default Header;
