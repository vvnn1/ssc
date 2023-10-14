import { Button, Form, Space, Tag } from "antd";
import { ArrowLeftOutlined } from "../../../Icon";
import './index.sass'
import BasicSetting from "../SettingForm/BasicSetting";
import NormalSetting from "../SettingForm/NormalSetting";
import ResourceSetting from "../SettingForm/ResourceSetting";
import LogSetting from "../SettingForm/LogSetting";
import CustomSetting from "../SettingForm/CustomSetting";
import { Link, useHref } from "react-router-dom";

const SessionCreateLayout = () => {

    return (
        <div className="session-create-layout">
            <div className="header">
                <div className="title">
                    <Link className="left-arrow" to={'../list'}>
                        <ArrowLeftOutlined />
                    </Link>

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
                            <Button type="primary">创建 Session 集群</Button>
                            <Button href={useHref('../list')}>取消</Button>
                        </Space>

                    </div>
                </div>

            </div>

        </div>
    )
};

export default SessionCreateLayout;