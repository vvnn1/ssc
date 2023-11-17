import { Button, Tooltip, TreeDataNode } from "antd";
import { FolderAddOutlined } from "../../../../../../../Icon";

interface TreeTitleProps {
    dataNode: TreeDataNode;
}

const TreeTitle = (props: TreeTitleProps) => {
    const { dataNode } = props;

    const onFloderAddClick = () => {
        console.log("a");
    };

    return (
        <>
            <span className="title">{dataNode.title as React.ReactNode}</span>
            <div className="actions">
                <Tooltip title="新建文件夹">
                    <Button
                        className="action"
                        type="text"
                        size="small"
                        onClick={onFloderAddClick}
                    >
                        <FolderAddOutlined />
                    </Button>
                </Tooltip>
            </div>
        </>
    );
};

export default TreeTitle;
