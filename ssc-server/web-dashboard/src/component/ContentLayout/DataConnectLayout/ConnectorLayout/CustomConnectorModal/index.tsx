import { Button, Modal, ModalProps, Steps } from "antd";
import { useState } from "react";
import Step2Form from "./Step2Form";
import Step1Form from "./Step1Form";
import './index.sass'

const CustomConnectorModal = (props: ModalProps) => {
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
        <Modal
            open={props.open}
            onCancel={props.onCancel}
            maskClosable={false}
            title="创建自定义连接器"
            width={800}
            rootClassName="custom-connector-modal"
            footer={stepItems[currentStep]}
            destroyOnClose
        >
            <Steps
                size="small"
                current={currentStep}
                items={[
                    {
                        title: '上传 JAR',
                    },
                    {
                        title: '查看连接器',
                    },
                ]}
            />

            <div className="steps-body">
                <Step1Form hidden={currentStep !== 0} />
                <Step2Form hidden={currentStep !== 1} />
            </div>

        </Modal>
    )
};

export default CustomConnectorModal;