import { Button, Form, Modal, ModalProps } from "antd";
import "./index.sass";
import { useState } from "react";
import Step2 from "./Step2";
import Step1, { CardTemplate } from "./Step1";

const CreateDraftModal = (props: ModalProps) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selectedCardTemplate, setSelectedCardTemplate] = useState<CardTemplate>();
    const [form] = Form.useForm();

    const nextClick = () => {
        if (currentStep < 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevClick = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(form.getFieldsValue());
        props.onCancel?.(e);
    };

    const step1Footer = (
        <>
            <Button key="next-step" type="primary" onClick={nextClick}>下一步</Button>
            <Button key="cancel" onClick={props.onCancel}>取消</Button>
        </>
    );

    const step2Footer = (
        <>
            <Button key="perv-step" onClick={prevClick}>上一步</Button>
            <Button key="create" type="primary" onClick={onConfirm}>创建</Button>
            <Button key="cancel" onClick={props.onCancel}>取消</Button>
        </>
    );

    return (
        <Modal
            {...props}
            destroyOnClose
            maskClosable={false}
            title="新建作业草稿"
            width={1000}
            rootClassName="create-draft-modal"
            footer={currentStep === 0 ? step1Footer : step2Footer}
        >

            {currentStep === 0 ? <Step1 onTemplateSelected={setSelectedCardTemplate} /> : <Step2 form={form} onBackwardClick={prevClick} template={selectedCardTemplate} />}

        </Modal>
    );
};

export default CreateDraftModal;