import { Button, Form, Divider, Space } from "antd";
import RuntimeSettingModule from "../SettingModule/RuntimeSetting";
import FlinkSettingModule from "../SettingModule/CustomSetting";
import LogSettingModule from "../SettingModule/LogSetting";



const BatchWorkTab = () => {
    return (
        <div className="form-wrapper">
            <div className="small form-content">
                <Form
                    className="batch-work-setting-form ant-typography"
                    layout="vertical"
                    size="small"
                >
                    <RuntimeSettingModule onlyStrategy />
                    <FlinkSettingModule />
                    <Divider />
                    <LogSettingModule />
                </Form>
            </div>
            <div className="form-footer">
                <Space>
                    <Button
                        type="primary"
                    >
                        保存更改
                    </Button>
                    <Button
                    >
                        放弃更改
                    </Button>
                </Space>
            </div>
        </div>

    );
};

export default BatchWorkTab;