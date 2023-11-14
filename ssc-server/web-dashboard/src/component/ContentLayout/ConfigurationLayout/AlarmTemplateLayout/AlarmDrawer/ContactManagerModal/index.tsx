import { Button, Divider, Form, Input, Modal, ModalProps, Popconfirm, Select, Space, Table, Tabs, TabsProps, Tag, Tooltip, Typography, message } from "antd";
import './index.sass'
import { CheckCircleOutlined, PlusOutlined, SearchOutlined } from "../../../../../Icon";
import { useState } from "react";
import MonacoEditor from "../../../../../MonacoEditor";
import EditableTable from "./EditableTable";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ContactGroupTable = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        }
    }

    return (
        <div className="table-container">
            <div className="custom-template">
                <Input suffix={<SearchOutlined />} placeholder="请输入名称搜索" />
                <Button type="link" onClick={changeModalOpen(true)}><PlusOutlined />添加联系人组</Button>
            </div>
            <EditableTable
                className="contact-group-table"
                bordered
                size="small"
                columns={[
                    {
                        title: <div className="td-text">联系人组名</div>,
                        dataIndex: 'name',
                        render: (value) => <div className="td-item td-text" style={{width: 180}}>{value}</div>,
                    },
                    {
                        title: <div className="td-text">联系人</div>,
                        dataIndex: 'contacts',
                        render: (value) => <div className="td-item td-text" style={{width: 550}}>{value}</div>,
                    },
                ]}
                dataSource={[
                    {
                        name: 'test',
                        contacts: '王，李'
                    }
                ]}
                deleteTitle="确定删除当前联系人组吗?"
            />

            <Modal
                open={modalOpen}
                width={600}
                title="添加联系人组"
                okText="提交"
                cancelText="重置"
                onCancel={changeModalOpen(false)}
                footer={(_, { CancelBtn, OkBtn }) => <><OkBtn/><CancelBtn /></>}
                className="add-contact-modal"
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item
                        required
                        label='组名称'
                    >
                        <Input placeholder="请输入联系人组名称" />
                    </Form.Item>
                    <Form.Item
                        required
                        label='联系人'
                    >
                        <Select
                            showSearch
                            suffixIcon={null}
                            placeholder="请选择联系人"
                            mode="multiple"
                            options={[
                                {
                                    label: '联系人',
                                    options: [
                                        { label: '王', value: 'wang' },
                                        { label: '李', value: 'li' }
                                    ]
                                }
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};


const ContactsTable = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        }
    }

    return (
        <div className="table-container">
            <div className="custom-template">
                <Input suffix={<SearchOutlined />} placeholder="请输入名称搜索" />
                <Button type="link" onClick={changeModalOpen(true)}><PlusOutlined />新建联系人</Button>
            </div>

            <EditableTable
                className="concats-table"
                bordered
                size="small"
                dataSource={[
                    {
                        key: '1',
                        name: '王梦龙',
                        phone: '15888276203',
                        email: '-',
                        verify: false
                    },
                    {
                        key: '2',
                        name: '王梦龙',
                        phone: '15888276203',
                        email: '-',
                        verify: true
                    },
                    {
                        key: '3',
                        name: '王梦龙',
                        phone: '-',
                        email: '137418235@qq.com',
                        verify: true
                    }
                ]}
                columns={[
                    {
                        title: <div className="td-text">联系人</div>,
                        dataIndex: 'name',
                        render: (value) => <div className="td-item td-text" style={{ width: 125 }}>{value}</div>,
                    },
                    {
                        title: <div className="td-text">电话</div>,
                        dataIndex: 'phone',
                        render: (value, record) => (
                            <div className="td-content">
                                <div className="td-item td-text" style={{ width: 125 }}>{value}</div>
                                {record.verify ? null : (<Tooltip title="未验证手机号的联系人无法使用电话方式通知，点击验证手机号"><Button size="small">未验证</Button></Tooltip>)}
                            </div>
                        )
                    },
                    {
                        title: <div className="td-text">邮箱</div>,
                        dataIndex: 'email',
                        render: (value) => (<div className="td-item td-text" style={{ width: 200 }}>{value}</div>)
                    },
                ]}
                deleteTitle="确定删除当前联系人吗？"
            />
            <Modal
                open={modalOpen}
                width={600}
                title="新建联系人"
                okText="提交"
                cancelText="重置"
                onCancel={changeModalOpen(false)}
                footer={(_, { CancelBtn, OkBtn }) => <><OkBtn/><CancelBtn /></>}
                className="add-contact-modal"
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item
                        required
                        label="联系人"
                    >
                        <Input placeholder="请输入联系人" />
                    </Form.Item>
                    <Form.Item
                        label="手机"
                    >
                        <Input placeholder="请输入手机号码" />
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                        extra="至少提供一项联系方式"
                    >
                        <Input placeholder="请输入 E-mail" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};


