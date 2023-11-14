import { Select, SelectProps, Tag } from "antd"


const options = [
    {
        label: '推荐版本',
        options: [
            {
                title: 'vvr-8.0.1-flink-1.17',
                value: 'recommend-1.17',
                label: <>vvr-8.0.1-flink-1.17<Tag className="ant-select-item-option-content-tag" color='#00a700cc'>RECOMMEND</Tag></>
            }
        ]
    },
    {
        label: '稳定版本',
        options: [
            {
                title: 'vvr-6.0.7-flink-1.15',
                value: 'stable-1.15',
                label: <>vvr-6.0.7-flink-1.15 <Tag className='ant-select-item-option-content-tag' color=''>STABLE</Tag></>
            },
            {
                title: 'vvr-4.0.18-flink-1.13',
                value: 'stable-1.13',
                label: <>vvr-4.0.18-flink-1.13 <Tag className='ant-select-item-option-content-tag' color=''>STABLE</Tag></>
            }
        ]
    },
    {
        label: '普通版本',
        options: [
            {
                title: 'vvr-6.0.6-flink-1.15',
                value: 'normal-1.15',
                label: <>vvr-6.0.6-flink-1.15 <Tag className='ant-select-item-option-content-tag' color=''>NORMAL</Tag></>
            },
            {
                title: 'vvr-6.0.5-flink-1.15',
                value: 'normal-1.15',
                label: <>vvr-6.0.5-flink-1.15 <Tag className='ant-select-item-option-content-tag' color=''>NORMAL</Tag></>
            },
        ]
    }
];

const EngineSelect = (props: SelectProps) => {
    return (
        <Select
            {...props}
            options={options}
            optionLabelProp="title"
        />
    )
}

export default EngineSelect;