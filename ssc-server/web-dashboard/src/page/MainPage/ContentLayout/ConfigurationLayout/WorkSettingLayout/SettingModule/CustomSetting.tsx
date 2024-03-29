import { Form } from "antd";
import SettingCard from "../../../../../../component/SettingCard";
import "./index.sass";
import MonacoEditor from "../../../../../../component/MonacoEditor";

const CustomSetting = () => {
    return (
        <SettingCard title="更多 Flink 配置">
            <Form.Item
                extra={
                    <>
                        在此设置其他 Flink 配置。 例如：<code>taskmanager.numberOfTaskSlots: 1</code>
                    </>
                }
                className="custom-flink-configuration"
                name="customConfig"
            >
                <div style={{ border: "1px solid #dedede" }}>
                    <MonacoEditor
                        height={200}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            lineNumbersMinChars: 3,
                            lineDecorationsWidth: 0,
                        }}
                    />
                </div>
            </Form.Item>
        </SettingCard>
    );
};

export default CustomSetting;
