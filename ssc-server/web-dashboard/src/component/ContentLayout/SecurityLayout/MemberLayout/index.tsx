import { Button, Divider, Form, Input, Modal, Radio, Space, Table, Tag } from "antd";
import './index.sass'
import { DeleteOutlined, EditOutlined, TeamOutlined } from "../../../Icon";
import { useState } from "react";

const { Search } = Input;


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
        title: '角色',
        dataIndex: 'name',
        width: '16.75%',
        render: (name) => (
            <>
                <TeamOutlined />
                <span>{name}</span>
            </>
        )
    },
    {
        title: '成员 ID',
        dataIndex: 'age',
        width: '33.25%',
        render: (memberId) => (<Tag>{memberId}</Tag>)
    },
    {
        title: '成员名',
        dataIndex: 'age',
        width: '33.25%',
        render: (memberName) => (<Tag>{memberName}</Tag>)
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


const MemberLayout = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        }
    }

    const onSearch = (value: string) => console.log(value);

    return (
        <div className="member-page">
            <div className="actions">
                <Space>
                    <Button type='primary' onClick={changeModalOpen(true)}>添加角色绑定</Button>
                    <Search
                        placeholder="搜索…"
                        onSearch={onSearch}
                    />
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                showSorterTooltip={false}
                size='small'
            />

            <Modal
                title="添加成员"
                open={modalOpen}
                onOk={changeModalOpen(false)}
                onCancel={changeModalOpen(false)}
            >
                <Form
                    layout="vertical"
                >
                    <Form.Item
                        required
                        label="角色"
                        extra={<span>不同角色的功能使用差异. 请查看 <a>详情</a></span>}
                    >
                        <Radio.Group defaultValue="owner">
                            <Radio value="owner">owner</Radio>
                            <Radio value="editor">editor</Radio>
                            <Radio value="viewer">viewer</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        required
                        label="成员信息"
                        extra="填写阿里云账号 UID 或者 RAM 用户账号 UID 信息"
                    >
                        <Input placeholder="请输入成员信息"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};

export default MemberLayout;