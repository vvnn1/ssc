import { Select, SelectProps } from "antd";

const LogLevelSelect = (props: SelectProps) => {
    return (
        <Select
            {...props}
            options={[
                { value: "TRACE", label: "TRACE" },
                { value: "DEBUG", label: "DEBUG" },
                { value: "INFO", label: "INFO" },
                { value: "WARN", label: "WARN" },
                { value: "ERROR", label: "ERROR" },
            ]}
        />
    );
};
export default LogLevelSelect;
