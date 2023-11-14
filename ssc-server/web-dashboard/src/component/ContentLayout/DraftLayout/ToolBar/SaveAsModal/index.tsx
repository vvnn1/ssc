import { Form, Input, Modal, ModalProps } from "antd"
import DirectorySelect from "../../../../DirectorySelect";

const SaveAsModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            title="另存为"
            okText="保存"
            cancelText="取消"
            footer={(_, { CancelBtn, OkBtn }) => <><OkBtn/><CancelBtn /></>}
            width={550}
            destroyOnClose
        >
            <Form
                size="small"
                labelCol={{span: 6}}
                wrapperCol={{span: 16}}
            >
                <Form.Item
                    label="文件名称"
                    name='name'
                    initialValue='test'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="存储位置"
                    initialValue='0'
                    valuePropName="selectedKey"
                    name='location'
                >
                    <DirectorySelect />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default SaveAsModal;