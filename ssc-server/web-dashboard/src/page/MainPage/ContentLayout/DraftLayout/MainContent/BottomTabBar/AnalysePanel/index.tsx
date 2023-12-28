import { Collapse, Tooltip } from "antd";
import {
    CheckCircleFilled,
    CloseCircleFilled,
    LoadingOutlined,
    QuestionCircleOutlined,
} from "../../../../../../../component/Icon";
import ResultPanel from "../ResultPanel";
import "./index.sass";
import { useEffect, useState } from "react";
import MonacoEditor from "../../../../../../../component/MonacoEditor";

interface AnalysePanelProps {}
const itemStyle: React.CSSProperties = {
    border: "none",
    marginBottom: 4,
};

const errorLog = `org.apache.flink.table.api.SqlParserException: SQL parse failed. From line 16, column 12 to line 17, column 19: Encountered "order_customer_ID". Was expecting one of:
"CONSTRAINT" , "NOT" , "NULL" , "PRIMARY" , "UNIQUE" , "COMMENT" , "METADATA" , ")" , "," , "MULTISET" , "ARRAY" 
    at org.apache.flink.table.sqlserver.utils.FormatParserExceptionUtils.newSqlParserException(FormatParserExceptionUtils.java:47)
    at org.apache.flink.table.sqlserver.utils.ErrorConverter.formatException(ErrorConverter.java:111)
    at org.apache.flink.table.sqlserver.utils.ErrorConverter.toErrorDetail(ErrorConverter.java:60)
    at org.apache.flink.table.sqlserver.utils.ErrorConverter.toGrpcException(ErrorConverter.java:54)
    at org.apache.flink.table.sqlserver.FlinkSqlServiceImpl.syntaxParse(FlinkSqlServiceImpl.java:948)
    at org.apache.flink.table.sqlserver.proto.FlinkSqlServiceGrpc$MethodHandlers.invoke(FlinkSqlServiceGrpc.java:3672)
    at io.grpc.stub.ServerCalls$UnaryServerCallHandler$UnaryServerCallListener.onHalfClose(ServerCalls.java:172)
    at io.grpc.internal.ServerCallImpl$ServerStreamListenerImpl.halfClosed(ServerCallImpl.java:331)
    at io.grpc.internal.ServerImpl$JumpToApplicationThreadServerStreamListener$1HalfClosed.runInContext(ServerImpl.java:820)
    at io.grpc.internal.ContextRunnable.run(ContextRunnable.java:37)
    at io.grpc.internal.SerializingExecutor.run(SerializingExecutor.java:123)
    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1147)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:622)
    at java.lang.Thread.run(Thread.java:834)
Caused by: org.apache.calcite.sql.parser.SqlParseException: Encountered "order_customer_ID" at line 17, column 3.
Was expecting one of:
"CONSTRAINT" ...
"NOT" ...
"NULL" ...
"PRIMARY" ...
"UNIQUE" ...
"COMMENT" ...
"METADATA" ...
")" ...
"," ...
"MULTISET" ...
"ARRAY" ...

    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.convertException(FlinkSqlParserImpl.java:507)
    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.normalizeException(FlinkSqlParserImpl.java:263)
    at org.apache.calcite.sql.parser.SqlParser.handleException(SqlParser.java:145)
    at org.apache.calcite.sql.parser.SqlParser.parseStmtList(SqlParser.java:200)
    at org.apache.flink.table.planner.parse.CalciteParser.parseStmtList(CalciteParser.java:102)
    at org.apache.flink.table.planner.delegation.ParserImpl.syntaxParse(ParserImpl.java:129)
    at org.apache.flink.table.sqlserver.execution.OperationExecutorImpl.syntaxParse(OperationExecutorImpl.java:354)
    at org.apache.flink.table.sqlserver.execution.DelegateOperationExecutor.lambda$syntaxParse$26(DelegateOperationExecutor.java:246)
    at java.security.AccessController.doPrivileged(Native Method)
    at javax.security.auth.Subject.doAs(Subject.java:422)
    at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1729)
    at org.apache.flink.table.sqlserver.context.SqlServerSecurityContext.runSecured(SqlServerSecurityContext.java:72)
    at org.apache.flink.table.sqlserver.execution.DelegateOperationExecutor.wrapClassLoader(DelegateOperationExecutor.java:311)
    at org.apache.flink.table.sqlserver.execution.DelegateOperationExecutor.lambda$wrapExecutor$35(DelegateOperationExecutor.java:333)
    at java.util.concurrent.FutureTask.run(FutureTask.java:266)
    ... 3 more
Caused by: org.apache.flink.sql.parser.impl.ParseException: Encountered "order_customer_ID" at line 17, column 3.
Was expecting one of:
"CONSTRAINT" ...
"NOT" ...
"NULL" ...
"PRIMARY" ...
"UNIQUE" ...
"COMMENT" ...
"METADATA" ...
")" ...
"," ...
"MULTISET" ...
"ARRAY" ...

    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.generateParseException(FlinkSqlParserImpl.java:48059)
    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.jj_consume_token(FlinkSqlParserImpl.java:47867)
    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.SqlCreateTable(FlinkSqlParserImpl.java:8166)
    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.SqlCreateExtended(FlinkSqlParserImpl.java:10155)
    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.SqlCreate(FlinkSqlParserImpl.java:27602)
    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.SqlStmt(FlinkSqlParserImpl.java:3636)
    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.SqlStmtList(FlinkSqlParserImpl.java:3015)
    at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.parseSqlStmtList(FlinkSqlParserImpl.java:315)
    at org.apache.calcite.sql.parser.SqlParser.parseStmtList(SqlParser.java:198)
    ... 14 more
`;

