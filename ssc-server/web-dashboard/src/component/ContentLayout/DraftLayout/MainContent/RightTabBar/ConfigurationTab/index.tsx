import { Form, Select, Space, Tag, Tooltip, Upload } from "antd";
import { CheckOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined } from "../../../../../Icon";
import "./index.sass";

const { Option } = Select;

const ConfigurationTab = () => {
    return (
        <div className="draft-configuration">
            <div className="title">
                <span>更多配置</span>
            </div>

            <div className="content-wrapper">
                <Form
                    size="small"
                    layout="vertical"
                >
                    <Form.Item label="引擎版本">
                        <Select
                            optionLabelProp="title"
                            defaultValue="1.17"
                            options={[
                                {
                                    label: "推荐版本",
                                    options: [
                                        {
                                            title: "vvr-8.0.1-flink-1.17",
                                            value: "1.17",
                                            label: (
                                                <>
                                                    vvr-8.0.1-flink-1.17
                                                    <Tag
                                                        className="ant-select-item-option-content-tag"
                                                        color="#00a700cc"
                                                    >
                                                        RECOMMEND
                                                    </Tag>
                                                </>
                                            ),
                                        },
                                    ],
                                },
                                {
                                    label: "稳定版本",
                                    options: [
                                        {
                                            title: "vvr-6.0.7-flink-1.15",
                                            value: "1.15",
                                            label: (
                                                <>
                                                    vvr-6.0.7-flink-1.15{" "}
                                                    <Tag
                                                        className="ant-select-item-option-content-tag"
                                                        color=""
                                                    >
                                                        STABLE
                                                    </Tag>
                                                </>
                                            ),
                                        },
                                        {
                                            title: "vvr-4.0.18-flink-1.13",
                                            value: "1.13",
                                            label: (
                                                <>
                                                    vvr-4.0.18-flink-1.13{" "}
                                                    <Tag
                                                        className="ant-select-item-option-content-tag"
                                                        color=""
                                                    >
                                                        STABLE
                                                    </Tag>
                                                </>
                                            ),
                                        },
                                    ],
                                },
                                {
                                    label: "普通版本",
                                    options: [
                                        {
                                            title: "vvr-6.0.6-flink-1.15",
                                            value: "6.0.6",
                                            label: (
                                                <>
                                                    vvr-6.0.6-flink-1.15{" "}
                                                    <Tag
                                                        className="ant-select-item-option-content-tag"
                                                        color=""
                                                    >
                                                        NORMAL
                                                    </Tag>
                                                </>
                                            ),
                                        },
                                        {
                                            title: "vvr-6.0.5-flink-1.15",
                                            value: "6.0.5",
                                            label: (
                                                <>
                                                    vvr-6.0.5-flink-1.15{" "}
                                                    <Tag
                                                        className="ant-select-item-option-content-tag"
                                                        color=""
                                                    >
                                                        NORMAL
                                                    </Tag>
                                                </>
                                            ),
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="附加依赖文件">
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="如果你需要添加更多依赖文件，请选择或输入任意合法的文件地址"
                            optionLabelProp="label"
                            suffixIcon={
                                <Upload>
                                    <Tooltip
                                        title="选择或拖拽文件以上传"
                                        placement="left"
                                    >
                                        <UploadOutlined />
                                    </Tooltip>
                                </Upload>
                            }
                            // suffixIcon={<Tooltip title="选择或拖拽文件以上传" placement="left"><UploadOutlined /></Tooltip>}
                            popupClassName="addition-file-dropdown small"
                            menuItemSelectedIcon={
                                <span className="ant-select-selected-icon">
                                    <CheckOutlined />
                                </span>
                            }
                        >
                            <Option
                                value="china"
                                label="Final_Company.txt"
                            >
                                <div className="addition-file-item">
                                    <span className="file-name">Final_Company.txt</span>
                                    <span className="operator">
                                        <Space>
                                            <Tooltip title="下载">
                                                <DownloadOutlined />
                                            </Tooltip>
                                            <Tooltip title="删除">
                                                <DeleteOutlined />
                                            </Tooltip>
                                        </Space>
                                    </span>
                                </div>
                            </Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ConfigurationTab;
