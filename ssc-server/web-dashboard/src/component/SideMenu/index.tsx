import { ConfigProvider, Menu, MenuProps } from "antd";
import "./index.sass";

const SideMenu = (props: MenuProps) => {
    return (
        <Menu
            {...props}
            className={props.className ? `side-menu ${props.className}` : "side-menu"}
        />
    );
};

export default SideMenu;
