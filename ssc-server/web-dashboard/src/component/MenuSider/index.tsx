import { useState } from "react";
import "./index.sass";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const { Sider } = Layout;

interface MenuSiderProps {
    children: (collapsed: boolean) => React.ReactNode;
}

const MenuSider = (props: MenuSiderProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <Sider
            className="sider-layout"
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            collapsedWidth={64}
        >
            {props.children(collapsed)}
        </Sider>
    );
};

export default MenuSider;
