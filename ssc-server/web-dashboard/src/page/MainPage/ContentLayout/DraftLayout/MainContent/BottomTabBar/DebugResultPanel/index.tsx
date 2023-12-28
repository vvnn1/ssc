import { Button, Tabs, TabsProps, message } from "antd";
import {
    CheckCircleOutlined,
    DashboardFilled,
    ExclamationCircleOutlined,
    FullscreenOutlined,
    PauseOutlined,
    ResumeOutlined,
    Stop2Outlined,
    TableOutlined,
} from "../../../../../../../component/Icon";
import "./index.sass";
import StreamResultTable from "./StreamResultTable";
import { useEffect, useState } from "react";
import MonacoEditor from "../../../../../../../component/MonacoEditor";
import ResultPanel from "../ResultPanel";

const items: TabsProps["items"] = [
    {
        key: "1",
        label: (
            <span>
                <TableOutlined /> print-table
            </span>
        ),
        children: <StreamResultTable />,
    },
];

interface DebugResultPanelProps {}

const DebugResultPanel = (props: DebugResultPanelProps & Pick<ResultPanel, "onMinusClick">) => {
    const [showResult, setShowResult] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        messageApi.info({
            icon: <></>,
            content: (
                <>
                    <ExclamationCircleOutlined color="#0064c8" />
                    SQL 任务开始执行调试
                </>
            ),
        });
        const id = setInterval(() => {
            messageApi.success({
                icon: <></>,
                content: (
                    <>
                        <CheckCircleOutlined color="#00a700" />
                        SQL 任务调试执行结束
                    </>
                ),
            });
            setShowResult(true);
            clearInterval(id);
        }, 5000);
    }, []);

    return (
        <ResultPanel
            className="debug-result-panel"
            onMinusClick={props.onMinusClick}
            title="结果: Untitled-stream-sql"
        >
            {showResult ? (
                <>
                    <div className="control-actions">
                        <Button
                            className="action resume"
                            icon={<ResumeOutlined />}
                            type="text"
                        />
                        <Button
                            className="action pause"
                            icon={<PauseOutlined />}
                            type="text"
                        />
                        <Button
                            className="action stop"
                            icon={<Stop2Outlined />}
                            type="text"
                        />
                        <Button
                            className="action flink"
                            icon={<DashboardFilled />}
                            type="text"
                        />
                        <Button
                            className="action expand"
                            icon={<FullscreenOutlined />}
                            type="text"
                        />
                    </div>
                    <div className="result">
                        {/* https://perspective.finos.org/docs/table/ */}
                        <Tabs
                            className="print-tabs"
                            items={items}
                            size="small"
                            defaultActiveKey="1"
                        />
                    </div>
                </>
            ) : (
                <MonacoEditor
                    value={"2023-09-21T14:00:47.238+08:00 - Loading data, please wait..."}
                    options={{
                        lineNumbers: "off",
                        lineDecorationsWidth: 0,
                        lineNumbersMinChars: 0,
                        minimap: {
                            enabled: false,
                        },
                        readOnly: true,
                        scrollBeyondLastLine: false,
                    }}
                />
            )}
            {contextHolder}
        </ResultPanel>
    );
};

export default DebugResultPanel;
