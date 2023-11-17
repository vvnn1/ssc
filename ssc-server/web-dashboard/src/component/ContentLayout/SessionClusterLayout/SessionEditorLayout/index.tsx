import { Button, Form, Space } from "antd";
import BasicSetting from "../SettingForm/BasicSetting";
import NormalSetting from "../SettingForm/NormalSetting";
import CustomSetting from "../SettingForm/CustomSetting";
import ResourceSetting from "../SettingForm/ResourceSetting";
import LogSetting from "../SettingForm/LogSetting";
import { useNavigate } from "react-router-dom";
import "./index.sass";
import { useEffect, useRef } from "react";
import ScrollPin from "../../../ScrollPin";
import MyLink from "../../../MyLink";
import { ArrowLeftOutlined } from "../../../Icon";

const SessionEditorLayout = () => {
    const navigate = useNavigate();
    const contentRef = useRef<HTMLDivElement>(null);
    const [form] = Form.useForm();

    const onCancel = () => {
        navigate(-1);
    };

    const onSave = () => {
        navigate("../overview");
    };

    useEffect(() => {
        form.setFieldsValue({
            name: "ssc-session",
            status: "stopped",
            engineVersion: "recommend-1.17",
            customConfig: `metrics.reporters: promappmgr
metrics.reporter.promappmgr.port: '9999'
metrics.reporter.promappmgr.factory.class: org.apache.flink.metrics.prometheus.PrometheusReporterFactory`,
            tmNum: 1,
            jmCpu: 1,
            jmMemory: "2GiB",
            tmCpu: 1,
            tmMemory: "3GiB",
            rootLogLevel: "INFO"
        });
    }, []);

    return (
        <div className="session-editor-layout">
            <div className="header">
                <div className="title">
                    <MyLink className="left-arrow" to={"../../list"}>
                        <ArrowLeftOutlined />
                    </MyLink>
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
                            form={form}
                        >
                            <BasicSetting editing />
                            <NormalSetting />
                            <CustomSetting />
                            <ResourceSetting />
                            <LogSetting />
                        </Form>
                    </div>
                    <div className="form-footer">
                        <Space>
                            <Button type="primary" onClick={onSave}>保存</Button>
                            <Button onClick={onCancel}>取消</Button>
                        </Space>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default SessionEditorLayout;