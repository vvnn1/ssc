import { Col, Divider, Form, Input, Row, Select, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '../../../../../../../../Icon';
import './index.sass'
import ScrollPin from '../../../../../../../../ScrollPin';
import { useRef } from 'react';
import MonacoEditor from '../../../../../../../../MonacoEditor';
const { Paragraph } = Typography;


interface Step2Props {
    onBackwardClick: () => void;
}

const Step2 = (props: Step2Props) => {
    const value = `--****************************************************--
-- Author:         Write your name here
-- Created Time:   2023-08-31 16:00:32
-- Description:    Write your description here
-- Hints:          You can use SET statements to modify the configuration
--****************************************************--
            `;
    const contentRef = useRef<HTMLDivElement>(null);

    const editorDidMount = (editor: any) => {
        editor.layout();
    }
    return (
        <div className="create-draft-step2">
            <div className="title">
                <ArrowLeftOutlined onClick={props.onBackwardClick}/> 创建表
            </div>
            <ScrollPin containerRef={contentRef} />
            <Row className="content" ref={contentRef}>
                <Col span={12} className="left-panel">
                    <div className="panel-title">
                        模板介绍
                    </div>
                    <div className="panel-content introduction">
                        <Paragraph>
                            Flink的表不是内部表，不在内部维护，而是始终对外部系统进行操作。表定义分为两部分：表结构和连接器配置。表结构定义了表中的列名及其类型，是查询操作的对象。连接器配置包含在WITH子句中，定义支持该表的外部系统。模版中的Datagen连接器，在内存中连续生成数据。执行DDL创建表之后，您可以通过运行简单的SELECT语句来测试表是否正确创建。
                        </Paragraph>
                        <div className="category">
                            <Space>
                                <span className="key">类别:</span>
                                <span className="value">STREAM</span>
                            </Space>
                            <Divider type="vertical" />
                            <Space>
                                <span className="key">类型:</span>
                                <span className="value">SQL</span>
                            </Space>
                        </div>
                    </div>
                    <Divider style={{ marginTop: 0, marginBottom: 16 }} />
                    <div className="draft-form">
                        <div className="panel-title">作业信息</div>
                        <div className="panel-content">
                            <Form
                                layout="vertical"
                                size="small"
                            >
                                <Form.Item
                                    label="文件名称"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="存储位置"
                                >
                                    <Input />
                                    <div className="draft-tree-container">

                                    </div>
                                </Form.Item>
                                <Form.Item
                                    label="引擎版本"
                                >
                                    <Select />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
                <Col span={12} className='right-panel'>
                    <div className="panel-title">
                        SQL 预览
                    </div>
                    <div className='panel-content editor-container'>
                        <MonacoEditor
                            className="template-showcase"
                            options={{
                                minimap: {
                                    enabled: false
                                },
                                selectOnLineNumbers: true,
                                lineNumbersMinChars: 2,
                                lineDecorationsWidth: 0,
                                wordWrap: 'on',
                                readOnly: false,
                                scrollBeyondLastLine: false,
                                
                            }}
                            editorDidMount={editorDidMount}
                            value={value}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
};


export default Step2;