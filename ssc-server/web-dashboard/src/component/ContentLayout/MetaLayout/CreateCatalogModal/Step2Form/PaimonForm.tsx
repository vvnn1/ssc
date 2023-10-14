import { Form, Input, Select } from "antd";
import { useState } from "react";

const PaimonForm = () => {
    const [dlfVisible, setDlfVisible] = useState<boolean>();


    const onSelectChange = (value: string) => {
        setDlfVisible(value === "dlf");
    }

    return (
        <Form
            size="small"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
        >
            <Form.Item
                required
                label="catalog name"
            >
                <Input />
            </Form.Item>

            <Form.Item
                required
                label="metastore"
                extra="元数据存储类型"
            >
                <Select
                    options={[
                        {
                            value: "filesystem",
                            label: "filesystem",
                        },
                        {
                            value: "dlf",
                            label: "dlf",
                        }
                    ]}
                    onChange={onSelectChange}
                />
            </Form.Item>

            <Form.Item
                required
                label="warehouse"
                extra="OSS 服务中所指定的数仓目录"
            >
                <Input />
            </Form.Item>


            {
                dlfVisible ? (
                    <>
                        <Form.Item
                            label="dlf.catalog.id"
                            required
                            extra="DLF 数据目录 ID"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="dlf.catalog.accessKeyId"
                            required
                            extra="访问 DLF 服务所需的 Access Key ID"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="dlf.catalog.accessKeySecret"
                            required
                            extra="访问 DLF 服务所需的 Access Key Secret"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="dlf.catalog.endpoint"
                            required
                            extra="DLF 服务的 endpoint"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="dlf.catalog.region"
                            required
                            extra="DLF 所在区域"
                        >
                            <Input />
                        </Form.Item>
                    </>
                ) : null
            }


        </Form>
    )
};

export default PaimonForm;