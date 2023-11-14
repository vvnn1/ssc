import './index.sass'

interface SorceBadgeProps {
    model: 'disabled' | 'healthy';
    sorce: number;
}

const SorceBadge = (props: SorceBadgeProps) => {

    return (
        <span className={`sorce-badge ${props.model === 'healthy' ? 'hight' : 'disabled'}`}>{props.model === 'disabled' ? '-' : props.sorce}</span>
    )
};

export default SorceBadge;