import { Tree, TreeDataNode, TreeProps } from "antd";
import './index.sass'
import TreeTitle from "./TreeTitle";

const DirectoryTree = (props: TreeProps) => {

    const titleRender = (dataNode: TreeDataNode) => {
        return (<TreeTitle dataNode={dataNode} />)
    }

    return (
        <Tree
            {...props}
            className="directory-tree"
            titleRender={titleRender}
        />
    )
};

export default DirectoryTree;