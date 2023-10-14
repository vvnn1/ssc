import { Button, Modal, ModalProps, Steps } from "antd";
import { useState } from "react";
import Step1Form from "./Step1Form";
import "./index.sass"

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
        <Modal
            open={props.open}
            onCancel={props.onCancel}
            maskClosable={false}
            title="创建 Catalog"
            width={900}
            rootClassName="create-catalog-modal"
            footer={stepItems[currentStep]}
            destroyOnClose
        >

            <Steps
                className="create-catalog-steps"
                size="small"
                current={currentStep}
                items={[
                    {
                        title: '选择 Catalog 类型',
                    },
                    {
                        title: '配置 Catalog',
                    },
                ]}
            />

            <div className="steps-body">
                <Step1Form onNextFormChange={setStepForm2} hidden={currentStep !== 0} />
                <div hidden={currentStep !== 1}>{stepForm2}</div>
            </div>
        </Modal>
    )
};

export default CreateCatalogModal;