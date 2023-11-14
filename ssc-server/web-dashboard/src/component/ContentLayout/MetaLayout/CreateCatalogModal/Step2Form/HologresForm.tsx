import { Form, Input } from "antd";

const HologresForm = () => {
    return (
        <Form
            size="small"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
        >
            <Form.Item
                label="catalog name"
                required
            >
                <Input />
            </Form.Item>
            
            <Form.Item
                label="endpoint"
                required
                extra="Hologres 的 Endpoint 地址"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="username"
                required
                extra="与 dbname 相匹配的用户名"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="password"
                required
                extra="与 dbname 相匹配的密码"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="dbname"
                required
                extra="Hologres 的数据库名称"
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default HologresForm;