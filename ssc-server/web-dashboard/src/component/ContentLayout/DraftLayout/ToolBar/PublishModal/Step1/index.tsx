import { Badge, Checkbox, CheckboxProps, Form, Input, Select, Tooltip } from "antd";
import { DownOutlined, UpOutlined } from "../../../../../Icon";
import { useState } from "react";

const Step1 = () => {
    const [expand, setExpand] = useState<boolean>(false);
    const [showSelect, setShowSelect] = useState<boolean>(false);

    const changeExpand = (expand: boolean) => {
        return () => {
            setExpand(expand);
        }
    }

    const onCheckedChange: CheckboxProps["onChange"] = ({ target: { checked } }) => {
        setShowSelect(checked);
    }


    return (
        <div className="content-container">
            <Form.Item
                label="备注"
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 16 }}
                colon={false}
            >
                <Input.TextArea placeholder="请输入部署备注(可选)" />
            </Form.Item>

            <div className="extra-options">
                <a onClick={changeExpand(!expand)}>更多配置 {expand ? <UpOutlined /> : <DownOutlined />}</a>
            </div>

            {
                expand
                    ? (
                        <>
                            <Form.Item
                                label={<></>}
                                colon={false}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                <Tooltip title="因 session 集群 JobManager 共用，JobManager 异常将导致该集群所有作业异常，请勿在生产环境中使用 session 集群">
                                    <Checkbox children="提交到 Session 集群（不推荐生产环境使用)" onChange={onCheckedChange} />
                                </Tooltip>
                                {
                                    showSelect
                                        ? (
                                            <Select
                                                size="small"
                                                placeholder="请选择一个部署目标"
                                                popupClassName="session-select-dropdown"
                                            >
                                                <Select.OptGroup label={<>Session 集群 <span>请勿生产使用</span></>}>
                                                    <Select.Option value="debug-session" label="debug-session">
                                                        <Badge status="success" text=" " />
                                                        <span>debug-session (c3d0298e-8a85-48b1-a767-659b74d20d1a)</span>
                                                    </Select.Option>

                                                    <Select.Option value="debug-session2" label="debug-session2" disabled>
                                                        <Badge status="default" text=" " />
                                                        <span>debug-session (c3d0298e-8a85-48b1-a767-659b74d20d1a)</span>
                                                    </Select.Option>
                                                </Select.OptGroup>

                                            </Select>
                                        ) : (
                                            null
                                        )
                                }

                            </Form.Item>
                            <Form.Item
                                label={<></>}
                                colon={false}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                <Checkbox children="跳过部署前的深度检查" />
                            </Form.Item>
                        </>
                    ) : (
                        null
                    )
            }

            <div className="note-wrapper">
                注意：该次部署将在作业下次启动时生效。
            </div>
        </div>
    )
}

export default Step1;