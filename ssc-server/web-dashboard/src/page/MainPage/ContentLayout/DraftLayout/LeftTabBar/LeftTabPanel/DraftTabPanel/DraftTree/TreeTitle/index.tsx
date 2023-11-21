import { FileAddOutlined, FolderAddOutlined, EditOutlined } from "@ant-design/icons";
import { Input, Button, InputRef, Tooltip } from "antd";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { FloderOpenColorOutlined, FloderClosedColorOutlined } from "../../../../../../../../../component/Icon";
import { DataNode } from "antd/es/tree";

interface TreeTitleProps {
    dataNode: DataNode;
    expandCallback: () => void;
    changedCallback: () => void;
    editingCallback: (editing: boolean) => void;
}

const TreeTitle = (props: TreeTitleProps) => {
    const [editing, setEditing] = useState<boolean>(false);
    const { dataNode, expandCallback, changedCallback, editingCallback } = props;
    const inputRef = useRef<InputRef | null>(null);

    useEffect(() => {
        editingCallback(editing);
        if (editing) {
            inputRef.current?.focus({
                cursor: "all",
            });

            inputRef.current?.input?.addEventListener("blur", () => {
                setEditing(false);
                dataNode.className = undefined;
                dataNode.title = inputRef.current?.input?.value;
                changedCallback();
            });
        }
    }, [editing]);

    const onFileAddClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation();
        if (dataNode.isLeaf) {
            return;
        }
    };

    const onFloderAddClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation();
        if (dataNode.isLeaf) {
            return;
        }

        expandCallback();

        if (dataNode.children) {
            dataNode.children.push({
                title: "test",
                key: dataNode.key + "-" + dataNode.children.length,
                isLeaf: false,
                switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
                children: [],
            });
        } else {
            dataNode.children = [
                {
                    title: "test",
                    key: dataNode.key + "-0",
                    isLeaf: false,
                    switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
                    children: [],
                },
            ];
        }

        changedCallback();
    };

    const onRenameClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation();
        dataNode.className = "edit-node";
        changedCallback();
        setEditing(true);
    };

    return (
        <>
            {editing ? (
                <Input
                    onClick={event => event.stopPropagation()}
                    onDoubleClick={event => event.stopPropagation()}
                    size="small"
                    className="rename-input"
                    defaultValue={dataNode.title as string}
                    ref={inputRef}
                />
            ) : (
                <span className="title">{dataNode.title as React.ReactNode}</span>
            )}

            {dataNode.isLeaf || editing ? null : (
                <div className="actions">
                    <Tooltip title="新建作业草稿">
                        <Button
                            className="action"
                            type="text"
                            size="small"
                            onClick={onFileAddClick}
                        >
                            <FileAddOutlined />
                        </Button>
                    </Tooltip>
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
                    <Tooltip title="重命名">
                        <Button
                            className="action"
                            type="text"
                            size="small"
                            style={{ display: dataNode.key === "0" ? "none" : "inline-block" }}
                            onClick={onRenameClick}
                        >
                            <EditOutlined />
                        </Button>
                    </Tooltip>
                </div>
            )}
        </>
    );
};

export default TreeTitle;
