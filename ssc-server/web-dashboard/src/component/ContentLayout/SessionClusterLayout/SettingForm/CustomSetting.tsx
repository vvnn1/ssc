import { Form } from "antd"
import SettingCard from "../../../SettingCard"

const CustomSetting = () => {
    return (
        <SettingCard
            title="更多 Flink 配置"
        >
            <Form.Item
                extra={<>在此设置其他 Flink 配置。 例如：<code>taskmanager.numberOfTaskSlots: 1</code></>}
            >

            </Form.Item>
        </SettingCard>
    )
};

export default CustomSetting;