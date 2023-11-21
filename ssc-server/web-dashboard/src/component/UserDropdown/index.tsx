import { Dropdown, MenuProps } from "antd";
import { CaretDownOutlined, LogoutOutlined, UserOutlined } from "../Icon";
import "./index.sass";
import { useHref } from "react-router-dom";

const UserDropdown = () => {
    const items: MenuProps["items"] = [
        {
            label: (
                <a href={useHref("/profile/namespaces")}>
                    <UserOutlined />
                    <span>用户信息</span>
                </a>
            ),
            key: "0",
        },
        {
            label: (
                <a href="https://www.aliyun.com">
                    <LogoutOutlined />
                    <span>注销</span>
                </a>
            ),
            key: "1",
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            trigger={["click"]}
            overlayClassName="user-center-dropdown"
        >
            <div className="user-dropdown">
                <div className="avatar"></div>
                <div className="name">1494641150039679</div>
                <CaretDownOutlined />
            </div>
        </Dropdown>
    );
};

export default UserDropdown;
