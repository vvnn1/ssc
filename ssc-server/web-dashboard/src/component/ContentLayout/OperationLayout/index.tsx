import { Button, Checkbox, Divider, Form, Input, Modal, Radio, RadioChangeEvent, Select, Space, Switch, Table } from 'antd'
import './index.sass'
import { PlayCircleFilled, UploadOutlined } from '../../Icon'
import { useState } from 'react';
import Search from 'antd/es/input/Search';
import FormItem from 'antd/es/form/FormItem';
import { useNavigate, useParams } from 'react-router-dom';

const { TextArea } = Input;

interface DataType {
    id: string;
    key: React.Key;
    name: string;
    status: string;
    healthSorce: number;
    bizDelay:string;
    cpu:number;
    memory: number;
    updateUser: string;
    updateTime: number;
}

type TableProps = Parameters<typeof Table<DataType>>[0];
type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const columns: ColumnTypes = [
    {
        title: '名称',
        dataIndex: 'name',
        render: (value) => <><div className="type">SQL</div> <a>{value}</a></>
    },
    {
        title: '状态',
        dataIndex: 'status',
        filters: [
            {
                text: '启动中',
                value: 'Joe',
            },
            {
                text: '运行中',
                value: 'Category 1',
            },
            {
                text: '停止中',
                value: 'Category 2',
            },
            {
                text: '已停止',
                value: 'Joe',
            },
            {
                text: '已完成',
                value: 'Category 1',
            },
            {
                text: '已失败',
                value: 'Category 2',
            },
        ],
        onFilter: (value: string | number | boolean, record) => record.name.startsWith(value as string),
        width: '12.15%',
        render: (value) => <><PlayCircleFilled style={{color: '#00a700'}}/> 运行中</>
    },
    {
        title: '健康分',
        dataIndex: 'healthSorce',
        sorter: (a, b) => a.healthSorce - b.healthSorce,
        width: '10.2%',
        render: (value) => <><span className="HIGH">100</span></>
    },
    {
        title: '业务延时',
        dataIndex: 'bizDelay',
        width: '7.3%',
    },
    {
        title: 'CPU',
        dataIndex: 'cpu',
        sorter: (a, b) => a.cpu - b.cpu,
        width: '7.5%',
    },
    {
        title: '内存',
        dataIndex: 'memory',
        sorter: (a, b) => a.memory - b.memory,
        width: '8.25%',
        render: (value) => <>{value} Gib</>
    },
    {
        title: '修改人',
        dataIndex: 'updateUser',
        width: '12.2%',
        
    },
    {
        title: '修改时间',
        dataIndex: 'updateTime',
        sorter: (a, b) => a.updateTime - b.updateTime,
        width: '12%',
        render: (value) => <>09-26 17:46</>
    },
    {
        title: '操作',
        dataIndex: 'age',
        render: () => {
            return (
                <>
                    <Button size="small" type="link">启动</Button>
                    <Divider type="vertical"/>
                    <Button size="small" type="link">停止</Button>
                    <Divider type="vertical"/>
                    <Button size="small" type="link" danger>删除</Button>
                </>
            )
        },
    },
];

const data: DataType[] = [
    {
        id: '9ddc3745-7453-4d4b-96ee-965d8b2d5f05',
        key: '1',
        name: 'Untitled-stream-sql',
        status: '已停止',// 已停止 启动中 运行中 停止中
        healthSorce: 75,
        bizDelay: '',
        cpu: 6,
        memory: 1024,
        updateUser: 'vvnnl',
        updateTime: 1695720687,
    },
];


const jarModule = (
    <div className="jar-module">
        <Form.Item
            label="JAR URI"
            required
        >
            <Input placeholder="请输入 Jar URI" suffix={<UploadOutlined />} />
        </Form.Item>
        <Form.Item
            label="Entry Point Class"
        >
            <Input placeholder="如果您的 Jar 未指定主类，请在此处输入指向您的 Entrypoint Class 的标准路径" />
        </Form.Item>
        <Form.Item
            label="Entry Point Main Arguments"
        >
            <TextArea rows={3} />
        </Form.Item>
    </div>
);

