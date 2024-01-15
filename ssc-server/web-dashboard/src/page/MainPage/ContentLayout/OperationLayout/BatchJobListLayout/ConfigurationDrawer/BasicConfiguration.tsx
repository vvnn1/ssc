import {
    Button,
    Checkbox,
    Descriptions,
    DescriptionsProps,
    Form,
    FormInstance,
    Input,
    Select,
    Space,
    Switch,
} from "antd";
import { useEffect, useState } from "react";
import EngineSelect from "../../../../../../component/Select/EngineSelect";
import FileSelect from "../../../../../../component/Select/FileSelect";
import { CloseOutlined, DeleteOutlined } from "../../../../../../component/Icon";

const items: DescriptionsProps["items"] = [
    {
        key: "id",
        label: "部署作业 ID",
        children: "f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3",
    },
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
    {
        key: "note",
        label: "备注",
        children: "-",
    },
    {
        key: "kerberos",
        label: "Kerberos 集群",
        children: "-",
    },
    {
        key: "tag",
        label: "作业标签",
        children: "-",
    },
];

interface BasicConfigurationProps {
    editing: boolean;
    form: FormInstance;
}

interface Configuration {
    engineVersion: string;
    artifact: {
        kind: string;
        jarArtifact: {
            jarUri: string;
            entryClass: string;
            mainArgs: string;
            additionalDependencies: string[];
        };
    };
    deploymentTarget: { mode: string; name: string };
    description: string;
    labels: {
        label: string;
        value: string;
    }[];
    kerberosConfig: { kerberosEnabled: boolean; kerberosClusterName: string; principal: string };
}

function ganerateTags(
    labels: {
        label: string;
        value: string;
    }[]
): string {
    const result: string[] = [];
    for (let v of labels) {
        result.push(`${v.value}:${v.label}`);
    }
    return result.join(",");
}

function ganerateNormalItems(data: Configuration): DescriptionsProps["items"] {
    const items = [
        {
            key: "id",
            label: "部署作业 ID",
            span: 3,
            children: "f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3",
        },
        {
            key: "engine",
            label: "引擎版本",
            span: 3,
            children: data.engineVersion,
        },
        {
            key: "url",
            label: "JAR Uri",
            span: 3,
            children: data.artifact.jarArtifact.jarUri,
        },
        {
            key: "clazz",
            label: "Entry Point Class",
            span: 3,
            children: data.artifact.jarArtifact.entryClass,
        },
        {
            key: "args",
            label: "Entry Point Main Arguments",
            span: 3,
            children: data.artifact.jarArtifact.mainArgs,
        },
        {
            key: "extra",
            label: "附加依赖文件",
            span: 3,
            children: data.artifact.jarArtifact.additionalDependencies.join(","),
        },
        {
            key: "note",
            label: "备注",
            span: 3,
            children: data.description,
        },
        {
            key: "kerberos",
            label: "Kerberos 集群",
            span: 3,
            children: "-",
        },
        {
            key: "tag",
            label: "作业标签",
            span: 3,
            children: ganerateTags(data.labels),
        },
    ];

    if (data.deploymentTarget.mode === "SESSION") {
        items.push({
            key: "mode",
            label: "Session 集群",
            span: 3,
            children: data.deploymentTarget.name,
        });
    }

    return items;
}

