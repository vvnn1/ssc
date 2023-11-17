import { Input, List, Select, Space, Tabs } from "antd";
import {
    ClickHouseOutlined,
    DataHubOutlined,
    DatagenOutlined,
    ElasticsearchOutlined,
    FakerOutlined,
    HbaseOutlined,
    HologresOutlined,
    HudiOutlined,
    IcebergOutlined,
    InfluxDBOutlined,
    JdbcOutlined,
    KafkaOutlined,
    LindormOutlined,
    MaxcomputeOutlined,
    MongoDBOutlined,
    MySqlOutlined,
    OssOutlined,
    PaimonOutlined,
    PostgreSqlOutlined,
    PrintOutlined,
    RdsMysqlOutlined,
    RedisOutlined,
    RocketMQOutlined,
    SearchOutlined,
    SlsOutlined,
    StarRocksOutlined,
} from "../../../../../Icon";
import ConnectorCard, { CardProps } from "./ConnectorCard";
import ScrollPin from "../../../../../ScrollPin";
import { useRef, useState } from "react";
import "./index.sass";

interface CardExtra {
    classification: string;
    version: string;
    template: string;
}

export type CardDetail = CardProps & CardExtra;

const connectorItems: CardDetail[] = [
    {
        icon: <MySqlOutlined />,
        desc: "云原生数据仓库 AnalyticDB MySQL 版 3.0",
        type: ["结果表", "维表"],
        classification: "adb3.0",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'adb3.0',
    'url' = '<url>',
    'userName' = '<userName>',
    'password' = '<password>',
    'tableName' = '<tableName>'
);`,
    },
    {
        icon: <PostgreSqlOutlined />,
        desc: "云原生数据仓库 AnalyticDB PostgreSQL",
        type: ["结果表", "维表"],
        classification: "adbpg",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'adbpg',
    'url' = '<url>',
    'userName' = '<userName>',
    'password' = '<password>',
    'tableName' = '<tableName>'
);`,
    },
    {
        icon: <MySqlOutlined />,
        desc: "Bloackhole",
        type: ["结果表"],
        classification: "blackhole",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'blackhole'
);`,
    },
    {
        icon: <ClickHouseOutlined />,
        desc: "ClickHouse",
        type: ["结果表"],
        classification: "clickhouse",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'clickhouse',
    'url' = '<url>',
    'userName' = '<userName>',
    'password' = '<password>',
    'tableName' = '<tableName>'
);`,
    },
    {
        icon: <HbaseOutlined />,
        desc: "云数据库 HBase",
        type: ["结果表", "维表"],
        classification: "cloudhbase",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'cloudhbase',
    'table-name' = '<table-name>',
    'zookeeper.quorum' = '<zookeeper.quorum>',
    'sink.sync-write' = '<sink.sync-write>'
);`,
    },
    {
        icon: <MaxcomputeOutlined />,
        desc: "增量 MaxCompute",
        type: ["源表"],
        classification: "continuous-odps",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'continuous-odps',
    'endpoint' = '<endpoint>',
    'project' = '<project>',
    'tablename' = '<tablename>',
    'accessid' = '<accessid>',
    'accessKey' = '<accessKey>',
    'startpartition' = '<startpartition>'
);`,
    },
    {
        icon: <DatagenOutlined />,
        desc: "Datagen",
        type: ["源表"],
        classification: "datagen",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'datagen'
);`,
    },
    {
        icon: <DataHubOutlined />,
        desc: "数据总线 DataHub",
        type: ["源表", "结果表"],
        classification: "datahub",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'datahub',
    'endpoint' = '<endpoint>',
    'project' = '<project>',
    'topic' = '<topic>',
    'accessId' = '<accessId>',
    'accessKey' = '<accessKey>'
);`,
    },
    {
        icon: <ElasticsearchOutlined />,
        desc: "Elasticsearch",
        type: ["源表", "结果表", "维表"],
        classification: "elasticsearch",
        version: "6.x & 7.x",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'elasticsearch',
    'indexName' = '<indexName>',
    'endPoint' = '<endPoint>'
);`,
    },
    {
        icon: <ElasticsearchOutlined />,
        desc: "Elasticsearch6",
        type: ["源表", "结果表", "维表"],
        classification: "elasticsearch-6",
        version: "6.x",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'elasticsearch-6',
    'hosts' = '<hosts>',
    'index' = '<index>',
    'document-type' = '<document-type>'
);`,
    },
    {
        icon: <ElasticsearchOutlined />,
        desc: "Elasticsearch7",
        type: ["源表", "结果表", "维表"],
        classification: "elasticsearch-7",
        version: "7.x",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'elasticsearch-7',
    'hosts' = '<hosts>',
    'index' = '<index>'
);`,
    },
    {
        icon: <FakerOutlined />,
        desc: "模拟数据生成 Faker",
        type: ["源表", "维表"],
        classification: "faker",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'faker'
);`,
    },
    {
        icon: <OssOutlined />,
        desc: "对象存储 OSS",
        type: ["结果表", "维表"],
        classification: "filesystem",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'filesystem',
    'path' = '<path>',
    'format' = '<format>'
);`,
    },
    {
        icon: <HologresOutlined />,
        desc: "实时数仓 Hologres",
        type: ["源表", "结果表", "维表"],
        classification: "hologres",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'hologres',
    'endpoint' = '<endpoint>',
    'dbname' = '<dbname>',
    'tablename' = '<tablename>',
    'username' = '<username>',
    'password' = '<password>'
);`,
    },
    {
        icon: <HudiOutlined />,
        desc: "Hudi",
        type: ["源表", "结果表"],
        classification: "hudi",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'hudi',
    'path' = '<path>'
);`,
    },
    {
        icon: <IcebergOutlined />,
        desc: "Iceberg",
        type: ["源表", "结果表"],
        classification: "iceberg",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'iceberg'
);`,
    },
    {
        icon: <InfluxDBOutlined />,
        desc: "时序数据库 InfluxDB",
        type: ["结果表"],
        classification: "influxdb",
        version: "1.x",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'influxdb',
    'database' = '<database>',
    'url' = '<url>'
);`,
    },
    {
        icon: <JdbcOutlined />,
        desc: "JDBC",
        type: ["源表", "结果表", "维表"],
        classification: "jdbc",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'jdbc',
    'url' = '<url>',
    'table-name' = '<table-name>'
);`,
    },
    {
        icon: <KafkaOutlined />,
        desc: "消息队列 Kafka",
        type: ["源表", "结果表"],
        classification: "kafka",
        version: "0.11+",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'kafka',
    'topic' = '<topic>',
    'properties.bootstrap.servers' = '<properties.bootstrap.servers>',
    'properties.group.id' = '<properties.group.id>',
    'format' = '<format>',
    'value.format' = '<value.format>'
);`,
    },
    {
        icon: <LindormOutlined />,
        desc: "云原生多模数据库 Lindorm",
        type: ["结果表", "维表"],
        classification: "lindorm",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'lindorm',
    'seedServer' = '<seedServer>',
    'tableName' = '<tableName>',
    'namespace' = '<namespace>',
    'username' = '<username>',
    'password' = '<password>'
);`,
    },
    {
        icon: <MongoDBOutlined />,
        desc: "云数据库 MongoDB",
        type: ["结果表"],
        classification: "mongodb",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'mongodb',
    'database' = '<database>',
    'collection' = '<collection>',
    'uri' = '<uri>'
);`,
    },
    {
        icon: <RocketMQOutlined />,
        desc: "消息队列 RocketMQ",
        type: ["源表", "结果表"],
        classification: "mq",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'mq',
    'topic' = '<topic>',
    'consumerGroup' = '<consumerGroup>',
    'pullIntervalMs' = '<pullIntervalMs>',
    'accessId' = '<accessId>',
    'accessKey' = '<accessKey>',
    'endpoint' = '<endpoint>',
    'producerGroup' = '<producerGroup>'
);`,
    },
    {
        icon: <MySqlOutlined />,
        desc: "MySQL",
        type: ["结果表", "维表"],
        classification: "mysql",
        version: "5.6/5.7/8.0",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'mysql',
    'hostname' = '<hostname>',
    'username' = '<username>',
    'password' = '<password>',
    'database-name' = '<database-name>',
    'table-name' = '<table-name>'
);`,
    },
    {
        icon: <MySqlOutlined />,
        desc: "MySQL CDC",
        type: ["源表"],
        classification: "mysql-cdc",
        version: "5.6/5.7/8.0",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'mysql-cdc',
    'hostname' = '<hostname>',
    'username' = '<username>',
    'password' = '<password>',
    'database-name' = '<database-name>',
    'table-name' = '<table-name>'
);`,
    },
    {
        icon: <MaxcomputeOutlined />,
        desc: "大数据计算服务 MaxCompute",
        type: ["源表", "结果表", "维表"],
        classification: "odps",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'odps',
    'endpoint' = '<endpoint>',
    'project' = '<project>',
    'tablename' = '<tablename>',
    'accessid' = '<accessid>',
    'accessKey' = '<accessKey>'
);`,
    },
    {
        icon: <PaimonOutlined />,
        desc: "表格存储 OTS",
        type: ["源表", "结果表", "维表"],
        classification: "ots",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'ots',
    'instanceName' = '<instanceName>',
    'tableName' = '<tableName>',
    'endPoint' = '<endPoint>'
);`,
    },
    {
        icon: <PaimonOutlined />,
        desc: "Apache Paimon",
        type: ["源表", "结果表"],
        classification: "paimon",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (

);`,
    },
    {
        icon: <PostgreSqlOutlined />,
        desc: "Postgres CDC",
        type: ["源表"],
        classification: "postgres-cdc",
        version: "9.6+",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'postgres-cdc',
    'hostname' = '<hostname>',
    'username' = '<username>',
    'password' = '<password>',
    'database-name' = '<database-name>',
    'schema-name' = '<schema-name>',
    'table-name' = '<table-name>'
);`,
    },
    {
        icon: <PrintOutlined />,
        desc: "Print",
        type: ["结果表"],
        classification: "print",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'print'
);`,
    },
    {
        icon: <RdsMysqlOutlined />,
        desc: "云数据库 RDS MySQL 版",
        type: ["结果表", "维表"],
        classification: "rds",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'rds',
    'url' = '<url>',
    'userName' = '<userName>',
    'password' = '<password>',
    'tableName' = '<tableName>'
);`,
    },
    {
        icon: <RedisOutlined />,
        desc: "云数据库 Redis",
        type: ["结果表", "维表"],
        classification: "redis",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'redis',
    'host' = '<host>'
);`,
    },
    {
        icon: <SlsOutlined />,
        desc: "日志服务 SLS",
        type: ["源表", "结果表"],
        classification: "sls",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'sls',
    'endpoint' = '<endpoint>',
    'project' = '<project>',
    'logstore' = '<logstore>'
);`,
    },
    {
        icon: <StarRocksOutlined />,
        desc: "StarRocks",
        type: ["源表", "结果表"],
        classification: "starrocks",
        version: "无版本限制",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'starrocks',
    'load-url' = '<load-url>',
    'jdbc-url' = '<jdbc-url>',
    'database-name' = '<database-name>',
    'username' = '<username>',
    'password' = '<password>'
);`,
    },
    {
        icon: <KafkaOutlined />,
        desc: "Upsert Kafka",
        type: ["源表", "结果表"],
        classification: "upsert-kafka",
        version: "0.11+",
        template: `CREATE TEMPORARY TABLE <your_table_name> (
    ...
) 
WITH (
    'connector' = 'upsert-kafka',
    'topic' = '<topic>',
    'properties.bootstrap.servers' = '<properties.bootstrap.servers>',
    'key.format' = '<key.format>',
    'value.format' = '<value.format>'
);`,
    },
];

interface Step1Props {
    onCardChange: (card: CardDetail) => void;
}

const Step1 = (props: Step1Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>();

    const onItemClick = (index: number) => {
        return () => {
            props.onCardChange(connectorItems[index]);
            setActiveIndex(index);
        };
    };

    return (
        <div className="create-temporary-table-modal-step-1">
            <Tabs
                items={[
                    {
                        key: "inner",
                        label: "使用内置连接器连接",
                    },
                    {
                        key: "custom",
                        label: "使用自定义连接器连接",
                    },
                ]}
                tabBarExtraContent={
                    <>
                        没有想要的连接器? <a>前往创建连接器</a>
                    </>
                }
            />
            <ScrollPin containerRef={containerRef} />
            <div
                className="connector-list-wrapper"
                ref={containerRef}
            >
                <Space className="search-bar">
                    <Space.Compact className="ant-input-group">
                        <span className="ant-input-group-addon">连接方式</span>
                        <Select
                            style={{ width: 220 }}
                            defaultValue="all"
                            options={[
                                {
                                    label: "全部",
                                    value: "all",
                                },
                                {
                                    label: "源表",
                                    value: "source",
                                },
                                {
                                    label: "结果表",
                                    value: "result",
                                },
                            ]}
                        />
                    </Space.Compact>

                    <Input
                        placeholder="搜索连接器"
                        style={{ width: 300 }}
                        suffix={<SearchOutlined />}
                    />
                </Space>

                <List
                    className="pro-list"
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={connectorItems}
                    renderItem={(item, index) => (
                        <List.Item
                            onClick={onItemClick(index)}
                            className={activeIndex === index ? "active" : undefined}
                        >
                            <ConnectorCard
                                icon={item.icon}
                                desc={item.desc}
                                type={item.type}
                                hoverable
                            />
                        </List.Item>
                    )}
                ></List>
            </div>
        </div>
    );
};

export default Step1;
