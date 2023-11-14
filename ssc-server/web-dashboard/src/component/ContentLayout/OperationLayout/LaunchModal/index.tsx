import { Checkbox, DatePicker, Form, Modal, ModalProps, Radio, Select, Space, Tag, Tooltip } from "antd";
import "./index.sass";
import { useState } from "react";
import { checkedChangeWrapper, radioChangeWrapper } from "../../../../util";

const LaunchModal = (props: ModalProps) => {
    const [disablePicker, setDisablePicker] = useState<boolean>(true);
    const [statusRadio, setStatusRadio] = useState<string>("noStatus");
    const [restoreRadio, setRestoreRadio] = useState<string>("");

    const onCheckedChange = (checked: boolean) => {
        setDisablePicker(!checked);
    };

    return (
        <Modal
            {...props}
            title="作业启动"
            width={900}
            okText="启动"
            footer={(_, { OkBtn, CancelBtn }) => <><OkBtn /><CancelBtn /></>}
            className="launch-work-modal"
        >
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                colon={false}
            >
                <Form.Item label={<></>}>
                    <Radio.Group onChange={radioChangeWrapper(setStatusRadio)} defaultValue={statusRadio}>
                        <Radio value="noStatus">无状态启动<div className="mode-tips">不包含任何初始状态启动</div></Radio>
                        <Radio value="onStatus">有状态启动<div className="mode-tips">从已存在的有效状态启动</div></Radio>
                    </Radio.Group>
                </Form.Item>

                {
                    statusRadio === "noStatus" ? (
                        <Form.Item label={<></>} className='picker-date-form-item'>

                            <Checkbox onChange={checkedChangeWrapper(onCheckedChange)}>
                                <Tooltip title="设置指定时间会让所有支持 startTime 的源表均从该时刻开始读取数据。该配置项仅在 SQL 类型部署启动时生效。注意：指定的时间将优先于 SQL 作业中的设置执行。">
                                    指定源表开始时间（SLS/Kafka）
                                </Tooltip>
                            </Checkbox>
                            <DatePicker disabled={disablePicker} showTime size='small' />
                        </Form.Item>
                    ) : null
                }

                {
                    statusRadio === "onStatus" ? (
                        <Form.Item name="restoreFrom" label={<></>} className='restore-radio-form-item'>
                            <Radio.Group onChange={radioChangeWrapper(setRestoreRadio)}>
                                <div className='line'>
                                    <Radio value="last">从最新状态恢复</Radio>
                                    {
                                        restoreRadio === "last" ? (
                                            <Tooltip title="无法判断该状态和作业的兼容性或存在尚未支持兼容性判断的语法，建议使用其他状态或者无状态启动作业。"><Tag>状态兼容性检测：<a style={{ color: "#0064c8" }}>点击检测</a></Tag></Tooltip>
                                        ) : null
                                    }
                                </div>
                                <div className='line'>
                                    <Radio value="snapshot">从指定状态恢复</Radio>
                                    {
                                        restoreRadio === "snapshot" ? (
                                            <Select
                                                size='small'
                                                placeholder='请选择快照'
                                                style={{ width: 200 }}
                                                options={[
                                                    {
                                                        label: (
                                                            <>
                                                                2023-10-31 14:58:59
                                                                <small className="option-description">STOP_WITH_SAVEPOINT</small>
                                                            </>
                                                        )
                                                    }
                                                ]}
                                                popupClassName="custom-content"
                                            />
                                        ) : null
                                    }
                                </div>
                                <div className="line">
                                    <Radio value="other">从其他作业恢复</Radio>
                                    {
                                        restoreRadio === "other" ? (
                                            <Space.Compact>
                                                <Select size='small' placeholder='请选择作业' style={{ width: 200 }} />
                                                <Select size='small' placeholder='请选择快照' style={{ width: 200 }} />
                                            </Space.Compact>
                                        ) : null
                                    }

                                </div>
                            </Radio.Group>
                        </Form.Item>
                    ) : null
                }
            </Form>
        </Modal>
    );
};

export default LaunchModal;