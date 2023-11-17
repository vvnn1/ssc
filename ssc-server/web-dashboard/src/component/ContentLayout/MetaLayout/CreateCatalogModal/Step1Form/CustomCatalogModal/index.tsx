import { ModalProps } from "antd";
import Step2Form from "./Step2Form";
import Step1Form from "./Step1Form";
import "./index.sass";
import StepModal from "../../../../../StepModal";

const CustomCatalogModal = (props: ModalProps) => {
    return (
        <StepModal
            modalProps={{
                ...props,
                maskClosable: false,
                title: "创建自定义 Catalog 类型",
                width: 900,
                rootClassName: "custom-catalog-modal",
                destroyOnClose: true,
            }}
            stepsProps={{
                items: [
                    {
                        title: "上传文件",
                    },
                    {
                        title: "参数配置",
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

export default CustomCatalogModal;
