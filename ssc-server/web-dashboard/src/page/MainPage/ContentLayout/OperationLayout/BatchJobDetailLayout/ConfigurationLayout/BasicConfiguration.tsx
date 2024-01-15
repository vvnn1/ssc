import { Descriptions, DescriptionsProps } from "antd";

const items: DescriptionsProps["items"] = [
    {
        key: "engine",
        label: "引擎版本",
        children: "vvr-8.0.1-flink-1.17",
    },
    {
        key: "url",
        label: "JAR Uri",
        children: "oss://ssc-bucket-v2/artifacts/namespaces/ssc-space-default/WordCount.jar",
    },
    {
        key: "clazz",
        label: "Entry Point Class",
        children: "-",
    },
    {
        key: "args",
        label: "Entry Point Main Arguments",
        children: "-",
    },
    {
        key: "extra",
        label: "附加依赖文件",
        children: "-",
    },
];

const BasicConfiguration = () => {
    return (
        <Descriptions
            column={1}
            bordered
            size="small"
            labelStyle={{ width: 280, fontSize: 12 }}
            contentStyle={{ fontSize: 12 }}
            className="basic-configuration-descriptions"
            items={items}
        />
    );
};

export default BasicConfiguration;
