import { InputNumber, InputNumberProps, SelectProps } from "antd";
import MemoryUnitSelect, { MemoryUnit } from "../Select/MemoryUnitSelect";
import { useState } from "react";

interface MemoryInputNumberProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string | null) => void;
    inputProps?: InputNumberProps<string>;
    selectProps?: SelectProps;
}

const pattern = /(?<number>\d+)(?<unit>MiB|GiB)/;

const MemoryInputNumber: React.FC<MemoryInputNumberProps> = ({
    value,
    defaultValue,
    onChange,
    inputProps,
    selectProps,
}) => {
    const defaultGroups = pattern.exec(defaultValue ?? "")?.groups;
    const valueGroups = pattern.exec(value ?? "")?.groups;
    const [number, setNumber] = useState<string | null | undefined>();
    const [unit, setUnit] = useState<MemoryUnit | undefined>();
    const onNumberChange = (number: string | null) => {
        setNumber(number);
        if (number !== null && unit) {
            onChange?.(number + unit);
        } else {
            onChange?.(null);
        }
    };
    console.log(number);
    const onUnitChange: SelectProps["onChange"] = unit => {
        setUnit(unit);
        if (number && unit) {
            onChange?.(number + unit);
        } else {
            onChange?.(null);
        }
    };

    return (
        <InputNumber
            {...inputProps}
            value={number ?? valueGroups?.number}
            defaultValue={defaultGroups?.number}
            onChange={onNumberChange}
            addonAfter={
                <MemoryUnitSelect
                    {...selectProps}
                    value={unit ?? (valueGroups?.unit as MemoryUnit)}
                    defaultValue={defaultGroups?.unit}
                    onChange={onUnitChange}
                />
            }
        />
    );
};

export default MemoryInputNumber;
