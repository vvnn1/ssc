import { Button, Dropdown, message } from "antd";
import { useState } from "react";
import { useLinkClickHandler, useParams } from "react-router-dom";
import { changeModalOpen, restoreUrl } from "../../../../../util";
import {
    CheckCircleOutlined,
    CodeOutlined,
    CommitAllOutlined,
    CopyOutlined,
    ExecuteAllOutlined,
    FileAddOutlined,
    FileSearchOutlined,
    LoadingOutlined,
    MenuOutlined,
    NewTabOutlined,
    PicLeftOutlined,
    RedoOutlined,
    SaveOutlined,
    UndoOutlined,
    ValidateAllOutlined,
} from "../../../../../component/Icon";
import CreateDraftModal from "./CreateDraftModal";
import CreateTemporaryTableModal from "./CreateTemporaryTableModal";
import DebugModal from "./DebugModal";
import PublishModal from "./PublishModal";
import SaveAsModal from "./SaveAsModal";
import "./index.sass";

interface ToolBarProps {
    isOpenFile: boolean;
    onPanelChange?: (panel: React.ReactNode) => void;
}

const ToolBar = (props: ToolBarProps) => {
    const [debugModalOpen, setDebugModalOpen] = useState<boolean>(false);
    const [publishModalOpen, setPublishModalOpen] = useState<boolean>(false);
    const [draftModalOpen, setDraftModalOpen] = useState<boolean>(false);
    const [saveAsModalOpen, setSaveAsModalOpen] = useState<boolean>(false);
    const [templateModalOpen, setTemplateModalOpen] = useState<boolean>(false);
    const [checking, setChecking] = useState<boolean>(false);
    const [debugPreparing, setDebugPreparing] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const urlParams = useParams();

    const navigateToOperation = useLinkClickHandler(
        restoreUrl(
            "/workspace/:workspaceId/namespace/:namespaceId/operations/stream/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/configuration",
            urlParams
        )
    );

    const save = () => {
        messageApi.open({
            icon: <></>,
            type: "success",
            content: (
                <>
                    <CheckCircleOutlined color="#00a700" />
                    保存成功
                </>
            ),
        });
    };

    const onCheckClick = () => {
        setChecking(true);
        const id = setInterval(() => {
            setChecking(false);
            clearInterval(id);
            document.dispatchEvent(
                new CustomEvent("bottom-label-change", {
                    detail: {
                        label: "problem",
                    },
                })
            );
        }, 3000);
    };

    const onDebugClick = () => {
        setDebugPreparing(true);
        const id = setInterval(() => {
            setDebugPreparing(false);
            clearInterval(id);
            setDebugModalOpen(true);
        }, 3000);
    };

    const onPublishConfirm = () => {
        messageApi.success({
            icon: <></>,
            content: (
                <>
                    <CheckCircleOutlined color="#00a700" />
                    部署成功, 请前往 <a onClick={navigateToOperation}>运维</a> 查看详情
                </>
            ),
        });
        setPublishModalOpen(false);
    };

    return (
        <div className="editor-tool-bar">
            {props.isOpenFile ? (
                <>
                    <div className="content-actions">
                        <Button
                            type="text"
                            onClick={changeModalOpen(true, setDraftModalOpen)}
                        >
                            <FileAddOutlined />
                            <span>新建</span>
                        </Button>
                        <Button
                            type="text"
                            onClick={changeModalOpen(true, setSaveAsModalOpen)}
                        >
                            <CopyOutlined />
                            <span>另存为</span>
                        </Button>
                        <Button
                            type="text"
                            onClick={save}
                        >
                            <SaveOutlined />
                            <span>保存</span>
                        </Button>
                        <Button
                            type="text"
                            onClick={changeModalOpen(true, setTemplateModalOpen)}
                        >
                            <CodeOutlined />
                            <span>添加临时表</span>
                        </Button>
                        <Button type="text">
                            <PicLeftOutlined />
                            <span>格式化</span>
                        </Button>
                        <Dropdown
                            rootClassName="more-dropdown"
                            trigger={["click"]}
                            menu={{
                                items: [
                                    {
                                        key: "1",
                                        label: (
                                            <>
                                                <UndoOutlined /> 撤销
                                            </>
                                        ),
                                    },
                                    {
                                        key: "2",
                                        label: (
                                            <>
                                                <RedoOutlined /> 重做
                                            </>
                                        ),
                                    },
                                    {
                                        key: "3",
                                        label: (
                                            <>
                                                <FileSearchOutlined /> 查找
                                            </>
                                        ),
                                    },
                                ],
                            }}
                        >
                            <Button type="text">
                                <MenuOutlined />
                                <span>更多</span>
                            </Button>
                        </Dropdown>
                    </div>
                    <div className="common-actions">
                        <Button
                            type="text"
                            onClick={onCheckClick}
                        >
                            {checking ? <LoadingOutlined /> : <ValidateAllOutlined />}
                            <span>深度检查</span>
                        </Button>
                        <Button
                            type="text"
                            onClick={onDebugClick}
                        >
                            {debugPreparing ? <LoadingOutlined /> : <ExecuteAllOutlined />}
                            <span>调试</span>
                        </Button>
                        <Button
                            type="text"
                            onClick={changeModalOpen(true, setPublishModalOpen)}
                        >
                            {publishModalOpen ? <LoadingOutlined /> : <CommitAllOutlined />}
                            <span>部署</span>
                        </Button>
                        <Button
                            type="text"
                            onClick={navigateToOperation}
                        >
                            <NewTabOutlined />
                            <span>前往运维</span>
                        </Button>
                    </div>
                    <DebugModal
                        open={debugModalOpen}
                        onCancel={changeModalOpen(false, setDebugModalOpen)}
                    />
                    <PublishModal
                        open={publishModalOpen}
                        onCancel={changeModalOpen(false, setPublishModalOpen)}
                        onOk={onPublishConfirm}
                    />
                    <SaveAsModal
                        open={saveAsModalOpen}
                        onCancel={changeModalOpen(false, setSaveAsModalOpen)}
                    />
                    <CreateTemporaryTableModal
                        open={templateModalOpen}
                        onCancel={changeModalOpen(false, setTemplateModalOpen)}
                    />
                </>
            ) : (
                <>
                    <div className="content-actions">
                        <Button
                            type="text"
                            onClick={changeModalOpen(true, setDraftModalOpen)}
                        >
                            <FileAddOutlined />
                            <span>新建</span>
                        </Button>
                    </div>
                </>
            )}
            {contextHolder}
            <CreateDraftModal
                open={draftModalOpen}
                onCancel={changeModalOpen(false, setDraftModalOpen)}
            />
        </div>
    );
};

export default ToolBar;
