import { Breadcrumb, Button, Space, Tabs } from "antd";
import "./index.sass";
import { ArrowLeftOutlined } from "../../../Icon";
import { useNavigate } from "react-router-dom";
import StructureLayout from "./StructureLayout";
import RelationLayout from "./RelationLayout";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { changeModalOpen } from "../../../../util";
import RenameModal from "./RenameModal";

const TableDetailLayout = () => {
    const [renameModalOpen, setRenameModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };
    return (
        <div className="table-detail-layout">
            <Breadcrumb
                items={[
                    {
                        title: "Catalog 列表",
                    },
                    {
                        title: "vvp",
                    },
                    {
                        title: "default",
                    },
                    {
                        title: "datagen_kk_source",
                    },
                ]}
            />
            <div className="header">
                <div className="title">
                    <ArrowLeftOutlined onClick={onBackClick} />
                    <span className="text">datagen_kk_source</span>
                </div>
                <div className="actions">
                    <Space>
                        <Button
                            type="primary"
                            onClick={changeModalOpen(true, setRenameModalOpen)}
                        >
                            重命名
                        </Button>
                        <Button
                            danger
                            onClick={changeModalOpen(true, setDeleteModalOpen)}
                        >
                            删除表
                        </Button>
                    </Space>
                </div>
            </div>
            <div className="content">
                <Tabs
                    type="card"
                    items={[
                        {
                            key: "1",
                            label: "表结构详情",
                            children: <StructureLayout />,
                        },
                        {
                            key: "2",
                            label: "血缘关系",
                            children: <RelationLayout />,
                        },
                    ]}
                />
            </div>
            <RenameModal
                open={renameModalOpen}
                onCancel={changeModalOpen(false, setRenameModalOpen)}
            />
            <DeleteModal
                open={deleteModalOpen}
                onCancel={changeModalOpen(false, setDeleteModalOpen)}
            />
        </div>
    );
};

export default TableDetailLayout;
