import { Button, Divider, Form, Input, Modal, Table } from "antd";
import './index.sass'
import { DeleteOutlined, EditOutlined, PlusOutlined } from "../../../Icon";
import { useState } from "react";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

type TableProps = Parameters<typeof Table<DataType>>[0];
type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const columns: ColumnTypes = [
    {
        title: '密钥名称',
        dataIndex: 'name',
        width: '58.25%',
    },
    {
        title: '创建时间',
        dataIndex: 'age',
        width: '25%',
    },
    {
        title: '操作',
        dataIndex: 'age',
        render: () => (
            <>
                <Button type="link" icon={<EditOutlined />} size="small">编辑</Button>
                <Divider type="vertical" />
                <Button type="link" icon={<DeleteOutlined />} size="small" danger>删除</Button>
            </>
        )
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];


const SecretLayout = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (visible: boolean) => {
        return () => {
            setModalOpen(visible);
        }
    }

    return (
        <div className="member-page">
            <div className="actions">
                <Button icon={<PlusOutlined />} type='primary' onClick={changeModalOpen(true)}>
                    新增密钥
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                showSorterTooltip={false}
                size='small'
            />

            <Modal
                title="新增密钥"
                onOk={changeModalOpen(false)}
                onCancel={changeModalOpen(false)}
                open={modalOpen}
                width={600}
            >
                <Form
                    layout="vertical"
                >
                    <Form.Item
                        label="密钥名称"
                        required
                    >
                        <Input placeholder="输入密钥名称" />
                    </Form.Item>
                    <Form.Item
                        label="密钥值"
                        required
                    >
                        <Input placeholder="输入密钥值" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};

export default SecretLayout;