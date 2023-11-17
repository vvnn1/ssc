import { InputNumber, InputNumberProps, SelectProps } from "antd";
import TimeUnitSelect, { TimeUnit } from "../Select/TimeUnitSelect";
import { useState } from "react";

interface TimeInputNumberProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string | null) => void;
    inputProps?: InputNumberProps<string>;
    selectProps?: SelectProps;
}

const pattern = /(?<number>\d+)(?<unit>d|h|min|s|ms|us|ns)/;

const TimeInputNumber:React.FC<TimeInputNumberProps> = ({ value, defaultValue, onChange, inputProps, selectProps }) => {
    const defaultGroups = pattern.exec(defaultValue ?? "")?.groups;
    const valueGroups = pattern.exec(value ?? "")?.groups;

    const [number, setNumber] = useState<string | null | undefined>(valueGroups?.number);
    const [unit, setUnit] = useState<TimeUnit|undefined>(valueGroups?.unit as TimeUnit);

    const onNumberChange = (number: string | null) => {
        setNumber(number);
        if ((number !== null) && unit) {
            onChange?.(number + unit);
        } else {
            onChange?.(null);
        }
    };

    const onUnitChange:SelectProps["onChange"] = (unit) => {
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
            value={number}
            defaultValue={defaultGroups?.number}
            onChange={onNumberChange}
            addonAfter={
                <TimeUnitSelect
                    {...selectProps}
                    value={unit}
                    defaultValue={defaultGroups?.unit}
                    onChange={onUnitChange}
                />
            }
        />
    );
};

export default TimeInputNumber;