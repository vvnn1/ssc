import { Radio, RadioProps } from "antd";
import "./index.sass";
import { useContext, useRef, useState } from "react";

interface ThemeCardRadioProps {
    value?: string;
    title: string;
    sketch: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}

const ThemeCardRadio = (props: ThemeCardRadioProps) => {
    return (
        <div
            className={`theme-card-radio ${props.active ? "active" : null}`}
            onClick={props.onClick}
        >
            <div className="sketch">{props.sketch}</div>
            <div className="footer">
                <Radio value={props.value}>{props.title}</Radio>
            </div>
        </div>
    );
};

export default ThemeCardRadio;
