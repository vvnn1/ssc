import { Dropdown, MenuProps } from "antd";
import { CaretDownOutlined, CheckOutlined, LogoutOutlined, TranslationOutlined, UserOutlined } from "../Icon";
import "./index.sass";
import { useHref } from "react-router-dom";

const UserDropdown = () => {
    const items: MenuProps["items"] = [
        {
            label: (
                <>
                    <div className="title">当前账号</div>
                    <div className="username">1494641150039679</div>
                </>
            ),
            key: "-1",
            className: "account-information",
        },
        {
            type: "divider",
        },
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
                <a href={useHref("/profile/namespaces")}>
                    <TranslationOutlined />
                    <span>系统语言</span>
                </a>
            ),
            key: "1",
            children: [
                {
                    key: "1-0",
                    label: (
                        <>
                            简体中文 <CheckOutlined style={{ color: "green" }} />
                        </>
                    ),
                },
                {
                    key: "1-1",
                    label: "English",
                },
            ],
        },
        {
            type: "divider",
        },
        {
            label: (
                <a href="https://www.aliyun.com">
                    <LogoutOutlined />
                    <span>注销</span>
                </a>
            ),
            key: "2",
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
