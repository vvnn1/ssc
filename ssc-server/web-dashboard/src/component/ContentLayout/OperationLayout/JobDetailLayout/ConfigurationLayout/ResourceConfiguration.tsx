import { Descriptions, DescriptionsProps, Form, FormInstance, InputNumber, Radio } from "antd";
import { NumberOutlined } from "../../../../Icon";
import MemoryInputNumber from "../../../../InputNumber/MemoryInputNumber";
import { useEffect, useState } from "react";

const ResourceConfiguration = (props: { editing: boolean, form: FormInstance }) => {
    const [data, setData] = useState<any>(
        {
            settingMode: 'BASIC',
            basicResourceSetting: {
                parallelism: 1,
                jobmanagerResourceSettingSpec: {
                    cpu: 2,
                    memory: '3MiB'
                },
                taskmanagerResourceSettingSpec: {
                    cpu: 4,
                    memory: '5GiB',
                    slots: 6
                }
            }
        }
    );
    const { editing, form } = props;

    useEffect(() => {
        form.setFieldsValue(data);
    }, []);

    const items: DescriptionsProps['items'] = []
    if (editing) {
        items.push(
            ...[
                {
                    key: 'setting-mode',
                    label: '资源模式',
                    children: (
                        <Form.Item
                            name='settingMode'
                            initialValue='BASIC'
                        >
                            <Radio.Group>
                                <Radio value='BASIC'>基础模式</Radio>
                                <Radio value='PROFESSIONAL' disabled>专家模式</Radio>
                            </Radio.Group>
                        </Form.Item>
                    )
                },
                {
                    key: 'parallelism',
                    label: '并发度',
                    children: (
                        <Form.Item
                            name={['basicResourceSetting', 'parallelism']}
                            initialValue={2}
                        >
                            <InputNumber placeholder="请输入并发度" addonAfter={<NumberOutlined />} />
                        </Form.Item>
                    )
                },
                {
                    key: 'jobmanager-cpu',
                    label: 'Job Manager CPU',
                    children: (
                        <Form.Item
                            name={['basicResourceSetting', 'jobmanagerResourceSettingSpec', 'cpu']}
                            initialValue={3}
                        >
                            <InputNumber placeholder="请输入 CPU 数" addonAfter={'Core'} />
                        </Form.Item>
                    )
                },
                {
                    key: 'jobmanager-memory',
                    label: 'Job Manager Memory',
                    children: (
                        <Form.Item
                            name={['basicResourceSetting', 'jobmanagerResourceSettingSpec', 'memory']}
                            initialValue='4MiB'
                        >
                            <MemoryInputNumber
                                defaultValue="1GiB"
                                inputProps={{
                                    placeholder: '请输入内存'
                                }}
                            />
                        </Form.Item>
                    )
                },
                {
                    key: 'taskmanager-cpu',
                    label: 'Task Manager CPU',
                    children: (
                        <Form.Item
                            name={['basicResourceSetting', 'taskmanagerResourceSettingSpec', 'cpu']}
                            initialValue={5}
                        >
                            <InputNumber placeholder="请输入 CPU 数" defaultValue='1' addonAfter={'Core'} />
                        </Form.Item>
                    )
                },
                {
                    key: 'taskmanager-memory',
                    label: 'Task Manager Memory',
                    children: (
                        <Form.Item
                            name={['basicResourceSetting', 'taskmanagerResourceSettingSpec', 'memory']}
                            initialValue='6GiB'
                        >
                            <MemoryInputNumber
                                defaultValue="1GiB"
                                inputProps={{
                                    placeholder: '请输入内存'
                                }}
                            />
                        </Form.Item>
                    )
                },
                {
                    key: 'slots',
                    label: '每个 TaskManager Slot 数',
                    children: (
                        <Form.Item
                            name={['basicResourceSetting', 'taskmanagerResourceSettingSpec', 'slots']}
                            initialValue={7}
                        >
                            <InputNumber placeholder="请输入每个 TaskManager Slot 数" addonAfter={<NumberOutlined />} />
                        </Form.Item>
                    )
                }
            ]
        );
    } else {
        items.push(
            ...[
                {
                    key: 'setting-mode',
                    label: '资源模式',
                    children: data['settingMode'] === 'BASIC' ? '基础模式' : '专家模式'
                },
                {
                    key: 'parallelism',
                    label: '并发度',
                    children: data['basicResourceSetting']?.['parallelism']
                },
                {
                    key: 'jobmanager-cpu',
                    label: 'Job Manager CPU',
                    children: data['basicResourceSetting']?.['jobmanagerResourceSettingSpec']?.['cpu']
                },
                {
                    key: 'jobmanager-memory',
                    label: 'Job Manager Memory',
                    children: data['basicResourceSetting']?.['jobmanagerResourceSettingSpec']?.['memory']
                },
                {
                    key: 'taskmanager-cpu',
                    label: 'Task Manager CPU',
                    children: data['basicResourceSetting']?.['taskmanagerResourceSettingSpec']?.['cpu']
                },
                {
                    key: 'taskmanager-memory',
                    label: 'Task Manager Memory',
                    children: data['basicResourceSetting']?.['taskmanagerResourceSettingSpec']?.['memory']
                },
                {
                    key: 'slots',
                    label: '每个 TaskManager Slot 数',
                    children: data['basicResourceSetting']?.['taskmanagerResourceSettingSpec']?.['slots']
                }
            ].filter(item => item.children)
        );
    }

    const onFinish = (value: any) => {
        setData({
            ...value
        })
    }

    return (
        <Form
            form={form}
            component={false}
            size='small'
            onFinish={onFinish}
        >
            <Descriptions
                column={1}
                bordered
                size='small'
                labelStyle={{ width: 280, fontSize: 12 }}
                contentStyle={{ fontSize: 12 }}
                className='resource-configuration-descriptions'
                items={items}
            />
        </Form>
    )
};

export default ResourceConfiguration;