import { ModalProps } from "antd";
import { useState } from "react";
import Step1Form from "./Step1Form";
import "./index.sass";
import StepModal from "../../../StepModal";

const CreateCatalogModal = (props: ModalProps) => {
    const [stepForm2, setStepForm2] = useState<React.ReactNode>();

    return (
        <StepModal
            modalProps={{
                ...props,
                maskClosable: false,
                title: "创建 Catalog",
                width: 900,
                rootClassName: "create-catalog-modal",
                destroyOnClose: true,
            }}
            stepsProps={{
                size: "small",
                items: [
                    {
                        title: "选择 Catalog 类型",
                    },
                    {
                        title: "配置 Catalog",
                    },
                ],
            }}
        >
            {(currentStep: number) => {
                return (
                    <div className="steps-body">
                        <Step1Form
                            hidden={currentStep !== 0}
                            onNextFormChange={setStepForm2}
                        />
                        <div hidden={currentStep !== 1}>{stepForm2}</div>
                    </div>
                );
            }}
        </StepModal>
    );
};

export default CreateCatalogModal;
