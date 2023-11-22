import { Form, Input, Modal, ModalProps, Radio } from "antd";

const AddModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            title="添加成员"
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            )}
        >
            <Form layout="vertical">
                <Form.Item
                    required
                    label="角色"
                    extra={
                        <span>
                            不同角色的功能使用差异. 请查看 <a>详情</a>
                        </span>
                    }
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
                    extra="填写账号 UID、RAM 用户账号 UID 、RAM 角色账号扮演的主账号 UID"
                    validateStatus="success"
                    hasFeedback
                >
                    <Input
                        placeholder="请输入成员信息"
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddModal;
