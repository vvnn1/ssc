import { useEffect, useRef, useState } from "react";
import MonacoEditor from "../../../../../component/MonacoEditor";
import RightTabBar from "./RightTabBar";
import "./index.sass";
import BottomTabBar from "./BottomTabBar";
import Resizable from "../../../../../component/Resizable";
import ToolBar from "../ToolBar";
import NavTab from "../NavTab";
import { EditorDidMount } from "react-monaco-editor";
import { editor, Uri } from "monaco-editor";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export interface Draft {
    id: string;
    name: string;
    content: string;
    hasDeploy: boolean;
    type: "s" | "b";
}

const sql1 = `CREATE TEMPORARY TABLE orders_dataset (
	order_id BIGINT,
  \`user_id\` bigint,			
	auction_id bigint,		
	cat_id bigint,			
	cat1 bigint,				
	property varchar,			
	buy_mount int,			
	\`day\` varchar	,
   PRIMARY KEY(order_id) NOT ENFORCED
) WITH (
    'connector' = 'mysql',
    'hostname' = '******************.mysql.rds.aliyuncs.com',
    'port' = '3306',
    'username' = '***********',
    'password' = '***********',
    'database-name' = '***********',
    'table-name' = 'source_table'
);

CREATE TEMPORARY TABLE baby_dataset (
	\`user_id\` bigint,
	birthday varchar,
	gender int,
    PRIMARY KEY(user_id) NOT ENFORCED
) WITH (
    'connector' = 'mysql',
    'hostname' = '******************.mysql.rds.aliyuncs.com',
    'port' = '3306',
    'username' = '***********',
    'password' = '***********',
    'database-name' = '***********',
    'table-name' = 'source_table'
);

CREATE TEMPORARY TABLE es_sink(
	order_id BIGINT,
    \`user_id\` bigint,			
	auction_id bigint,		
	cat_id bigint,			
	cat1 bigint,				
	property varchar,			
	buy_mount int,			
	\`day\` varchar	,
    birthday varchar,
	gender int,
   PRIMARY KEY(order_id) NOT ENFORCED  -- 主键可选，如果定义了主键，则作为文档ID，否则文档ID将为随机值。
) WITH (
'connector' = 'elasticsearch-7',
  'hosts' = 'http://**********:9200',
  'index' = 'enriched_orders',
  'username' ='elastic',
  'password' ='*******'--创建ES实例时自定义的密码
);

INSERT INTO es_sink
SELECT o.*,
	b.birthday,
	b.gender
FROM orders_dataset /*+ OPTIONS('server-id'='123450-123452') */ o
LEFT JOIN baby_dataset /*+ OPTIONS('server-id'='123453-123455') */ as b
    ON o.user_id = b.user_id;`;

const sql2 = `CREATE TEMPORARY TABLE orders_dataset (
	order_id BIGINT,
  \`user_id\` bigint,			
	auction_id bigint,		
	cat_id bigint,			
	cat1 bigint,				
	property varchar,			
	buy_mount int,			
	\`day\` varchar	,
   PRIMARY KEY(order_id) NOT ENFORCED
) WITH (
    'connector' = 'mysql',
    'hostname' = '******************.mysql.rds.aliyuncs.com',
    'port' = '3306',
    'username' = '***********',
    'password' = '***********',
    'database-name' = '***********',
    'table-name' = 'orders_dataset'
);
CREATE TEMPORARY TABLE baby_dataset (
	\`user_id\` bigint,
	birthday varchar,
	gender int,
    PRIMARY KEY(user_id) NOT ENFORCED
) WITH (
    'connector' = 'mysql',
    'hostname' = '******************.mysql.rds.aliyuncs.com',
    'port' = '3306',
    'username' = '***********',
    'password' = '***********',
    'database-name' = '***********',
    'table-name' = 'baby_dataset'
);
CREATE TEMPORARY TABLE es_sink(
  day_year varchar,
  \`buy_num\` bigint,			
	baby_num bigint,
  PRIMARY KEY(day_year) NOT ENFORCED  -- 主键可选，如果定义了主键，则作为文档ID，否则文档ID将为随机值。
) WITH (
'connector' = 'elasticsearch-7',
  'hosts' = 'http://**********:9200',
  'index' = 'enriched_orders_view',
  'username' ='elastic',
  'password' ='*******'--创建ES实例时自定义的密码
);
INSERT INTO es_sink
SELECT 
	SUBSTRING(tmp1.\`day\` FROM 1 FOR 6) as day_year,
	SUM(tmp1.buy_mount) as buy_num,
	COUNT(birthday) as baby_num
FROM(
	SELECT o.*,
		b.birthday,
		b.gender
	FROM orders_dataset /*+ OPTIONS('server-id'='123456-123457') */ o
	LEFT JOIN baby_dataset /*+ OPTIONS('server-id'='123458-123459') */ as b
		ON o.user_id = b.user_id
) tmp1
GROUP BY SUBSTRING(tmp1.\`day\` FROM 1 FOR 6)`;

