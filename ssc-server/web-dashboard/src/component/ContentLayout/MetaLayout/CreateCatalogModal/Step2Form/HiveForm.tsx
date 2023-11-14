import { Form, Input, Select } from "antd";

const HiveForm = () => {
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
                label="hive-version"
                extra="hive-version 2.2.0 支持 2.0.0~2.2.0，hive-version 2.3.6 支持 2.3.0~2.3.9"
                required
            >
                <Select />
            </Form.Item>

            <Form.Item
                label="default-database"
                extra="默认数据库名称"
                required
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="hive-conf-dir"
                extra="Hive 配置文件路径"
                required
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="hadoop-conf-dir"
                extra="Hadoop 依赖路径"
                required
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default HiveForm;