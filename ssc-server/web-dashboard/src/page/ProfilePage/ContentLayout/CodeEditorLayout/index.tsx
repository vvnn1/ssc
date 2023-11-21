import { Button, Checkbox, CheckboxProps, Col, Divider, Form, InputNumber, Row, Select, Space, Tooltip } from "antd";
import "./index.sass";
import { useState } from "react";
import { QuestionCircleOutlined } from "../../../../component/Icon";
import MonacoEditor from "../../../../component/MonacoEditor";

const lineBreakSelect = [
    {
        label: "Off",
        value: "off",
    },
    {
        label: "On",
        value: "on",
    },
    {
        label: "Word",
        value: "word",
    },
    {
        label: "Bounded",
        value: "bounded",
    },
];

const CodeEditorLayout = () => {
    const [fontSize, setFontSize] = useState<number | null>(12);
    const [showLineNumber, setShowLineNumber] = useState<boolean>(true);
    const [showMiniMap, setShowMiniMap] = useState<boolean>(true);
    const [autoSave, setAutoSave] = useState<boolean>(true);

    const checkedChangeWrapper = (onCheckedChange: (chcked: boolean) => void): CheckboxProps["onChange"] => {
        return ({ target: { checked } }) => {
            onCheckedChange(checked);
        };
    };

    return (
        <div className="code-editor-layout">
            <div className="header">
                <div className="title">编辑器配置</div>
                <div className="actions">
                    <Space>
                        <Button type="primary">应用</Button>
                        <Button>重置</Button>
                    </Space>
                </div>
            </div>
            <div className="content">
                <h4>
                    <span>编辑器</span>
                </h4>
                <Row>
                    <Col flex="2 1 0%">
                        <Form size="small">
                            <Form.Item label="字体大小">
                                <div className="align-right-container">
                                    <InputNumber
                                        value={fontSize}
                                        style={{ width: 100 }}
                                        onChange={setFontSize}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item label="自动折行">
                                <div className="align-right-container">
                                    <Select
                                        options={lineBreakSelect}
                                        style={{ width: 100 }}
                                        defaultValue="off"
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <Checkbox
                                    checked={showLineNumber}
                                    onChange={checkedChangeWrapper(setShowLineNumber)}
                                >
                                    显示行号
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Checkbox
                                    checked={showMiniMap}
                                    onChange={checkedChangeWrapper(setShowMiniMap)}
                                >
                                    显示 minimap
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Checkbox
                                    checked={autoSave}
                                    onChange={checkedChangeWrapper(setAutoSave)}
                                >
                                    开启自动保存
                                </Checkbox>
                            </Form.Item>

                            {autoSave ? (
                                <Form.Item
                                    label={
                                        <>
                                            自动保存时间&nbsp;
                                            <Tooltip title="检测到上次保存时间间隔超过 1 分钟时，我们将为您额外进行一次自动保存。">
                                                <QuestionCircleOutlined />
                                            </Tooltip>
                                        </>
                                    }
                                >
                                    <div className="align-right-container">
                                        <InputNumber
                                            value={3000}
                                            addonAfter="ms"
                                            style={{ width: 140 }}
                                        />
                                    </div>
                                </Form.Item>
                            ) : null}
                        </Form>
                    </Col>
                    <Col
                        flex="3 1 0%"
                        className="editor-preview"
                    >
                        <MonacoEditor
                            options={{
                                fontSize: fontSize!,
                                lineNumbersMinChars: 5,
                                lineDecorationsWidth: 0,
                                lineNumbers: showLineNumber ? "on" : "off",
                                minimap: {
                                    enabled: showMiniMap,
                                },
                            }}
                            language="mysql"
                            value={`-- A source table stored in a filesystem
CREATE TABLE Orders_in_file (
    user BIGINT,
    product STRING,
    order_time_string STRING,
    order_time AS to_timestamp(order_time)
)
PARTITIONED BY user
WITH (
    'connector' = 'filesystem'
    'path' = '...'
);

-- A corresponding table we want to store in kafka
CREATE TABLE Orders_in_kafka (
    -- Add watermark definition
    WATERMARK FOR order_time AS order_time - INTERVAL '5' SECOND
) WITH (
    'connector': 'kafka'
    ...
)
LIKE Orders_in_file (
    -- Exclude everything besides the computed columns which we need to generate the watermark for.
    -- We do not want to have the partitions or filesystem options as those do not apply to kafka.
    EXCLUDING ALL
    INCLUDING GENERATED
);`}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CodeEditorLayout;