const sql3 = `CREATE DATABASE IF NOT EXISTS \`kafka-catalog\`.\`kafka\`
AS DATABASE \`mysql-catalog\`.\`database\` INCLUDING ALL TABLES;

CREATE TABLE \`kafka-catalog\`.\`kafka\`.\`topic\`
AS TABLE \`mysql-catalog\`.\`db\`.\`table\`;


CREATE TEMPORARY TABLE tempOrder (
    \`key_order_id\` BIGINT NOT NULL,
    \`value_product\` STRING,
    PRIMARY KEY (key_order_id) NOT ENFORCED
  ) WITH (
    'connector' = 'upsert-kafka',
    'topic' = 'order',
    'properties.bootstrap.servers' = 'xxxx',
    'key.format' = 'json',
    'key.fields-prefix' = 'key_',
    'value.format' = 'json',
    'value.fields-prefix' = 'value_',
    'value.fields-include' = 'EXCEPT_KEY',
    'value.json.infer-schema.flatten-nested-columns.enable' = 'false',
    'value.json.infer-schema.primitive-as-string' = 'false'
  );`;

const sql4 = `-- 将订单信息和用户表做join，展示每个订单的用户名和商品名。
  SELECT order.id as order_id, product, user.name as user_name
  FROM order LEFT JOIN user
  ON order.user_id = user.id;
  
  -- 将评论和用户表做join，展示每个评论的内容和对应用户名。
  SELECT feedback.id as feedback_id, comment, user.name as user_name
  FROM feedback LEFT JOIN user
  ON feedback.user_id = user.id;
  
  CREATE DATABASE IF NOT EXISTS \`kafka-catalog\`.\`kafka\`
AS DATABASE \`mysql-catalog\`.\`database\` INCLUDING ALL TABLES;

-- 将订单信息和Kafka JSON Catalog中的用户表做join，展示每个订单的用户名和商品名。
SELECT order.id as order_id, product, user.value_name as user_name
FROM order LEFT JOIN \`kafka-catalog\`.\`kafka\`.\`user\` as user
ON order.user_id = user.id;

-- 将评论和Kafka JSON Catalog中的用户表做join，展示每个评论的内容和对应用户名。
SELECT feedback.id as feedback_id, comment, user.value_name as user_name
FROM feedback LEFT JOIN \`kafka-catalog\`.\`kafka\`.\`user\` as user
ON feedback.user_id = user.id;`;

