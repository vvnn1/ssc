import { Button, Table } from "antd";
import "./index.sass";

const NameSpaceLayout = () => {
    return (
        <div className="namespace-layout">
            <div className="header">
                <div className="title">项目空间列表</div>
            </div>
            <div className="content">
                <Table
                    size="small"
                    columns={[
                        {
                            title: "名称",
                            dataIndex: "name",
                            width: "50%",
                        },
                        {
                            title: "操作",
                            width: "50%",
                            render: () => (
                                <Button
                                    type="link"
                                    size="small"
                                >
                                    进入项目
                                </Button>
                            ),
                        },
                    ]}
                    dataSource={[
                        {
                            name: "ssc-space-default",
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default NameSpaceLayout;
