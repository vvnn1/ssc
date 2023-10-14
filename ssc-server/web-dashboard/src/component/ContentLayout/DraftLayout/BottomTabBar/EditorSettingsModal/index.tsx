import { Checkbox, CheckboxProps, Col, Divider, Form, InputNumber, Modal, ModalProps, Row, Select, Tooltip } from 'antd';
import './index.sass'
import MonacoEditor from '../../../../MonacoEditor';
import { QuestionCircleOutlined } from '../../../../Icon';
import { useState } from 'react';


const lineBreakSelect = [
    {
        label: 'Off',
        value: 'off'
    },
    {
        label: 'On',
        value: 'on'
    },
    {
        label: 'Word',
        value: 'word'
    },
    {
        label: 'Bounded',
        value: 'bounded'
    },
];

const EditorSettingsModal = (props: ModalProps) => {
    const [fontSize, setFontSize] = useState<number | null>(12);
    const [showLineNumber, setShowLineNumber] = useState<boolean>(true);
    const [showMiniMap, setShowMiniMap] = useState<boolean>(true);
    const [autoSave, setAutoSave] = useState<boolean>(true);

    const checkedChangeWrapper = (onCheckedChange: (chcked: boolean) => void): CheckboxProps["onChange"] => {
        return ({ target: { checked } }) => {
            onCheckedChange(checked);
        }
    }
    return (
        <Modal
            {...props}
            title="设置"
            width={800}
            className="editor-settings-modal"
            rootClassName='ant-modal-wrap-rtl'
            okText="应用"
            cancelText="关闭"
        >
            <Divider orientation='left' orientationMargin={0} children="编辑器" className="title-divider" />
            <Row

            >
                <Col flex='2 1 0%'>
                    <Form
                        size='small'
                    >
                        <Form.Item
                            label='字体大小'
                        >
                            <InputNumber
                                value={fontSize}
                                style={{ width: 100 }}
                                onChange={setFontSize}
                            />
                        </Form.Item>

                        <Form.Item
                            label='自动折行'
                        >
                            <Select
                                options={lineBreakSelect}
                                style={{ width: 100 }}
                                defaultValue='off'
                            />
                        </Form.Item>

                        <Form.Item>
                            <Checkbox children="显示行号" checked={showLineNumber} onChange={checkedChangeWrapper(setShowLineNumber)} />
                        </Form.Item>

                        <Form.Item>
                            <Checkbox children="显示 minimap" checked={showMiniMap} onChange={checkedChangeWrapper(setShowMiniMap)} />
                        </Form.Item>

                        <Form.Item>
                            <Checkbox children="开启自动保存" checked={autoSave} onChange={checkedChangeWrapper(setAutoSave)} />
                        </Form.Item>

                        {
                            autoSave
                                ? (
                                    <Form.Item
                                        label={<>自动保存时间&nbsp;<Tooltip title="检测到上次保存时间间隔超过 1 分钟时，我们将为您额外进行一次自动保存。"><QuestionCircleOutlined /></Tooltip></>}
                                    >
                                        <InputNumber
                                            value={3000}
                                            addonAfter="ms"
                                            style={{ width: 140 }}
                                        />
                                    </Form.Item>
                                ) : (
                                    null
                                )
                        }
                    </Form>
                </Col>
                <Col flex='3 1 0%' className='editor-preview'>
                    <MonacoEditor
                        options={{
                            fontSize: fontSize!,
                            lineNumbersMinChars: 5,
                            lineDecorationsWidth: 0,
                            lineNumbers: showLineNumber ? 'on' : 'off',
                            minimap: {
                                enabled: showMiniMap
                            }

                        }}
                        value={
                            `-- A source table stored in a filesystem
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
);`
                        }

                    />
                </Col>
            </Row>
        </Modal>
    )
};

export default EditorSettingsModal;