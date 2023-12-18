import { Tree, TreeDataNode, TreeProps } from "antd";
import {
    ContainerOutlined,
    DatabaseOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined,
    TableOutlined,
} from "../../../../../../../../component/Icon";
import "./index.sass";
import TreeTitle from "./TreeTitle";
import { Key, useState } from "react";

const treeData: TreeDataNode[] = [
    {
        title: (
            <>
                <span className="title">vvp</span>
                <span className="extra">数据更新于 06-24 13:46</span>
            </>
        ),
        key: "0-0",
        icon: <ContainerOutlined />,
        children: [
            {
                title: (
                    <>
                        <span className="title">default</span>
                        <span className="tag">默认</span>
                    </>
                ),
                key: "0-0-0",
                icon: <DatabaseOutlined />,
                switcherIcon: node => (node.expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />),
                className: "database",
                isLeaf: false,
                children: [
                    {
                        title: "test-table",
                        key: "0-0-0-1",
                        icon: <TableOutlined />,
                        className: "table",
                        isLeaf: true,
                    },
                ],
            },
        ],
        switcherIcon: node => (node.expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />),
        className: "catalog",
        isLeaf: false,
    },
];

const titleRender = (node: TreeDataNode) => {
    return <TreeTitle dataNode={node} />;
};

const MetaTree = (props: TreeProps) => {
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

    const atLastOneSelected = (keys: Key[]) => {
        if (keys.length === 0) {
            return;
        }
        setSelectedKeys(keys);
    };

    return (
        <Tree
            {...props}
            selectedKeys={selectedKeys}
            onSelect={atLastOneSelected}
            className="meta-tree"
            showLine={false}
            showIcon={true}
            defaultExpandedKeys={["0-0-0"]}
            treeData={treeData}
            titleRender={titleRender}
            blockNode
        />
    );
};

export default MetaTree;
