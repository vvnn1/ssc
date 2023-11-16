import { useEffect, useRef, useState } from "react";
import MonacoEditor from "../../../MonacoEditor";
import RightTabBar from "./RightTabBar";
import "./index.sass";
import BottomTabBar from "./BottomTabBar";
import Resizable from "../../../Resizable";
import ToolBar from "../ToolBar";
import NavTab from "../NavTab";
import { EditorDidMount } from "react-monaco-editor";
import { editor, Uri } from 'monaco-editor';
import { useLocation, useNavigate, useParams } from "react-router-dom";


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
            model = editor.createModel(draft.content, 'mysql', new Uri().with({ path: pathname }));
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
    }

    const editorDidMount: EditorDidMount = (editor) => {
        monacoEditor.current = editor;
    };

    return (
        <>
            <div className="panel-bar panel panel-ltr panel-border-bottom">
                <ToolBar isOpenFile={true} onPanelChange={setBottomPanel} />
            </div>
            <div className="panel-bar navigation-bar panel panel-ltr panel-border-bottom">
                <NavTab
                    selectedItem={curDraft ? { id: curDraft.id, name: curDraft.name } : undefined}
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
                                }}
                                editorDidMount={editorDidMount}

                            />
                        </div>
                        {
                            rightPanel ? (
                                <Resizable
                                    size={500}
                                    axis='x'
                                    className='resizable-panel panel panel-rtl panel-border-right'
                                    resizeHandle='w'
                                >
                                    {rightPanel}
                                </Resizable>
                            ) : null
                        }

                        <div className="panel-tabs-bar panel-tabs-bar-small panel-tabs-bar-right panel panel-ttb">
                            <RightTabBar onPanelChange={setRightPanel} />
                        </div>
                    </div>
                </div>

                {
                    bottomPanel ? (
                        <Resizable
                            className='resizable-panel panel panel-border-top'
                            axis='y'
                            resizeHandle='n'
                            size={280}
                        >
                            {bottomPanel}
                        </Resizable>
                    ) : null
                }

                <div className="panel-tabs-bar panel-tabs-bar-small panel-tabs-bar-bottom panel panel-ltr panel-border-top">
                    <BottomTabBar onPanelChange={setBottomPanel} />
                </div>
            </div>

        </>
    );
};

export default MainContent;