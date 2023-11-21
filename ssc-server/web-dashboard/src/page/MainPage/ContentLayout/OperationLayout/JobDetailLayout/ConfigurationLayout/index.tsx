import { Button, ButtonProps, Collapse, CollapseProps, Divider, Form, Popconfirm, Space } from "antd";
import "./index.sass";
import { useState } from "react";
import BasicConfiguration from "./BasicConfiguration";
import ResourceConfiguration from "./ResourceConfiguration";
import RuntimeConfiguration from "./RuntimeConfiguration";
import LogConfiguration from "./LogConfiguration";

const ConfigurationLayout = () => {
    const [activeKey, setActiveKey] = useState<string | string[]>(["1"]);
    const [resourceEdit, setResourceEdit] = useState<boolean>(false);
    const [runtimeEdit, setRuntimeEdit] = useState<boolean>(false);
    const [logEdit, setLogEdit] = useState<boolean>(false);

    const [resourceForm] = Form.useForm();
    const [runtimeForm] = Form.useForm();
    const [logForm] = Form.useForm();

    const changeResourceEdit = (
        edit: boolean,
        setFunc: (edit: boolean) => void,
        customAcion?: () => void
    ): ButtonProps["onClick"] => {
        return e => {
            e.stopPropagation();
            setFunc(edit);
            customAcion?.();
        };
    };

    const addActiveKey = (key: string) => {
        return () => {
            if (!activeKey.includes(key)) {
                setActiveKey([...(activeKey as string[]), key]);
            }
        };
    };

    const stopPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
        e?.stopPropagation();
    };

    const items: CollapseProps["items"] = [
        {
            key: "basic-configuration",
            label: "基础配置",
            extra: (
                <Popconfirm
                    okText="确认"
                    cancelText="取消"
                    title="SQL 作业基础配置需要返回 SQL 开发页面编辑作业草稿并重新部署，确认要前往 SQL 开发吗？"
                    overlayClassName="ant-popover-rtl"
                    onCancel={stopPropagation}
                    onConfirm={stopPropagation}
                    onPopupClick={stopPropagation}
                >
                    <Button
                        size="small"
                        type="link"
                        onClick={stopPropagation}
                    >
                        编辑
                    </Button>
                </Popconfirm>
            ),
            children: <BasicConfiguration />,
        },
        {
            key: "resource-configuration",
            label: "资源配置",
            extra: resourceEdit ? (
                <Space
                    size={0}
                    split={<Divider type="vertical" />}
                >
                    <Button
                        size="small"
                        type="link"
                        onClick={changeResourceEdit(false, setResourceEdit, () => resourceForm.submit())}
                    >
                        保存
                    </Button>
                    <Button
                        size="small"
                        type="link"
                        onClick={changeResourceEdit(false, setResourceEdit)}
                    >
                        取消
                    </Button>
                </Space>
            ) : (
                <Button
                    size="small"
                    type="link"
                    onClick={changeResourceEdit(true, setResourceEdit, addActiveKey("resource-configuration"))}
                >
                    编辑
                </Button>
            ),
            children: (
                <ResourceConfiguration
                    editing={resourceEdit}
                    form={resourceForm}
                />
            ),
        },
        {
            key: "runtime-configuration",
            label: "运行参数配置",
            extra: runtimeEdit ? (
                <Space
                    size={0}
                    split={<Divider type="vertical" />}
                >
                    <Button
                        size="small"
                        type="link"
                        onClick={changeResourceEdit(false, setRuntimeEdit, () => runtimeForm.submit())}
                    >
                        保存
                    </Button>
                    <Button
                        size="small"
                        type="link"
                        onClick={changeResourceEdit(false, setRuntimeEdit)}
                    >
                        取消
                    </Button>
                </Space>
            ) : (
                <Button
                    size="small"
                    type="link"
                    onClick={changeResourceEdit(true, setRuntimeEdit, addActiveKey("runtime-configuration"))}
                >
                    编辑
                </Button>
            ),
            children: (
                <RuntimeConfiguration
                    editing={runtimeEdit}
                    form={runtimeForm}
                />
            ),
        },
        {
            key: "log-configuration",
            label: "日志配置",
            extra: logEdit ? (
                <Space
                    size={0}
                    split={<Divider type="vertical" />}
                >
                    <Button
                        size="small"
                        type="link"
                        onClick={changeResourceEdit(false, setLogEdit, () => logForm.submit())}
                    >
                        保存
                    </Button>
                    <Button
                        size="small"
                        type="link"
                        onClick={changeResourceEdit(false, setLogEdit)}
                    >
                        取消
                    </Button>
                </Space>
            ) : (
                <Button
                    size="small"
                    type="link"
                    onClick={changeResourceEdit(true, setLogEdit, addActiveKey("log-configuration"))}
                >
                    编辑
                </Button>
            ),
            children: (
                <LogConfiguration
                    editing={logEdit}
                    form={logForm}
                />
            ),
        },
    ];

    const onChange = (key: string | string[]) => {
        setActiveKey(key);
    };

    return (
        <div className="deployment-dconfiguration-layout">
            <Collapse
                items={items}
                expandIconPosition="end"
                onChange={onChange}
                activeKey={activeKey}
            />
        </div>
    );
};

export default ConfigurationLayout;
