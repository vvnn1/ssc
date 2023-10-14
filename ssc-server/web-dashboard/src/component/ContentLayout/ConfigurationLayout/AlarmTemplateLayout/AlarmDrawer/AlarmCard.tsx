import { Card } from "antd";
import "./AlarmCard.sass"

interface AlarmCardProps {
    title: string;
    children: React.ReactNode
}

const AlarmCard = (props: AlarmCardProps) => {
    return (
        <Card
            size="small"
            title={props.title}
            bordered={false}
            className="alarm-card"
            bodyStyle={{padding: "16px 24px"}}
        >
            {props.children}
        </Card>
    )
}

export default AlarmCard;