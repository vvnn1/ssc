import { Form, Input } from "antd";

const DLFForm = () => {
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
                label="access.key.id"
                extra="访问 OSS 服务所需的 Access Key"
            >
                <Input />
            </Form.Item>

            <Form.Item
                required
                label="access.key.secret"
                extra="访问 OSS 服务所需的 Access Secret"
            >
                <Input />
            </Form.Item>

            <Form.Item
                required
                label="warehouse"
                extra="OSS 服务中所指定的数仓目录"
            >
                <Input />
            </Form.Item>

            <Form.Item
                required
                label="oss.endpoint"
                extra="OSS 的 endpoint 地址，例如 oss-cn-hangzhou.aliyuncs.com"
            >
                <Input />
            </Form.Item>

            <Form.Item
                required
                label="dlf.endpoint"
                extra="表示 DLF 服务的 endpoint"
            >
                <Input />
            </Form.Item>

            <Form.Item
                required
                label="dlf.region-id"
                extra="DLF 所在区域"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="更多配置"
                extra="在此设置其他 DLF 配置, 例:dlf.catalog.id:my_catalog。多个配置请换行分隔"
            >
                <Input.TextArea />
            </Form.Item>
        </Form>
    );
};

export default DLFForm;