import React from "react";
import { MenuProps } from "antd";
import "./index.sass";
import {
    HomeOutlined,
    ConsoleSqlOutlined,
    BuildOutlined,
    FileZipOutlined,
    ShareAltOutlined,
    DatabaseOutlined,
    ClusterOutlined,
    SafetyOutlined,
    ControlOutlined,
} from "../../../component/Icon";
import MyLink from "../../../component/MyLink";
import { matchPath, useLocation } from "react-router-dom";
import SideMenu from "../../../component/SideMenu";
import MenuSider from "../../../component/MenuSider";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<MyLink to="dashboard">系统概览</MyLink>, "dashboard", <HomeOutlined />),
    getItem(<MyLink to="draft">SQL开发</MyLink>, "draft", <ConsoleSqlOutlined />),
    getItem(<MyLink to="operations/stream">作业运维</MyLink>, "operations", <BuildOutlined />),
    getItem(<MyLink to="resource">资源管理</MyLink>, "resource", <FileZipOutlined />),
    getItem(<MyLink to="connectors/connector">数据连接</MyLink>, "connectors", <ShareAltOutlined />),
    getItem(<MyLink to="metadata/list">元数据管理</MyLink>, "metadata", <DatabaseOutlined />),
    getItem(<MyLink to="session-clusters/list">Session 集群</MyLink>, "session-clusters", <ClusterOutlined />),
    getItem(<MyLink to="security/member">安全中心</MyLink>, "security", <SafetyOutlined />),
    getItem(<MyLink to="configurations/deployment-defaults">配置管理</MyLink>, "configurations", <ControlOutlined />),
];

const Sider = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath("/workspace/:workspaceId/namespace/:namespaceId/:key/*", pathname);

    return (
        <MenuSider>
            {collapsed => (
                <>
                    <SideMenu
                        mode="inline"
                        items={items}
                        inlineIndent={12}
                        selectedKeys={pathMatch?.params.key ? [pathMatch?.params.key] : []}
                    />
                    {collapsed ? null : (
                        <div className="compute_resource">
                            <div className="cpu">
                                CPU
                                <div className="value">0 / -</div>
                                <div className="progress"></div>
                            </div>
                            <div className="memory">
                                Memory
                                <div className="value">0 iB / -</div>
                                <div
                                    className="progress"
                                    style={{ width: "0%" }}
                                ></div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </MenuSider>
    );
};

export default Sider;
