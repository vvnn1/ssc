import { Tree, TreeDataNode } from "antd";
import { Key, useEffect, useState } from "react";
import { FloderClosedColorOutlined, FloderOpenColorOutlined } from "../../../../../../../../component/Icon";
import "./index.sass";
import TreeTitle from "./TreeTitle";

const demoData: TreeDataNode = {
    title: "作业草稿",
    key: "0",
    children: [
        {
            title: "母婴订单实时查询",
            key: "0-0",
            isLeaf: false,
            switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
        },
    ],
    switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
};
interface StoreTreeProps {
    onSelectedPathChange: (path: string) => void;
}

const StoreTree = (props: StoreTreeProps) => {
    const [treeData] = useState<TreeDataNode[]>([demoData]);
    const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<Key[]>(["0"]);

    const onExpand = (expandedKeys: Key[]) => {
        setExpandedKeys(expandedKeys);
    };

    useEffect(() => {
        props.onSelectedPathChange(demoData.title as string);
    }, []);

    const atLastOneSelected = (keys: Key[]) => {
        if (keys.length === 0) {
            return;
        }

        const key = keys[0];
        const selectedPath: string[] = [];

        tracePath(key, demoData, selectedPath);

        props.onSelectedPathChange(selectedPath.join("/"));

        setSelectedKeys(keys);
    };

    const tracePath = (targetKey: React.Key, node: TreeDataNode, selectedPath: string[]) => {
        if (node.key === targetKey) {
            selectedPath.push(node.title as string);
            return;
        }

        if (node.children?.length === 0) {
            return;
        }

        selectedPath.push(node.title as string);
        const lenght = selectedPath.length;
        for (let i = 0; i < node.children!.length; i++) {
            tracePath(targetKey, node.children![i], selectedPath);
            if (selectedPath.length > lenght) {
                return;
            }
        }
        selectedPath.pop();
    };

    const titleRender = (dataNode: TreeDataNode) => {
        return <TreeTitle dataNode={dataNode} />;
    };

    return (
        <Tree
            className="store-tree"
            selectedKeys={selectedKeys}
            treeData={treeData}
            expandedKeys={expandedKeys}
            onExpand={onExpand}
            onSelect={atLastOneSelected}
            titleRender={titleRender}
        />
    );
};

export default StoreTree;
