import { Button } from "antd"
import { CodeOutlined, CommitAllOutlined, CopyOutlined, ExecuteAllOutlined, FileAddOutlined, LoadingOutlined, MenuOutlined, NewTabOutlined, PicLeftOutlined, SaveOutlined, ValidateAllOutlined } from '../../../Icon'
import './index.sass'
import DebugModal from "./DebugModal";
import { useState } from "react";
import PublishModal from "./PublishModal";

interface ToolBarProps {
    isOpenFile: boolean;
}

const ToolBar = (props: ToolBarProps) => {
    const [debugModalOpen, setDebugModalOpen] = useState<boolean>(false);
    const [publishModalOpen, setPublishModalOpen] = useState<boolean>(false);

    const changeDebugModalOpen = (open: boolean) => {
        return () => {
            setDebugModalOpen(open);
        }
    };

    const changePublishModalOpen = (open: boolean) => {
        return () => {
            setPublishModalOpen(open);
        }
    };

    return (
        <div className="editor-tool-bar">
            {
                props.isOpenFile ? (
                    <>
                        <div className="content-actions">
                            <Button type="text">
                                <FileAddOutlined />
                                <span>新建</span>
                            </Button>
                            <Button type="text">
                                <CopyOutlined />
                                <span>另存为</span>
                            </Button>
                            <Button type="text">
                                <SaveOutlined />
                                <span>保存</span>
                            </Button>
                            <Button type="text">
                                <CodeOutlined />
                                <span>添加临时表</span>
                            </Button>
                            <Button type="text">
                                <PicLeftOutlined />
                                <span>格式化</span>
                            </Button>
                            <Button type="text">
                                <MenuOutlined />
                                <span>更多</span>
                            </Button>
                        </div>
                        <div className="common-actions">
                            <Button type="text">
                                <ValidateAllOutlined />
                                <span>深度检查</span>
                            </Button>
                            <Button type="text" onClick={changeDebugModalOpen(true)}>
                                <ExecuteAllOutlined />
                                <span>调试</span>
                            </Button>
                            <Button type="text" onClick={changePublishModalOpen(true)}>
                                {publishModalOpen ? <LoadingOutlined /> : <CommitAllOutlined />}
                                <span>部署</span>
                            </Button>
                            <Button type="text">
                                <NewTabOutlined />
                                <span>前往运维</span>
                            </Button>
                        </div>
                        <DebugModal open={debugModalOpen} onCancel={changeDebugModalOpen(false)} />
                        <PublishModal open={publishModalOpen} onCancel={changePublishModalOpen(false)} />
                    </>
                )
                    : (
                        <>
                            <div className="content-actions">
                                <Button type="text">
                                    <FileAddOutlined />
                                    <span>新建</span>
                                </Button>
                            </div>
                        </>
                    )
            }

        </div>
    )
};

export default ToolBar;