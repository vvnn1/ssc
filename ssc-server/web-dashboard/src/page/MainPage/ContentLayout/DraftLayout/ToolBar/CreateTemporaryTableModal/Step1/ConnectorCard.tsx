import { Card, Divider, Space, Tooltip, Typography } from "antd";
import { NewTabOutlined } from "../../../../../../../component/Icon";
import { useContext } from "react";
import { DocumentContext } from "../../../../..";

type ConnectorType = "结果表" | "源表" | "维表";

export interface CardProps {
    icon: React.ReactNode;
    desc: string;
    type?: ConnectorType[];
    hoverable?: boolean;
}

const { Paragraph } = Typography;

const ConnectorCard = (props: CardProps) => {
    const setDocumentOpen = useContext(DocumentContext);
    return (
        <Card
            className="connector-card"
            hoverable={props.hoverable}
        >
            <div className="card-content">
                <div className="icon">{props.icon}</div>
                <Paragraph
                    className="desc"
                    ellipsis
                >
                    {props.desc}
                </Paragraph>
                {props.type ? (
                    <div className="docs-link">
                        <span className="key">
                            <Tooltip title="可作为以下表使用">
                                <a onClick={() => setDocumentOpen(true)}>
                                    <Space size={4}>
                                        {props.type
                                            .map((item, index) => <span key={index}>{item}</span>)
                                            .reduce((accu, elem) => {
                                                return (
                                                    <>
                                                        {accu}
                                                        <Divider type="vertical" />
                                                        {elem}
                                                    </>
                                                );
                                            })}
                                        <NewTabOutlined />
                                    </Space>
                                </a>
                            </Tooltip>
                        </span>
                    </div>
                ) : null}
            </div>
        </Card>
    );
};

export default ConnectorCard;
