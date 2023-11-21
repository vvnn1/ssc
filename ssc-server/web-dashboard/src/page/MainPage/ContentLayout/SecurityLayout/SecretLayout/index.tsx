import { Button, Table } from "antd";
import "./index.sass";
import { DeleteOutlined, LockOutlined, PlusOutlined } from "../../../../../component/Icon";
import { useState } from "react";
import AddModal from "./AddModal";
import { changeModalOpen } from "../../../../../util";
import DeleteModal from "./DeleteModal";

interface Secret {
    key: React.Key;
    name: string;
    createTime: string;
}

type TableProps = Parameters<typeof Table<Secret>>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const data: Secret[] = [
    {
        key: "1",
        name: "wml-pc",
        createTime: "2023-11-10 15:21:08",
    },
];

const SecretLayout = () => {
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const columns: ColumnTypes = [
        {
            title: "密钥名称",
            dataIndex: "name",
            render: value => (
                <>
                    <LockOutlined style={{ color: "#666" }} /> {value}
                </>
            ),
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            width: 300,
        },
        {
            title: "操作",
            width: 200,
            render: () => (
                <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    onClick={changeModalOpen(true, setDeleteModalOpen)}
                >
                    删除
                </Button>
            ),
        },
    ];

    return (
        <div className="security-secret-page">
            <div className="actions">
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={changeModalOpen(true, setAddModalOpen)}
                >
                    新增密钥
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                showSorterTooltip={false}
                size="small"
            />
            <DeleteModal
                open={deleteModalOpen}
                onCancel={changeModalOpen(false, setDeleteModalOpen)}
            />
            <AddModal
                open={addModalOpen}
                onCancel={changeModalOpen(false, setAddModalOpen)}
            />
        </div>
    );
};

export default SecretLayout;
