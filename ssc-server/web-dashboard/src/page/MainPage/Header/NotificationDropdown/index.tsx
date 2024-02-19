import { Card, Dropdown, DropdownProps, Empty, Select, Space, Tooltip } from "antd";
import "./index.sass";
import {
    CaretDownFilled,
    CaretUpFilled,
    CloseOutlined,
    ExclamationCircleFilled,
    EyeOutlined,
    FilterFilled,
    FilterOutlined,
} from "../../../../component/Icon";
import { useState } from "react";

const NotificationDropdown = (props: DropdownProps) => {
    const [sortDirect, setSortDirect] = useState<"UP" | "DOWN">("UP");

    const changeSortDirect = (direct: "UP" | "DOWN") => {
        return () => {
            setSortDirect(direct);
        };
    };

    return (
        <Dropdown
            trigger={["click"]}
            overlayClassName="notification-dropdown"
            dropdownRender={() => (
                <Card
                    title={
                        <div className="title-container">
                            <span className="title">消息通知</span>
                            <Tooltip title="时间排序">
                                <span className="sort-container">
                                    <CaretUpFilled
                                        onClick={changeSortDirect("UP")}
                                        className={sortDirect === "UP" ? "active" : ""}
                                    />
                                    <CaretDownFilled
                                        onClick={changeSortDirect("DOWN")}
                                        className={sortDirect === "DOWN" ? "active" : ""}
                                    />
                                </span>
                            </Tooltip>
                            <Space.Compact
                                className="ant-input-group"
                                size="small"
                            >
                                <span className="ant-input-group-addon">
                                    <FilterOutlined />
                                </span>
                                <Select
                                    popupClassName="notification-select-dropdown"
                                    options={[
                                        {
                                            key: "1",
                                            label: "全部",
                                        },
                                        {
                                            key: "2",
                                            label: "进行中",
                                        },
                                        {
                                            key: "3",
                                            label: "已完成",
                                        },
                                        {
                                            key: "4",
                                            label: "已失败",
                                        },
                                    ]}
                                />
                            </Space.Compact>
                        </div>
                    }
                    size="small"
                >
                    <div className="task-list">
                        <div className="task-row">
                            <div className="task-item">
                                <div className="item-content">
                                    <span>
                                        <ExclamationCircleFilled className="cancelled" />
                                    </span>
                                    <span className="title-time">3:45 PM:</span>
                                    <span> 任务取消: 从作业 'test_kk_f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3' 启动</span>
                                </div>
                                <div className="item-actions">
                                    <EyeOutlined />
                                    <CloseOutlined />
                                </div>
                                <div
                                    className="progress cancelled"
                                    style={{ width: "100%" }}
                                ></div>
                            </div>
                        </div>
                        {/* <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="当前没有可展示的消息"
                        /> */}
                    </div>
                    <div className="task-footer">
                        <span>进行中：0</span>
                        <Tooltip title="清除所有通知">
                            <span className="footer-action">全部清除</span>
                        </Tooltip>
                    </div>
                </Card>
            )}
            children={props.children}
        />
    );
};

export default NotificationDropdown;
