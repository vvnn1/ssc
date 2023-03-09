CREATE TABLE sensor_source(
                              id VARCHAR,
                              dt BIGINT,
                              temperature DOUBLE
) WITH (
    'connector.type'='kafka',
    'connector.version'='universal',
    'connector.topic'='sensor_source',
    'connector.startup-mode'='latest-offset',
    'connector.properties.zookeeper.connect'='local199:2181',
    'connector.properties.bootstrap.servers'='local199:9092',
    'format.type'='csv'
);

CREATE TABLE sensor_sink(
                            id VARCHAR,
                            dt BIGINT,
                            temperature DOUBLE
)WITH(
    'connector.type'='kafka',
    'connector.version'='universal',
    'connector.topic'='sensor_sink',
    'connector.properties.zookeeper.connect'='local199:2181',
    'connector.properties.bootstrap.servers'='local199:9092',
    'format.type'='csv'
);

CREATE DEBUG debug_1 AS
SELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;

INSERT INTO sensor_sink
SELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;