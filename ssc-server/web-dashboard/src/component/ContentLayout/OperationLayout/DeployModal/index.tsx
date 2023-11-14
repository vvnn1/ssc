import { Checkbox, Form, Input, Modal, ModalProps, Radio, RadioChangeEvent, Select, Switch } from "antd";
import "./index.sass";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const DeployModal = (props: ModalProps) => {
    const [jobType, setJobType] = useState<"JAR" | "PYTHON">("JAR");
    const [showMore, setShowMore] = useState<boolean>(false);

    const onModuleRadioChange = ({ target: { value } }: RadioChangeEvent) => {
        setJobType(value);
    };


    return (
        <Modal
            {...props}
            title="部署作业"
            width={800}
            centered
            footer={(_, { CancelBtn, OkBtn }) => <><OkBtn /><CancelBtn /></>}
            okText="部署"
            cancelText="取消"
            className="deploy-work-modal"
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
                                { value: "stream", label: "流模式" },
                                { value: "batch", label: "批模式" },
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
                                { value: "v1", label: "vvr-6.0.7-flink-1.15" },
                            ]}
                        />
                    </Form.Item>

                    {
                        jobType === "JAR" ?
                            (
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
                            ) : null
                    }

                    {
                        jobType === "PYTHON" ?
                            (
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
                            ) : null
                    }

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

                    {
                        showMore ? (
                            <div className="kerberos-module">
                                <Form.Item
                                    label="Kerberos 集群"
                                    labelCol={{ offset: 7, span: 5 }}
                                    wrapperCol={{ span: 10 }}
                                    required
                                >
                                    <Select />
                                </Form.Item>
                                <Form.Item
                                    label="principal"
                                    labelCol={{ offset: 7, span: 5 }}
                                    wrapperCol={{ span: 10 }}
                                    required
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                        ) : null
                    }
                </Form>
            </div>
        </Modal>
    );
};

export default DeployModal;