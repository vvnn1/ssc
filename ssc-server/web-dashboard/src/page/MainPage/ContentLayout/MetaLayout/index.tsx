import { Button, Input } from "antd";
import "./index.sass";
import { PlusOutlined, ReloadOutlined, SearchOutlined } from "../../../../component/Icon";
import MetaTree from "../DraftLayout/LeftTabBar/LeftTabPanel/MetaTabPanel/MetaTree";
import ScrollPin from "../../../../component/ScrollPin";
import { useRef } from "react";
import MetaDetailLayout from "./MetaDetailLayout";
import { Route, Routes } from "react-router-dom";
import CatalogDetailLayout from "./CatalogDetailLayout";
import DatabaseDetailLayout from "./DatabaseDetailLayout";
import TableDetailLayout from "./TableDetailLayout";

const MetaLayout = () => {
    const treeContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="meta-layout">
            <div className="panel side panel-ttb">
                <div className="panel-bar header panel panel-ltr">
                    <span className="title">元数据</span>
                    <div className="actions">
                        <Button
                            className="ant-btn-icon-only"
                            type="text"
                            size="small"
                        >
                            <ReloadOutlined />
                        </Button>
                        <Button
                            className="ant-btn-icon-only"
                            type="text"
                            size="small"
                        >
                            <PlusOutlined />
                        </Button>
                    </div>
                </div>
                <div className="panel-bar searchbar panel panel-ltr">
                    <Input
                        suffix={<SearchOutlined />}
                        placeholder="搜索名称…"
                    />
                </div>
                <div
                    className="panel tree panel-ltr"
                    ref={treeContainerRef}
                >
                    <ScrollPin containerRef={treeContainerRef} />
                    <MetaTree />
                </div>
            </div>
            <div className="panel main panel-ttb">
                <Routes>
                    <Route
                        path="list"
                        element={<MetaDetailLayout />}
                    />
                    <Route path=":catalogName">
                        <Route
                            path="list"
                            element={<CatalogDetailLayout />}
                        />
                        <Route path=":databseName">
                            <Route
                                path="list"
                                element={<DatabaseDetailLayout />}
                            />
                            <Route
                                path=":tableName"
                                element={<TableDetailLayout />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default MetaLayout;
