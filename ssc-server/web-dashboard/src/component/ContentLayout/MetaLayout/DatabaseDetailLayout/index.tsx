import { Breadcrumb, Button, Input, Space, Table } from "antd";
import "./index.sass";
import { ArrowLeftOutlined, SearchOutlined } from "../../../Icon";
import { useNavigate } from "react-router-dom";
import MyLink from "../../../MyLink";
import RenameModal from "../TableDetailLayout/RenameModal";
import { useState } from "react";
import { changeModalOpen } from "../../../../util";
import DeleteModal from "../TableDetailLayout/DeleteModal";

const DatabaseDetailLayout = () => {
    const [renameModalOpen, setRenameModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };

    const onDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    return (
        <div className="databse-detail-layout">
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
                ]}
            />
            <div className="header">
                <div className="title">
                    <ArrowLeftOutlined onClick={onBackClick} />
                    <span className="text">default</span>
                </div>
                <div className="actions">
                    <Space>
                        <Button type="primary">创建表</Button>
                        <Input
                            suffix={<SearchOutlined />}
                            placeholder="搜索…"
                        />
                    </Space>
                </div>
            </div>
            <div className="content">
                <Table
                    size="small"
                    columns={[
                        {
                            title: "表名称",
                            width: "35%",
                            dataIndex: "name",
                        },
                        {
                            title: "备注",
                            width: "35%",
                            dataIndex: "comment",
                        },
                        {
                            title: "操作",
                            width: "35%",
                            render: (_, { name }) => {
                                return (
                                    <>
                                        <MyLink
                                            className="ant-btn ant-btn-link ant-btn-sm"
                                            to={`../${name}`}
                                        >
                                            查看
                                        </MyLink>
                                        <a
                                            className="ant-btn ant-btn-link ant-btn-sm"
                                            onClick={changeModalOpen(true, setRenameModalOpen)}
                                        >
                                            重命名
                                        </a>
                                        <a
                                            className="ant-btn ant-btn-link ant-btn-sm ant-btn-dangerous"
                                            onClick={onDeleteClick}
                                        >
                                            删除
                                        </a>
                                    </>
                                );
                            },
                        },
                    ]}
                    dataSource={[
                        {
                            name: "datagen_kk_source",
                            comment: "-",
                        },
                        {
                            name: "faker_source",
                            comment: "-",
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

export default DatabaseDetailLayout;
