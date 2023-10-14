import { Button, Tabs, TabsProps } from 'antd';
import { DashboardFilled, FullscreenOutlined, MinusOutlined, PauseOutlined, ResumeOutlined, Stop2Outlined, TableOutlined } from '../../../../../Icon';
import './index.sass'
import StreamResultTable from './StreamResultTable';
import { useEffect, useState } from 'react';
import MonacoEditor from '../../../../../MonacoEditor';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: <span><TableOutlined /> print-table</span>,
        children: <StreamResultTable />
    }
];

interface DebugResultPanelProps {
    onMinusClick: () => void;
}

const DebugResultPanel = (props: DebugResultPanelProps) => {
    const [showResult, setShowResult] = useState<boolean>(false);
    useEffect(() => {
        const id = setInterval(() => {
            setShowResult(true);
        }, 5000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="debug-result-panel bottom-pop-panel">
            <div className="header">
                <div className="title">结束: Untitled-stream-sql</div>
                <div className="actions">
                    <MinusOutlined onClick={props.onMinusClick}/>
                </div>
            </div>
            <div className="result-wrap">
                {
                    showResult ?
                        (
                            <>
                                <div className="control-actions">
                                    <Button className="action resume" icon={<ResumeOutlined />} type="text" />
                                    <Button className="action pause" icon={<PauseOutlined />} type="text" />
                                    <Button className="action stop" icon={<Stop2Outlined />} type="text" />
                                    <Button className="action flink" icon={<DashboardFilled />} type="text" />
                                    <Button className="action expand" icon={<FullscreenOutlined />} type="text" />
                                </div>
                                <div className="result"> {/* https://perspective.finos.org/docs/table/ */}
                                    <Tabs
                                        className="print-tabs"
                                        items={items}
                                        size='small'
                                        defaultActiveKey="1"
                                    />
                                </div>
                            </>
                        )
                        : (
                            <MonacoEditor
                                value={'2023-09-21T14:00:47.238+08:00 - Loading data, please wait...'}
                                options={{
                                    lineNumbers: "off",
                                    lineDecorationsWidth: 0,
                                    lineNumbersMinChars: 0,
                                    minimap: {
                                        enabled: false
                                    },
                                    readOnly: true,
                                    scrollBeyondLastLine: false,
                                }}
                            />
                        )
                }

            </div>
        </div>
    )
};

export default DebugResultPanel;