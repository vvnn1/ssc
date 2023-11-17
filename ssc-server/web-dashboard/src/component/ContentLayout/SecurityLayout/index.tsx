import { MenuProps } from "antd";
import "./index.sass";
import MemberLayout from "./MemberLayout";
import SecretLayout from "./SecretLayout";
import { Route, Routes } from "react-router-dom";
import MyLink from "../../MyLink";
import TabMenu from "../../TabMenu";
import KerberoLayout from "./KerberoLayout";

const menuItems: MenuProps["items"] = [
    {
        label: <MyLink to="member">成员管理</MyLink>,
        key: "member",
    },
    {
        label: <MyLink to="kerbero">Hive Kerberos</MyLink>,
        key: "kerbero",
    },
    {
        label: <MyLink to="secret">密钥托管</MyLink>,
        key: "secret",
    },
];

const SecurityLayout = () => {
    return (
        <div className="security-layout">
            <div className="header">
                <div className="title">安全中心</div>
            </div>
            <div className="content">
                <TabMenu
                    menuItems={menuItems}
                    keyPath="/workspace/:workspaceId/namespace/:namespaceId/security/:key"
                />
                <div className="content-container">
                    <Routes>
                        <Route
                            path="member"
                            element={<MemberLayout />}
                        />
                        <Route
                            path="kerbero"
                            element={<KerberoLayout />}
                        />
                        <Route
                            path="secret"
                            element={<SecretLayout />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default SecurityLayout;
