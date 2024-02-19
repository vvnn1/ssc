import { Collapse, CollapseProps, Descriptions, DescriptionsProps, Form, FormInstance } from "antd";
import { useState } from "react";
import MonacoEditor from "../../../../../../component/MonacoEditor";

interface Configuration {
    flinkConf: {
        [key: string]: string | number | boolean;
    };
}

function ganerateNormalItems(data: Configuration): DescriptionsProps["items"] {
    const items: DescriptionsProps["items"] = [];
    for (let key in data.flinkConf) {
        items.push({
            key,
            label: key,
            children: `${data.flinkConf[key]}`,
        });
    }
    return items;
}

function ganerateFormItems(data: Configuration): DescriptionsProps["items"] {
    function yml(conf: { [key: string]: string | number | boolean }): string {
        let value: string = "";
        for (let key in conf) {
            value += key + ": " + conf[key] + "\n";
        }
        return value;
    }

    const items: DescriptionsProps["items"] = [
        {
            key: "other",
            label: "其他配置",
            children: (
                <Form.Item className="runtime-configuration-form-item no-margin">
                    <MonacoEditor
                        height={150}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            lineNumbersMinChars: 3,
                            lineDecorationsWidth: 0,
                            scrollBeyondLastLine: false,
                        }}
                        value={yml(data.flinkConf)}
                    />
                    <div className="notation">Flink 配置中部分配置会影响已设置的启动资源，请谨慎修改</div>
                </Form.Item>
            ),
        },
    ];
    return items;
}

interface RuntimeConfigurationProps {
    editing: boolean;
    form: FormInstance;
}

function hasProperties(data: Configuration): boolean {
    for (let k in data.flinkConf) {
        return true;
    }
    return false;
}

const RuntimeConfiguration = ({ editing, form }: RuntimeConfigurationProps) => {
    const [data, setData] = useState<Configuration>({ flinkConf: { "akka.log.lifecycle.events": false } });

    if (hasProperties(data)) {
        return (
            <Form size="small">
                <Descriptions
                    className="runtime-configuration-description"
                    column={1}
                    bordered
                    size="small"
                    labelStyle={{ width: 280, fontSize: 12 }}
                    contentStyle={{ fontSize: 12 }}
                    items={editing ? ganerateFormItems(data) : ganerateNormalItems(data)}
                />
            </Form>
        );
    } else {
        return <div>暂无数据</div>;
    }
};

export default RuntimeConfiguration;
