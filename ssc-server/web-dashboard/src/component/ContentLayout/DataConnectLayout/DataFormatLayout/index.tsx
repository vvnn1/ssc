import Card, { CardProps } from "../Card";
import { CsvOutlined, JsonOutlined, RawOutlined, SearchOutlined } from "../../../Icon";
import { Button, Empty, Input, List, Space, Tabs, TabsProps } from "antd";
import "./index.sass";
import CustomFormatModal from "./CustomFormatModal";
import { useState } from "react";
import EngineSelect from "../../../Select/EngineSelect";

const connectorItems: CardProps[] = [
    {
        icon: <JsonOutlined />,
        desc: "Json",
    },
    {
        icon: <CsvOutlined />,
        desc: "Csv",
    },
    {
        icon: <RawOutlined />,
        desc: "Raw",
    },
];

const tabItems: TabsProps["items"] = [
    {
        key: "1",
        label: "内置数据格式",
        children: (
            <div className="connector-list-wrapper">
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={connectorItems}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                icon={item.icon}
                                desc={item.desc}
                                type={item.type}
                            />
                        </List.Item>
                    )}
                />
            </div>
        ),
    },
    {
        key: "2",
        label: "自定义数据格式",
        children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
    },
];

const DataFormatLayout = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        };
    };
    return (
        <div className="data-format-page">
            <div className="data-format-actions">
                <Space
                    className="search-bar"
                    size={16}
                >
                    <Space.Compact className="ant-input-group">
                        <span className="ant-input-group-addon">引擎版本</span>
                        <EngineSelect />
                    </Space.Compact>

                    <Input
                        placeholder="搜索数据格式"
                        suffix={<SearchOutlined />}
                    />
                </Space>
            </div>

            <Tabs
                tabBarExtraContent={
                    <Button
                        size="small"
                        type="primary"
                        onClick={changeModalOpen(true)}
                    >
                        创建自定义数据格式
                    </Button>
                }
                defaultActiveKey="1"
                items={tabItems}
            />

            <CustomFormatModal
                open={modalOpen}
                onCancel={changeModalOpen(false)}
            />
        </div>
    );
};

export default DataFormatLayout;
