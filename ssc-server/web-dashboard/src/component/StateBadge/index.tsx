import { Tag } from 'antd';
import './index.sass'

interface StateBadgeProps {
    state: string;
}

const StateBadge = (props: StateBadgeProps) => {
    return (
        <Tag className="FINISHED">{props.state}</Tag>
    )
};
export default StateBadge;