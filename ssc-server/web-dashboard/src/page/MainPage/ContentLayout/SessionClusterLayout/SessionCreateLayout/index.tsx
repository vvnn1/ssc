import { Button, Form, Space, Tag } from "antd";
import "./index.sass";
import BasicSetting from "../SettingForm/BasicSetting";
import NormalSetting from "../SettingForm/NormalSetting";
import ResourceSetting from "../SettingForm/ResourceSetting";
import LogSetting from "../SettingForm/LogSetting";
import CustomSetting from "../SettingForm/CustomSetting";
import { useHref } from "react-router-dom";
import MyLink from "../../../../../component/MyLink";
import { ArrowLeftOutlined } from "../../../../../component/Icon";

const SessionCreateLayout = () => {
    return (
        <div className="session-create-layout">
            <div className="header">
                <div className="title">
                    <MyLink
                        className="left-arrow"
                        to={"../list"}
                    >
                        <ArrowLeftOutlined />
                    </MyLink>
                    创建 Session 集群
                </div>
                <div className="extra">
                    <Tag>请勿生产使用</Tag>
                </div>
            </div>
            <div className="content">
                <div className="form-wrapper">
                    <div className="form-content">
                        <Form
                            layout="vertical"
                            size="small"
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
                            <Button
                                type="primary"
                                href={useHref("../ssc-session/overview")}
                            >
                                创建 Session 集群
                            </Button>
                            <Button href={useHref("../list")}>取消</Button>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionCreateLayout;
