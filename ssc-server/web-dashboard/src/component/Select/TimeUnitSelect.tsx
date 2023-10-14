import { Select, SelectProps } from "antd";

export type TimeUnit = 'd'|'h'|'min'|'s'|'ms'|'us'|'ns';

const TimeUnitSelect = (props: SelectProps) => {
    return (
        <Select
            {...props}
            options={[
                { value: "d", label: "天" },
                { value: "h", label: "小时" },
                { value: "min", label: "分" },
                { value: "s", label: "秒" },
                { value: "ms", label: "毫秒" },
                { value: "us", label: "微秒" },
                { value: "ns", label: "纳秒" },
            ]}
        />
    )
};

export default TimeUnitSelect;