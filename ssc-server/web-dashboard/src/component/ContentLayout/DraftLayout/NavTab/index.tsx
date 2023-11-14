import { Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import "./index.sass";
import { StreamDraftOutlined } from "../../../Icon";
import { useNavigate, useParams } from "react-router-dom";
import CreateDraftModal from "../ToolBar/CreateDraftModal";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;


export interface Draft {
    id: string;
    name: string;
    content: string;
    type: "sql",
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

const draftList: Draft[] = [
    {
        id: "2ca189d0-e96c-4389-8422-24ad910a6dc1",
        name: "实时查询",
        content: sql1,
        type: "sql",
    },
    {
        id: "96b2af76-27a3-46f2-a1c9-b7a7e7df73d4",
        name: "实时大屏",
        content: sql2,
        type: "sql",
    }
];

interface NavTabProps {
    onDraftChange: (draft: Draft | undefined) => void;
}

const NavTab: React.FC<NavTabProps> = ({ onDraftChange }) => {
    const [activeItem, setActiveItem] = useState<string>();
    const [items, setItems] = useState<Draft[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const { draftId: activeDraftId } = useParams();

    useEffect(() => {
        setItems((items) => {
            const openedItem = items?.filter(item => item.id === activeDraftId)
                .pop();
            if (openedItem) {
                return items;
            }
            const activeItems = draftList.filter(item => item.id === activeDraftId);
            if (!activeItems || activeItems.length === 0) {
                navigate("../../.");
                return items;
            }
            return [...items, ...activeItems];
        });
        setActiveItem(activeDraftId);
    }, [activeDraftId]);

    const transTabs = (items: Draft[]): TabsProps["items"] => {
        return items.map(item => {
            return {
                id: item.id,
                key: item.id,
                label: <><span className="draft-type type offline"><StreamDraftOutlined /></span><span className="draft-name">{item.name}</span></>,
            };
        });
    };


    useEffect(() => {
        const activeDraft = draftList.filter(item => item.id === activeItem)
            .pop();

        onDraftChange(activeDraft);
    }, [activeItem]);

    const onChange = (newActiveKey: string) => {
        setActiveItem(newActiveKey);
    };


    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        };
    };

    const add = () => {
        setModalOpen(true);
        // const newActiveKey = `newTab${newTabIndex.current++}`;
        // const newPanes = [...items!];
        // newPanes.push({ label: 'New Tab', key: newActiveKey });
        // setItems(newPanes);
        // setActiveItem(newActiveKey);
    };

    const remove = (targetId: TargetKey) => {
        let newActiveKey = activeItem;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.id === targetId) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.id !== targetId);
        if (newPanes.length && newActiveKey === targetId) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].id;
                navigate(`../../${newPanes[lastIndex].id}/${newPanes[lastIndex].type}`, { replace: true });
            } else {
                newActiveKey = newPanes[0].id;
                navigate(`../../${newPanes[0].id}/${newPanes[0].type}`, { replace: true });
            }
        }

        if (newPanes.length === 0) {
            navigate("../../.");
            return;
        }

        setItems(newPanes);
        setActiveItem(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: "add" | "remove",
    ) => {
        if (action === "add") {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <>
            <Tabs
                className="editor-nav-tab"
                type="editable-card"
                onChange={onChange}
                activeKey={activeItem}
                onEdit={onEdit}
                items={transTabs(items)}
                size="small"
            />
            <CreateDraftModal open={modalOpen} onCancel={changeModalOpen(false)} />
        </>

    );
};

export default NavTab;

