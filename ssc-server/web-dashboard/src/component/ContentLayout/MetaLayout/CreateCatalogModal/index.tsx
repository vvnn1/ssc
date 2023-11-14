import { Button, Modal, ModalProps, Steps } from "antd";
import { useState } from "react";
import Step1Form from "./Step1Form";
import "./index.sass"
import StepModal from "../../../StepModal";

const CreateCatalogModal = (props: ModalProps) => {
    const [stepForm2, setStepForm2] = useState<React.ReactNode>();
    const [currentStep, setCurrentStep] = useState<number>(0);


    const nextStep = () => {
        if (currentStep > 1) {
            return;
        }
        setCurrentStep(currentStep + 1);
    }

    const prevStep = () => {
        if (currentStep < 0) {
            return;
        }
        setCurrentStep(currentStep - 1);
    }


    const stepItems: React.ReactElement[] = [
        (
            <>
                <Button key="next" type="primary" onClick={nextStep} disabled={stepForm2 === undefined}>下一步</Button>
                <Button key="cancel" onClick={props.onCancel}>取消</Button>

            </>
        ),
        (
            <>
                <Button key="prev" onClick={prevStep}>上一步</Button>
                <Button key="finish" type="primary" onClick={props.onCancel}>完成</Button>
                <Button key="cancel" onClick={props.onCancel}>取消</Button>
            </>
        )
    ];

    return (
        <StepModal
            modalProps={{
                ...props,
                maskClosable: false,
                title: "创建 Catalog",
                width: 900,
                rootClassName: "create-catalog-modal",
                destroyOnClose: true
            }}
            stepsProps={{
                size: "small",
                items: [
                    {
                        title: '选择 Catalog 类型',
                    },
                    {
                        title: '配置 Catalog',
                    },
                ]
            }}
        >
            {
                (currentStep: number) => {
                    return (
                        <div className="steps-body">
                            <Step1Form hidden={currentStep !== 0} onNextFormChange={setStepForm2}  />
                            <div hidden={currentStep !== 1}>{stepForm2}</div>
                        </div>
                    )
                }
            }
        </StepModal>
    )
};

export default CreateCatalogModal;