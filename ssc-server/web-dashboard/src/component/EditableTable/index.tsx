import { Button, Checkbox, Input, InputProps, Table, Tooltip } from "antd";
import { useState } from "react";
import './index.sass'

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
type EditTypes = typeof Input | typeof Checkbox | typeof TooltipInput | undefined;

interface EditableCellProps<RecordType> {
    title: React.ReactNode;
    editType: EditTypes;
    children: React.ReactNode;
    dataIndex: keyof RecordType;
    record: RecordType;
}

const EditableCell: React.FC<EditableCellProps<any>> = ({
    title,
    editType,
    children,
    dataIndex,
    record,
    ...restProps
}) => {

    const setField = <T, K extends keyof T>(o: T, key: K, value: T[K]) => {
        o[key] = value
    }

    const getField = <T, K extends keyof T>(o: T, key: K): any => {
        return o[key];
    }

    if (editType === Checkbox) {
        return <td {...restProps}><Checkbox defaultChecked={getField(record, dataIndex)} onChange={({ target: { checked } }) => setField(record, dataIndex, checked)} /></td>
    }

    if (editType === Input) {
        return <td {...restProps}><Input size='small' defaultValue={getField(record, dataIndex)} onChange={({ target: { value } }) => setField(record, dataIndex, value)} /></td>
    }

    if (editType === TooltipInput) {
        return <td {...restProps}><TooltipInput size='small' defaultValue={getField(record, dataIndex)} onChange={({ target: { value } }) => setField(record, dataIndex, value)} /></td>
    }

    return <td {...restProps}>{children}</td>;
};

export const TooltipInput = (props: InputProps) => {
    const [title, setTitle] = useState<string>(props.defaultValue as string);
    const onInputChanged = (event: any) => {
        props.onChange?.(event);
        const { target: { value } } = event;
        setTitle(value);
    }
    return (
        <Tooltip title={title}>
            <div>
                <Input {...props} onChange={onInputChanged} />
            </div>
        </Tooltip>
    );
};

export type EditColumType = (ColumnTypes[number] & { editType?: EditTypes; dataIndex: string; });


interface EditabhleProps<RecordType> {
    dataSource: RecordType[];
    columns: EditColumType[];
    handleAdd: () => void;
}

const EditableTable = <RecordType extends Object>(props: EditabhleProps<RecordType>) => {
    const [editIndex, setEditIndex] = useState<number>(-1);
    const onRow = (_: any, index: number | undefined): React.HTMLAttributes<any> | React.TdHTMLAttributes<any> => {
        return {
            onClick: () => setEditIndex(index!)
        }
    }

    const onRowClassName = (activeIndex: number) => {
        return (_: any, index: number): string => {
            if (activeIndex === index) {
                return '';
            }
            return 'view';
        }
    }

    const components = {
        body: {
            cell: EditableCell,
        },
    };


    const columns = props.columns.map((col) => {
        if (!col.editType) {
            return col;
        }
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                editType: col.editType,
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });

    return (
        <Table
            className="editable-table"
            components={components}
            rowClassName={onRowClassName(editIndex)}
            dataSource={props.dataSource}
            columns={columns as ColumnTypes}
            size='small'
            onRow={onRow}
            footer={() => (
                <Button onClick={props.handleAdd} type="primary" size='small'>
                    添加 Property
                </Button>
            )}
        />
    )
};

export default EditableTable;