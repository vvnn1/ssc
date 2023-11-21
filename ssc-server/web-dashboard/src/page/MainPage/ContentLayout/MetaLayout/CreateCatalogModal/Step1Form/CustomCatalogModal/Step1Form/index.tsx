import { Button, Form, Input, Radio, RadioChangeEvent, Upload, UploadProps, message } from "antd";
import { useState } from "react";
import { UploadOutlined } from "../../../../../../../../component/Icon";

const options = [
    { label: "上传文件", value: "uploadFile" },
    { label: "外部 URL", value: "outsideUrl" },
];

const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
        authorization: "authorization-text",
    },
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const uploadFileModule = (
    <Form.Item label="上传文件">
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
    </Form.Item>
);

const urlFileModule = (
    <Form.Item label="外部 URL">
        <Input />
    </Form.Item>
);

const Step1Form = (props: { hidden: boolean }) => {
    const [fileModule, setFileModule] = useState<React.ReactElement>(uploadFileModule);

    const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
        if (value === "uploadFile") {
            setFileModule(uploadFileModule);
        } else if (value === "outsideUrl") {
            setFileModule(urlFileModule);
        }
    };

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 17 }}
            hidden={props.hidden}
        >
            <Form.Item label="注册 JAR">
                <Radio.Group
                    options={options}
                    onChange={onRadioChange}
                    defaultValue="uploadFile"
                    optionType="button"
                />
            </Form.Item>

            {fileModule}
        </Form>
    );
};

export default Step1Form;
