import { Button, Input, Tooltip } from "antd";
import "./index.sass";
import { PlusOutlined, ReloadOutlined, SearchOutlined } from "../../../../component/Icon";
import MetaTree from "../DraftLayout/LeftTabBar/LeftTabPanel/MetaTabPanel/MetaTree";
import ScrollPin from "../../../../component/ScrollPin";
import { useRef, useState } from "react";
import MetaDetailLayout from "./MetaDetailLayout";
import { Route, Routes } from "react-router-dom";
import CatalogDetailLayout from "./CatalogDetailLayout";
import DatabaseDetailLayout from "./DatabaseDetailLayout";
import TableDetailLayout from "./TableDetailLayout";
import CreateCatalogModal from "./CreateCatalogModal";
import { changeModalOpen } from "../../../../util";

const MetaLayout = () => {
    const treeContainerRef = useRef<HTMLDivElement>(null);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    return (
        <div className="meta-layout">
            <div className="panel side panel-ttb">
                <div className="panel-bar header panel panel-ltr">
                    <span className="title">元数据</span>
                    <div className="actions">
                        <Tooltip title="刷新所有元数据信息">
                            <Button
                                className="ant-btn-icon-only"
                                type="text"
                                size="small"
                            >
                                <ReloadOutlined />
                            </Button>
                        </Tooltip>
                        <Tooltip title="创建 Catalog">
                            <Button
                                className="ant-btn-icon-only"
                                type="text"
                                size="small"
                                onClick={changeModalOpen(true, setCreateModalOpen)}
                            >
                                <PlusOutlined />
                            </Button>
                        </Tooltip>
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
            <CreateCatalogModal
                open={createModalOpen}
                onCancel={changeModalOpen(false, setCreateModalOpen)}
            />
        </div>
    );
};

export default MetaLayout;
