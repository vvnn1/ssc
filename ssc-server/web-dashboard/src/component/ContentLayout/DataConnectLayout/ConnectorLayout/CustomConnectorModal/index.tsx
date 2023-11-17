import { ModalProps } from "antd";
import Step2 from "./Step2";
import Step1 from "./Step1";
import "./index.sass";
import StepModal from "../../../../StepModal";

const CustomConnectorModal = (props: ModalProps) => {
    return (
        <StepModal
            modalProps={{
                ...props,
                title: "创建自定义连接器",
                width: 800,
                rootClassName: "custom-connector-modal",
                destroyOnClose: true,
            }}
            stepsProps={{
                size: "small",
                items: [
                    {
                        title: "上传 JAR",
                    },
                    {
                        title: "查看连接器",
                    },
                ],
            }}
        >
            {(currentStep: number) => {
                return (
                    <div className="steps-body">
                        <Step1 hidden={currentStep !== 0} />
                        <Step2 hidden={currentStep !== 1} />
                    </div>
                );
            }}
        </StepModal>
    );
};

export default CustomConnectorModal;
