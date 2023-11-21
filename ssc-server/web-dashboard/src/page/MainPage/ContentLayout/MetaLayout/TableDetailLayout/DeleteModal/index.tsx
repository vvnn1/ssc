import { Button, Modal, ModalProps } from "antd";
import { QuestionCircleOutlined } from "../../../../../../component/Icon";

const DeleteModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            footer={null}
            title={null}
            className="ant-modal-confirm ant-modal-confirm-confirm"
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className={"ant-modal-confirm-body ant-modal-confirm-body-has-title"}>
                    <QuestionCircleOutlined />
                    <div className="ant-modal-confirm-paragraph">
                        <span className="ant-modal-confirm-title">删除: datagen_kk_source</span>
                        <div className="ant-modal-confirm-content">
                            请注意，如果重新转换现有的 SQL 作业，则删除表可能会破坏现有的 SQL
                            作业，例如在暂停/恢复或自动调优更改作业配置时，都会发生这种情况。
                        </div>
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
