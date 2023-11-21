import ConnectorCard, { CardProps } from "../Card";
import {
    ClickHouseOutlined,
    DataHubOutlined,
    DatagenOutlined,
    ElasticsearchOutlined,
    FakerOutlined,
    HbaseOutlined,
    HudiOutlined,
    IcebergOutlined,
    InfluxDBOutlined,
    JdbcOutlined,
    KafkaOutlined,
    MongoDBOutlined,
    MySqlOutlined,
    OssOutlined,
    PaimonOutlined,
    PostgreSqlOutlined,
    RedisOutlined,
    RocketMQOutlined,
    SearchOutlined,
    StarRocksOutlined,
} from "../../../../../component/Icon";
import { Button, Empty, Input, List, Select, Space, Tabs, TabsProps } from "antd";
import "./index.sass";
import CustomConnectorModal from "./CustomConnectorModal";
import { useState } from "react";
import EngineSelect from "../../../../../component/Select/EngineSelect";

const connectorItems: CardProps[] = [
    {
        icon: <MySqlOutlined />,
        desc: "MySQL",
        type: ["结果表", "维表"],
    },
    {
        icon: <PostgreSqlOutlined />,
        desc: "PostgreSQL",
        type: ["结果表", "维表"],
    },
    {
        icon: <ClickHouseOutlined />,
        desc: "ClickHouse",
        type: ["结果表", "维表"],
    },
    {
        icon: <HbaseOutlined />,
        desc: "Hbase",
        type: ["结果表", "维表"],
    },
    {
        icon: <DatagenOutlined />,
        desc: "Datagen",
        type: ["结果表", "维表"],
    },
    {
        icon: <DataHubOutlined />,
        desc: "DataHub",
        type: ["结果表", "维表"],
    },
    {
        icon: <ElasticsearchOutlined />,
        desc: "Elasticsearch",
        type: ["结果表", "维表"],
    },
    {
        icon: <FakerOutlined />,
        desc: "Faker",
        type: ["结果表", "维表"],
    },
    {
        icon: <OssOutlined />,
        desc: "OSS",
        type: ["结果表", "维表"],
    },
    {
        icon: <HudiOutlined />,
        desc: "Hudi",
        type: ["结果表", "维表"],
    },
    {
        icon: <IcebergOutlined />,
        desc: "Iceberg",
        type: ["结果表", "维表"],
    },
    {
        icon: <InfluxDBOutlined />,
        desc: "InfluxDB",
        type: ["结果表", "维表"],
    },
    {
        icon: <JdbcOutlined />,
        desc: "JDBC",
        type: ["结果表", "维表"],
    },
    {
        icon: <KafkaOutlined />,
        desc: "Kafka",
        type: ["结果表", "维表"],
    },
    {
        icon: <MongoDBOutlined />,
        desc: "MongoDB",
        type: ["结果表", "维表"],
    },
    {
        icon: <RocketMQOutlined />,
        desc: "RocketMQ",
        type: ["结果表", "维表"],
    },
    {
        icon: <PaimonOutlined />,
        desc: "Paimon",
        type: ["结果表", "维表"],
    },
    {
        icon: <RedisOutlined />,
        desc: "Redis",
        type: ["结果表", "维表"],
    },
    {
        icon: <StarRocksOutlined />,
        desc: "StarRocks",
        type: ["结果表", "维表"],
    },
];

const tabItems: TabsProps["items"] = [
    {
        key: "1",
        label: "内置连接器",
        children: (
            <div className="connector-list-wrapper">
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={connectorItems}
                    renderItem={item => (
                        <List.Item>
                            <ConnectorCard
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
        label: "自定义连接器",
        children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
    },
];

const ConnectorLayout = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        };
    };

    return (
        <div className="connector-page">
            <div className="actions">
                <Space
                    className="search-bar"
                    size={16}
                >
                    <Space.Compact className="ant-input-group">
                        <span className="ant-input-group-addon">引擎版本</span>
                        <EngineSelect />
                    </Space.Compact>

                    <Space.Compact className="ant-input-group">
                        <span className="ant-input-group-addon">连接方式</span>
                        <Select
                            options={[
                                {
                                    label: "全部",
                                },
                                {
                                    label: "源表",
                                },
                                {
                                    label: "结果表",
                                },
                            ]}
                        />
                    </Space.Compact>

                    <Input
                        placeholder="搜索连接器"
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
                        创建自定义连接器
                    </Button>
                }
                defaultActiveKey="1"
                items={tabItems}
            />

            <CustomConnectorModal
                open={modalOpen}
                onCancel={changeModalOpen(false)}
            />
        </div>
    );
};

export default ConnectorLayout;
