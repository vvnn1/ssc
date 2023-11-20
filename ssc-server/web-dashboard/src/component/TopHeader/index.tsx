import { Header } from "antd/es/layout/layout";
import "./index.sass";
import { Dropdown, MenuProps, Select, Tooltip } from "antd";
import {
    ApiOutlined,
    BellOutlined,
    CaretDownOutlined,
    LogoutOutlined,
    NotificationOutlined,
    ProjectLogoOutlined,
    QuestionCircleOutlined,
    SkinOutlined,
    UserOutlined,
} from "../Icon";
import NetDetectModal from "./NetDetectModal";
import { useContext, useState } from "react";
import { changeModalOpen } from "../../util";
import NotificationDropdown from "./NotificationDropdown";
import { DocumentContext } from "../../page/MainPage";

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log("search:", value);
};

const items: MenuProps["items"] = [
    {
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.antgroup.com"
            >
                <UserOutlined />
                <span>用户信息</span>
            </a>
        ),
        key: "0",
    },
    {
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
            >
                <LogoutOutlined />
                <span>注销</span>
            </a>
        ),
        key: "1",
    },
];

const TopHeader = () => {
    const [netModalOpen, setNetModalOpen] = useState<boolean>(false);
    const setDocumentOpen = useContext(DocumentContext);
    return (
        <Header className="layout-header">
            <div className="header-logo">
                <div className="logo">
                    <span className="avatar">
                        <ProjectLogoOutlined />
                    </span>
                    <div className="star-inserted"></div>
                </div>
            </div>
            <div className="header-menu">
                <div className="left">
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
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
                </div>
                <div className="right">
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
                    <Dropdown
                        menu={{ items }}
                        trigger={["click"]}
                        overlayClassName="user-center-dropdown"
                    >
                        <div className="user">
                            <div className="avatar"></div>
                            <div className="name">1494641150039679</div>
                            <CaretDownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </div>
            <NetDetectModal
                open={netModalOpen}
                onCancel={changeModalOpen(false, setNetModalOpen)}
            />
        </Header>
    );
};

export default TopHeader;
