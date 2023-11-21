import { Select, SelectProps } from "antd";

export type MemoryUnit = "MiB" | "GiB";

const MemoryUnitSelect = (props: SelectProps) => {
    return (
        <Select
            {...props}
            options={[
                { value: "MiB", label: "MiB" },
                { value: "GiB", label: "GiB" },
            ]}
        />
    );
};

export default MemoryUnitSelect;
