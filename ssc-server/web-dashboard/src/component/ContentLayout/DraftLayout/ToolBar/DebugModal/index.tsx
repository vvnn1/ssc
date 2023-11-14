import { Button, ButtonProps, Modal, ModalProps, Steps } from "antd";
import './index.sass'
import { useState } from "react";
import Step2Form from "./Step2Form";
import Step1Form from "./Step1Form";

const DebugModal = (props: ModalProps) => {
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

    const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onCancel?.(e);
        const id = setInterval(() => {
            document.dispatchEvent(new CustomEvent('bottom-label-change', {
                detail: {
                    label: 'debug'
                },
            }));
            clearInterval(id);
        }, 1000);
        
    }


    const stepItems: React.ReactElement[] = [
        (
            <>
                <Button key="next" type="primary" onClick={nextStep}>下一步</Button>
                <Button key="cancel" onClick={props.onCancel}>取消</Button>

            </>
        ),
        (
            <>
                <Button key="prev" onClick={prevStep}>上一步</Button>
                <Button key="finish" type="primary" onClick={onConfirm}>确认</Button>
                <Button key="cancel" onClick={props.onCancel}>取消</Button>
            </>
        )
    ];

    return (
        <Modal
            open={props.open}
            onCancel={props.onCancel}
            title="调试"
            width={800}
            className="debug-modal"
            footer={stepItems[currentStep]}
        >
            <Steps
                items={[
                    {
                        title: "调试参数"
                    },
                    {
                        title: "调试数据"
                    }
                ]}
                size="small"
                current={currentStep}
            />
            <Step1Form hidden={currentStep !== 0} />
            <Step2Form hidden={currentStep !== 1} />
        </Modal>
    )
};

export default DebugModal;