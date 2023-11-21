import { useEffect, useState } from "react";
import { ExclamationCircleOutlined, ProfileOutlined } from "../../../../../../component/Icon";
import "./index.sass";
import DebugResultPanel from "./DebugResultPanel";
import ProblemPanel from "./ProblemPanel";

interface BottomTabBarProps {
    onPanelChange: (panel: React.ReactNode) => void;
}

const BottomTabBar = (props: BottomTabBarProps) => {
    const [activeLabel, setActiveLabel] = useState<"debug" | "problem" | undefined>();

    useEffect(() => {
        const handle: EventListenerOrEventListenerObject = (e: any) => {
            setActiveLabel(e.detail?.label);
        };
        document.addEventListener("bottom-label-change", handle);
        return () => document.removeEventListener("bottom-label-change", handle);
    }, []);

    useEffect(() => {
        if (activeLabel === "debug") {
            props.onPanelChange(<DebugResultPanel onMinusClick={changeActiveLabel(activeLabel)} />);
        } else if (activeLabel === "problem") {
            props.onPanelChange(<ProblemPanel onMinusClick={changeActiveLabel(activeLabel)} />);
        } else {
            props.onPanelChange(undefined);
        }
    }, [activeLabel]);

    const changeActiveLabel = (label: "debug" | "problem" | undefined) => {
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
        </div>
    );
};

export default BottomTabBar;
