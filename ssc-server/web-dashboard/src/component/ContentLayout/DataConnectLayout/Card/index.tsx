import { Card, Divider, Space } from "antd"
import { NewTabOutlined } from "../../../Icon"
import './index.sass'
import Paragraph from "antd/es/typography/Paragraph"

type ConnectorType = "结果表" | "源表" | "维表";

export interface CardProps {
    icon: React.ReactNode;
    desc: string;
    type?: ConnectorType[];
    hoverable?:boolean;
}



const Card2 = (props: CardProps) => {
    return (
        <Card className="connector-card" hoverable={props.hoverable}>
            <div className="card-content">
                <div className="icon">
                    {props.icon}
                </div>
                <Paragraph className="desc" ellipsis>
                    {props.desc}
                </Paragraph>
                {
                    props.type
                        ? (
                            <div className="docs-link">
                                <span className="prefix">可作为:</span>
                                <span className="key">
                                    <a>
                                        <Space size={4}>
                                            {
                                                props.type
                                                    .map(item => (<span>{item}</span>))
                                                    .reduce((accu, elem) => {
                                                        return <>
                                                            {accu}
                                                            <Divider type="vertical" />
                                                            {elem}
                                                        </>
                                                    })
                                            }
                                            <NewTabOutlined />
                                        </Space>
                                    </a>
                                </span>
                            </div>
                        )
                        : null
                }
            </div>
        </Card>
    )
};

export default Card2;