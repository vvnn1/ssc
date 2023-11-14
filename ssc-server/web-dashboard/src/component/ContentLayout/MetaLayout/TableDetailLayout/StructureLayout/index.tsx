import { Descriptions, Table } from "antd";
import "./index.sass";

const StructureLayout = () => {
    return (
        <div className="table-structure-layout">
            <div className="divider">基本信息</div>
            <Descriptions
                column={1}
                bordered
                size="small"
                items={[
                    {
                        key: "1",
                        label: "Catalog 名称",
                        children: "vvp",
                    },
                    {
                        key: "2",
                        label: "数据库名称",
                        children: "default",
                    },
                    {
                        key: "3",
                        label: "表名称",
                        children: "datagen_kk_source",
                    },
                    {
                        key: "4",
                        label: "备注",
                        children: "-"
                    }
                ]}
            />
            <div className="divider">表属性</div>
            <Table
                size="small"
                bordered
                pagination={false}
                columns={[
                    {
                        title: "参数名称",
                        dataIndex:"name",
                        width: "50%"
                    },
                    {
                        title: "参数值",
                        dataIndex: "value",
                        width: "50%"
                    }
                ]}
                dataSource={[
                    {
                        name: "connector",
                        value: "datagen"
                    }
                ]}
            />
            <div className="divider">表字段</div>
            <Table
                size="small"
                bordered
                pagination={false}
                columns={[
                    {
                        title: "字段名称",
                        dataIndex: "name",
                        width: "20%"
                    },
                    {
                        title: "字段类型",
                        dataIndex: "type",
                        width: "20%"
                    },
                    {
                        title: "表达式",
                        dataIndex: "expression",
                        width: "20%"
                    },
                    {
                        title: "是否主键",
                        dataIndex: "primary",
                        width: "10%"
                    },
                    {
                        title: "可为空",
                        dataIndex: "nullable",
                        width: "10%"
                    },
                    {
                        title: "Watermark",
                        dataIndex: "watermark",
                        width: "20%"
                    }
                ]}
                dataSource={[
                    {
                        name: "name",
                        type: "VARCHAR(2147483647)",
                        expression: "-",
                        primary: "否",
                        nullable: "是",
                        watermark: "-"
                    },
                    {
                        name: "score",
                        type: "BIGINT",
                        expression: "-",
                        primary: "否",
                        nullable: "是",
                        watermark: "-"
                    }
                ]}
            />
            <div className="divider">分区字段</div>
            <Table
                size="small"
                bordered
                columns={[
                    {
                        title: "字段名称",
                        width: "20%"
                    },
                    {
                        title: "字段类型",
                        width: "20%"
                    },
                    {
                        title: "表达式",
                        width: "20%"
                    },
                    {
                        title: "是否是主键",
                        width: "10%"
                    },
                    {
                        title: "可为空",
                        width: "10%"
                    },
                    {
                        title: "Watermark",
                        width: "20%"
                    }
                ]}
            />
        </div>
    );
};

export default StructureLayout;