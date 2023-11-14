import { Button, Drawer, DrawerProps, Form, Space } from "antd";
import "./AlarmDrawer.sass";
import AlarmRuleItem from "./AlarmRuleItem";
import NotifiAvenueItem from "./NotifiAvenueItem";

interface AlarmDrawerProps {
    model?: "create-template" | "create-rule"
}

const AlarmDrawer = (props: DrawerProps & AlarmDrawerProps) => {
    return (
        <Drawer
            {...props}
            maskClosable={false}
            rootClassName="alarm-drawer"
            width={800}
        >
            <Form
                labelAlign="right"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <AlarmRuleItem strict={props.model === "create-rule"}/>
                <NotifiAvenueItem strict={props.model === "create-rule"}/>
            </Form>

            <div className="drawer-footer">
                <Space size={16}>
                    <Button type="primary" onClick={props.onClose}>确定</Button>
                    <Button onClick={props.onClose}>取消</Button>
                </Space>
            </div>
        </Drawer>
    );
};

export default AlarmDrawer;