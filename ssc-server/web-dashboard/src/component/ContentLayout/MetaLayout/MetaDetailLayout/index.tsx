import { Button, Input, Space, Table } from "antd";
import "./index.sass";
import { SearchOutlined } from "../../../Icon";
import { changeModalOpen } from "../../../../util";
import CreateCatalogModal from "../CreateCatalogModal";
import { useState } from "react";
import MyLink from "../../../MyLink";

interface Catalog {
    key: React.Key;
    name: string;
    type: string;
}

type TableProps = Parameters<typeof Table<Catalog>>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const columns: ColumnTypes = [
    {
        title: "Catalog 名称",
        dataIndex: "name",
        width: "35%",
    },
    {
        title: "类型",
        dataIndex: "type",
        width: "35%",
    },
    {
        title: "操作",
        render: (_, { name }) => (
            <>
                <MyLink to={`../${name}/list`}>查看</MyLink>
                <Button
                    type="link"
                    size="small"
                >
                    删除
                </Button>
            </>
        ),
    },
];

const data: Catalog[] = [
    {
        key: "1",
        name: "vvp",
        type: "vvp",
    },
];

const MetaDetailLayout = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    return (
        <div className="meta-detail-layout">
            <div className="header">
                <div className="title">
                    <span>Catalog 列表</span>
                </div>
                <div className="actions">
                    <Space>
                        <Button
                            type="primary"
                            onClick={changeModalOpen(true, setModalOpen)}
                        >
                            创建 Catalog
                        </Button>
                        <Input
                            suffix={<SearchOutlined />}
                            placeholder="搜索…"
                        />
                    </Space>
                </div>
            </div>
            <div className="content">
                <Table
                    className="meta-table"
                    columns={columns}
                    dataSource={data}
                    showSorterTooltip={false}
                    size="small"
                />
            </div>
            <CreateCatalogModal
                open={modalOpen}
                onCancel={changeModalOpen(false, setModalOpen)}
            />
        </div>
    );
};

export default MetaDetailLayout;
