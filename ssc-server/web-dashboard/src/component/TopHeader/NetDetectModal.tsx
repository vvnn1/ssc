import { Form, Input, InputNumber, Modal, ModalProps, Tooltip } from "antd";
import { QuestionCircleOutlined } from "../Icon";

const NetDetectModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            width={600}
            title={
                <>
                    网络探测
                    <Tooltip title="网络探测仅可以帮助您检查平台与指定的上下游网络是否连通。非连通状态、网络连通但无访问权限、未配置白名单等问题都会导致元数据等服务无法正常使用，Flink作业运行失败。">
                        <QuestionCircleOutlined style={{ marginLeft: 8 }} />
                    </Tooltip>
                </>
            }
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            )}
            okText="探测"
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
            >
                <Form.Item
                    label="Host"
                    required
                >
                    <Input placeholder="请输入 Endpoint 或 IP 地址" />
                </Form.Item>
                <Form.Item
                    label="Port"
                    required
                    extra="端口号范围 1~65535"
                    style={{ marginBottom: 0 }}
                >
                    <InputNumber placeholder="请输入端口号，例如 8080" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NetDetectModal;
