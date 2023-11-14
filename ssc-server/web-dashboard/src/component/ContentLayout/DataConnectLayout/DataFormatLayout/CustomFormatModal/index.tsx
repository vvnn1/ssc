import { Button, ModalProps } from "antd";
import { useState } from "react";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import "./index.sass"
import StepModal from "../../../../StepModal";

const CustomFormatModal = (props: ModalProps) => {
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
                <Button key="next" type="primary" onClick={nextStep}>下一步</Button>
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
                title: "创建自定义数据格式",
                width: 800,
                rootClassName: "custom-format-modal",
                destroyOnClose: true
            }}
            stepsProps={{
                size: "small",
                items: [
                    {
                        title: '上传 JAR',
                    },
                    {
                        title: '查看 Format',
                    },
                ]
            }}
        >
            {
                (currentStep: number) => {
                    return (
                        <div className="steps-body">
                            <Step1Form hidden={currentStep !== 0} />
                            <Step2Form hidden={currentStep !== 1} />
                        </div>
                    )
                }
            }
        </StepModal>
    );
};

export default CustomFormatModal;