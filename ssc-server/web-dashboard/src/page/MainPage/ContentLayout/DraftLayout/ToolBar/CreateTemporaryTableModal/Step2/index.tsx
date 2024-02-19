import { Col, Divider, Row, Typography } from "antd";
import "./index.sass";
import { NewTabOutlined } from "../../../../../../../component/Icon";
import MonacoEditor from "../../../../../../../component/MonacoEditor";

const { Paragraph } = Typography;

interface Step2Props {
    hidden: boolean;
    desc: string;
    type?: string[];
    classification: string;
    version: string;
    template: string;
}

const Step2 = (props: Step2Props) => {
    return (
        <div
            hidden={props.hidden}
            className="create-temporary-table-modal-step-2"
        >
            <Row className="demo-platform">
                <Col
                    className="left-panel"
                    span={9}
                >
                    <Paragraph
                        className="title"
                        ellipsis={{ rows: 3 }}
                    >
                        {props.desc}
                    </Paragraph>
                    <div className="properties">
                        <span className="key">类型:</span>
                        <span className="value">{props.classification}</span>
                    </div>
                    <div className="properties">
                        <span className="key">版本:</span>
                        <span className="value">{props.version}</span>
                    </div>
                    <div className="properties">
                        <span className="key">文档:</span>
                        <span className="value">
                            {props.type
                                ?.map((t, index) => (
                                    <a key={index}>
                                        {t} <NewTabOutlined />
                                    </a>
                                ))
                                .reduce((accu, elem) => {
                                    return (
                                        <>
                                            {accu}
                                            <Divider type="vertical" />
                                            {elem}
                                        </>
                                    );
                                })}
                        </span>
                    </div>
                </Col>
                <Col
                    className="right-panel"
                    span={15}
                >
                    <MonacoEditor
                        options={{
                            minimap: {
                                enabled: false,
                            },

                            lineNumbersMinChars: 5,
                            lineDecorationsWidth: 0,
                        }}
                        value={props.template}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Step2;
