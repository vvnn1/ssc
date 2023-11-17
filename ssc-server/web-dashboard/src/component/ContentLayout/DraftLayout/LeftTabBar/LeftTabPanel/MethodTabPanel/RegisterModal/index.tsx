import { Button, Form, Input, Modal, ModalProps, Radio, RadioChangeEvent, Space, Upload } from "antd";
import { useState } from "react";
import { DeleteOutlined, PlusOutlined, UploadOutlined } from "../../../../../../Icon";
import "./index.sass";

const RegisterModal = (props: ModalProps) => {
    const [radioValue, setRadioValue] = useState<string>("file");

    const onRadioChange = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value);
    };

    return (
        <Modal
            {...props}
            title="注册 UDF JAR"
            width={800}
            footer={(_, { OkBtn, CancelBtn }) => (<><OkBtn /><CancelBtn /></>)}
            className="register-udf-modal"
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    label="注册 UDF"
                >
                    <Radio.Group
                        options={[
                            {
                                label: "上传文件",
                                value: "file"
                            },
                            {
                                label: "外部 URL",
                                value: "url"
                            }
                        ]}
                        onChange={onRadioChange}
                        defaultValue={radioValue}
                        optionType="button"
                    />
                </Form.Item>
                <Form.Item
                    label="UDF 名称"
                    required
                    rules={[
                        {
                            required: true,
                            message: "请输入 UDF 名称"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                {
                    radioValue === "file" ? (
                        <>
                            <Form.Item
                                label="选择文件"
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择一个文件"
                                    }
                                ]}
                            >
                                <Upload>
                                    <Button icon={<UploadOutlined />}>选择文件</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="依赖文件"
                            >
                                <Upload>
                                    <Button icon={<UploadOutlined />}>选择文件</Button>
                                </Upload>
                            </Form.Item>
                        </>
                    ) : null
                }
                {
                    radioValue === "url" ? (
                        <>
                            <Form.Item
                                label="外部 URL"
                                required
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                label="依赖文件 URLs">
                                <Form.List
                                    name="relyUrls"
                                    initialValue={[{}]}
                                >
                                    {(fields, { add, remove }) => {
                                        return (
                                            <>
                                                {
                                                    fields.map((field, index) => {
                                                        return (
                                                            <Space.Compact key={field.key} style={{width: "100%", marginBottom: 24}}>
                                                                <Form.Item
                                                                    name={[field.name, "relyUrl"]}
                                                                    noStyle
                                                                >

                                                                    <Input />
                                                                </Form.Item>
                                                                <Button style={{ marginLeft: "4px" }} disabled={index + 1 === fields.length} onClick={() => remove(field.name)}><DeleteOutlined /></Button>

                                                            </Space.Compact>

                                                        );
                                                    })
                                                }
                                                <Button className="add-url" type="dashed" icon={<PlusOutlined />} onClick={add}>添加依赖文件</Button>
                                            </>
                                        );
                                    }}
                                </Form.List>
                            </Form.Item>
                        </>
                    ) : null
                }

            </Form>

        </Modal>
    );
};

export default RegisterModal;