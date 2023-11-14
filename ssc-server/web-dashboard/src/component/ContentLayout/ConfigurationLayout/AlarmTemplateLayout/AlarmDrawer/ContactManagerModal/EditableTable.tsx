import React, { useState } from "react";
import { Divider, Form, Input, Popconfirm, Table, TableProps, Typography } from "antd";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    record: any;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input defaultValue={record[dataIndex]} />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = <RecordType extends Record<PropertyKey, any>>(props: TableProps<RecordType> & { deleteTitle: string }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState<any[]>([]);
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record: any) => record.key === editingKey;

    const edit = (record: Partial<any> & { key: React.Key }) => {
        form.setFieldsValue({ [record.key]: "", ...record });
        setEditingKey(record.key as string);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields());

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const mergedColumns = props.columns?.map((col: any) => {
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    mergedColumns?.push(
        {
            title: "操作",
            dataIndex: "operation",
            width: 190,
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a onClick={() => save(record.key)}>保存</a>
                        <Divider type='vertical' />
                        <Popconfirm
                            okText="确认"
                            cancelText="取消"
                            title='确定取消吗？'
                            overlayClassName="ant-popover-rtl"
                            onConfirm={cancel}
                        >
                            <a>取消</a>
                        </Popconfirm>
                        <Divider type='vertical' />
                        <Popconfirm
                            okText="确认"
                            cancelText="取消"
                            title={props.deleteTitle}
                            overlayClassName="ant-popover-rtl"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
                            编辑
                        </Typography.Link>
                        <Divider type='vertical' />
                        <Popconfirm
                            okText="确认"
                            cancelText="取消"
                            title={props.deleteTitle}
                            overlayClassName="ant-popover-rtl"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </span>

                );
            },
        },
    );


    return (
        <Form form={form} component={false}>
            <Table
                {...props}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                columns={mergedColumns}
                
            />
        </Form>
    );
};

export default EditableTable;