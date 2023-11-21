import { Card } from "antd";

import "./index.sass";

interface SettingCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const SettingCard = (props: SettingCardProps) => {
    return (
        <Card
            size="small"
            title={props.title}
            bordered={false}
            className={props.className ? ["setting-card", props.className].join(" ") : "setting-card"}
        >
            {props.children}
        </Card>
    );
};

export default SettingCard;
