import { Layout } from "antd";
import { ProjectLogoOutlined } from "../Icon";
import "./index.sass";

const { Header } = Layout;

interface TopHeaderProps {
    leftNode?: React.ReactNode;
    rightNode?: React.ReactNode;
}

const TopHeader = (props: TopHeaderProps) => {
    return (
        <Header className="layout-header">
            <div className="header-logo">
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
