import { Button, Modal, ModalProps, Steps, StepsProps } from "antd";
import { useState } from "react";

interface StepModalProps {
    modalProps?: ModalProps;
    stepsProps?: StepsProps;
    children: (currentStep: number) => React.ReactNode;
}

const StepModal = (props: StepModalProps) => {
    const [currentStep, setCurrentStep] = useState<number>(0);

    const nextStep = () => {
        if (currentStep > 1) {
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep < 0) {
            return;
        }
        setCurrentStep(currentStep - 1);
    };

    return (
        <Modal
            {...props.modalProps}
            okText={currentStep === 0 ? "下一步" : "确定"}
            footer={(_, { OkBtn, CancelBtn }) => {
                if (currentStep === 0) {
                    return (
                        <>
                            <OkBtn />
                            <CancelBtn />
                        </>
                    );
                }
                return (
                    <>
                        <Button onClick={prevStep}>上一步</Button>
                        <OkBtn />
                        <CancelBtn />
                    </>
                );
            }}
            onOk={currentStep === 0 ? nextStep : props.modalProps?.onOk}
        >
            <Steps
                {...props.stepsProps}
                current={currentStep}
            />
            {props.children(currentStep)}
        </Modal>
    );
};

export default StepModal;
