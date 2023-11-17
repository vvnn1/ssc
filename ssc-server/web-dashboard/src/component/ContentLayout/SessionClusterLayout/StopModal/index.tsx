import { Button, Checkbox, CheckboxProps, Modal, ModalProps } from "antd";
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "../../../Icon";

const StopModal = (props: ModalProps) => {

    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (props.open) {
            setChecked(false);
        }
    }, [props.open]);

    const onCheckedChange: CheckboxProps["onChange"] = ({ target: { checked } }) => {
        setChecked(checked);
    };

    return (
        <Modal
            {...props}
            open={props.open}
            footer={null}
            onCancel={props.onCancel}
            className="ant-modal-confirm ant-modal-confirm-warning"
            width={450}
            destroyOnClose
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <ExclamationCircleOutlined />
                    <span className="ant-modal-confirm-title">确认停止该集群？</span>
                    <div className="ant-modal-confirm-content">
                        注意：停止 session 集群将导致在此集群上运行的所有作业停止，是否确认？
                        <br />
                        <br />
                        <Checkbox checked={checked} onChange={onCheckedChange}>我已知晓</Checkbox>
                    </div>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button type="primary" disabled={!checked} onClick={props.onOk}>确定</Button>
                </div>
            </div>
        </Modal>
    );
};

export default StopModal;