const AnalysePanel = (props: AnalysePanelProps & Pick<ResultPanel, "onMinusClick">) => {
    const [checking, setChecking] = useState<boolean>(false);

    useEffect(() => {
        const beginAnalyseSQL = (e: any) => {
            if (e.detail?.label === "analyse") {
                setChecking(true);
                const id = setInterval(() => {
                    setChecking(false);
                    clearInterval(id);
                }, 3000);
            }
        };
        document.addEventListener("top-tool-click", beginAnalyseSQL);
        return () => {
            document.removeEventListener("top-tool-click", beginAnalyseSQL);
        };
    }, []);

    return (
        <ResultPanel
            onMinusClick={props.onMinusClick}
            title="解析：Untitled-stream-sql"
            className="analyse-panel"
        >
            <div className="collapse-container">
                <Collapse
                    defaultActiveKey={"1"}
                    bordered={false}
                    size="small"
                    items={[
                        {
                            key: "1",
                            label: "深度检查",
                            style: itemStyle,
                            children: checking ? (
                                <>
                                    <LoadingOutlined />
                                    &nbsp;&nbsp;SQL 语法正确性以及网络连通性检查中
                                </>
                            ) : (
                                <>
                                    {/* <CheckCircleFilled style={{ color: "#00a700" }} />
                                    &nbsp;&nbsp;SQL 语法正确性以及网络连通性检查已通过 */}
                                    <CloseCircleFilled style={{ color: "#c80000" }} />
                                    &nbsp;&nbsp;SQL 语法正确性以及网络连通性检查未通过
                                    <MonacoEditor
                                        options={{
                                            minimap: {
                                                enabled: false,
                                            },
                                            scrollBeyondLastLine: false,
                                            lineNumbers: "off",
                                            lineDecorationsWidth: 0,
                                        }}
                                        value={errorLog}
                                        height={150}
                                    />
                                </>
                            ),
                        },
                        {
                            key: "2",
                            label: (
                                <>
                                    SQL 优化{" "}
                                    <Tooltip title="SQL 优化功能为您检测数据风险并提出优化建议，同时通过原始建议信息可进行空值、变更等数据正确性分析。">
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </>
                            ),
                            style: itemStyle,
                            children: checking ? (
                                <>
                                    <LoadingOutlined />
                                    &nbsp;&nbsp;SQL 可优化项检查中
                                </>
                            ) : (
                                <>
                                    <CheckCircleFilled style={{ color: "#00a700" }} />
                                    &nbsp;&nbsp;暂无 SQL 可优化项
                                </>
                            ),
                        },
                    ]}
                />
            </div>
        </ResultPanel>
    );
};

export default AnalysePanel;
