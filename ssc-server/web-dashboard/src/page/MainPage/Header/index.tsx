import "./index.sass";
import { Select, Tooltip } from "antd";
import {
    ApiOutlined,
    BellOutlined,
    NotificationOutlined,
    QuestionCircleOutlined,
    SkinOutlined,
} from "../../../component/Icon";
import NetDetectModal from "./NetDetectModal";
import { useContext, useState } from "react";
import { changeModalOpen } from "../../../util";
import NotificationDropdown from "./NotificationDropdown";
import { DocumentContext } from "../index";
import TopHeader from "../../../component/TopHeader";
import UserDropdown from "../../../component/UserDropdown";

const Header = () => {
    const [netModalOpen, setNetModalOpen] = useState<boolean>(false);
    const setDocumentOpen = useContext(DocumentContext);
    return (
        <>
            <TopHeader
                leftNode={
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        dropdownStyle={{ top: 50 }}
                        filterOption={(input, option) =>
                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                label: "可选用项目空间",
                                options: [
                                    {
                                        label: "test",
                                        value: "test",
                                    },
                                ],
                            },
                        ]}
                    />
                }
                rightNode={
                    <>
                        <ul>
                            <li>
                                <Tooltip title="网络探测">
                                    <ApiOutlined onClick={changeModalOpen(true, setNetModalOpen)} />
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="公告">
                                    <NotificationOutlined />
                                </Tooltip>
                            </li>
                            <li>
                                <NotificationDropdown>
                                    <Tooltip title="消息通知">
                                        <BellOutlined />
                                    </Tooltip>
                                </NotificationDropdown>
                            </li>
                            <li>
                                <Tooltip title="帮助文档">
                                    <QuestionCircleOutlined onClick={() => setDocumentOpen(true)} />
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="切换主题">
                                    <SkinOutlined />
                                </Tooltip>
                            </li>
                        </ul>
                        <UserDropdown />
                    </>
                }
            />
            <NetDetectModal
                open={netModalOpen}
                onCancel={changeModalOpen(false, setNetModalOpen)}
            />
        </>
    );
};

export default Header;
