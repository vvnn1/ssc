import { Tree, TreeDataNode, TreeProps, message } from "antd";
import { CheckCircleOutlined, ContainerOutlined, FunctionOutlined, MinusSquareOutlined, PlusSquareOutlined } from "../../../../../../Icon";
import "./index.sass";
import TreeTitle from "./TreeTitle";
import { useState } from "react";
import ManageModal from "../ManageModal";
import { changeModalOpen } from "../../../../../../../util";
import UpdateModal from "../UpdateModal";
import DeleteModal from "../DeleteModal";

const treeData: TreeDataNode[] = [
    {
        title: "testfunc",
        key: "0-0",
        icon: <ContainerOutlined />,
        children: [
            {
                title: "ASI_UDF",
                key: "0-0-0",
                icon: <FunctionOutlined />,
                className: "function",
                isLeaf: true,
            },
            {
                title: "ASI_UDTF",
                key: "0-0-1",
                icon: <FunctionOutlined />,
                className: "function",
                isLeaf: true,
            },
            {
                title: "ASI_UDAF$MySum",
                key: "0-0-2",
                icon: <FunctionOutlined />,
                className: "function",
                isLeaf: true,
            }
        ],
        switcherIcon: (node) => (node.expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />),
        className: "jar",
        isLeaf: false
    },
    {
        title: "testfunc2",
        key: "0-1",
        icon: <ContainerOutlined />,
        children: [
            {
                title: "ASI_UDF2",
                key: "0-1-0",
                icon: <FunctionOutlined />,
                className: "function",
                isLeaf: true,
            },
            {
                title: "ASI_UDTF2",
                key: "0-1-1",
                icon: <FunctionOutlined />,
                className: "function",
                isLeaf: true,
            },
            {
                title: "ASI_UDAF2$MySum",
                key: "0-2-2",
                icon: <FunctionOutlined />,
                className: "function",
                isLeaf: true,

            }
        ],
        switcherIcon: (node) => (node.expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />),
        className: "jar",
        isLeaf: false
    },
];




const FuncTree = (props: TreeProps) => {
    const [dataSource, setDataSource] = useState<TreeDataNode[]>(treeData);
    const [manageModalOpen, setManageModalOpen] = useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();


    const onFunctionDrop = (dataNode: TreeDataNode) => {
        dataNode.className = "function unregister-function";
        setDataSource((dataSource) => [...dataSource]);
    };

    const onManage = (/* dataNode: TreeDataNode */) => {
        setManageModalOpen(true);
    };

    const onJarDrop = (/* dataNode: TreeDataNode */) => {
        setDeleteModalOpen(true);
    };

    const onUpdate = (/* dataNode: TreeDataNode */) => {
        setUpdateModalOpen(true);
    };

    const titleRender = (node: TreeDataNode) => {
        let onDrop;
        if (node.className?.includes("function")) {
            onDrop = onFunctionDrop;
        }
        if (node.className?.includes("jar")) {
            onDrop = onJarDrop;
        }
        return <TreeTitle dataNode={node} onDrop={onDrop} onManager={onManage} onUpdate={onUpdate} />;
    };

    const onCreateClick = () => {
        messageApi.success({
            icon: <></>,
            content: <><CheckCircleOutlined color="#00a700" />创建成功</>
        });
        setManageModalOpen(false);
    };

    const onDeleteClick = () => {
        messageApi.success({
            icon: <></>,
            content: <><CheckCircleOutlined color="#00a700" />删除成功</>
        });
        setManageModalOpen(false);
    };

    return (
        <>
            <Tree
                {...props}
                className="func-tree"
                showLine={false}
                showIcon={true}
                blockNode
                treeData={dataSource}
                titleRender={titleRender}
            />
            {contextHolder}
            <ManageModal
                open={manageModalOpen}
                onCancel={changeModalOpen(false, setManageModalOpen)}
                onCreateClick={onCreateClick}
                onDeleteClick={onDeleteClick}
            />
            <UpdateModal 
                open={updateModalOpen}
                onOk={changeModalOpen(false, setUpdateModalOpen)}
                onCancel={changeModalOpen(false, setUpdateModalOpen)}
            />
            <DeleteModal
                open={deleteModalOpen}
                onOk={changeModalOpen(false, setDeleteModalOpen)}
                onCancel={changeModalOpen(false, setDeleteModalOpen)}
            />
        </>

    );
};

export default FuncTree;