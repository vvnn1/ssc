import { Button, Form, Space } from "antd";
import BasicSetting from "../SettingForm/BasicSetting";
import NormalSetting from "../SettingForm/NormalSetting";
import CustomSetting from "../SettingForm/CustomSetting";
import ResourceSetting from "../SettingForm/ResourceSetting";
import LogSetting from "../SettingForm/LogSetting";
import { useNavigate } from "react-router-dom";
import './index.sass'
import { useRef } from "react";
import ScrollPin from "../../../ScrollPin";

const SessionEditorLayout = () => {
    const navigate = useNavigate();
    const contentRef = useRef<HTMLDivElement>(null);

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="session-editor-layout">
            <div className="header">
                <div className="title">
                    编辑 Session 集群
                </div>
            </div>
            <ScrollPin containerRef={contentRef} />
            <div className="content">
                <div className="form-wrapper">
                    <div className="form-content" ref={contentRef}>
                        <Form
                            layout="vertical"
                            size="small"
                            className="ant-typography"
                        >
                            <BasicSetting />
                            <NormalSetting />
                            <CustomSetting />
                            <ResourceSetting />
                            <LogSetting />
                        </Form>
                    </div>
                    <div className="form-footer">
                        <Space>
                            <Button type="primary">保存</Button>
                            <Button onClick={goBack}>取消</Button>
                        </Space>
                    </div>
                </div>

            </div>

        </div>
    )
};

export default SessionEditorLayout;