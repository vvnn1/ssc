import React from "react";
import { MenuProps } from "antd";
import "./index.sass";
import { UnorderedListOutlined, GlobalOutlined, CodeOutlined } from "../../../component/Icon";
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
    getItem(
        "项目空间",
        "project",
        undefined,
        [getItem(<MyLink to="../namespaces">项目空间列表</MyLink>, "namespaces", <UnorderedListOutlined />)],
        "group"
    ),

    getItem(
        "用户设置",
        "setting",
        undefined,
        [
            getItem(<MyLink to="../timezone">时区设置</MyLink>, "timezone", <GlobalOutlined />),
            getItem(<MyLink to="../code-editor">编辑器设置</MyLink>, "code-editor", <CodeOutlined />),
        ],
        "group"
    ),
];

const Sider = () => {
    const { pathname } = useLocation();
    const pathMatch = matchPath("/profile/:key", pathname);
    return (
        <MenuSider>
            {() => (
                <SideMenu
                    mode="inline"
                    items={items}
                    inlineIndent={12}
                    selectedKeys={pathMatch?.params.key ? [pathMatch?.params.key] : []}
                />
            )}
        </MenuSider>
    );
};

export default Sider;
