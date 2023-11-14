import { Button, DatePicker, Form, Select, Space, Table } from "antd";
import "./index.sass";
import dayjs from "dayjs";
import { SearchOutlined } from "../../../../../Icon";

const AlarmList = () => {

    return (
        <div className="alarm-list-layout">
            <div className="alarm-events">
                <Form
                    layout='inline'
                >
                    <Form.Item>
                        <Space.Compact className="ant-input-group">
                            <span className="ant-input-group-addon">选择规则</span>
                            <Select
                                placeholder="请选择规则"
                                allowClear
                            />
                        </Space.Compact>
                    </Form.Item>

                    <Form.Item>
                        <DatePicker
                            format="YYYY-MM-DD HH:mm:ss"
                            showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <DatePicker
                            format="YYYY-MM-DD HH:mm:ss"
                            showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary'><SearchOutlined /></Button>
                    </Form.Item>
                </Form>
            </div>

            <Table
                size='small'
                bordered
                columns={[
                    {
                        title: "告警时间",
                        width: 180
                    },
                    {
                        title: "告警规则",
                        width: 200
                    },
                    {
                        title: "告警事件"
                    }
                ]}
            />
        </div>
    );
};

export default AlarmList;