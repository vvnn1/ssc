import { Button, Space } from "antd";
import { InfoCircleOutlined, SettingOutlined } from "../../../Icon";
import "./index.sass";
import EditorSettingsModal from "./EditorSettingsModal";
import { useState } from "react";

const BottomTabBar = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        };
    };

    return (
        <div className="draft-bottom-tab-bar">
            <div className="message-wrap">
                <Space>
                    <InfoCircleOutlined />
                    <span className="message-text">最后一次同步</span>
                    <span className="message-time">(09:46:51 AM)</span>
                </Space>
            </div>
            <div className="edit-wrap">
                <div className="cursor-position">1:1</div>
                <div className="setting">
                    <Button
                        type="text"
                        icon={<SettingOutlined />}
                        size="small"
                        onClick={changeModalOpen(true)}
                    />
                </div>
            </div>
            <EditorSettingsModal
                open={modalOpen}
                onCancel={changeModalOpen(false)}
            />
        </div>
    );
};

export default BottomTabBar;
