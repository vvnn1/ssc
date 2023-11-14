import { Form, Input, Modal, ModalProps } from "antd";

const AddModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            title="新增密钥"
            width={600}
            footer={(_, { OkBtn, CancelBtn }) => (<><OkBtn /><CancelBtn /></>)}
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
    )
}

export default AddModal;