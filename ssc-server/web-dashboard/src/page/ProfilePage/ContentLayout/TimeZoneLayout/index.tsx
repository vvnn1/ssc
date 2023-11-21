import { Form, Select } from "antd";
import "./index.sass";

const TimeZoneLayout = () => {
    return (
        <div className="timezone-layout">
            <div className="header">
                <div className="title">项目空间列表</div>
            </div>
            <div className="content">
                <Form
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Form.Item label="时区选择">
                        <Select
                            allowClear
                            placeholder="System TimeZone"
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default TimeZoneLayout;
