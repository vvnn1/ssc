import { Card, Divider, Space, Typography } from "antd";
import { NewTabOutlined } from "../../../../../../../component/Icon";

type ConnectorType = "结果表" | "源表" | "维表";

export interface CardProps {
    icon: React.ReactNode;
    desc: string;
    type?: ConnectorType[];
    hoverable?: boolean;
}

const { Paragraph } = Typography;

const ConnectorCard = (props: CardProps) => {
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
                            <a>
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
                        </span>
                    </div>
                ) : null}
            </div>
        </Card>
    );
};

export default ConnectorCard;
