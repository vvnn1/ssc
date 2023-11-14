import { Card, Divider, Space } from "antd";
import { Typography } from 'antd';
import './index.sass'

const { Paragraph } = Typography;


export interface CardProps {
    icon: React.ReactNode;
    title: string;
    content: string;
    classification: "STREAM" | "BATCH";
    type: "SQL";
    onClick?: () => void;
}

const DraftCard = (props: CardProps) => {
    return (
        <Card
            className="draft-template-card"
            onClick={props.onClick}
            hoverable
        >
            <div className="title">
                <h4>
                    <div className="template-icon">{props.icon}</div>
                    <span className="template-title">{props.title}</span>
                </h4>
            </div>
            <div className="content"><Paragraph ellipsis={{rows: 3}}>{props.content}</Paragraph></div>
            <div className="footer">
                <Space>
                    <span className="key">类别:</span>
                    <span className="value">{props.classification === 'STREAM' ? '流' : '批'}</span>
                </Space>
                <Divider type="vertical" />
                <Space>
                    <span className="key">类型:</span>
                    <span className="value">{props.type}</span>
                </Space>
            </div>
        </Card>
    )
}

export default DraftCard;