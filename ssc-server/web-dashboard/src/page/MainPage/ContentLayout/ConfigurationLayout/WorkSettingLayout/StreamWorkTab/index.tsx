import { Button, Divider, Form, Space } from "antd";
import RuntimeSettingModule from "../SettingModule/RuntimeSetting";
import FlinkSettingModule from "../SettingModule/CustomSetting";
import LogSettingModule from "../SettingModule/LogSetting";

const StreamWorkTab = () => {
    return (
        <div className="form-wrapper">
            <div className="small form-content">
                <Form
                    className="stream-work-setting-form ant-typography"
                    layout="vertical"
                    size="small"
                >
                    <RuntimeSettingModule />
                    <FlinkSettingModule />
                    <Divider />
                    <LogSettingModule />
                </Form>
            </div>
            <div className="form-footer">
                <Space>
                    <Button type="primary">保存更改</Button>
                    <Button>放弃更改</Button>
                </Space>
            </div>
        </div>
    );
};

export default StreamWorkTab;
