import { Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "../../../../../Icon";

const Step1Form = (props: { hidden: boolean }) => {

    const onUploadChange = (info: any) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 17 }}
            hidden={props.hidden}
        >
            <Form.Item
                label="上传文件"
            >
                <Upload 
                    name="file"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    headers={{
                        authorization: 'authorization-text',
                    }}
                    onChange={onUploadChange}
                >
                    <Button icon={<UploadOutlined />}>选择文件</Button>
                </Upload>
            </Form.Item>
        </Form>
    )
};

export default Step1Form;