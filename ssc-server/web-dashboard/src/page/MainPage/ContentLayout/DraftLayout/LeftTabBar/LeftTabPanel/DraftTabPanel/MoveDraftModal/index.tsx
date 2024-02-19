import { Form, Modal, ModalProps } from "antd";
import DirectorySelect from "../../../../../../../../component/DirectorySelect";
import "./index.sass";

const MoveDraftModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            title="移动"
            className="move-draft-modal"
            footer={(_, { CancelBtn, OkBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            )}
        >
            <Form.Item
                label="到目录"
                initialValue="0"
                valuePropName="selectedKey"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 21 }}
            >
                <DirectorySelect />
            </Form.Item>
        </Modal>
    );
};

export default MoveDraftModal;
