import { Button, Modal, ModalProps } from "antd";
import { QuestionCircleOutlined } from "../../../../../component/Icon";

const DeleteModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            footer={null}
            title={null}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            width={400}
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className={"ant-modal-confirm-body ant-modal-confirm-body-has-title"}>
                    <QuestionCircleOutlined />
                    <div className="ant-modal-confirm-paragraph">
                        <span className="ant-modal-confirm-title">删除 wml-pc？</span>
                        <div className="ant-modal-confirm-content">密钥将会被删除且不可恢复</div>
                    </div>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button
                        type="primary"
                        danger
                        onClick={props.onOk}
                    >
                        确定
                    </Button>
                    <Button onClick={props.onCancel}>取消</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
