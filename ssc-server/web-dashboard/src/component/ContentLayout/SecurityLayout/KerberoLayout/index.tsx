import { Button, Divider, Input, Popconfirm, Space, Table } from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "../../../Icon";
import "./index.sass";
import AddModal from "./AddModal";
import { changeModalOpen } from "../../../../util";
import EditModal from "./EditModal";

interface Kerberos {
    key: React.Key;
    name: string;
    keyTab: string;
    conf: string;
}

type TableProps = Parameters<typeof Table<Kerberos>>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const data: Kerberos[] = [
    {
        key: "1",
        name: "test",
        keyTab: "oss://ssc-bucket-v2/artifacts/namespaces/ssc-space-default/Final_Company.txt",
        conf: "oss://ssc-bucket-v2/artifacts/namespaces/ssc-space-default/Final_Company.txt",
    },
];

const { Search } = Input;

const KerberoLayout = () => {
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const onSearch = (value: string) => console.log(value);

    const columns: ColumnTypes = [
        {
            title: "Kerberos 集群名称",
            dataIndex: "name",
            width: 200,
        },
        {
            title: "Kerberos Keytab",
            dataIndex: "keyTab",
        },
        {
            title: "Kerberos Krb5,conf",
            dataIndex: "conf",
        },
        {
            title: "操作",
            width: 200,
            render: () => (
                <>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={changeModalOpen(true, setDeleteModalOpen)}
                    >
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        okText="确认"
                        cancelText="取消"
                        title="您确定要删除此 Hive Kerberos?"
                        overlayClassName="ant-popover-rtl"
                        placement="left"
                    >
                        <Button
                            type="link"
                            icon={<DeleteOutlined />}
                            size="small"
                            danger
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className="security-kerbero-page">
            <div className="actions">
                <Space>
                    <Button
                        type="primary"
                        onClick={changeModalOpen(true, setAddModalOpen)}
                    >
                        新增 Kerberos
                    </Button>
                    <Search
                        placeholder="搜索…"
                        onSearch={onSearch}
                    />
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                showSorterTooltip={false}
                size="small"
            />
            <EditModal
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

export default KerberoLayout;