const sql5 = `--********************************************************************--
-- Flink SQL 快速入门示例 电商场景 实时订单价格计算
-- 本示例中将使用指定的数据集模拟电商场景中常见的订单价格计算
--【订单表 Order_table】中共有5条示例数据，其中包含【商品名称】【下单数量】
--【价格表（维度表）price_dim_table】中共有2条示例数据，其中包含【商品名称】与【商品价格】
-- 电商场景中，常见的场景是系统获取当前用户下单的物品信息与数量，并结合商品价格自动计算出该笔订单金额
-- 该场景在 Flink SQL 中转化为【源表数据 Order_table】与【维表数据 price_dim_table】关联
--【源表数据】为实时的订单数据，【维表数据】中为预先存在数据库的商品价格信息
-- 示例的关联字段为【Order_table的order_item_name 字段】 与【price_dim_table 的 order_item_name 字段】
-- 输出结果使用 print connector
-- 6c4bf775-af63-4ebd-ba9e-f9c99b9ae394该示例代码可直接点击右上方【部署】或选中 SQL 内容运行

--********************************************************************--
--声明数据源表
CREATE TEMPORARY TABLE order_table(
  order_id INT --订单ID
  order_customer_ID INT, --下单用户ID
  order_item_name VARCHAR, --商品名称
  order_quantity INT, --下单数量
  order_time TIMESTAMP, --下单时间
  \`proctime\` AS PROCTIME()
) with (
 'rows' = '1,10059,hoodie,3,2021-03-24T15:00:01Z;2,10053,jeans,1,2021-03-24T15:00:02Z;3,10053,jeans,4,2021-03-24T15:00:03Z;4,10053,hoodie,1,2021-03-24T15:00:07Z;5,10054,hoodie,2,2021-03-24T15:00:08Z;',
 'connector' = 'datagen'
);
--*************************** 实时订单源表信息 **********************************--
--  订单ID    |      下单用户ID    |      商品名称     |     下单数量     |          下单时间
--  order_id ｜order_customer_ID ｜ order_item_name ｜ order_quantity ｜        order_time
-------------｜------------------｜-----------------｜----------------｜------------------------
--    1      ｜      10059       ｜       hoodie    ｜        3       ｜    2021-03-24 15:00:01
--    2      ｜      10053       ｜       jeans     ｜        1       ｜    2021-03-24 15:00:02
--    3      ｜      10053       ｜       jeans     ｜        4       ｜    2021-03-24 15:00:03
--    4      ｜      10053       ｜       hoodie    ｜        1       ｜    2021-03-24 15:00:07
--    5      ｜      10054       ｜       hoodie    ｜        2       ｜    2021-03-24 15:00:08
--****************************************************************************--
--声明价格维表
CREATE TEMPORARY TABLE price_dim_table(
  item_id INT, --商品ID
  order_item_name VARCHAR, --商品名称
  item_price DOUBLE --商品价格
) with (
  'rows' = '1,jeans,35.5;2,hoodie,60;',
  'connector' = 'datagen'
);
--**************************** 价格数据维表信息 ********************************--
--  商品ID    |      商品名称      |    商品价格
--  item_id  ｜  order_item_name ｜ item_price
-------------｜------------------｜-------------
--    1      ｜      jeans       ｜     35.5
--    2      ｜      hoodie      ｜      60
--***************************************************************************--
--声明 print 结果表，输出到 Flink TM 日志中
CREATE TEMPORARY TABLE print_sink(
  order_id INT, --订单ID
  order_customer_ID INT, --下单用户ID
  order_item_name VARCHAR(20), --商品名称
  order_quantity INT, --下单数量
  total_price DOUBLE,
  order_time TIMESTAMP
) with (
  'connector'='print',
  'logger'='true'
);
--Flink SQL 作业
--基于【Order_table 的 order_item_name 字段】 与【price_dim_table 的 order_item_name 字段】关联查询
insert into print_sink
select
  t1.order_id as order_id,
  t1.order_customer_ID as order_customer_ID,
  t1.order_item_name as order_item_name,
  t1.order_quantity as order_quantity,
  cast(t1.order_quantity * t2.item_price as double) as total_price, -- 根据商品名称在维度查询表中查询商品价格，并乘以订单中产品数量，得到订单价格
  t1.order_time as order_time
from order_table as t1
join price_dim_table FOR SYSTEM_TIME AS OF t1.\`proctime\` as t2
on t1.order_item_name = t2.order_item_name;
--**************************** 预期结果 ********************************--
-- yyyy-mm-dd hh:mm:ss,567 INFO  org.apache.flink.api.common.functions.util.PrintSinkOutputWriter [] - +I(1,10059,hoodie,3,180.0,2021-03-24T15:00:01)
-- yyyy-mm-dd hh:mm:ss,568 INFO  org.apache.flink.api.common.functions.util.PrintSinkOutputWriter [] - +I(2,10053,jeans,1,35.5,2021-03-24T15:00:02)
-- yyyy-mm-dd hh:mm:ss,569 INFO  org.apache.flink.api.common.functions.util.PrintSinkOutputWriter [] - +I(3,10053,jeans,4,142.0,2021-03-24T15:00:03)
-- yyyy-mm-dd hh:mm:ss,570 INFO  org.apache.flink.api.common.functions.util.PrintSinkOutputWriter [] - +I(4,10053,hoodie,1,60.0,2021-03-24T15:00:07)
-- yyyy-mm-dd hh:mm:ss,571 INFO  org.apache.flink.api.common.functions.util.PrintSinkOutputWriter [] - +I(5,10054,hoodie,2,120.0,2021-03-24T15:00:08)
-- 结果可在Flink的Task Manager日志中查询，位置为【作业运维】-【作业名称】-【Task Manager】-【该TM IP】-【Logs】最下方
-- Print connector被广泛用于在线调试，更多信息可参看官方文档
--***************************************************************************--
`;

const sql6 = `--********************************************************************--
-- Author:         1840755998634838
-- Created Time:   2023-12-29 14:43:00
-- Description:    Write your description here
-- Hints:          You can use SET statements to modify the configuration
--********************************************************************--

`;

const sql7 = `--********************************************************************--
-- Author:         1840755998634838
-- Created Time:   2023-12-29 14:43:00
-- Description:    Write your description here
-- Hints:          You can use SET statements to modify the configuration
--********************************************************************--`;

