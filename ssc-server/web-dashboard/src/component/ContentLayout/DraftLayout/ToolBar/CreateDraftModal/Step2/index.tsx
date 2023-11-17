import { Col, Divider, Form, FormInstance, Input, Row, Select, Space, Tag, Typography } from "antd";
import { ArrowLeftOutlined } from "../../../../../Icon";
import "./index.sass";
import ScrollPin from "../../../../../ScrollPin";
import { useRef } from "react";
import MonacoEditor from "../../../../../MonacoEditor";
import { CardTemplate } from "../Step1";
import dayjs from "dayjs";
import DirectorySelect from "../../../../../DirectorySelect";
const { Paragraph } = Typography;

interface Step2Props {
    onBackwardClick: () => void;
    template?: CardTemplate;
    form: FormInstance<any>;
}

const Step2 = (props: Step2Props) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const editorDidMount = (editor: any) => {
        editor.layout();
    };

    return (
        <div className="create-draft-step2">
            <div className="title">
                <ArrowLeftOutlined onClick={props.onBackwardClick} /> 创建表
            </div>
            <ScrollPin containerRef={contentRef} />
            <Row
                className="content"
                ref={contentRef}
            >
                <Form
                    size="small"
                    form={props.form}
                    component={false}
                    wrapperCol={{ span: 24 }}
                >
                    <Col
                        span={12}
                        className="left-panel"
                    >
                        <div className="panel-title">模板介绍</div>
                        <div className="panel-content introduction">
                            <Paragraph>{props.template?.desc}</Paragraph>
                            <div className="category">
                                <Space>
                                    <span className="key">类别:</span>
                                    <span className="value">{props.template?.classification}</span>
                                </Space>
                                <Divider type="vertical" />
                                <Space>
                                    <span className="key">类型:</span>
                                    <span className="value">{props.template?.type}</span>
                                </Space>
                            </div>
                        </div>
                        <Divider style={{ marginTop: 0, marginBottom: 16 }} />
                        <div className="draft-form">
                            <div className="panel-title">作业信息</div>
                            <div className="panel-content">
                                <Form.Item
                                    label="文件名称"
                                    name="name"
                                    initialValue={`${props.template?.fileName}-${dayjs().format("YYYYMMDDHHmmss")}`}
                                    rules={[
                                        {
                                            pattern: /[\w\d_-]{1,128}/,
                                            message:
                                                "只支持字母（大小写）、数字、下划线（_）、横杠（-），长度不超过 128",
                                        },
                                        {
                                            required: true,
                                            message: "文件名称是必填项",
                                        },
                                    ]}
                                >
                                    <Input style={{ width: "100%" }} />
                                </Form.Item>
                                <Form.Item
                                    label="存储位置"
                                    name="location"
                                    initialValue="0"
                                    valuePropName="selectedKey"
                                >
                                    <DirectorySelect />
                                </Form.Item>
                                <Form.Item
                                    label="引擎版本"
                                    name="version"
                                    initialValue="1.17"
                                >
                                    <Select
                                        optionLabelProp="title"
                                        options={[
                                            {
                                                label: "推荐版本",
                                                options: [
                                                    {
                                                        title: "vvr-8.0.1-flink-1.17",
                                                        value: "1.17",
                                                        label: (
                                                            <>
                                                                vvr-8.0.1-flink-1.17
                                                                <Tag
                                                                    className="ant-select-item-option-content-tag"
                                                                    color="#00a700cc"
                                                                >
                                                                    RECOMMEND
                                                                </Tag>
                                                            </>
                                                        ),
                                                    },
                                                ],
                                            },
                                            {
                                                label: "稳定版本",
                                                options: [
                                                    {
                                                        title: "vvr-6.0.7-flink-1.15",
                                                        value: "1.15",
                                                        label: (
                                                            <>
                                                                vvr-6.0.7-flink-1.15{" "}
                                                                <Tag
                                                                    className="ant-select-item-option-content-tag"
                                                                    color=""
                                                                >
                                                                    STABLE
                                                                </Tag>
                                                            </>
                                                        ),
                                                    },
                                                    {
                                                        title: "vvr-4.0.18-flink-1.13",
                                                        value: "1.13",
                                                        label: (
                                                            <>
                                                                vvr-4.0.18-flink-1.13{" "}
                                                                <Tag
                                                                    className="ant-select-item-option-content-tag"
                                                                    color=""
                                                                >
                                                                    STABLE
                                                                </Tag>
                                                            </>
                                                        ),
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </Col>
                    <Col
                        span={12}
                        className="right-panel"
                    >
                        <div className="panel-title">SQL 预览</div>
                        <div className="panel-content editor-container">
                            <Form.Item
                                name="content"
                                initialValue={props.template?.templateContent}
                                noStyle
                            >
                                <MonacoEditor
                                    className="template-showcase"
                                    options={{
                                        minimap: {
                                            enabled: false,
                                        },
                                        selectOnLineNumbers: true,
                                        lineNumbersMinChars: 2,
                                        lineDecorationsWidth: 0,
                                        wordWrap: "on",
                                        readOnly: true,
                                        scrollBeyondLastLine: false,
                                    }}
                                    editorDidMount={editorDidMount}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Form>
            </Row>
        </div>
    );
};

export default Step2;
