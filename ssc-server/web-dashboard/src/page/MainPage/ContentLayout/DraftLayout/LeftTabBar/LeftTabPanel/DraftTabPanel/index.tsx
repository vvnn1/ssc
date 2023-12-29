import { Button, Input, Tooltip } from "antd";
import { AimOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined } from "../../../../../../../component/Icon";
import ScrollPin from "../../../../../../../component/ScrollPin";
import DraftTree, { DraftTreeElement } from "./DraftTree";
import { Key, useRef, useState } from "react";
import "./index.sass";

const DraftTabPanel = () => {
    const [deletable, setDeletable] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<DraftTreeElement>(null);

    const onSelectedKeysChange = (keys: Key[]) => {
        setDeletable(keys.length > 0);
    };

    const onRefreshClick = () => {
        treeRef.current?.refreshTree();
    };

    const onLocateClick = () => {
        treeRef.current?.locateOpenedDraft();
    };

    return (
        <div className="draft-panel-panel tab-panel">
            <div className="panel-bar header panel panel-ltr panel-border-bottom">
                <span className="title">作业草稿</span>
                <div className="actions">
                    <Tooltip title="定位打开的作业草稿">
                        <Button
                            className="ant-btn-icon-only"
                            type="text"
                            size="small"
                            onClick={onLocateClick}
                        >
                            <AimOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="删除选中的作业草稿">
                        <Button
                            className="ant-btn-icon-only"
                            type="text"
                            size="small"
                            disabled={!deletable}
                        >
                            <DeleteOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="刷新">
                        <Button
                            className="ant-btn-icon-only"
                            type="text"
                            size="small"
                            onClick={onRefreshClick}
                        >
                            <ReloadOutlined />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="panel-bar searchbar panel panel-ltr panel-border-bottom">
                <Input
                    suffix={<SearchOutlined />}
                    placeholder="搜索名称…"
                />
            </div>
            <div className="panel draft-list panel-ttb">
                <ScrollPin containerRef={containerRef} />
                <div
                    className="draft-tree-container"
                    ref={containerRef}
                >
                    <DraftTree
                        ref={treeRef}
                        onSelectedKeys={onSelectedKeysChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default DraftTabPanel;
