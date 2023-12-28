import { MinusOutlined } from "../../../../../../../component/Icon";
import "./index.sass";

interface ResultPanel {
    onMinusClick: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
}

const ResultPanel = (props: ResultPanel) => {
    return (
        <div className={`bottom-pop-panel ${props.className}`}>
            <div className="header">
                <div className="title">{props.title}</div>
                <div className="actions">
                    <MinusOutlined onClick={props.onMinusClick} />
                </div>
            </div>
            <div className="result-wrap">{props.children}</div>
        </div>
    );
};

export default ResultPanel;
