import { Descriptions, DescriptionsProps, Form, FormInstance, InputNumber, Radio } from "antd";

const items: DescriptionsProps["items"] = [
    {
        key: "parallelism",
        label: "并发度",
        children: "1",
    },
    {
        key: "slots",
        label: "最大 Slot 数",
        children: "-",
    },
    {
        key: "jobmanager-cpu",
        label: "Job Manager CPU",
        children: "1",
    },
    {
        key: "jobmanager-memory",
        label: "Job Manager Memory",
        children: "1Gib",
    },
    {
        key: "taskmanager-cpu",
        label: "Task Manager CPU",
        children: "1",
    },
    {
        key: "taskmanager-memory",
        label: "Task Manager Memory",
        children: "1Gib",
    },
];

const ResourceConfiguration = () => {
    return (
        <Descriptions
            column={1}
            bordered
            size="small"
            labelStyle={{ width: 280, fontSize: 12 }}
            contentStyle={{ fontSize: 12 }}
            className="resource-configuration-descriptions"
            items={items}
        />
    );
};

export default ResourceConfiguration;
