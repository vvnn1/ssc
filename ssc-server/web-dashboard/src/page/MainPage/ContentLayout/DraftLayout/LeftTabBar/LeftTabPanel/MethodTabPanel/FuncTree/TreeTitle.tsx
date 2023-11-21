import { Popconfirm, Space, Tooltip, TreeDataNode } from "antd";
import {
    DeleteOutlined,
    DisconnectOutlined,
    SettingOutlined,
    UploadOutlined,
} from "../../../../../../../../component/Icon";

interface TreeTitleProps {
    dataNode: TreeDataNode;
    onManager?: (dataNode: TreeDataNode) => void;
    onUpdate?: (dataNode: TreeDataNode) => void;
    onDrop?: (dataNode: TreeDataNode) => void;
}

const TreeTitle = (props: TreeTitleProps) => {
    const onDropClick = (e?: React.MouseEvent) => {
        stopPropagation(e);
        props.onDrop?.(props.dataNode);
    };

    const onUpdateClick = (e: React.MouseEvent) => {
        stopPropagation(e);
        props.onUpdate?.(props.dataNode);
    };

    const onManagerClick = (e: React.MouseEvent) => {
        stopPropagation(e);
        props.onManager?.(props.dataNode);
    };

    const stopPropagation = (e?: React.MouseEvent) => {
        e?.stopPropagation();
    };

    return (
        <div className="tree-title">
            <div className="title-wrapper">{props.dataNode.title as React.ReactNode}</div>
            <div className="actions">
                {props.dataNode.className === "jar" ? (
                    <Space size={4}>
                        <Tooltip title="管理函数">
                            <SettingOutlined onClick={onManagerClick} />
                        </Tooltip>
                        <Tooltip title="更新">
                            <UploadOutlined onClick={onUpdateClick} />
                        </Tooltip>
                        <Tooltip title="删除">
                            <DeleteOutlined onClick={onDropClick} />
                        </Tooltip>
                    </Space>
                ) : null}

                {props.dataNode.className?.includes("function") &&
                !props.dataNode.className?.includes("unregister-function") ? (
                    <Popconfirm
                        okText="确认"
                        cancelText="取消"
                        title="确认要删除该函数？"
                        overlayClassName="ant-popover-rtl"
                        onConfirm={onDropClick}
                    >
                        <Tooltip title="删除函数">
                            <DisconnectOutlined onClick={stopPropagation} />
                        </Tooltip>
                    </Popconfirm>
                ) : null}
            </div>
        </div>
    );
};

export default TreeTitle;
