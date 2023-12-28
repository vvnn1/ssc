import { useEffect, useState } from "react";
import { CheckCircleOutlined, ExclamationCircleOutlined, ProfileOutlined } from "../../../../../../component/Icon";
import "./index.sass";
import DebugResultPanel from "./DebugResultPanel";
import ProblemPanel from "./ProblemPanel";
import AnalysePanel from "./AnalysePanel";

interface BottomTabBarProps {
    onPanelChange: (panel: React.ReactNode) => void;
}

const BottomTabBar = (props: BottomTabBarProps) => {
    const [activeLabel, setActiveLabel] = useState<string | undefined>();

    useEffect(() => {
        const handle: EventListenerOrEventListenerObject = (e: any) => {
            setActiveLabel(e.detail?.label);
        };
        document.addEventListener("top-tool-click", handle);
        return () => document.removeEventListener("top-tool-click", handle);
    }, []);

    useEffect(() => {
        switch (activeLabel) {
            case "debug":
                props.onPanelChange(<DebugResultPanel onMinusClick={changeActiveLabel(activeLabel)} />);
                break;
            case "problem":
                props.onPanelChange(<ProblemPanel onMinusClick={changeActiveLabel(activeLabel)} />);
                break;
            case "analyse":
                props.onPanelChange(<AnalysePanel onMinusClick={changeActiveLabel(activeLabel)} />);
                break;
            default:
                props.onPanelChange(undefined);
        }
    }, [activeLabel]);

    const changeActiveLabel = (label: string | undefined) => {
        return () => {
            setActiveLabel(activeLabel => (activeLabel === label ? undefined : label));
        };
    };

    return (
        <div className="tabs-bar-bottom">
            <div
                className={`tabs-bar-bottom-label debug ${
                    activeLabel === "debug" ? "tabs-bar-tab-label-activated" : ""
                }`}
                onClick={changeActiveLabel("debug")}
            >
                <span className="tabs-bar-tab-icon">
                    <ProfileOutlined />
                </span>
                <span className="tabs-bar-tab-title">结果</span>
            </div>
            <div
                className={`tabs-bar-bottom-label problem ${
                    activeLabel === "problem" ? "tabs-bar-tab-label-activated" : ""
                }`}
                onClick={changeActiveLabel("problem")}
            >
                <span className="tabs-bar-tab-icon">
                    <ExclamationCircleOutlined />
                </span>
                <span className="tabs-bar-tab-title">问题</span>
            </div>
            <div
                className={`tabs-bar-bottom-label analyse ${
                    activeLabel === "analyse" ? "tabs-bar-tab-label-activated" : ""
                }`}
                onClick={changeActiveLabel("analyse")}
            >
                <span className="tabs-bar-tab-icon">
                    <CheckCircleOutlined />
                </span>
                <span className="tabs-bar-tab-title">解析</span>
            </div>
        </div>
    );
};

export default BottomTabBar;
