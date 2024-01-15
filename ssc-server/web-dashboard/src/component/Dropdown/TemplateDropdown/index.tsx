import { Button, Dropdown, Popconfirm } from "antd";
import { BarsOutlined } from "../../Icon";
import "./index.sass";

interface TemplateDropdownProps {
    onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const TemplateDropdown = (props: TemplateDropdownProps) => {
    return (
        <div className="copy-from-system-action">
            <Dropdown
                menu={{
                    items: [
                        {
                            key: "default",
                            label: (
                                <Popconfirm
                                    okText="确认"
                                    cancelText="取消"
                                    title="如果应用了新模板，您当前的更改将丢失。确定要这样做吗？"
                                    overlayClassName="ant-popover-rtl"
                                    onConfirm={props.onConfirm}
                                >
                                    <div>default</div>
                                </Popconfirm>
                            ),
                        },
                    ],
                }}
            >
                <Button
                    type="link"
                    icon={<BarsOutlined />}
                    size="small"
                >
                    从系统模板复制编辑
                </Button>
            </Dropdown>
        </div>
    );
};

export default TemplateDropdown;
