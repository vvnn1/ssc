import { Menu, MenuProps } from "antd";
import { matchPath, useLocation } from "react-router-dom";
import "./index.sass";

interface TabMenuProps {
    menuItems: MenuProps["items"];
    keyPath: string;
}

const TabMenu = (props: TabMenuProps) => {
    const { pathname } = useLocation();
    const pathMatch = matchPath(props.keyPath, pathname);

    return (
        <Menu
            className="tab-menu"
            defaultSelectedKeys={pathMatch?.params.key ? [pathMatch.params.key] : []}
            mode="horizontal"
            items={props.menuItems}
        />
    );
};

export default TabMenu;
