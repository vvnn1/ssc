import { useState } from "react";
import { ExclamationCircleOutlined, ProfileOutlined } from "../../../../Icon";
import './index.sass';
import DebugResultPanel from "./DebugResultPanel";
import ProblemPanel from "./ProblemPanel";


interface BottomTabBarProps {
    onPanelChange: (panel: React.ReactNode) => void;
}

const BottomTabBar = (props: BottomTabBarProps) => {

    const [activeLabel, setActiveLabel] = useState<string>();

    const changeActiveLabel = (label: string | undefined, activePanel?: React.ReactNode) => {
        return () => {
            if (activeLabel === label) {
                setActiveLabel(undefined);
                props.onPanelChange(undefined);
            } else {
                setActiveLabel(label);
                props.onPanelChange(activePanel);
            }
        }
    }

    const panel1 = <DebugResultPanel onMinusClick={changeActiveLabel(activeLabel)} />;
    const panel2 = <ProblemPanel onMinusClick={changeActiveLabel(activeLabel)} />;

    return (
        <div className="tabs-bar-bottom">
            <div className={`tabs-bar-bottom-label run ${activeLabel === 'run' ? 'tabs-bar-tab-label-activated' : ''}`} onClick={changeActiveLabel('run', panel1)}>
                <span className="tabs-bar-tab-icon">
                    <ProfileOutlined />
                </span>
                <span className="tabs-bar-tab-title">
                    结果
                </span>
            </div>
            <div className={`tabs-bar-bottom-label problem ${activeLabel === 'problem' ? 'tabs-bar-tab-label-activated' : ''}`} onClick={changeActiveLabel('problem', panel2)}>
                <span className="tabs-bar-tab-icon">
                    <ExclamationCircleOutlined />
                </span>
                <span className="tabs-bar-tab-title">
                    问题
                </span>
            </div>
        </div>
    )
};

export default BottomTabBar;