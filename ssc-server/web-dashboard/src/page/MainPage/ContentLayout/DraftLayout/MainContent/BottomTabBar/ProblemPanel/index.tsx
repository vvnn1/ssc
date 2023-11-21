import { MinusOutlined } from "../../../../../../../component/Icon";
import MonacoEditor from "../../../../../../../component/MonacoEditor";
import "./index.sass";
import "../index.sass";

const problem = `org.apache.flink.table.api.SqlParserException: SQL parse failed. From line 20, column 1 to line 20, column 12: Encountered "DEBUG". Was expecting one of:
"CATALOG" , "DATABASE" , "FUNCTION" , "OR" , "SYSTEM" , "TABLE" , "TEMPORARY" , "VIEW" 
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
Caused by: org.apache.calcite.sql.parser.SqlParseException: Encountered "DEBUG" at line 20, column 8.
Was expecting one of:
"CATALOG" ...
"DATABASE" ...
"FUNCTION" ...
"OR" ...
"SYSTEM" ...
"TABLE" ...
"TEMPORARY" ...
"VIEW" ...

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
Caused by: org.apache.flink.sql.parser.impl.ParseException: Encountered "DEBUG" at line 20, column 8.
Was expecting one of:
"CATALOG" ...
"DATABASE" ...
"FUNCTION" ...
"OR" ...
"SYSTEM" ...
"TABLE" ...
"TEMPORARY" ...
"VIEW" ...

at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.generateParseException(FlinkSqlParserImpl.java:48059)
at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.jj_consume_token(FlinkSqlParserImpl.java:47867)
at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.SqlCreateExtended(FlinkSqlParserImpl.java:10169)
at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.SqlCreate(FlinkSqlParserImpl.java:27602)
at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.SqlStmt(FlinkSqlParserImpl.java:3636)
at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.SqlStmtList(FlinkSqlParserImpl.java:3532)
at org.apache.flink.sql.parser.impl.FlinkSqlParserImpl.parseSqlStmtList(FlinkSqlParserImpl.java:315)
at org.apache.calcite.sql.parser.SqlParser.parseStmtList(SqlParser.java:198)
... 14 more
`;

interface ProblemPanelProps {
    onMinusClick: () => void;
}

const ProblemPanel = (props: ProblemPanelProps) => {
    return (
        <div className="problem-panel bottom-pop-panel">
            <div className="header">
                <div className="title">问题: Untitled-stream-sql</div>
                <div className="actions">
                    <MinusOutlined onClick={props.onMinusClick} />
                </div>
            </div>
            <div className="result-wrap">
                <MonacoEditor
                    options={{
                        lineNumbers: "off",
                        lineDecorationsWidth: 0,
                        lineNumbersMinChars: 0,
                        minimap: {
                            enabled: false,
                        },
                        readOnly: true,
                        scrollBeyondLastLine: false,
                    }}
                    value={problem}
                />
            </div>
        </div>
    );
};

export default ProblemPanel;
