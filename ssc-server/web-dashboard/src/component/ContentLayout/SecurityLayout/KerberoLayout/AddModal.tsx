import { Form, Input, Modal, ModalProps, Select, Space, Tooltip, Upload } from "antd";
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from "../../../Icon";

const AddModal = (props: ModalProps) => {
    return (
        <Modal
            {...props}
            title="新增 Kerberos"
            width={520}

            footer={(_, { OkBtn, CancelBtn }) => (<><OkBtn /><CancelBtn /></>)}
        >
            <Form
                layout="vertical"
            >
                <Form.Item
                    label="Kerberos 集群名称"
                    required
                >
                    <Input placeholder="请输入 Kerberos 名称" />
                </Form.Item>
                <Form.Item
                    label="Kerberos Keytab"
                    required
                >
                    <Select
                        placeholder="请输入 keytabPath URL"
                        optionLabelProp="value"
                        optionFilterProp="label"
                        showSearch
                        suffixIcon={<Upload ><Tooltip title="选择或拖拽文件以上传" placement="left"><UploadOutlined /></Tooltip></Upload>}
                        popupClassName="addition-file-dropdown small"
                    >
                        <Select.Option value="oss://ssc-bucket-v2/artifacts/namespaces/ssc-space-default/Final_Company.txt" label="Final_Company.txt">
                            <div className="addition-file-item">
                                <span className="file-name">Final_Company.txt</span>
                                <span className="operator">
                                    <Space>
                                        <Tooltip title="下载" ><DownloadOutlined /></Tooltip>
                                        <Tooltip title="删除"><DeleteOutlined /></Tooltip>
                                    </Space>
                                </span>
                            </div>
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Kerberos Krb5.conf"
                    required
                    extra="注：当前仅支持 hadoop3 版本的 hive kerberos 集群"
                >
                    <Select
                        placeholder="请输入 Krb5.conf URL"
                        optionLabelProp="value"
                        optionFilterProp="label"
                        showSearch
                        suffixIcon={<Upload ><Tooltip title="选择或拖拽文件以上传" placement="left"><UploadOutlined /></Tooltip></Upload>}
                        popupClassName="addition-file-dropdown small"
                    >
                        <Select.Option value="oss://ssc-bucket-v2/artifacts/namespaces/ssc-space-default/Final_Company.txt" label="Final_Company.txt">
                            <div className="addition-file-item">
                                <span className="file-name">Final_Company.txt</span>
                                <span className="operator">
                                    <Space>
                                        <Tooltip title="下载" ><DownloadOutlined /></Tooltip>
                                        <Tooltip title="删除"><DeleteOutlined /></Tooltip>
                                    </Space>
                                </span>
                            </div>
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddModal;