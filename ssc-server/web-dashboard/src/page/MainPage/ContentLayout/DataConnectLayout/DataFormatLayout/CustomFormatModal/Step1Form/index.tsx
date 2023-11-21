import { Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "../../../../../../../component/Icon";

const Step1Form = (props: { hidden: boolean }) => {
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 17 }}
            hidden={props.hidden}
        >
            <Form.Item label="上传文件">
                <Upload
                    name="file"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    headers={{
                        authorization: "authorization-text",
                    }}
                >
                    <Button icon={<UploadOutlined />}>选择文件</Button>
                </Upload>
            </Form.Item>
        </Form>
    );
};

export default Step1Form;
