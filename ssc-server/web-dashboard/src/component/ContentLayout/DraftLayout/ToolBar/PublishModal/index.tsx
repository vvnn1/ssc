import { Modal, ModalProps, ProgressProps, StepProps, Steps, StepsProps } from 'antd';
import './index.sass'
import Step1 from './Step1';
import { useEffect, useState } from 'react';
import Step2 from './Step2';

const PublishModal = (props: ModalProps) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [publishStatus, setPublishStatus] = useState<ProgressProps['status']>();
    

    useEffect(() => {
        if(publishStatus === 'success') {
            props.onOk?.(undefined as any);
        }
    }, [publishStatus]);

    const next = () => {
        setCurrentStep(currentStep + 1);
    }

    const stepProps: StepProps[] = [
        {
            title: '部署确认',
        },
        {
            title: '最终检查',
        }
    ];


    const steps = [
        {
            content: <Step1 />,
            onOk: next,
        },
        {
            content: <Step2 onStatusChange={setPublishStatus} status={publishStatus}/>,
            onOk: props.onCancel,
        }
    ];

    return (
        <Modal
            {...props}
            destroyOnClose
            title="部署新版本"
            width={600}
            className="publish-draft-modal"
            footer={(_, { CancelBtn, OkBtn }) => <><OkBtn/><CancelBtn /></>}
            onOk={steps[currentStep].onOk}
            confirmLoading={publishStatus === 'active'}
            cancelButtonProps={{
                style: {
                    display: currentStep > 0 ? 'none' : 'inline-block'
                },
            }}
        >

            <Steps
                items={stepProps}
                size='small'
                current={currentStep}
            />

            {steps[currentStep].content}
        </Modal>
    )
};

export default PublishModal;