import { Checkbox, Descriptions, DescriptionsProps, Form, FormInstance, InputNumber, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import MemoryInputNumber from "../../../../../../component/InputNumber/MemoryInputNumber";
import { NumberOutlined } from "../../../../../../component/Icon";

interface ResourceConfigurationProps {
    editing: boolean;
    form: FormInstance;
}

interface Configuration {
    batchResourceSetting: {
        resourceSettingMode: string;
        maxSlot: number;
        basicResourceSetting: {
            parallelism: number;
            jobmanagerResourceSettingSpec: { cpu: number; memory: string };
            taskmanagerResourceSettingSpec: { cpu: number; memory: string };
        };
    };
    labels: { label: string; value: string }[];
}

function ganerateNormalItems(data: Configuration) {
    const items: DescriptionsProps["items"] = [
        {
            key: "jobmanager-cpu",
            label: "Job Manager CPU",
            children: data.batchResourceSetting.basicResourceSetting.jobmanagerResourceSettingSpec.cpu,
        },
        {
            key: "jobmanager-memory",
            label: "Job Manager Memory",
            children: data.batchResourceSetting.basicResourceSetting.jobmanagerResourceSettingSpec.memory,
        },
        {
            key: "taskmanager-cpu",
            label: "Task Manager CPU",
            children: data.batchResourceSetting.basicResourceSetting.taskmanagerResourceSettingSpec.cpu,
        },
        {
            key: "taskmanager-memory",
            label: "Task Manager Memory",
            children: data.batchResourceSetting.basicResourceSetting.taskmanagerResourceSettingSpec.memory,
        },
        {
            key: "parallelism",
            label: "并发度",
            children: data.batchResourceSetting.basicResourceSetting.parallelism,
        },
        {
            key: "slots",
            label: "最大 Slot 数",
            children: data.batchResourceSetting.maxSlot,
        },
    ];
    return items;
}

function ganerateFormItems(data: Configuration) {
    const items: DescriptionsProps["items"] = [
        {
            key: "jobmanager-cpu",
            label: "Job Manager CPU",
            children: (
                <Form.Item
                    name={["batchResourceSetting", "basicResourceSetting", "jobmanagerResourceSettingSpec", "cpu"]}
                    className="no-margin"
                >
                    <InputNumber
                        placeholder="请输入 CPU 数"
                        addonAfter={"Core"}
                    />
                </Form.Item>
            ),
        },
        {
            key: "jobmanager-memory",
            label: "Job Manager Memory",
            children: (
                <Form.Item
                    name={["batchResourceSetting", "basicResourceSetting", "jobmanagerResourceSettingSpec", "memory"]}
                    className="no-margin"
                >
                    <MemoryInputNumber
                        inputProps={{
                            placeholder: "请输入内存",
                        }}
                    />
                </Form.Item>
            ),
        },
        {
            key: "taskmanager-cpu",
            label: "Task Manager CPU",
            children: (
                <Form.Item
                    name={["batchResourceSetting", "basicResourceSetting", "taskmanagerResourceSettingSpec", "cpu"]}
                    className="no-margin"
                >
                    <InputNumber
                        placeholder="请输入 CPU 数"
                        addonAfter={"Core"}
                    />
                </Form.Item>
            ),
        },
        {
            key: "taskmanager-memory",
            label: "Task Manager Memory",
            children: (
                <Form.Item
                    name={["batchResourceSetting", "basicResourceSetting", "taskmanagerResourceSettingSpec", "memory"]}
                    className="no-margin"
                >
                    <MemoryInputNumber inputProps={{ placeholder: "请输入内存" }} />
                </Form.Item>
            ),
        },
        {
            key: "parallelism",
            label: "并发度",
            children: (
                <div style={{ display: "flex", width: "100%" }}>
                    <Checkbox style={{ fontSize: 12, alignItems: "center" }}>自动推断</Checkbox>
                    <Form.Item
                        name={["batchResourceSetting", "basicResourceSetting", "parallelism"]}
                        className="no-margin"
                        style={{ flex: "1" }}
                    >
                        <InputNumber
                            placeholder="请输入并发度"
                            addonAfter={<NumberOutlined />}
                        />
                    </Form.Item>
                </div>
            ),
        },
        {
            key: "slots",
            label: "最大 Slot 数",
            children: (
                <Form.Item
                    name={["batchResourceSetting", "maxSlot"]}
                    className="no-margin"
                >
                    <InputNumber
                        placeholder="请输入个数(可选)"
                        addonAfter={<NumberOutlined />}
                    />
                </Form.Item>
            ),
        },
    ];
    return items;
}

const ResourceConfiguration = (props: ResourceConfigurationProps) => {
    const { editing, form } = props;
    const [data, setData] = useState<Configuration>({
        batchResourceSetting: {
            resourceSettingMode: "BASIC",
            maxSlot: 2,
            basicResourceSetting: {
                parallelism: 1,
                jobmanagerResourceSettingSpec: { cpu: 1, memory: "1GiB" },
                taskmanagerResourceSettingSpec: { cpu: 1, memory: "2GiB" },
            },
        },
        labels: [],
    });

    useEffect(() => {
        if (editing) {
            form.setFieldsValue(data);
        }
    }, [editing]);

    return (
        <Form
            form={form}
            size="small"
        >
            <Descriptions
                column={1}
                bordered
                size="small"
                labelStyle={{ width: 280, fontSize: 12 }}
                contentStyle={{ fontSize: 12 }}
                className="resource-configuration-descriptions"
                items={editing ? ganerateFormItems(data) : ganerateNormalItems(data)}
            />
        </Form>
    );
};

export default ResourceConfiguration;
