import { Col, Form, Modal, ModalProps, Radio, RadioProps, Row } from "antd";
import "./index.sass";
import ThemeCardRadio from "./ThemeCardRadio";
import { DarkTheme, DefaultTheme, DimmedTheme, LightTheme } from "./ThemeSketch";
import { useState } from "react";
import ThemeCardSwitch from "./ThemeCardSwitch";

const ThemeGroup = () => {
    const [checkedTheme, setCheckedTheme] = useState<string>();
    const onThemeChange: RadioProps["onChange"] = ({ target: { value } }) => {
        setCheckedTheme(value);
    };

    const changeTheme = (theme: string) => {
        return () => {
            setCheckedTheme(theme);
        };
    };

    return (
        <Radio.Group onChange={onThemeChange}>
            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <ThemeCardRadio
                        value="default"
                        sketch={<DefaultTheme />}
                        title="默认主题"
                        active={checkedTheme === "default"}
                        onClick={changeTheme("default")}
                    />
                </Col>
                <Col span={12}>
                    <ThemeCardRadio
                        value="light"
                        sketch={<LightTheme />}
                        title="浅色主题"
                        active={checkedTheme === "light"}
                        onClick={changeTheme("light")}
                    />
                </Col>
                <Col span={12}>
                    <ThemeCardRadio
                        value="dimmed"
                        sketch={<DimmedTheme />}
                        title="Dimmed 主题"
                        active={checkedTheme === "dimmed"}
                        onClick={changeTheme("dimmed")}
                    />
                </Col>
                <Col span={12}>
                    <ThemeCardRadio
                        value="dark"
                        sketch={<DarkTheme />}
                        title="深色主题"
                        active={checkedTheme === "dark"}
                        onClick={changeTheme("dark")}
                    />
                </Col>
            </Row>
        </Radio.Group>
    );
};

const ThemeSwitch = () => {
    return (
        <Row gutter={10}>
            <Col span={12}>
                <ThemeCardSwitch active />
            </Col>
            <Col span={12}>
                <ThemeCardSwitch />
            </Col>
        </Row>
    );
};

const ThemeModal = (props: ModalProps) => {
    const [themeModel, setThemeModel] = useState<string>("constant");

    const onModelChange: RadioProps["onChange"] = ({ target: { value } }) => {
        setThemeModel(value);
    };

    return (
        <Modal
            {...props}
            footer={null}
            title="主题设定"
            className="theme-setting-modal"
        >
            <div className="mode-select">
                <Form.Item
                    label="界面主题模式"
                    extra={
                        themeModel === "constant" ? "实时计算将使用您选择的主题" : "实时计算界面将与您的系统主题同步"
                    }
                >
                    <Radio.Group
                        optionType="button"
                        defaultValue="constant"
                        onChange={onModelChange}
                    >
                        <Radio
                            style={{ width: 180, textAlign: "center" }}
                            value="constant"
                        >
                            固定主题
                        </Radio>
                        <Radio
                            style={{ width: 180, textAlign: "center" }}
                            value="system"
                        >
                            与系统设置同步
                        </Radio>
                    </Radio.Group>
                </Form.Item>
            </div>
            <div className="single-theme">
                {themeModel === "constant" ? <ThemeGroup /> : null}
                {themeModel === "system" ? <ThemeSwitch /> : null}
            </div>
        </Modal>
    );
};

export default ThemeModal;
