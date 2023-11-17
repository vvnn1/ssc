import { ModalProps } from "antd";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import "./index.sass";
import StepModal from "../../../../StepModal";

const CustomFormatModal = (props: ModalProps) => {
    return (
        <StepModal
            modalProps={{
                ...props,
                maskClosable: false,
                title: "创建自定义数据格式",
                width: 800,
                rootClassName: "custom-format-modal",
                destroyOnClose: true,
            }}
            stepsProps={{
                size: "small",
                items: [
                    {
                        title: "上传 JAR",
                    },
                    {
                        title: "查看 Format",
                    },
                ],
            }}
        >
            {(currentStep: number) => {
                return (
                    <div className="steps-body">
                        <Step1Form hidden={currentStep !== 0} />
                        <Step2Form hidden={currentStep !== 1} />
                    </div>
                );
            }}
        </StepModal>
    );
};

export default CustomFormatModal;
