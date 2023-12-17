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
import ThemeModal from "./ThemeModal";

const Header = () => {
    const [netModalOpen, setNetModalOpen] = useState<boolean>(false);
    const [complexionModalOpen, setComplexionModalOpen] = useState<boolean>(false);
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
                            <li onClick={changeModalOpen(true, setNetModalOpen)}>
                                <Tooltip title="网络探测">
                                    <ApiOutlined />
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="公告">
                                    <NotificationOutlined />
                                </Tooltip>
                            </li>
                            <NotificationDropdown>
                                <li>
                                    <Tooltip title="消息通知">
                                        <BellOutlined />
                                    </Tooltip>
                                </li>
                            </NotificationDropdown>
                            <li onClick={() => setDocumentOpen(true)}>
                                <Tooltip title="帮助文档">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </li>
                            <li onClick={changeModalOpen(true, setComplexionModalOpen)}>
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
            <ThemeModal
                open={complexionModalOpen}
                onCancel={changeModalOpen(false, setComplexionModalOpen)}
            />
        </>
    );
};

export default Header;
