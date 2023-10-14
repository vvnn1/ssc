import { useState } from 'react';
import { Button, Select, Form, Input, Checkbox } from 'antd';
import './index.sass'
import { DeleteOutlined } from '../../../../../../Icon';
import EditableTable, { EditColumType, TooltipInput } from '../../../../../../EditableTable';


interface ConnectorProperties {
    name: string;
    description: string;
    required: boolean;
    defineFormat: boolean;
    defaultValue: string;
}

const Step2Form = (props: { hidden: boolean }) => {

    const [dataSource, setDataSource] = useState<ConnectorProperties[]>([
        {
            name: 'sink.batch.interval',
            description: '',
            required: true,
            defineFormat: true,
            defaultValue: '1s'
        }
    ]);

    const defaultColumns:EditColumType[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            editType: TooltipInput
        },
        {
            title: 'Description',
            dataIndex: 'description',
            editType: Input
        },
        {
            title: 'Required',
            dataIndex: 'required',
            editType: Checkbox
        },
        {
            title: 'Default Value',
            dataIndex: 'defaultValue',
            editType: Input
        },
        {
            title: 'Actions',
            dataIndex: 'operation',
            render: (_: any, record: any) => (
                <Button type='link' danger size='small'>
                    <DeleteOutlined />
                </Button>
            )
        },
    ];

    const handleAdd = () => {
        const newData = {
            name: '',
            description: '',
            required: false,
            defineFormat: false,
            defaultValue: ''
        }
        setDataSource([...dataSource, newData]);
    }

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 17 }}
            className="create-connector-step-2"
            hidden={props.hidden}
        >
            <Form.Item
                label="Catalog 类型"
                required
            >
                <Select />
            </Form.Item>
            
            <Form.Item
                label="Properties"
            >
                <EditableTable columns={defaultColumns} dataSource={dataSource} handleAdd={handleAdd} />
            </Form.Item>
        </Form>
    );
};

export default Step2Form;