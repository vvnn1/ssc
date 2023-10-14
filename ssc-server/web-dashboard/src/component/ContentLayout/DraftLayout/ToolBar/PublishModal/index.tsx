import { Modal, ModalProps, ProgressProps, Steps } from 'antd';
import './index.sass'
import Step1 from './Step1';
import { useState } from 'react';
import Step2 from './Step2';

const PublishModal = (props: ModalProps) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [publishStatus, setPublishStatus] = useState<ProgressProps['status']>();
    
    const next = () => {
        setCurrentStep(currentStep + 1);
    }

    const prev = () => {
        setCurrentStep(currentStep - 1);
    }

    const steps = [
        {
            title: '部署确认',
            content: <Step1 />,
            onOk: next,
            
        },
        {
            title: '最终检查',
            content: <Step2 onStatusChange={setPublishStatus} status={publishStatus}/>,
            onOk: props.onCancel,
        }
    ]

    return (
        <Modal
            {...props}
            title="部署新版本"
            width={600}
            className="publish-draft-modal"
            rootClassName='ant-modal-wrap-rtl'
            onOk={steps[currentStep].onOk}
            confirmLoading={publishStatus === 'active'}
            cancelButtonProps={{
                style: {
                    display: currentStep > 0 ? 'none' : 'inline-block'
                }
            }}
            destroyOnClose
        >

            <Steps
                items={steps}
                size='small'
                current={currentStep}
            />

            {steps[currentStep].content}
        </Modal>
    )
};

export default PublishModal;