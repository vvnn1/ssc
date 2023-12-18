import { Layout } from "antd";
import { ProjectLogoOutlined } from "../Icon";
import "./index.sass";
import { useNavigate, useParams } from "react-router-dom";
import { restoreUrl } from "../../util";

const { Header } = Layout;

interface TopHeaderProps {
    leftNode?: React.ReactNode;
    rightNode?: React.ReactNode;
}

const TopHeader = (props: TopHeaderProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const toHome = () => {
        console.log(params);
        navigate(restoreUrl("/workspace/:workspaceId/namespace/:namespaceId/dashboard", params));
    };

    return (
        <Header className="layout-header">
            <div
                className="header-logo"
                onClick={toHome}
            >
                <div className="logo">
                    <span className="avatar">
                        <ProjectLogoOutlined />
                    </span>
                    <div
                        className="star-inserted"
                        style={{
                            WebkitMaskImage: `url(${process.env.PUBLIC_URL}/image/platform-logo.svg)`,
                        }}
                    ></div>
                </div>
            </div>
            <div className="header-menu">
                <div className="left">{props.leftNode}</div>
                <div className="right">{props.rightNode}</div>
            </div>
        </Header>
    );
};

export default TopHeader;