const draftList: Draft[] = [
    {
        id: "2ca189d0-e96c-4389-8422-24ad910a6dc1",
        name: "实时查询",
        content: sql1,
        hasDeploy: false,
        type: "s",
    },
    {
        id: "96b2af76-27a3-46f2-a1c9-b7a7e7df73d4",
        name: "实时大屏",
        content: sql2,
        hasDeploy: false,
        type: "s",
    },
    {
        id: "e65309f5-7e94-4c8f-aa2e-8c8fe19869f6",
        name: "db2kafka",
        content: sql3,
        hasDeploy: true,
        type: "s",
    },
    {
        id: "4ed06c1a-1fb3-4727-9607-e6a2ec38f9ef",
        name: "order2kafka",
        content: sql4,
        hasDeploy: false,
        type: "s",
    },
    {
        id: "4cc43af1-01c9-4218-a394-2eaab808d92c",
        name: "实时价格",
        content: sql5,
        hasDeploy: true,
        type: "s",
    },
    {
        id: "6f8aa897-bcff-4fff-888e-79d96f0129ec",
        name: "批任务",
        content: sql6,
        hasDeploy: false,
        type: "b",
    },
    {
        id: "2aa0e831-2b04-407e-b47c-d30afc3c2070",
        name: "空任务",
        content: sql7,
        hasDeploy: false,
        type: "s",
    },
];

const MainContent = () => {
    const [rightPanel, setRightPanel] = useState<React.ReactNode>();
    const [bottomPanel, setBottomPanel] = useState<React.ReactNode>();
    const [curDraft, setCurDraft] = useState<Draft>();
    const monacoEditor = useRef<Parameters<EditorDidMount>[0]>();
    const openedDraftState = useRef<Map<string, editor.ICodeEditorViewState | null | undefined>>(new Map());
    const { draftId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const draft = getDraftById(draftId);
        if (!draft) {
            navigate("../../.");
            return;
        }

        if (curDraft && curDraft.id !== draftId) {
            openedDraftState.current.set(curDraft.id, monacoEditor.current?.saveViewState());
        }

        let model = editor.getModels().find(model => model.uri.path === pathname);
        if (!model) {
            model = editor.createModel(draft.content, "mysql", new Uri().with({ path: pathname }));
        }
        monacoEditor.current?.setModel(model);
        const state = openedDraftState.current.get(draft.id);
        if (state) {
            monacoEditor.current?.restoreViewState(state);
        }
        monacoEditor.current?.focus();
        setCurDraft(draft);
    }, [draftId]);

    const getDraftById = (id: string | undefined): Draft | undefined => {
        return draftList.find(draft => draft.id === id);
    };

    const editorDidMount: EditorDidMount = editor => {
        monacoEditor.current = editor;
    };

    return (
        <>
            <div className="panel-bar panel panel-ltr panel-border-bottom">
                <ToolBar
                    isOpenFile={true}
                    onPanelChange={setBottomPanel}
                />
            </div>
            <div className="panel-bar navigation-bar panel panel-ltr panel-border-bottom">
                <NavTab
                    selectedItem={
                        curDraft
                            ? {
                                  id: curDraft.id,
                                  name: curDraft.name,
                                  hasErr: curDraft.id === "2ca189d0-e96c-4389-8422-24ad910a6dc1",
                                  hasDeploy: curDraft.hasDeploy,
                                  type: curDraft.type,
                              }
                            : undefined
                    }
                />
            </div>
            <div className="editor-main-content panel panel-ttb">
                <div className="panel main-top-panel panel-ltr">
                    <div className="panel panel-ltr">
                        <div className="panel main-top-editor-panel panel-ltr panel-border-right">
                            <MonacoEditor
                                language="javascript"
                                options={{
                                    selectOnLineNumbers: true,
                                    fontSize: 12,
                                }}
                                editorDidMount={editorDidMount}
                            />
                        </div>
                        {rightPanel ? (
                            <Resizable
                                size={500}
                                axis="x"
                                className="resizable-panel panel panel-rtl panel-border-right"
                                resizeHandle="w"
                            >
                                {rightPanel}
                            </Resizable>
                        ) : null}

                        <div className="panel-tabs-bar panel-tabs-bar-small panel-tabs-bar-right panel panel-ttb">
                            <RightTabBar onPanelChange={setRightPanel} />
                        </div>
                    </div>
                </div>

                {bottomPanel ? (
                    <Resizable
                        className="resizable-panel panel panel-border-top"
                        axis="y"
                        resizeHandle="n"
                        size={280}
                    >
                        {bottomPanel}
                    </Resizable>
                ) : null}

                <div className="panel-tabs-bar panel-tabs-bar-small panel-tabs-bar-bottom panel panel-ltr panel-border-top">
                    <BottomTabBar onPanelChange={setBottomPanel} />
                </div>
            </div>
        </>
    );
};

export default MainContent;
