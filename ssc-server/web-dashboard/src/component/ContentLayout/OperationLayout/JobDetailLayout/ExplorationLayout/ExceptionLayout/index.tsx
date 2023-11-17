import { Button, DatePicker, Form, Input, Table, Tooltip } from "antd";
import MonacoEditor from "../../../../../MonacoEditor";
import dayjs from "dayjs";
import "./index.sass";
import { InfoCircleOutlined } from "../../../../../Icon";

const ExceptionLayout = () => {
    const renderExtraFooter = () => {
        return (
            <div style={{ padding: "0 10px" }}>
                <a>最近 1 小时</a>
                <a style={{ float: "right" }}>最近 3 小时</a>
            </div>
        );
    };
    return (
        <div className="job-detail-exploration-exceptions">
            <div className="card-header">
                异常信息
            </div>
            <div className="panel main-top-panel panel-ltr panel-border-bottom">
                <MonacoEditor
                    options={{
                        minimap: {
                            enabled: false
                        },
                        lineDecorationsWidth: 0,
                        wordWrap: "on",
                    }}
                    value='没有异常信息'
                />
            </div>
            <div className="card-header">
                异常历史<Tooltip title="历史信息包含 7 天内产生的异常内容"><InfoCircleOutlined /></Tooltip>
            </div>
            <div className="main-bottom-panel">
                <Form
                    layout='inline'
                    size='small'
                >
                    <Form.Item
                        label="名称"
                    >
                        <Input
                            placeholder='请输入异常名称'
                        />
                    </Form.Item>
                    <Form.Item
                        label="发生时间"
                    >
                        <DatePicker
                            renderExtraFooter={renderExtraFooter}
                            disabledDate={(current) => {
                                return current
                                    && (current < dayjs().subtract(7, "day").endOf("day")
                                        || current > dayjs().endOf("day"));
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary'>查询</Button>
                    </Form.Item>
                </Form>

                <Table
                    size='small'
                    bordered
                    columns={[
                        {
                            title: "首次发生时间"
                        },
                        {
                            title: "名称",
                            sorter: (a, b) => a.name - b.name
                        },
                        {
                            title: "异常类型",
                            sorter: (a, b) => a.type - b.type,
                            filters: [
                                {
                                    text: "SQL_OPERATOR",
                                    value: "SQL_OPERATOR"
                                },
                                {
                                    text: "CONNECTOR",
                                    value: "CONNECTOR"
                                },
                                {
                                    text: "STATE",
                                    value: "STATE"
                                },
                                {
                                    text: "RUNTIME",
                                    value: "RUNTIME"
                                },
                                {
                                    text: "USER_CODE",
                                    value: "USER_CODE"
                                },
                                {
                                    text: "OTHER",
                                    value: "OTHER"
                                }
                            ]
                        },
                        {
                            title: "异常发生次数",
                            sorter: (a, b) => a.n - b.n
                        },
                        {
                            title: "操作",
                            width: 100
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default ExceptionLayout;