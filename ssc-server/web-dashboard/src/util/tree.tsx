import { TreeDataNode } from "antd";

export function doOnNode(treeData: TreeDataNode[], callback: (data: TreeDataNode) => void) {
    for (let i = 0; i < treeData.length; i++) {
        callback(treeData[i]);
        if (treeData[i].children) {
            doOnNode(treeData[i].children!, callback);
        }
    }
}
