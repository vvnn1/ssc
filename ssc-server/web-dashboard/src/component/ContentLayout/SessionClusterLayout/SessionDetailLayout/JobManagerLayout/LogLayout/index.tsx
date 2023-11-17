import { Button, Popconfirm, Select } from "antd";
import "./index.sass";
import { DownloadOutlined, FullscreenOutlined, SyncOutlined } from "../../../../../Icon";
import { useState } from "react";
import MonacoEditor from "../../../../../MonacoEditor";

const LogLayout = () => {
    const [selectDisabled, setSelectDisabled] = useState<boolean>(true);

    const changeSelectDisabled = (disabled: boolean) => {
        return () => {
            setSelectDisabled(disabled);
        };
    };

    return (
        <div className="jobmanager-log-layout">
            <div className="log-level-container">
                <div>
                    <span>日志级别 :</span>
                    <Select
                        className="level-select"
                        size="small"
                        disabled={selectDisabled}
                    />
                    {selectDisabled ? (
                        <Popconfirm
                            title="该日志后续将以修改后类型输出"
                            onConfirm={changeSelectDisabled(false)}
                            okText="确认"
                            cancelText="取消"
                            style={{ width: 250 }}
                            overlayClassName="ant-popover-rtl"
                        >
                            <Button
                                type="link"
                                size="small"
                            >
                                编辑
                            </Button>
                        </Popconfirm>
                    ) : (
                        <>
                            <Button
                                type="link"
                                onClick={changeSelectDisabled(true)}
                                size="small"
                            >
                                确定
                            </Button>
                            <Button
                                type="link"
                                onClick={changeSelectDisabled(true)}
                                size="small"
                            >
                                取消
                            </Button>
                        </>
                    )}
                </div>
                <div className="actions">
                    <Button size="small">
                        <SyncOutlined />
                    </Button>
                    <Button size="small">
                        <DownloadOutlined />
                    </Button>
                    <Button
                        size="small"
                        icon={<FullscreenOutlined />}
                    />
                </div>
            </div>
            <div className="log-preview">
                <MonacoEditor
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        selectOnLineNumbers: true,
                        lineNumbersMinChars: 5,
                        lineDecorationsWidth: 0,
                        wordWrap: "on",
                        readOnly: false,
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>
        </div>
    );
};

export default LogLayout;
