import { Select, SelectProps, Space, Tooltip, Upload } from "antd";
import { CheckOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined } from "../Icon";

const FileSelect = (props: SelectProps) => {
    return (
        <Select
            mode="multiple"
            placeholder="如果你需要添加更多依赖文件，请选择或输入任意合法的文件地址"
            optionLabelProp="label"
            suffixIcon={<Upload ><Tooltip title="选择或拖拽文件以上传" placement="left"><UploadOutlined /></Tooltip></Upload>}
            popupClassName="addition-file-dropdown small"
            menuItemSelectedIcon={<span className="ant-select-selected-icon"><CheckOutlined /></span>}
        >
            <Select.Option value="china" label="Final_Company.txt">
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
    )
}

export default FileSelect;