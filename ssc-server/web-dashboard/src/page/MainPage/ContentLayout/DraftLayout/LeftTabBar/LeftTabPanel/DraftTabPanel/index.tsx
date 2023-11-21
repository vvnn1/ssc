import { Button, Input, Tooltip } from "antd";
import { AimOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined } from "../../../../../../../component/Icon";
import ScrollPin from "../../../../../../../component/ScrollPin";
import DraftTree from "./DraftTree";
import { useRef } from "react";
import "./index.sass";

const DraftTabPanel = () => {
    const treeRef = useRef<HTMLDivElement>(null);

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
                        >
                            <AimOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="删除选中的作业草稿">
                        <Button
                            className="ant-btn-icon-only"
                            type="text"
                            size="small"
                        >
                            <DeleteOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="刷新">
                        <Button
                            className="ant-btn-icon-only"
                            type="text"
                            size="small"
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
                <ScrollPin containerRef={treeRef} />
                <div
                    className="draft-tree-container"
                    ref={treeRef}
                >
                    <DraftTree />
                </div>
            </div>
        </div>
    );
};

export default DraftTabPanel;
