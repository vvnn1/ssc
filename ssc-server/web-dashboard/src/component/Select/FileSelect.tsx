import { Popconfirm, Select, SelectProps, Space, Tooltip, Upload, UploadProps } from "antd";
import { CheckOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined } from "../Icon";
import { useState } from "react";

const FileSelect = (props: SelectProps) => {
    const [progress, setProgress] = useState<number>();
    const onUploadStateChange: UploadProps["onChange"] = info => {
        if (info.file.status !== "uploading") {
            setProgress(0);
        }
        if (info.file.status === "done") {
            //上传成功后默认select选中，message提示
            const id = setInterval(() => {
                setProgress(30);
                clearInterval(id);
            }, 2000);

            const id2 = setInterval(() => {
                setProgress(100);
                clearInterval(id2);
            }, 5000);
            const id3 = setInterval(() => {
                setProgress(undefined);
                clearInterval(id3);
            }, 6000);
        } else if (info.file.status === "error") {
        }
    };
    return (
        <>
            <Select
                mode="multiple"
                placeholder="如果你需要添加更多依赖文件，请选择或输入任意合法的文件地址"
                optionLabelProp="label"
                suffixIcon={
                    <Upload
                        showUploadList={false}
                        name="file"
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        headers={{
                            authorization: "authorization-text",
                        }}
                        onChange={onUploadStateChange}
                    >
                        <Tooltip
                            title="选择或拖拽文件以上传"
                            placement="left"
                        >
                            <UploadOutlined />
                        </Tooltip>
                    </Upload>
                }
                popupClassName="addition-file-dropdown small"
                menuItemSelectedIcon={
                    <span className="ant-select-selected-icon">
                        <CheckOutlined />
                    </span>
                }
                {...props}
            >
                <Select.Option
                    value="china"
                    label="Final_Company.txt"
                >
                    <div className="addition-file-item">
                        <span className="file-name">Final_Company.txt</span>
                        <span
                            className="operator"
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <Space>
                                <Tooltip title="下载">
                                    <DownloadOutlined />
                                </Tooltip>
                                <Popconfirm
                                    title="是否要删除此文件？"
                                    okText="确认"
                                    cancelText="取消"
                                    placement="left"
                                >
                                    <Tooltip title="删除">
                                        <DeleteOutlined />
                                    </Tooltip>
                                </Popconfirm>
                            </Space>
                        </span>
                    </div>
                </Select.Option>
            </Select>
            {progress ? (
                <div
                    className="progress"
                    style={{
                        width: `${progress}%`,
                        height: "1px",
                        display: "block",
                        backgroundColor: "#0064c8",
                        transition: "all .4s",
                    }}
                />
            ) : null}
        </>
    );
};

export default FileSelect;
