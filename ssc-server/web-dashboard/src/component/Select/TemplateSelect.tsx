import { Select, SelectProps } from "antd";

const TemplateSelect = (props: SelectProps) => {
    return (
        <Select
            placeholder="请选择输入模板"
            options={[
                {
                    label: "系统模板",
                    options: [{ label: "default", value: "default" }],
                },
                {
                    label: "用户配置",
                    options: [{ label: "自定义模板", value: "custom" }],
                },
            ]}
            {...props}
        />
    );
};

export default TemplateSelect;
