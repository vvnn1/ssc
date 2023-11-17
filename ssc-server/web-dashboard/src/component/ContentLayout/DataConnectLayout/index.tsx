import { MenuProps } from "antd";
import "./index.sass";
import { useRef } from "react";
import ConnectorLayout from "./ConnectorLayout";
import DataFormatLayout from "./DataFormatLayout";
import ScrollPin from "../../ScrollPin";
import { Route, Routes } from "react-router-dom";
import MyLink from "../../MyLink";
import TabMenu from "../../TabMenu";

const menuItems: MenuProps["items"] = [
    {
        label: <MyLink to="connector">连接器</MyLink>,
        key: "connector",
    },
    {
        label: <MyLink to="format">数据格式</MyLink>,
        key: "format",
    },
];

const DataConnectLayout = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="connector-layout">
            <div className="header">
                <div className="title">数据连接</div>
            </div>
            <div className="content">
                <TabMenu
                    menuItems={menuItems}
                    keyPath="/workspace/:workspaceId/namespace/:namespaceId/connectors/:key"
                />
                <ScrollPin containerRef={containerRef} />
                <div
                    className="content-container"
                    ref={containerRef}
                >
                    <Routes>
                        <Route
                            path="connector"
                            element={<ConnectorLayout />}
                        />
                        <Route
                            path="format"
                            element={<DataFormatLayout />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default DataConnectLayout;
