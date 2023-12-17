import { Radio } from "antd";
import { DarkTheme, DefaultTheme, DimmedTheme, LightTheme } from "../ThemeSketch";
import "./index.sass";
import { useState } from "react";
import { radioChangeWrapper } from "../../../../../util";

const switchTheme = (key: string | undefined): React.ReactNode => {
    switch (key) {
        case "default":
            return <DefaultTheme />;
        case "light":
            return <LightTheme />;
        case "dimmed":
            return <DimmedTheme />;
        case "dark":
            return <DarkTheme />;
        default:
            return <DefaultTheme />;
    }
};

const switchName = (key: string | undefined): string => {
    switch (key) {
        case "default":
            return "默认主题";
        case "light":
            return "浅色主题";
        case "dimmed":
            return "Dimmed 主题";
        case "dark":
            return "深色主题";
        default:
            return "默认主题";
    }
};

interface ThemeCardSwitchProps {
    active?: boolean;
}

const ThemeCardSwitch = (props: ThemeCardSwitchProps) => {
    const [checkedTheme, setCheckedTheme] = useState<string>("default");
    const [hoverTheme, setHoverTheme] = useState<string>();

    const onThemeMouseEnter = (key: string) => {
        return () => {
            setHoverTheme(key);
        };
    };

    const onThemeMouseLeave = () => {
        setHoverTheme(undefined);
    };

    return (
        <div className={`theme-card-switch ${props.active ? "active" : null}`}>
            <div className="title">
                <span>浅色主题</span>
                {props.active ? <span className="status">Active</span> : null}
            </div>
            <div className="theme-sketch">{switchTheme(hoverTheme ? hoverTheme : checkedTheme)}</div>
            <div className="name">{switchName(hoverTheme ? hoverTheme : checkedTheme)}</div>
            <div className="options">
                <Radio.Group
                    onChange={radioChangeWrapper(setCheckedTheme)}
                    value={checkedTheme}
                >
                    <Radio
                        value="default"
                        onMouseEnter={onThemeMouseEnter("default")}
                        onMouseLeave={onThemeMouseLeave}
                    >
                        <div className="radio default" />
                    </Radio>
                    <Radio
                        value="light"
                        onMouseEnter={onThemeMouseEnter("light")}
                        onMouseLeave={onThemeMouseLeave}
                    >
                        <div className="radio light" />
                    </Radio>
                    <Radio
                        value="dimmed"
                        onMouseEnter={onThemeMouseEnter("dimmed")}
                        onMouseLeave={onThemeMouseLeave}
                    >
                        <div className="radio dimmed" />
                    </Radio>
                    <Radio
                        value="dark"
                        onMouseEnter={onThemeMouseEnter("dark")}
                        onMouseLeave={onThemeMouseLeave}
                    >
                        <div className="radio dark" />
                    </Radio>
                </Radio.Group>
            </div>
            <div className="tips">系统主题为浅色主题时，当前主题生效</div>
        </div>
    );
};

export default ThemeCardSwitch;