const pythonModule = (
    <div className="python-module">
        <Form.Item
            label="Python 文件地址"
            required
        >
            <Input placeholder="请输入或选择一个 python 文件地址" suffix={<UploadOutlined />} />
        </Form.Item>
        <Form.Item
            label="Entry Module"
        >
            <Input placeholder="请输入 entry module" />
        </Form.Item>
        <Form.Item
            label="Entry Point Main Arguments"
        >
            <TextArea rows={3} />
        </Form.Item>
        <Form.Item
            label="Python Libraries"
        >
            <Input placeholder="请输入或选择任意 python libraries" suffix={<UploadOutlined />} />
        </Form.Item>
        <Form.Item
            label="Python Archives"
        >
            <Input placeholder="请输入或选择任意 python archives" suffix={<UploadOutlined />} />
        </Form.Item>

    </div>
);


const kerberosModule = (
    <div className="kerberos-module">
        <FormItem
            label="Kerberos 集群"
            labelCol={{ offset: 7, span: 5 }}
            wrapperCol={{ span: 10 }}
            required
        >
            <Select />
        </FormItem>
        <FormItem
            label="principal"
            labelCol={{ offset: 7, span: 5 }}
            wrapperCol={{ span: 10 }}
            required
        >
            <Input />
        </FormItem>
    </div>
);


const OperationLayout = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [formModule, setFormModule] = useState<React.ReactElement>(jarModule);
    const [showMore, setShowMore] = useState<boolean>(false);
    const navigate = useNavigate();
    const {jobType} = useParams();

    const changeModalOpen = (visible: boolean) => {
        return () => {
            setModalOpen(visible);
        }
    }

    const onModuleRadioChange = ({ target: { value } }: RadioChangeEvent) => {
        if (value === "JAR") {
            setFormModule(jarModule);
            console.log(value);
        } else if (value === "PYTHON") {
            setFormModule(pythonModule);
        }
    }

    return (
        <div className="development-layout">
            <div className="header">
                <div className="title">作业运维</div>
                <div className="actions">
                    <Space>
                        <Button type='primary' onClick={changeModalOpen(true)}>部署作业</Button>
                        <Select
                            defaultValue={jobType}
                            options={[
                                { value: 'stream', label: '流作业' },
                                { value: 'batch', label: '批作业' },
                            ]}
                        />
                        <Search
                            placeholder="搜索…"
                        />
                    </Space>
                </div>
            </div>
            <div className="content">
                <Table
                    columns={columns}
                    dataSource={data}
                    showSorterTooltip={false}
                    size='small'
                    onRow={(record) => {
                        return {
                            onClick: () => navigate(`${record.id}/configuration`)
                        }
                    }}
                />
            </div>

            <Modal
                title="部署作业"
                open={modalOpen}
                width={800}
                centered
                rootClassName='deploy-modal ant-modal-wrap-rtl'
                okText="部署"
                onOk={changeModalOpen(false)}
                cancelText="取消"
                onCancel={changeModalOpen(false)}
            >
                <div className="deploy-form-container ">
                    <Form
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 15 }}
                        labelAlign='left'
                    >
                        <Form.Item
                            label="部署作业类型"
                            required
                        >
                            <Radio.Group
                                defaultValue='JAR'
                                buttonStyle='solid'
                                onChange={onModuleRadioChange}
                            >
                                <Radio value='JAR'>JAR</Radio>
                                <Radio value='PYTHON'>PYTHON</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="部署模式"
                            required
                        >
                            <Select
                                defaultValue="stream"
                                options={[
                                    { value: 'stream', label: '流模式' },
                                    { value: 'batch', label: '批模式' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="部署名称"
                            required
                        >
                            <Input placeholder="请输入部署名称" />
                        </Form.Item>
                        <Form.Item
                            label="引擎版本"
                            required
                        >
                            <Select
                                defaultValue="v1"
                                options={[
                                    { value: 'v1', label: 'vvr-6.0.7-flink-1.15' },
                                ]}
                            />
                        </Form.Item>

                        {formModule}

                        <Form.Item
                            label="附加依赖文件"
                        >
                            <Input placeholder="如果你需要添加更多依赖文件， 请选择或输入任意合法的文件地址" suffix={<UploadOutlined />} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 7 }}
                        >
                            <Checkbox>提交到 Session 集群 （不推荐生产环境使用）</Checkbox>
                        </Form.Item>
                        <Form.Item
                            label="备注"
                        >
                            <TextArea placeholder="输入部署备注（可选）" rows={3} />
                        </Form.Item>
                        <Form.Item
                            label="更多设置"
                        >
                            <Switch defaultChecked={showMore} onChange={setShowMore} />
                        </Form.Item>

                        {showMore ? kerberosModule : null}
                    </Form>
                </div>
            </Modal>
        </div>
    )
};

export default OperationLayout;