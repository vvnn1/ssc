import { Button, Checkbox, Modal, ModalProps } from "antd";
import "./index.sass";
import { DownOutlined, QuestionCircleOutlined, UpOutlined } from "../../../Icon";
import { useState } from "react";
import { checkedChangeWrapper } from "../../../../util";
const StopModal = (props: ModalProps) => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [snapshot, setSnapshot] = useState<boolean>(false);
    const [outputData, setOutputData] = useState<boolean>(false);

    const onShowMoreClick = () => {
        setShowMore(showMore => !showMore);
    };

    const onSnapshotCheckboxChange = (checked:boolean) => {
        if (!checked){
            console.log("aa");
            setOutputData(false);
        }
        setSnapshot(checked);
    };

    return (
        <Modal
            {...props}
            className="stop-work-modal"
            footer={null}
            width={450}
        >
            <div className="title">
                <QuestionCircleOutlined /> 停止作业
            </div>
            <div className="confirm-content">
                确认要停止作业 Untitled-stream-sql？
            </div>
            <div className="collapse" onClick={onShowMoreClick}>
                更多设置 {showMore ? <UpOutlined /> : <DownOutlined />}
            </div>
            {
                showMore ? (
                    <div className="content">
                        <Checkbox onChange={checkedChangeWrapper(onSnapshotCheckboxChange)} checked={snapshot}>停止前创建一次快照</Checkbox>
                        <Checkbox disabled={!snapshot} checked={outputData} onChange={checkedChangeWrapper(setOutputData)}>输出窗口数据（Drain）</Checkbox>
                    </div>
                ) : null
            }

            <div className="ant-modal-footer">
                <Button type="primary" onClick={props.onOk} {...props.okButtonProps}>确认</Button>
                <Button onClick={props.onCancel} {...props.cancelButtonProps}>取消</Button>
            </div>
        </Modal>
    );
};

export default StopModal;