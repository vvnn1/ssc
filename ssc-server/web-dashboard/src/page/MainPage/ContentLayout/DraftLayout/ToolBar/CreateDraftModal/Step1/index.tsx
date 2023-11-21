import { Input, TabsProps } from "antd";
import { FileFilled, SearchOutlined } from "../../../../../../../component/Icon";
import DraftList, { Card } from "../DraftList";
import ScrollTab from "../../../../../../../component/ScrollTab";
import "./index.sass";
import dayjs from "dayjs";

interface Template {
    desc: string;
    fileName: string;
    templateContent: string;
}

export type CardTemplate = Card & Template;
const basicTemplateItems: CardTemplate[] = [
    {
        icon: <FileFilled />,
        title: "空白的流作业草稿",
        content: "创建一个空白的流类型的作业草稿。",
        desc: "默认将创建一个流类型的作业草稿（仅包含代码示例的注释），您可以在创建完成后编辑 SQL 内容以完成作业草稿的开发。",
        fileName: "Untitled-stream-sql",
        templateContent: `--****************************************************--
-- Author:         Write your name here
-- Created Time:   ${dayjs().format("YYYY-MM-DD HH:mm:ss")}
-- Description:    Write your description here
-- Hints:          You can use SET statements to modify the configuration
--****************************************************--`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "空白的批作业草稿",
        content: "创建一个空白的批类型的作业草稿。",
        desc: "默认将创建一个批类型的作业草稿（仅包含代码示例的注释），您可以在创建完成后编辑 SQL 内容以完成作业草稿的开发。",
        fileName: "Untitled-batch-sql",
        templateContent: `--****************************************************--
-- Author:         Write your name here
-- Created Time:   ${dayjs().format("YYYY-MM-DD HH:mm:ss")}
-- Description:    Write your description here
-- Hints:          You can use SET statements to modify the configuration
--****************************************************--`,
        classification: "BATCH",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "创建表",
        content: "Flink SQL使用DDL创建表并保存在catalog中，对表的操作和数据库类似。",
        desc: "Flink的表不是内部表，不在内部维护，而是始终对外部系统进行操作。表定义分为两部分：表结构和连接器配置。表结构定义了表中的列名及其类型，是查询操作的对象。连接器配置包含在WITH子句中，定义支持该表的外部系统。模版中的Datagen连接器，在内存中连续生成数据。执行DDL创建表之后，您可以通过运行简单的SELECT语句来测试表是否正确创建。",
        fileName: "create-table",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 创建表

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
-- 执行创建表 DDL
CREATE TABLE orders (
    order_uid  BIGINT,
    product_id BIGINT,
    price      DECIMAL(32, 2),
    order_time TIMESTAMP(3)
) WITH (
    'connector' = 'datagen'
);

-- 试试单独执行 SELECT 语句测试表是否正确创建：
-- SELECT * FROM orders;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "创建临时表",
        content: "当某些表只需要在当前会话或SQL脚本中使用时，可以使用临时表。",
        desc: "临时表不会持久化到catalog中，使用临时表可以创建完全独立运行的SQL脚本。临时表遵循表的定义，依然由表结构和连接器配组成。模版中的Faker连接器，它使用Java Faker表达式在内存中连续生成数据；Blackhole连接器会直接把数据丢弃。",
        fileName: "create-temporary-table",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 创建临时表
--********************************************************************--
-- 创建临时表 DDL，需要有 TEMPORARY 关键字
CREATE TEMPORARY TABLE server_logs ( 
    client_ip STRING,
    client_identity STRING, 
    userid STRING, 
    user_agent STRING,
    log_time TIMESTAMP(3),
    request_line STRING, 
    status_code STRING, 
    size INT
) WITH (
  'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
  'fields.client_ip.expression' = '#{Internet.publicIpV4Address}',
  'fields.client_identity.expression' =  '-',
  'fields.userid.expression' =  '-',
  'fields.user_agent.expression' = '#{Internet.userAgentAny}',
  'fields.log_time.expression' =  '#{date.past ''15'',''5'',''SECONDS''}',
  'fields.request_line.expression' = '#{regexify ''(GET|POST|PUT|PATCH){1}''} #{regexify ''(/search.html|/login.html|/prod.html|cart.html|/order.html){1}''} #{regexify ''(HTTP/1.1|HTTP/2|/HTTP/1.0){1}''}',
  'fields.status_code.expression' = '#{regexify ''(200|201|204|400|401|403|301){1}''}',
  'fields.size.expression' = '#{number.numberBetween ''100'',''10000000''}'
);

-- 创建临时表 DDL，需要有 TEMPORARY 关键字
CREATE TEMPORARY TABLE client_errors (
  log_time TIMESTAMP(3),
  request_line STRING,
  status_code STRING,
  size INT
)
WITH (
  'connector' = 'blackhole'
);

-- 验证临时表是否创建
INSERT INTO client_errors
SELECT 
  log_time,
  request_line,
  status_code,
  size
FROM server_logs
WHERE 
  status_code SIMILAR TO '4[0-9][0-9]';`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "创建临时视图",
        content: "在Flink SQL开发过程中，如果需要重用代码，组织长查询或者SQL脚本来简化开发时可以使用临时视图。",
        desc: "可以使用CREATE TEMPORARY VIEW语法从一个查询中定义一个临时视图，视图不会被物化。每次在查询中使用视图时，都会运行该视图引用的查询。模版中，我们在server_logs表上创建了一个临时视图，它封装了基于某些status_code过滤日志的逻辑，只会包含成功的请求。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "create-temporary-view",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 创建临时视图

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
-- 创建临时表 DDL，需要有 TEMPORARY 关键字
CREATE TEMPORARY TABLE server_logs ( 
    client_ip STRING,
    client_identity STRING, 
    userid STRING, 
    user_agent STRING,
    log_time TIMESTAMP(3),
    request_line STRING, 
    status_code STRING, 
    size INT
) WITH (
  	'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
  	'fields.client_ip.expression' = '#{Internet.publicIpV4Address}',
  	'fields.client_identity.expression' =  '-',
  	'fields.userid.expression' =  '-',
  	'fields.user_agent.expression' = '#{Internet.userAgentAny}',
  	'fields.log_time.expression' =  '#{date.past ''15'',''5'',''SECONDS''}',
  	'fields.request_line.expression' = '#{regexify ''(GET|POST|PUT|PATCH){1}''} #{regexify ''(/search.html|/login.html|/prod.html|cart.html|/order.html){1}''} #{regexify ''(HTTP/1.1|HTTP/2|/HTTP/1.0){1}''}',
  	'fields.status_code.expression' = '#{regexify ''(200|201|204|400|401|403|301){1}''}',
  	'fields.size.expression' = '#{number.numberBetween ''100'',''10000000''}'
);

-- 根据指定的query创建一个临时视图
CREATE TEMPORARY VIEW successful_requests AS 
SELECT * 
	FROM server_logs
WHERE status_code SIMILAR TO '[2,3][0-9][0-9]';

-- 查询视图中的数据
SELECT * FROM successful_requests;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "INSERT INTO",
        content: "当你需要将查询结果写入到外部存储系统中的表，从而提供给下游应用程序时需要使用INSERT INTO语法。",
        desc: "INSERT INTO语法可以将数据插入到表中，以便下游应用程序能够读取它们。大多数类型的外部系统都支持作为Flink的结果表。模版中读取server_logs表的日志数据，过滤出客户端错误类型日志，并将这些日志写入另一个名为client_errors的表中。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "insert-into-table",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 INSERT INTO
--********************************************************************--
-- 定义数据源表
CREATE TEMPORARY TABLE server_logs ( 
    client_ip STRING,
    client_identity STRING, 
    userid STRING, 
    user_agent STRING,
    log_time TIMESTAMP(3),
    request_line STRING, 
    status_code STRING, 
    size INT
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.client_ip.expression' = '#{Internet.publicIpV4Address}',
    'fields.client_identity.expression' =  '-',
    'fields.userid.expression' =  '-',
    'fields.user_agent.expression' = '#{Internet.userAgentAny}',
    'fields.log_time.expression' =  '#{date.past ''15'',''5'',''SECONDS''}',
    'fields.request_line.expression' = '#{regexify ''(GET|POST|PUT|PATCH){1}''} #{regexify ''(/search.html|/login.html|/prod.html|cart.html|/order.html){1}''} #{regexify ''(HTTP/1.1|HTTP/2|/HTTP/1.0){1}''}',
    'fields.status_code.expression' = '#{regexify ''(200|201|204|400|401|403|301){1}''}',
    'fields.size.expression' = '#{number.numberBetween ''100'',''10000000''}'
);
-- 定义结果表，实际应用中会选择 Kafka、JDBC 等作为结果表
CREATE TEMPORARY TABLE client_errors (
  	log_time TIMESTAMP(3),
  	request_line STRING,
  	status_code STRING,
  	size INT
) WITH (
  	'connector' = 'blackhole'
);
     
-- 写入数据到结果表
INSERT INTO client_errors
	SELECT 
  	log_time,
  	request_line,
  	status_code,
  	size
FROM server_logs
WHERE 
  	status_code SIMILAR TO '4[0-9][0-9]';`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "STATEMENT SET",
        content: "当你需要将查询的结果输出到下游的两到多个外部系统中时，需要使用STATEMENT SET语法。",
        desc: "比如在处理服务器日志时，支持团队希望每5分钟能看到每个浏览器的状态码数量，以便实时了解网页的状态。此外，他们还希望将每小时窗口粒度计算的状态码数量写入到文件系统中，这样他们就可以进行历史分析。我们可以快速的写两个INSERT INTO语句来解决这两个需求，但这并不是最高效的。这两个查询做了一些重复工作，比如重复读取Kafka topic的数据，一种高效的解决方法是使用STATEMENT SET语法。 STATEMENT SET语句包含一个或多个INSERT INTO语句，所有的INSERT INTO 语句经过整体优化后作为一个Flink作业执行，复用中间结果，从而可以优化作业性能，节约资源。模版中的Faker连接器，它使用Java Faker表达式在内存中连续生成数据。",
        fileName: "statement-set",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 Statement Set
--********************************************************************--
-- 定义数据源表
CREATE TEMPORARY TABLE server_logs ( 
    client_ip       STRING,
    client_identity STRING, 
    userid          STRING, 
    user_agent      STRING,
    log_time        TIMESTAMP(3),
    request_line    STRING, 
    status_code     STRING, 
    size            INT,
    WATERMARK FOR log_time AS log_time - INTERVAL '30' SECONDS
) WITH (
  	'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.client_ip.expression' = '#{Internet.publicIpV4Address}',
    'fields.client_identity.expression' =  '-',
    'fields.userid.expression' =  '-',
    'fields.user_agent.expression' = '#{Internet.userAgentAny}',
    'fields.log_time.expression' =  '#{date.past ''15'',''5'',''SECONDS''}',
    'fields.request_line.expression' = '#{regexify ''(GET|POST|PUT|PATCH){1}''} #{regexify ''(/search.html|/login.html|/prod.html|cart.html|/order.html){1}''} #{regexify ''(HTTP/1.1|HTTP/2|/HTTP/1.0){1}''}',
    'fields.status_code.expression' = '#{regexify ''(200|201|204|400|401|403|301){1}''}',
    'fields.size.expression' = '#{number.numberBetween ''100'',''10000000''}'
);

-- 定义结果表1
CREATE TEMPORARY TABLE aggregations1 (
  	\`browser\`     STRING,
    \`status_code\` STRING,
    \`end_time\`    TIMESTAMP(3),
    \`requests\`    BIGINT NOT NULL
) WITH (
  	'connector' = 'blackhole'
);

-- 定义结果表2
CREATE TEMPORARY TABLE aggregations2 (
    \`browser\`     STRING,
    \`status_code\` STRING,
    \`requests\`    BIGINT NOT NULL
) WITH (
  	'connector' = 'print'
);

-- This is a shared view that will be used by both insert into statements
CREATE TEMPORARY VIEW browsers AS  
    SELECT 
    REGEXP_EXTRACT(user_agent,'[^/]+') AS browser,
    status_code,
    log_time
FROM server_logs;

-- 封装多个INSERT INTO语句到一个STATEMENT SET语句中
BEGIN STATEMENT SET;
-- 5min窗口粒度聚合
INSERT INTO aggregations1
    SELECT
        browser,
        status_code,
        TUMBLE_ROWTIME(log_time, INTERVAL '5' MINUTE) AS end_time,
        COUNT(*) requests
FROM browsers
GROUP BY 
    browser,
    status_code,
    TUMBLE(log_time, INTERVAL '5' MINUTE);

-- 1h窗口粒度聚合
INSERT INTO aggregations2
    SELECT
        browser,
        status_code,
        COUNT(*) requests
    FROM browsers
    GROUP BY 
        browser,
        status_code,
        TUMBLE(log_time, INTERVAL '1' HOUR);
        
END;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "Watermark",
        content:
            "上游系统因为崩溃/网络延时等问题造成后产生的数据先被Flink接收会导致数据乱序，如果希望Flink可以正确处理乱序数据就需要使用Watermark。",
        desc: "WATERMARK是一种衡量事件时间进度的机制，Flink SQL中可以用WATERMARK语句在建表DDL中创建wateramk。WATERMARK语句在一个已有字段上定义一个watermark生成表达式，标记这个字段为时间属性字段，并告诉Flink我们期望的数据乱序程度。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "watermarks",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 Watermark

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE doctor_sightings (
    doctor        STRING,
    sighting_time TIMESTAMP(3),
    -- 通过watermark把sighting_time标识为事件时间，定义最大的乱序时间：期望所有的记录在目击发生后的15秒内都到达。
    WATERMARK FOR sighting_time AS sighting_time - INTERVAL '15' SECONDS
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.doctor.expression' = '#{dr_who.the_doctors}',
    'fields.sighting_time.expression' = '#{date.past ''15'',''SECONDS''}'
);

SELECT 
    doctor,
    -- 在滚动窗口中使用sighting_time字段
    TUMBLE_ROWTIME(sighting_time, INTERVAL '1' MINUTE) AS sighting_time,
    COUNT(*) AS sightings
FROM doctor_sightings
GROUP BY 
    TUMBLE(sighting_time, INTERVAL '1' MINUTE),
    doctor;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "GROUP BY",
        content: "需要实时对时间序列数据进行聚合分析的时候，可以使用GROUP BY语句。",
        desc: "比如要计算每个浏览器在过去一段时间内接收到的每个状态码的日志数量，你以把COUNT聚合函数和GROUP BY语句结合起来完成此需求。在流表上进行聚合计算产生的结果会动态更新，因此你将看到每个浏览器上的聚合结果随着新行的流入而不断变化。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "group-agg",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 GROUP BY

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
-- 定义数据源表
CREATE TEMPORARY TABLE server_logs ( 
    client_ip STRING,
    client_identity STRING, 
    userid STRING, 
    user_agent STRING,
    log_time TIMESTAMP(3),
    request_line STRING, 
    status_code STRING, 
    size INT
) WITH (
  'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
  'fields.client_ip.expression' = '#{Internet.publicIpV4Address}',
  'fields.client_identity.expression' =  '-',
  'fields.userid.expression' =  '-',
  'fields.user_agent.expression' = '#{Internet.userAgentAny}',
  'fields.log_time.expression' =  '#{date.past ''15'',''5'',''SECONDS''}',
  'fields.request_line.expression' = '#{regexify ''(GET|POST|PUT|PATCH){1}''} #{regexify ''(/search.html|/login.html|/prod.html|cart.html|/order.html){1}''} #{regexify ''(HTTP/1.1|HTTP/2|/HTTP/1.0){1}''}',
  'fields.status_code.expression' = '#{regexify ''(200|201|204|400|401|403|301){1}''}',
  'fields.size.expression' = '#{number.numberBetween ''100'',''10000000''}'
);

-- 采样user_agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A
-- 正则表达式: '[^/]+' (匹配 '/' 之前的所有字符)
SELECT 
  REGEXP_EXTRACT(user_agent,'[^/]+') AS browser,
  status_code, 
  COUNT(*) AS cnt_status
FROM server_logs
-- 按浏览器和状态码两个维度统计日志数量
GROUP BY 
  REGEXP_EXTRACT(user_agent,'[^/]+'),
  status_code;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "滚动窗口聚合",
        content: "当你需要对时间序列数据进行分组，并对每个分组内的数据进行聚合分析时，可以使用滚动窗口。",
        desc: "许多流应用程序需要处理时间序列数据，比如要计算每分钟不同IP地址的数量，可以使用TUMBLE内置函数。 使用TUMBLE内置函数分组得到的是滚动窗口，窗口之间不会重叠，只会在窗口间隔结束时触发一次计算，生成最终结果。如果源表中没有时间属性字段，则可以使用计算列生成，比如log_time AS PROCTIME()会使用当前系统时间作为时间字段log_time附加到表结构中。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "tumble-window-agg",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 滚动窗口聚合

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE server_logs ( 
    client_ip STRING,
    client_identity STRING, 
    userid STRING, 
    request_line STRING, 
    status_code STRING, 
    log_time AS PROCTIME() -- 使用当前系统处理时间作为表的时间字段
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.client_ip.expression' = '#{Internet.publicIpV4Address}',
    'fields.client_identity.expression' =  '-',
    'fields.userid.expression' =  '-',
    'fields.log_time.expression' =  '#{date.past ''15'',''5'',''SECONDS''}',
    'fields.request_line.expression' = '#{regexify ''(GET|POST|PUT|PATCH){1}''} #{regexify ''(/search.html|/login.html|/prod.html|cart.html|/order.html){1}''} #{regexify ''(HTTP/1.1|HTTP/2|/HTTP/1.0){1}''}',
    'fields.status_code.expression' = '#{regexify ''(200|201|204|400|401|403|301){1}''}'
);

-- 按 window_start, window_end 维度计算每分钟窗口上不同的 ip 数量
SELECT window_start, window_end, COUNT(DISTINCT client_ip) AS ip_addresses
    FROM TABLE(
        -- 定义1min滑动窗口
        TUMBLE(TABLE server_logs, DESCRIPTOR(log_time), INTERVAL '1' MINUTE))
    GROUP BY window_start, window_end;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "滑动窗口聚合",
        content: "如果需要每间隔一段时间更新一个窗口内的数据的话，你可以使用滑动窗口。",
        desc: "为了每隔30秒更新一次每种货币过去一分钟投标价格的移动平均值，我们将使用HOP内置函数生成滑动窗口。HOP函数有两个参数slide和size，slide为每次滑动的步长，size为窗口的大小。如果滑动间隔小于窗口长度，记录可以被分配给多个窗口。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "hop-window-agg",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 滑动窗口聚合

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE bids ( 
    bid_id STRING,
    currency_code STRING,
    bid_price DOUBLE, 
    transaction_time TIMESTAMP(3),
    WATERMARK FOR transaction_time AS transaction_time - INTERVAL '5' SECONDS  -- 定义事件时间，允许的最大窗口延迟为5s
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.bid_id.expression' = '#{Internet.UUID}',
    'fields.currency_code.expression' = '#{regexify ''(EUR|USD|CNY)''}',
    'fields.bid_price.expression' = '#{Number.randomDouble ''2'',''1'',''150''}',
    'fields.transaction_time.expression' = '#{date.past ''30'',''SECONDS''}',
    'rows-per-second' = '100'
);

-- 定义1min 的滑动窗口，每隔 30s 滚动一次
SELECT window_start, window_end, currency_code, ROUND(AVG(bid_price),2) AS MovingAverageBidPrice
    FROM TABLE(
        HOP(TABLE bids, DESCRIPTOR(transaction_time), INTERVAL '30' SECONDS, INTERVAL '1' MINUTE))
    GROUP BY window_start, window_end, currency_code;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "累积窗口聚合",
        content: "如果你需要提早看到窗口的计算结果，例如每分钟看到最新的窗口结果，可以使用累积窗口。",
        desc: "在电商大屏场景下，我们需要每分钟更新当天0点开始到当前时刻的累计销售额，可以使用CUMULATE函数。CUMULATE函数有两个参数step（累积窗口滚动步长） 和size（累计窗口最大长度），其中size是step的整数倍。当数据时间到达窗口初始长度step后，输出数据并将当前窗口继续向后扩展一个step长度，直到达到最大值size后结束窗口。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "cumulate-window-agg",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 累计窗口聚合

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
-- 商品销售订单表
CREATE TEMPORARY TABLE orders (
  	order_id    BIGINT, -- 订单ID
	goods_id    BIGINT, -- 商品ID
	goods_sales DOUBLE, -- 商品销售额
	order_time  TIMESTAMP(3), -- 下单时间
  	WATERMARK FOR order_time AS order_time - INTERVAL '5' SECONDS  -- 定义事件时间，允许的最大窗口延迟为5s
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.order_id.expression' = '#{number.numberBetween ''0'',''1000000000''}',
    'fields.goods_id.expression' = '#{number.numberBetween ''0'',''1000000000''}',
    'fields.goods_sales.expression' = '#{Number.randomDouble ''2'',''1'',''150''}',
    'fields.order_time.expression' = '#{date.past ''30'',''SECONDS''}',
    'rows-per-second' = '100'
);

-- 每分钟更新一次从零点开始截止到当前时刻的累计销售额
SELECT
    window_start,
    window_end,  
    SUM(goods_sales) as cumulate_gmv -- 当天累计销售额
FROM TABLE(
    -- 定义窗口最大长度为一天的累计窗口，窗口滚动步长为1分钟
    CUMULATE( 
        TABLE orders, 
        DESCRIPTOR(order_time), 
        INTERVAL '1' MINUTES, 
        INTERVAL '1' DAY)) 
GROUP BY window_start, window_end;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "会话窗口聚合",
        content: "需要实时统计用户在一个活跃会话期间的数据，你可以使用会话窗口。",
        desc: "会话窗口的特点是没有固定长度，需要预先定义一个间隔时间代表非活跃周期长度。比如要计算每个用户在活跃会话期间的“禁止”(403) 请求数，我们将间隔时间定为10s（INTERVAL '10' SECOND），那么用户的下一次禁止请求只要在上一次禁止请求发生的10s内产生就会被认定是在同一个会话窗口内，否则会创建一个新的会话窗口并关闭原来的窗口。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "session-window-agg",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 会话窗口聚合

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE server_logs ( 
    client_ip STRING,
    client_identity STRING, 
    userid STRING, 
    log_time TIMESTAMP(3),
    request_line STRING, 
    status_code STRING, 
    WATERMARK FOR log_time AS log_time - INTERVAL '5' SECONDS -- 定义 watermark
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'rows-per-second' = '5',
    'fields.client_ip.expression' = '#{Internet.publicIpV4Address}',
    'fields.client_identity.expression' =  '-',
    'fields.userid.expression' =  '#{regexify ''(morsapaes|knauf|sjwiesman){1}''}',
    'fields.log_time.expression' =  '#{date.past ''5'',''SECONDS''}',
    'fields.request_line.expression' = '#{regexify ''(GET|POST|PUT|PATCH){1}''} #{regexify ''(/search.html|/login.html|/prod.html|cart.html|/order.html){1}''} #{regexify ''(HTTP/1.1|HTTP/2|/HTTP/1.0){1}''}',
    'fields.status_code.expression' = '#{regexify ''(200|201|204|400|401|403|301){1}''}'
);

SELECT  
    userid,
    SESSION_START(log_time, INTERVAL '10' SECOND) AS session_beg,
    SESSION_ROWTIME(log_time, INTERVAL '10' SECOND) AS session_end,
    COUNT(request_line) AS request_cnt
FROM server_logs
    WHERE status_code = '403'
    GROUP BY 
        userid, 
    -- 会话窗口的最大空闲间隔为10s，当10s内该窗口没有接收到新的请求，会关闭当前窗口
    SESSION(log_time, INTERVAL '10' SECOND);`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "Over窗口聚合",
        content: "如果你想对一个窗口内的每个元素进行统计分析时，需要使用OVER窗口。",
        desc: "OVER窗口在流处理中每个元素都对应一个窗口，都触发一次数据计算，每个触发计算的元素所在的行都是该窗口内该元素的最后一行。窗口内的数据只存储一份，计算完成后会清理过期的数据。例如要检测温度测量表中的异常值，我们可以使用OVER窗口计算同一个城市在前一分钟内所有测量值的最大、最小、平均值以及标准差。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据",
        fileName: "over-window-agg",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 OVER窗口聚合

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE temperature_measurements (
    measurement_time TIMESTAMP(3),
    city STRING,
    temperature FLOAT, 
    WATERMARK FOR measurement_time AS measurement_time - INTERVAL '15' SECONDS -- 定义时间属性字段，OVER窗口排序时使用
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.measurement_time.expression' = '#{date.past ''15'',''SECONDS''}',
    'fields.temperature.expression' = '#{number.numberBetween ''0'',''50''}',
    'fields.city.expression' = '#{regexify ''(Chicago|Munich|Berlin|Portland|Hangzhou|Seatle|Beijing|New York){1}''}'
);

SELECT 
    measurement_time,
    city, 
    temperature,
    AVG(CAST(temperature AS FLOAT)) OVER last_minute AS avg_temperature_minute, -- 计算平均值
    MAX(temperature) OVER last_minute AS min_temperature_minute, -- 计算最大值
    MIN(temperature) OVER last_minute AS max_temperature_minute, -- 计算最小值
    STDDEV(CAST(temperature AS FLOAT)) OVER last_minute AS stdev_temperature_minute -- 计算标准差
FROM temperature_measurements 
    WINDOW last_minute AS ( -- 定义1min时间间隔的OVER窗口，按城市粒度分区，温度测量值排序，每个元素都会触发一次计算
        PARTITION BY city
        ORDER BY measurement_time
        RANGE BETWEEN INTERVAL '1' MINUTE PRECEDING AND CURRENT ROW 
    );`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "级联窗口聚合",
        content: "当你想同时对同一个流的数据进行不同时间维度（如1min/5min/30min/1h）的聚合的时候，需要使用级联窗口。",
        desc: "级联窗口相对于定义多个滚动窗口运行起来会更加高效，例如在一分钟和五分钟的窗口内输出用户平均请求的大小，级联窗口的模式可以将一分钟窗口的输出作为五分钟窗口的输入，复用中间计算结果，避免重复消费数据。模版中的Faker连接器，它使用Java Faker表达式在内存中连续生成数据。",
        fileName: "chained-window-aggregate",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 级联窗口聚合
--********************************************************************--
CREATE TEMPORARY TABLE server_logs ( 
    log_time TIMESTAMP(3),
    client_ip STRING,
    client_identity STRING, 
    userid STRING, 
    request_line STRING, 
    status_code STRING, 
    size INT, 
    WATERMARK FOR log_time AS log_time - INTERVAL '15' SECONDS -- 定义watermark
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.log_time.expression' =  '#{date.past ''15'',''5'',''SECONDS''}',
    'fields.client_ip.expression' = '#{Internet.publicIpV4Address}',
    'fields.client_identity.expression' =  '-',
    'fields.userid.expression' =  '-',
    'fields.request_line.expression' = '#{regexify ''(GET|POST|PUT|PATCH){1}''} #{regexify ''(/search.html|/login.html|/prod.html|cart.html|/order.html){1}''} #{regexify ''(HTTP/1.1|HTTP/2|/HTTP/1.0){1}''}',
    'fields.status_code.expression' = '#{regexify ''(200|201|204|400|401|403|301){1}''}',
    'fields.size.expression' = '#{number.numberBetween ''100'',''10000000''}'
);
-- 1min聚合结果表
CREATE TEMPORARY TABLE avg_request_size_1m (
    window_start TIMESTAMP(3),
    window_end TIMESTAMP(3),
    avg_size BIGINT
) WITH (
    'connector' = 'blackhole'
);

-- 5min聚合结果表
CREATE TEMPORARY TABLE avg_request_size_5m (
    window_start TIMESTAMP(3),
    window_end TIMESTAMP(3),
    avg_size BIGINT
) WITH (
    'connector' = 'blackhole'
);

-- 1min窗口查询结果
CREATE TEMPORARY VIEW server_logs_window_1m AS 
SELECT  
    TUMBLE_START(log_time, INTERVAL '1' MINUTE) AS window_start,
    TUMBLE_ROWTIME(log_time, INTERVAL '1' MINUTE) AS window_end,
    SUM(size) AS total_size,
    COUNT(*) AS num_requests
FROM server_logs
    GROUP BY 
    TUMBLE(log_time, INTERVAL '1' MINUTE);

-- 基于1min窗口查询结果，进行5min粒度窗口聚合
CREATE TEMPORARY VIEW server_logs_window_5m AS 
SELECT 
    TUMBLE_START(window_end, INTERVAL '5' MINUTE) AS window_start,
    TUMBLE_ROWTIME(window_end, INTERVAL '5' MINUTE) AS window_end,
    SUM(total_size) AS total_size,
    SUM(num_requests) AS num_requests
FROM server_logs_window_1m
    GROUP BY 
    TUMBLE(window_end, INTERVAL '5' MINUTE);

BEGIN STATEMENT SET;
-- 写入结果到1min窗口粒度结果表
INSERT INTO avg_request_size_1m SELECT
    window_start,
    window_end, 
    total_size/num_requests AS avg_size
FROM server_logs_window_1m;
-- 写入结果到5min窗口粒度结果表
INSERT INTO avg_request_size_5m SELECT
    window_start,
    window_end, 
    total_size/num_requests AS avg_size
FROM server_logs_window_5m;

END;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "去重",
        content: "当你需要去除数据流中的重复数据时，可以使用去重语法。",
        desc: "因为人为或应用程序错误等异常导致上游数据中产生重复数据会影响整体计算结果的准确性，如出现重复的订单数据，这种情况下我们需要用到去重语法。Flink中组合使用Over和ROW_NUMBER函数可以过滤掉重复订单数据。模版中的Datagen连接器，在内存中连续生成数据。",
        fileName: "deduplication",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 去重

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE orders (
  id INT,
  order_time AS CURRENT_TIMESTAMP,
  WATERMARK FOR order_time AS order_time - INTERVAL '5' SECONDS
)
WITH (
  'connector' = 'datagen',
  'rows-per-second'='10',
  'fields.id.kind'='random',
  'fields.id.min'='1',
  'fields.id.max'='100'
);
-- 对于每个order_id，按事件时间去重，只保留最新时间的记录即可实现去重
SELECT
  order_id,
  order_time
FROM (
  SELECT id AS order_id,
         order_time,
  			 -- 按事件时间升序排序
         ROW_NUMBER() OVER (PARTITION BY id ORDER BY order_time) AS rownum
  FROM orders)
WHERE rownum = 1; -- 只取排名第一的记录，去重是Top-N的一种特例`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "Top-N",
        content: "当你需要根据业务要求计算出目前排名前几位或者后几位的数据的时候可以使用Top-N功能。",
        desc: "魔法部在英国各地追踪巫师施展的每一个法术，并想知道每个巫师最喜欢的两个法术。 Flink SQL可用于计算连续聚合值，因此如果我们知道巫师施展的每个法术，就可以计算出他们施展该法术的总次数，此结果可用在OVER窗口上以计算Top-N。先对上一步计算的结果按wizard列进行分区，然后再根据施法次数（times_cast DESC）降序排序。内置的ROW_NUMBER函数根据行在分区内的排序，给每行分配一个唯一的、连续的序号，从1开始。最后只保留row_num <= 2的行，从而找到每个巫师最喜欢的2个法术。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。 Flink在这个问题上最强大的地方在于它的撤回能力，随着巫师们施展更多法术，前2名将会发生变化。当这种情况发生时，Flink会发出撤回消息，修改其输出，实时更新TopN结果，因此保证结果总是正确的。",
        fileName: "top-n",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 Top-N

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE spells_cast (
    wizard STRING,
    spell  STRING
) WITH (
  'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
  'fields.wizard.expression' = '#{harry_potter.characters}',
  'fields.spell.expression' = '#{harry_potter.spells}'
);

-- 找出每个巫师最喜欢的两个法术
SELECT wizard, spell, times_cast
FROM (
    SELECT *,
    ROW_NUMBER() OVER (PARTITION BY wizard ORDER BY times_cast DESC) AS row_num -- 按法术次数降序排序
    FROM (SELECT wizard, spell, COUNT(*) AS times_cast FROM spells_cast GROUP BY wizard, spell) -- 计算每个巫师施展的各种法术的次数
)
WHERE row_num <= 2;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "窗口Top-N",
        content: "当你需要在某个时间范围内计算出目前排名前几位或者后几位的数据的时候可以使用窗口Top-N功能。",
        desc: "相对于Top-N，窗口 Top-N顾名思义将计算的范围限定在一个窗口内。比如要计算出每个五分钟的窗口内观看人数最多的五个直播间时，就可以使用窗口Top-N功能。和Top-N最大的不同是，窗口Top-N只有在窗口结束的时候才会去更新数据，如果不是每条数据都需要更新结果，使用窗口Top-N会有更好的性能。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "window-topn",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 窗口Top-N

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE orders ( 
    bidtime TIMESTAMP(3),
    price DOUBLE, 
    item STRING,
    supplier STRING,
    WATERMARK FOR bidtime AS bidtime - INTERVAL '5' SECONDS  -- 定义watermark
) WITH (
  'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
  'fields.bidtime.expression' = '#{date.past ''30'',''SECONDS''}',
  'fields.price.expression' = '#{Number.randomDouble ''2'',''1'',''150''}',
  'fields.item.expression' = '#{Commerce.productName}',
  'fields.supplier.expression' = '#{regexify ''(Alice|Bob|Carol|Alex|Joe|James|Jane|Jack)''}',
  'rows-per-second' = '100'
);

-- 取出销售排名前三的供应商
SELECT *
    FROM (
        -- 按窗口时间分区，按价格降序排序
        SELECT *, ROW_NUMBER() OVER (PARTITION BY window_start, window_end ORDER BY price DESC) as rownum
        FROM (
            -- 计算每个窗口内各个供应商的销售额
            SELECT window_start, window_end, supplier, SUM(price) as price, COUNT(*) as cnt
            FROM TABLE(
                TUMBLE(TABLE orders, DESCRIPTOR(bidtime), INTERVAL '10' MINUTES))
            GROUP BY window_start, window_end, supplier
        )
    ) WHERE rownum <= 3;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "模式检测（CEP）",
        content: "在数据流情景中，当需要搜索一组事件模式时，可以使用MATCH_RECOGNIZE语句。",
        desc: "在使用SQL的日常工作中，一个常见(但历史上很复杂)任务是识别数据集中有意义的事件序列，也称为复杂事件处理(CEP)。在处理流数据时，这将变得更加重要，因为你想对已知的模式或变化的趋势做出快速响应，以提供最新的业务洞察力。Flink提供了复杂事件处理（CEP）库，该库允许在事件流中进行模式检测。Flink SQL融合CEP和SQL API提供了MATCH_RECOGNIZE语句，可以在SQL中进行复杂事件处理。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "pattern-recognize",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 模式检测CEP

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE subscriptions ( 
    id STRING,
    user_id INT,
    type STRING,
    start_date TIMESTAMP(3),
    end_date TIMESTAMP(3),
    payment_expiration TIMESTAMP(3),
    proc_time AS PROCTIME()
) WITH (
  'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
  'fields.id.expression' = '#{Internet.uuid}', 
  'fields.user_id.expression' = '#{number.numberBetween ''1'',''50''}',
  'fields.type.expression'= '#{regexify ''(basic|premium|platinum){1}''}',
  'fields.start_date.expression' = '#{date.past ''30'',''DAYS''}',
  'fields.end_date.expression' = '#{date.future ''15'',''DAYS''}',
  'fields.payment_expiration.expression' = '#{date.future ''365'',''DAYS''}'
);

SELECT * 
FROM subscriptions
    MATCH_RECOGNIZE ( -- 按user_id分区，按处理时间proc_time升序排序
        PARTITION BY user_id 
        ORDER BY proc_time
        MEASURES
            LAST(PREMIUM.type) AS premium_type,
            AVG(TIMESTAMPDIFF(DAY,PREMIUM.start_date,PREMIUM.end_date)) AS premium_avg_duration,
            BASIC.start_date AS downgrade_date
        AFTER MATCH SKIP PAST LAST ROW
        --模式: 一个或多个‘premium‘或’platinum‘订阅事件
        --对于相同的'user_id'，后面跟着一个'basic'订阅事件
        PATTERN (PREMIUM+ BASIC)
        DEFINE PREMIUM AS PREMIUM.type IN ('premium','platinum'),
            BASIC AS BASIC.type = 'basic');`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "Regular Join",
        content: "当你在计算中需要去关联查询其他流表的数据时，可以使用Regular Join。",
        desc: "Regular Join包含绝大多数在数据库中广泛使用的join语法，包括INNER和[FULL|LEFT|RIGHT] OUTER Join。需要注意的是使用Regular Join时每行输入的数据都会存储到state中，导致资源使用率不断上涨。模版中我们将一份秘密特工的名单NOC和特工真实信息的表进行关联输出。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "regular-join",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 Regular Join

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE NOC (
    agent_id STRING,
    codename STRING
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.agent_id.expression' = '#{regexify ''(1|2|3|4|5){1}''}',
    'fields.codename.expression' = '#{superhero.name}',
    'number-of-rows' = '10'
);

CREATE TEMPORARY TABLE RealNames (
    agent_id STRING,
    name STRING
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.agent_id.expression' = '#{regexify ''(1|2|3|4|5){1}''}',
    'fields.name.expression' = '#{Name.full_name}',
    'number-of-rows' = '10'
);

-- 使用agent_id作为两张表关联的条件，左右两边任何一张表来了新数据都会触发join动作
SELECT
    name,
    codename
FROM NOC
INNER JOIN RealNames ON NOC.agent_id = RealNames.agent_id;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "Interval Join",
        content: "如果你需要关联某张表在指定时间范围内的数据可以使用Interval Join。",
        desc: "Interval Join可以通过一个连接谓词定义，将时间属性在约定范围内的数据进行关联。假设你想要Join两张在订单履行生命周期内相互关联的表（orders和shipments），并且这两张表处于3天的服务水平协议（SLA）之内。为了减少Flink在state中保存的输入数据行数并优化Join类型，你可以在WHERE子句中定义一个时间约束，使用BETWEEN谓词将两张表Join的时间条件绑定到约束的时间间隔内。模版中的Datagen连接器，在内存中连续生成数据。",
        fileName: "interval-join",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 Interval Join

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE orders (
  id INT,
  order_time AS TIMESTAMPADD(DAY, CAST(FLOOR(RAND()*(1-5+1)+5)*(-1) AS INT), CURRENT_TIMESTAMP)
) WITH (
  'connector' = 'datagen',
  'rows-per-second'='10',
  'fields.id.kind'='sequence',
  'fields.id.start'='1',
  'fields.id.end'='1000'
);


CREATE TEMPORARY TABLE shipments (
  id INT,
  order_id INT,
  shipment_time AS TIMESTAMPADD(DAY, CAST(FLOOR(RAND()*(1-5+1)) AS INT), CURRENT_TIMESTAMP)
) WITH (
  'connector' = 'datagen',
  'rows-per-second'='5',
  'fields.id.kind'='random',
  'fields.id.min'='0',
  'fields.order_id.kind'='sequence',
  'fields.order_id.start'='1',
  'fields.order_id.end'='1000'
);

-- order表的每条数据会与shipments表过去三天至当前时刻时间范围内的数据进行join
SELECT
    o.id AS order_id,
    o.order_time,
    s.shipment_time,
    TIMESTAMPDIFF(DAY,o.order_time,s.shipment_time) AS day_diff
FROM orders o
         JOIN shipments s ON o.id = s.order_id
WHERE
    -- 时间 join 条件：shipments.shipment_time - INTERVAL '3' DAY <= orders.order_time < shipments.shipment_time
    o.order_time BETWEEN s.shipment_time - INTERVAL '3' DAY AND s.shipment_time;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "时态表Join",
        content: "当流表中的每条数据需要关联其他表中对应时间版本数据的时候，可以使用时态表Join。",
        desc: "时态表Join在两个表之间相关的数据出现乱序和时间偏差的情况下提供了正确的、确定性的结果。例如我们期望每笔交易的金额与交易发生时的汇率关联来统计整体的交易额，那么交易表（transactions）就是流表，货币汇率（currency_rates）就是版本表。Flink SQL使用FOR SYSTEM_TIME AS OF语法执行该操作，版本表需要定义主键约束和事件时间属性。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "temporal-join",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 时态表Join

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
-- 使用主键约束和watermark来定义一张版本表，这张表可以是一个cdc表、upsert类型的kafka topic等
CREATE TEMPORARY TABLE currency_rates (
    \`currency_code\` STRING,
    \`eur_rate\` DECIMAL(6,4),
    \`rate_time\` TIMESTAMP(3),
    WATERMARK FOR \`rate_time\` AS rate_time - INTERVAL '15' SECONDS, -- 定义事件时间
    PRIMARY KEY (currency_code) NOT ENFORCED -- 定义主键
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.currency_code.expression' = '#{Currency.code}',
    'fields.eur_rate.expression' = '#{Number.randomDouble ''4'',''0'',''10''}',
    'fields.rate_time.expression' = '#{date.past ''15'',''SECONDS''}', 
    'rows-per-second' = '100'
);
      
-- 这是一个append-only类型的动态表，需要定义watermk
CREATE TEMPORARY TABLE transactions (
    \`id\` STRING,
    \`currency_code\` STRING,
    \`total\` DECIMAL(10,2),
    \`transaction_time\` TIMESTAMP(3),
     WATERMARK FOR \`transaction_time\` AS transaction_time - INTERVAL '30' SECONDS --定义watermark
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.id.expression' = '#{Internet.UUID}',
    'fields.currency_code.expression' = '#{Currency.code}',
    'fields.total.expression' = '#{Number.randomDouble ''2'',''10'',''1000''}',
    'fields.transaction_time.expression' = '#{date.past ''30'',''SECONDS''}',
    'rows-per-second' = '100'
);

-- 当左右两张表的watermark对齐时，才会触发join动作，左右两张表都需要定义watermark
SELECT 
    t.id,
    t.total * c.eur_rate AS total_eur,
    t.total, 
    c.currency_code,
    t.transaction_time
FROM transactions t
    -- transactions表每条记录都与currency_rates表transaction_time时刻的汇率进行join
    JOIN currency_rates FOR SYSTEM_TIME AS OF t.transaction_time AS c
    -- 指定join key
    ON t.currency_code = c.currency_code;`,
        classification: "STREAM",
        type: "SQL",
    },
    {
        icon: <FileFilled />,
        title: "维表Join",
        content: "如果你需要关联静态维表上的数据可以使用维表Join。",
        desc: "在实时计算中，并非所有数据都会频繁改变，这种情况下可以使用维表Join语法将静态数据与流上数据进行关联。与时态表Join相同，维表Join也使用FOR SYSTEM_TIME AS OF语法，但要求流表具有处理时间属性。模版中我们将users表中的用户数据和流表subscriptions进行Join找到未成年的用户数据。FOR SYSTEM_TIME AS OF子句使用处理时间语义，从而确保在Join时，subscriptions表中的每个订阅事件以被Join算子处理的时间点作为等值条件与users表进行Join。维表Join同样要求维表需要有主键，这样的话，不用一次性读取维表中的所有数据，而且在必要时可以延迟加载某个值。模版中的Faker连接器，使用Java Faker表达式在内存中连续生成数据。",
        fileName: "lookup-join",
        templateContent: `--********************************************************************--
-- Flink SQL 快速入门示例 维表Join

-- 该模版仅支持使用"执行"功能。如需"上线"运行，需要您增加 INSERT 相关逻辑
--********************************************************************--
CREATE TEMPORARY TABLE subscriptions ( 
    id STRING,
    user_id INT,
    type STRING,
    start_date TIMESTAMP(3),
    end_date TIMESTAMP(3),
    payment_expiration TIMESTAMP(3),
    proc_time AS PROCTIME() -- 这里需要定义处理时间属性
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.id.expression' = '#{Internet.uuid}', 
    'fields.user_id.expression' = '#{number.numberBetween ''1'',''50''}',
    'fields.type.expression'= '#{regexify ''(basic|premium|platinum){1}''}',
    'fields.start_date.expression' = '#{date.past ''30'',''DAYS''}',
    'fields.end_date.expression' = '#{date.future ''365'',''DAYS''}',
    'fields.payment_expiration.expression' = '#{date.future ''365'',''DAYS''}'
);

-- 定义维表，为了示例能直接运行，这里使用faker 作为维表，实际应用中一般会使用JDBC、Redis、Hbase等作为维表
CREATE TEMPORARY TABLE users (
    user_id INT PRIMARY KEY NOT ENFORCED, -- 定义主键
    user_name VARCHAR(255) NOT NULL, 
    age INT NOT NULL
) WITH (
    'connector' = 'faker',    -- Faker 连接器仅在 VVR-4.0.12 及以上支持
    'fields.user_id.expression' = '#{number.numberBetween ''1'',''10''}',
    'fields.user_name.expression' = '#{regexify ''(ron|jark|danny){1}''}',
    'fields.age.expression' = '#{number.numberBetween ''1'',''30''}'
);

SELECT 
    id AS subscription_id,
    type AS subscription_type,
    age AS user_age,
    CASE 
        WHEN age < 18 THEN 1
        ELSE 0
    END AS is_minor
FROM subscriptions usub
    -- subscriptions每条记录都使用当前系统时间与维表users中的最新数据进行join
    JOIN users FOR SYSTEM_TIME AS OF usub.proc_time AS u
    -- 指定join key
    ON usub.user_id = u.user_id;`,
        classification: "STREAM",
        type: "SQL",
    },
];

const synTemplateItems: Card[] = [
    {
        icon: <FileFilled />,
        title: "MySQL到Hologres数据同步",
        content: "本模版可以协助您将mysql中的数据实时同步到hologres。",
        classification: "STREAM",
        type: "SQL",
    },
];

interface Step1Props {
    onTemplateSelected: (t: CardTemplate) => void;
}

const Step1 = (props: Step1Props) => {
    const wrapSelectedClick = (cards: CardTemplate[]): CardTemplate[] => {
        return cards.map(item => {
            return {
                ...item,
                onClick: () => props.onTemplateSelected(item),
            };
        });
    };

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "SQL 基础模板",
            children: <DraftList items={wrapSelectedClick(basicTemplateItems)} />,
        },
        {
            key: "2",
            label: "数据同步模板",
            children: <DraftList items={synTemplateItems} />,
        },
    ];

    return (
        <ScrollTab
            destroyInactiveTabPane
            className="template-tabs"
            items={items}
            tabBarExtraContent={
                <Input
                    placeholder="输入搜索内容"
                    suffix={<SearchOutlined />}
                />
            }
        />
    );
};

export default Step1;
