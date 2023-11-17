import { Badge, Divider, Form, Select } from "antd";
import { NewTabOutlined, SearchOutlined } from "../../../../../Icon";

interface Step1FormProps {
    hidden: boolean;
}

const Step1Form = (props: Step1FormProps) => {
    return (
        <Form.Item
            label="选择调试集群"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 14 }}
            hidden={props.hidden}
        >
            <Select
                suffixIcon={<SearchOutlined />}
                size="small"
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{ margin: "0" }} />
                        <div className="ant-select-item">
                            <a><span><NewTabOutlined /> 创建新的集群</span></a>
                        </div>
                    </>
                )}
                popupClassName="small"
                optionLabelProp="label"
            >
                <Select.Option value="debug-session" label="debug-session">
                    <Badge status="success" text=" " />
                    <span>debug-session (c3d0298e-8a85-48b1-a767-659b74d20d1a)</span>
                </Select.Option>

                <Select.Option value="debug-session2" label="debug-session2" disabled>
                    <Badge status="default" text=" " />
                    <span>debug-session (c3d0298e-8a85-48b1-a767-659b74d20d1a)</span>
                </Select.Option>
            </Select>
        </Form.Item>
    );
};

export default Step1Form;