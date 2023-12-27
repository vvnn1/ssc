import { ModalProps } from "antd";
import "./index.sass";
import Step1, { CardDetail } from "./Step1";
import StepModal from "../../../../../../component/StepModal";
import Step2 from "./Step2";
import { useState } from "react";

const CreateTemporaryTableModal = (props: ModalProps) => {
    const [selectedCard, setSelectedCard] = useState<CardDetail>();

    return (
        <StepModal
            modalProps={{
                ...props,
                onOk: props.onCancel,
                title: "添加临时表",
                width: 1000,
                className: "create-temporary-table-modal",
                okButtonProps: {
                    disabled: !selectedCard,
                },
            }}
            stepsProps={{
                items: [
                    {
                        title: "选择临时表类型",
                    },
                    {
                        title: "构建临时表",
                    },
                ],
                size: "small",
            }}
        >
            {currentStep => {
                return (
                    <>
                        <Step1
                            hidden={currentStep !== 0}
                            onCardChange={setSelectedCard}
                        />
                        <Step2
                            hidden={currentStep !== 1}
                            {...selectedCard!}
                        />
                    </>
                );
            }}
        </StepModal>
    );
};

export default CreateTemporaryTableModal;
