import { FileAddOutlined, FolderAddOutlined, EditOutlined } from "@ant-design/icons";
import { Input, Button, InputRef, Tooltip, TreeDataNode, InputProps } from "antd";
import { MouseEventHandler, createRef, useEffect, useRef, useState } from "react";

interface TreeTitleProps {
    dataNode: TreeDataNode;
    title: React.ReactNode;
    changedCallback: () => void;
    onFileAddClick: () => void;
    onFloderAddClick: () => void;
}

const TreeTitle = (props: TreeTitleProps) => {
    const { dataNode, changedCallback } = props;
    const inputRef = useRef<InputRef | null>(null);
    const editing = dataNode.className === "edit-node";

    const onFileAddClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation();
        if (dataNode.isLeaf) {
            return;
        }
        props.onFileAddClick();
    };

    const onFloderAddClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation();
        if (dataNode.isLeaf) {
            return;
        }

        props.onFloderAddClick();
    };

    const onRenameClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement> = event => {
        event.stopPropagation();
        dataNode.className = "edit-node";
        changedCallback();
    };

    const onKeyDownEnter: InputProps["onKeyDown"] = e => {
        if (e.key === "Enter") {
            inputRef.current?.blur();
        }
    };

    const onBlur: InputProps["onBlur"] = p => {
        dataNode.className = undefined;
        dataNode.title = p.target.value;
        changedCallback();
    };

    const onFocuse: InputProps["onFocus"] = p => {
        const length = p.target.value.length;
        p.target.setSelectionRange(0, length);
    };

    return (
        <>
            {editing ? (
                <Input
                    autoFocus
                    onFocus={onFocuse}
                    id={Math.random().toString()}
                    onClick={event => event.stopPropagation()}
                    onDoubleClick={event => event.stopPropagation()}
                    size="small"
                    className={`rename-input ${dataNode.key}`}
                    defaultValue={dataNode.title as string}
                    ref={inputRef}
                    onKeyDown={onKeyDownEnter}
                    onBlur={onBlur}
                />
            ) : (
                <span className="title">{props.title}</span>
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
