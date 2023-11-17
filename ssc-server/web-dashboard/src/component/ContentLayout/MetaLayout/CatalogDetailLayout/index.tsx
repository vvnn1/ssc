import { Breadcrumb, Input, Table } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "../../../Icon";
import "./index.sass";
import MyLink from "../../../MyLink";
import { useNavigate } from "react-router-dom";

const CatalogDetailLayout = () => {
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="catalog-detail-layout">
            <Breadcrumb
                items={[
                    {
                        title: "Catalog 列表",
                    },
                    {
                        title: "vvp",
                    },
                ]}
            />
            <div className="header">
                <div className="title">
                    <ArrowLeftOutlined onClick={onBackClick} />
                    <span className="text">vvp</span>
                </div>
                <div className="actions">
                    <Input
                        suffix={<SearchOutlined />}
                        placeholder="搜索…"
                    />
                </div>
            </div>
            <div className="content">
                <Table
                    size="small"
                    columns={[
                        {
                            title: "数据库名称",
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
                            width: "30%",
                            render: (_, { name }) => {
                                return <MyLink to={`../${name}/list`}>查看</MyLink>;
                            },
                        },
                    ]}
                    dataSource={[
                        {
                            name: "default",
                            comment: "The default database",
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default CatalogDetailLayout;