function generateFormItems(data: Configuration): DescriptionsProps["items"] {
    const items: DescriptionsProps["items"] = [
        {
            key: "engine",
            label: "引擎版本",
            span: 3,
            children: (
                <Form.Item
                    name="engineVersion"
                    className="no-margin"
                >
                    <EngineSelect />
                </Form.Item>
            ),
        },
        {
            key: "url",
            label: "JAR Uri",
            span: 3,
            children: (
                <Form.Item
                    name={["artifact", "jarArtifact", "jarUri"]}
                    className="no-margin"
                >
                    <FileSelect
                        showUpload
                        optionLabelProp={"value"}
                        mode={undefined}
                    />
                </Form.Item>
            ),
        },
        {
            key: "clazz",
            label: "Entry Point Class",
            span: 3,
            children: (
                <Form.Item
                    name={["artifact", "jarArtifact", "entryClass"]}
                    className="no-margin"
                >
                    <Input placeholder="如果您的 Jar 未指定主类在此输入 Entrypoint Class" />
                </Form.Item>
            ),
        },
        {
            key: "args",
            label: "Entry Point Main Arguments",
            span: 3,
            children: (
                <Form.Item
                    name={["artifact", "jarArtifact", "mainArgs"]}
                    className="no-margin"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            ),
        },
        {
            key: "extra",
            label: "附加依赖文件",
            span: 3,
            children: (
                <Form.Item
                    name={["artifact", "jarArtifact", "additionalDependencies"]}
                    className="no-margin"
                >
                    <FileSelect
                        showSearch={false}
                        suffixIcon={null}
                    />
                </Form.Item>
            ),
        },
        {
            key: "note",
            label: "备注",
            span: 3,
            children: (
                <Form.Item
                    name="description"
                    className="no-margin"
                >
                    <Input placeholder="请输入部署备注（可选）" />
                </Form.Item>
            ),
        },
        {
            key: "tag",
            label: "作业标签",
            span: 3,
            children: (
                <Form.Item className="no-margin">
                    <Form.List name="labels">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        key={field.key}
                                        style={{ marginBottom: "0", marginTop: index > 0 ? "8px" : "0px" }}
                                    >
                                        <Space.Compact style={{ width: "100%" }}>
                                            <Form.Item
                                                extra={index + 1 === fields.length ? "标签名" : null}
                                                style={{
                                                    display: "inline-block",
                                                    width: "calc(50% - 12px)",
                                                    marginBottom: "0",
                                                }}
                                                name={[field.name, "label"]}
                                            >
                                                <Input
                                                    size="small"
                                                    onChange={index + 1 === fields.length ? () => add() : undefined}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                extra={index + 1 === fields.length ? "标签值" : null}
                                                style={{
                                                    display: "inline-block",
                                                    width: "calc(50% - 12px)",
                                                    marginLeft: "24px",
                                                    marginBottom: "0",
                                                }}
                                                name={[field.name, "value"]}
                                            >
                                                <Input
                                                    size="small"
                                                    onChange={index + 1 === fields.length ? () => add() : undefined}
                                                />
                                            </Form.Item>
                                            <Button
                                                size="small"
                                                style={{ marginLeft: "4px" }}
                                                disabled={index + 1 === fields.length}
                                                onClick={() => remove(field.name)}
                                            >
                                                <DeleteOutlined />
                                            </Button>
                                        </Space.Compact>
                                    </Form.Item>
                                ))}
                            </>
                        )}
                    </Form.List>
                </Form.Item>
            ),
        },
        {
            key: "kerberos",
            label: "Kerberos 集群",
            span: 3,
            children: (
                <div>
                    <Form.Item
                        label="是否开启 Kerberos"
                        required
                        labelCol={{ span: 7 }}
                        labelAlign="left"
                        name={["kerberosConfig", "kerberosEnabled"]}
                        className="mini-margin"
                    >
                        <Switch />
                    </Form.Item>
                    {data.kerberosConfig.kerberosEnabled ? (
                        <>
                            <Form.Item
                                label="Kerberos 集群"
                                required
                                labelCol={{ span: 7 }}
                                labelAlign="left"
                                className="mini-margin"
                            >
                                <Select />
                            </Form.Item>
                            <Form.Item
                                label="principal"
                                required
                                labelCol={{ span: 7 }}
                                labelAlign="left"
                                className="no-margin"
                            >
                                <Input />
                            </Form.Item>
                        </>
                    ) : null}
                </div>
            ),
        },
        {
            key: "session",
            labelStyle: {
                display: "none",
            },
            span: 4,
            children: (
                <span>
                    <Checkbox>提交到 Session 集群（不推荐生产环境使用）</Checkbox>
                </span>
            ),
        },
    ];
    return items;
}

const BasicConfiguration = (props: BasicConfigurationProps) => {
    const { editing, form } = props;
    const [data, setData] = useState<Configuration>({
        engineVersion: "vvr-8.0.4-flink-1.17",
        artifact: {
            kind: "JAR",
            jarArtifact: {
                jarUri: "oss://ssc-bucket-v2/artifacts/namespaces/ssc-space-default/WordCount.jar",
                entryClass: "",
                mainArgs: "aa=3",
                additionalDependencies: [
                    "oss://ssc-bucket-v2/artifacts/namespaces/ssc-space-default/Final_Company.txt",
                ],
            },
        },
        deploymentTarget: { mode: "PER_JOB", name: "vvp-workload" },
        description: "aaaaaa",
        labels: [
            {
                label: "aa",
                value: "bb",
            },
        ],
        kerberosConfig: { kerberosEnabled: true, kerberosClusterName: "", principal: "" },
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
                column={2}
                bordered
                size="small"
                labelStyle={{ width: 280, fontSize: 12 }}
                contentStyle={{ fontSize: 12 }}
                className="basic-configuration-descriptions"
                items={editing ? generateFormItems(data) : ganerateNormalItems(data)}
            />
        </Form>
    );
};

export default BasicConfiguration;
