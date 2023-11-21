import { Alert, Input, InputProps, InputRef, Modal, ModalProps } from "antd";
import "./index.sass";
import { useEffect, useRef, useState } from "react";

const RenameModal = (props: ModalProps) => {
    const inputRef = useRef<InputRef>(null);
    const [okDisable, setOkDisable] = useState<boolean>(true);
    useEffect(() => {
        inputRef.current?.select();
    }, []);

    const onInputChange: InputProps["onChange"] = e => {
        setOkDisable(e.target.value === "datagen_kk_source");
    };

    return (
        <Modal
            {...props}
            title="重命名: datagen_kk_source"
            okButtonProps={{
                disabled: okDisable,
            }}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            )}
            className="rename-func-modal"
        >
            <Input
                ref={inputRef}
                defaultValue="datagen_kk_source"
                onChange={onInputChange}
            />
            <Alert
                type="warning"
                description="请注意，如果作业重新转换（例如在暂停/恢复或自动调优更改作业配置时）重命名表可能会破坏现有的 SQL 作业。"
            />
        </Modal>
    );
};

export default RenameModal;