const WebhookModal = (props: ModalProps
    & {
        initValue?: {
            name: string;
            method: string;
            url: string;
            headers: string;
            params: string;
            body: string;
        }
    }) => {
    return (
        <Modal
            {...props}
            width={600}
            okText="确认"
            cancelText="取消"
            footer={(_, { CancelBtn, OkBtn }) => <><OkBtn/><CancelBtn /></>}
            className="add-contact-modal"
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
            >
                <Form.Item
                    label="名称"
                    required
                >
                    <Input placeholder="请输入 webhook 名称" defaultValue={props.initValue?.name} />
                </Form.Item>

                <Form.Item
                    label="URL"
                    required
                >
                    <Input
                        placeholder="请输入 webhook url"
                        addonBefore={<Select
                            defaultValue={props.initValue?.method ?? 'POST'}
                            options={[
                                {
                                    label: 'POST',
                                    value: 'post'
                                },
                                {
                                    label: 'GET',
                                    value: 'get'
                                }
                            ]}
                        />}
                        defaultValue={props.initValue?.url}
                    />
                </Form.Item>

                <Form.Item
                    label="Headers"
                    extra="例如：key: value(确保 key 与 value 的冒号后存在空格分隔符)"
                    className="monaco-editor-item"
                >
                    <MonacoEditor
                        height={70}
                        defaultValue={props.initValue?.headers}
                        options={{

                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Params"
                    extra="例如：key: value(确保 key 与 value 的冒号后存在空格分隔符)"
                    className="monaco-editor-item"
                >
                    <MonacoEditor
                        height={70}
                        defaultValue={props.initValue?.params}
                        options={{

                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Body"
                    required
                    extra="可在Body字符串中使用 $content 占位符输出报警内容"
                >
                    <Input defaultValue={props.initValue?.body} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const WebhookTable = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [modalValue, setModalValue] = useState<any>();
    const [messageApi, contextHolder] = message.useMessage();

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        }
    }

    const onCopy = () => {
        messageApi.success({
            icon: <></>,
            content: <><CheckCircleOutlined color="#00a700" />已复制到剪切板</>
        });
    }

    const changeEditModalOpen = (open: boolean, value: any) => {
        return () => {
            setModalValue(value);
            setEditModalOpen(open);
        }
    }

    return (
        <div className="table-container">
            <div className="custom-template">
                <Input suffix={<SearchOutlined />} placeholder="请输入名称搜索" />
                <Button type="link" onClick={changeModalOpen(true)}><PlusOutlined />新建 Webhook</Button>
            </div>
            <Table //TODO bug
                className="webhook-table"
                bordered
                size="small"
                scroll={{ x: 1000 }}
                columns={[
                    {
                        title: '名称',
                        width: 200,
                        fixed: 'left',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Method',
                        width: 80,
                        dataIndex: 'method',
                        render: (value) => (
                            <Tag color="blue">{value}</Tag>
                        )
                    },
                    {
                        title: 'URL',
                        dataIndex: 'url',
                        render: (value) => (<CopyToClipboard text={value} onCopy={onCopy}><span>{value}</span></CopyToClipboard>)
                    },
                    {
                        title: '操作',
                        width: 150,
                        fixed: 'right',
                        render: (_, record) => (
                            <span>
                                <a onClick={changeEditModalOpen(true, record)}>编辑</a>
                                <Divider type="vertical" />
                                <Popconfirm
                                    okText="确认"
                                    cancelText="取消"
                                    title='确定删除这个 webhook？'
                                    overlayClassName="ant-popover-rtl"
                                >
                                    <a>删除</a>
                                </Popconfirm>
                            </span>
                        )
                    }
                ]}
                dataSource={[
                    {
                        name: 'test',
                        method: 'POST',
                        url: 'http://www.baodu.com',
                        headers: '',
                        params: '',
                        body: ''
                    }
                ]}
            />

            <WebhookModal
                open={modalOpen}
                onCancel={changeModalOpen(false)}
                title="新建 Webhook"
            />

            <WebhookModal
                open={editModalOpen}
                onCancel={changeEditModalOpen(false, undefined)}
                initValue={modalValue}
                title="编辑 Webhook"
            />
            {contextHolder}
        </div>
    )
};

const DingdingTable = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        }
    }

    return (
        <div className="table-container">
            <div className="custom-template">
                <Input suffix={<SearchOutlined />} placeholder="请输入名称搜索" />
                <Button type="link" onClick={changeModalOpen(true)}><PlusOutlined />添加钉钉机器人</Button>
            </div>
            <EditableTable
                className="dingding-table"
                bordered
                size="small"
                columns={[
                    {
                        title: <div className="td-text">名称</div>,
                        dataIndex: 'name',
                        render: (value) => <div className="td-item td-text">{value}</div>,
                        width: 197
                    },
                    {
                        title: <div className="td-text">地址</div>,
                        dataIndex: 'address',
                        render: (value) => <div className="td-item td-text">{value}</div>,
                        width: 567
                    },
                ]}
                dataSource={[
                    {
                        name: 'test',
                        address: 'aaa'
                    }
                ]}
                deleteTitle="确定删除当前钉钉机器人吗？"
            />

            <Modal
                open={modalOpen}
                width={600}
                title="添加钉钉机器人"
                okText="提交"
                cancelText="重置"
                onCancel={changeModalOpen(false)}
                footer={(_, { CancelBtn, OkBtn }) => <><OkBtn/><CancelBtn /></>}
                className="add-contact-modal"
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item
                        label="名称"
                        required
                    >
                        <Input placeholder="请输入钉钉机器人名称" />
                    </Form.Item>

                    <Form.Item
                        label="地址"
                        required
                    >
                        <Input placeholder="请输入钉钉机器人地址" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};


const ConcatManageModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            title='编辑联系人组'
            width={1000}
            className="concat-manager-modal"
            footer={null}
            destroyOnClose
        >
            <Tabs
                items={[
                    {
                        label: '联系人组',
                        key: 'contact-group',
                        children: <ContactGroupTable />,
                    },
                    {
                        label: '联系人',
                        key: 'contacts',
                        children: <ContactsTable />,
                    },
                    {
                        label: 'Webhook',
                        key: 'webhook',
                        children: <WebhookTable />,
                    },
                    {
                        label: '钉钉机器人',
                        key: 'dingding',
                        children: <DingdingTable />,
                    }
                ]}
            />
        </Modal>
    )
};

export default ConcatManageModal;