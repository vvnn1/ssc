import { Input, TreeDataNode } from "antd";
import "./index.sass";
import DirectoryTree from "./DirectoryTree";
import { Key, useState } from "react";
import { FloderClosedColorOutlined, FloderOpenColorOutlined } from "../Icon";

interface DirectorySelectProps {
    selectedKey?: Key;
    onChange?: (selectedKey: Key | undefined) => void;
}

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

const tracePath = (targetKey: React.Key | undefined, node: TreeDataNode, selectedPath: string[]) => {
    if (!targetKey) {
        return;
    }

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

const inputPath = (key: Key | undefined): string => {
    if (key) {
        const selectedPath: string[] = [];
        tracePath(key, demoData, selectedPath);
        return selectedPath.join("/");
    }

    return "";
};

const DirectorySelect = (props: DirectorySelectProps) => {
    const [selectedKey, setSelectedKey] = useState<Key | undefined>(props.selectedKey);

    const onSelect = (keys: Key[]) => {
        if (keys.length === 0) {
            setSelectedKey(undefined);
            return;
        }
        const key = keys?.[0];
        setSelectedKey(key);
        props.onChange?.(key);
    };

    return (
        <div className="directory-select">
            <Input
                className="directory-input"
                disabled
                value={inputPath(selectedKey)}
            />
            <div className="tree-container">
                <DirectoryTree
                    treeData={[demoData]}
                    selectedKeys={selectedKey ? [selectedKey] : []}
                    onSelect={onSelect}
                />
            </div>
        </div>
    );
};

export default DirectorySelect;
