import { Form, Input, InputNumber } from "antd";

const MySqlForm = () => {
    return (
        <Form
            size="small"
            labelCol={{span: 6}}
            wrapperCol={{span: 14}}
        >
            <Form.Item
                label="catalog name"
                required
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="hostname"
                extra="MySQL 数据库服务器的IP地址或主机名"
                required
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="port"
                extra="连接到服务器的端口"
            >
                <InputNumber defaultValue={'3306'} style={{width: '90px'}}/>
            </Form.Item>

            <Form.Item
                label="default-database"
                extra="默认数据库名称"
                required
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="username"
                extra="连接 MySQL 数据库服务器时使用的用户名"
                required
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="password"
                extra="连接 MySQL 数据库服务器时使用的密码"
                required
            >
                <Input />
            </Form.Item>
        </Form>
    )
};

export default MySqlForm;