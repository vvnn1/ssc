import { Button, Descriptions, DescriptionsProps, Empty, Input, Spin, TreeDataNode, TreeProps } from "antd";
import { PlusOutlined, ReloadOutlined, SearchOutlined } from "../../../../../Icon";
import "./index.sass";
import Resizable from "../../../../../Resizable";
import RegisterModal from "./RegisterModal";
import { useState } from "react";
import FuncTree from "./FuncTree";
import { changeModalOpen } from "../../../../../../util";
const MethodTabPanel = () => {
    const [hasData, setHasData] = useState<boolean>(false);
    const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
    const [selectedNode, setSelectedNode] = useState<TreeDataNode>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSelect: TreeProps["onSelect"] = (_, { selectedNodes }) => {
        setSelectedNode(selectedNodes?.[0]);
    };

    const buildItems = (selectedNode: TreeDataNode): DescriptionsProps["items"] => {
        if (selectedNode.className?.includes("jar")) {
            return [
                {
                    key: "jar-url",
                    label: "Jar URL",
                    children:
                        "oss://ssc-b/sql-artifacts/namespaces/ssc-m-default/udfs/2023-10-24T07-22-39.525888Z/ASI_UDX-1.0-SNAPSHOT.jar",
                },
                {
                    key: "create-time",
                    label: "Create Time",
                    children: "2023-10-24 15:22:39",
                },
                {
                    key: "update-time",
                    label: "Update Time",
                    children: "2023-10-24 15:22:40",
                },
            ];
        }

        if (selectedNode.className?.includes("function")) {
            return [
                {
                    key: "artifact-name",
                    label: "Artifact Name",
                    children: "testfunc",
                },
                {
                    key: "function-name",
                    label: "Function Name",
                    children: selectedNode.title as string,
                },
                {
                    key: "class-name",
                    label: "ASI_UDF.ASI_UDF",
                    children: "ASI_UDF.ASI_UDF",
                },
                {
                    key: "update-time",
                    label: "Update Time",
                    children: "2023-10-24 15:22:40",
                },
            ];
        }
        return [];
    };

    const onRefreshClick = () => {
        setLoading(true);
        const id = setInterval(() => {
            setLoading(false);
            clearInterval(id);
        }, 3000);
    };

    return (
        <div className="method-tab-panel tab-panel">
            <div className="panel-bar header panel panel-ltr panel-border-bottom">
                <span className="title">函数</span>
                <div className="actions">
                    <Button
                        className="ant-btn-icon-only"
                        type="text"
                        size="small"
                        onClick={changeModalOpen(true, setRegisterModalOpen)}
                    >
                        <PlusOutlined />
                    </Button>
                    <Button
                        className="ant-btn-icon-only"
                        type="text"
                        size="small"
                        onClick={onRefreshClick}
                    >
                        <ReloadOutlined />
                    </Button>
                </div>
            </div>
            <div className="panel-bar searchbar panel panel-ltr panel-border-bottom">
                <Input
                    suffix={<SearchOutlined />}
                    placeholder="搜索 UDFs / 函数…"
                />
            </div>
            <div className="panel tree panel-ttb panel-border-bottom">
                {loading ? (
                    hasData ? (
                        <Spin>{<FuncTree onSelect={onSelect} />}</Spin>
                    ) : (
                        <Spin />
                    )
                ) : hasData ? (
                    <FuncTree onSelect={onSelect} />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={false}
                    >
                        <Button
                            type="primary"
                            block
                            size="small"
                            onClick={changeModalOpen(true, setRegisterModalOpen)}
                        >
                            注册 UDF
                        </Button>
                    </Empty>
                )}
            </div>

            <Resizable
                className="panel expand-panel panel-ttb resizable-panel"
                size={200}
                resizeHandle="n"
                axis={"y"}
                minSize={31}
            >
                <>
                    <div className="title">
                        {selectedNode ? (
                            <span className={selectedNode.className}>
                                {selectedNode.icon as React.ReactNode} {selectedNode.title as React.ReactNode}
                            </span>
                        ) : (
                            <span>没有项目被选中</span>
                        )}
                    </div>

                    <div className="detail">
                        {selectedNode ? (
                            <Descriptions
                                layout="vertical"
                                items={buildItems(selectedNode)}
                                column={1}
                                bordered
                                size="small"
                            />
                        ) : (
                            <div className="no-selected">没有 UDFs JAR / 函数 被选中</div>
                        )}
                    </div>
                </>
            </Resizable>
            <RegisterModal
                open={registerModalOpen}
                onCancel={changeModalOpen(false, setRegisterModalOpen)}
                onOk={() => {
                    setHasData(true);
                    setRegisterModalOpen(false);
                }}
            />
        </div>
    );
};

export default MethodTabPanel;
