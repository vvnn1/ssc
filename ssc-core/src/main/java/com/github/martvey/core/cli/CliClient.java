/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.github.martvey.core.cli;

import com.github.martvey.core.local.LocalExecutor;
import com.github.martvey.core.util.CliStatementSplitter;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.table.api.SqlParserException;
import org.apache.flink.table.api.TableResult;
import org.apache.flink.table.client.SqlClientException;
import org.apache.flink.table.client.cli.CliStrings;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.utils.PrintUtils;
import org.apache.flink.util.CollectionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import static org.apache.flink.util.Preconditions.checkNotNull;

@Slf4j
public class CliClient {

	private static final Logger LOG = LoggerFactory.getLogger(CliClient.class);

	private final LocalExecutor executor;
	private static final int SOURCE_MAX_SIZE = 50_000;

	public CliClient(LocalExecutor executor) {
		this.executor = executor;
	}

	public void prepareSql(String statement){
		for (String sql : CliStatementSplitter.splitContent(statement)) {
			sql = sql.trim();
			if (sql.endsWith(";")) {
				sql = sql.substring(0, sql.length() - 1).trim();
			}
			Optional<SqlCommandParser.SqlCommandCall> cmdCall = parseCommand(sql);
			cmdCall.ifPresent(this::callCommand);
		}
	}

	public void execute(String jobName) throws Exception {
		executor.execute(jobName);
	}

	// --------------------------------------------------------------------------------------------

	private Optional<SqlCommandParser.SqlCommandCall> parseCommand(String sql) {
		final SqlCommandParser.SqlCommandCall parsedLine;
		try {
			parsedLine = SqlCommandParser.parse(executor.getSqlParser(), sql);
		} catch (SqlExecutionException e) {
			throw new SqlParserException("sql解析错误，sql=" + sql,e);
		}
		return Optional.of(parsedLine);
	}

	private void callCommand(SqlCommandParser.SqlCommandCall cmdCall) {
		switch (cmdCall.command) {
			case QUIT:
				callQuit();
				break;
			case CLEAR:
				callClear();
				break;
			case RESET:
				callReset();
				break;
			case SET:
				callSet(cmdCall);
				break;
			case SHOW_CATALOGS:
				callShowCatalogs();
				break;
			case SHOW_CURRENT_CATALOG:
				callShowCurrentCatalog();
				break;
			case SHOW_DATABASES:
				callShowDatabases();
				break;
			case SHOW_CURRENT_DATABASE:
				callShowCurrentDatabase();
				break;
			case SHOW_TABLES:
				callShowTables();
				break;
			case SHOW_FUNCTIONS:
				callShowFunctions();
				break;
			case SHOW_MODULES:
				callShowModules();
				break;
			case SHOW_PARTITIONS:
				callShowPartitions(cmdCall);
				break;
			case USE_CATALOG:
				callUseCatalog(cmdCall);
				break;
			case USE:
				callUseDatabase(cmdCall);
				break;
			case DESC:
			case DESCRIBE:
				callDescribe(cmdCall);
				break;
			case EXPLAIN:
				callExplain(cmdCall);
				break;
			case CREATE_DEBUG:
				callCreateDebug(cmdCall);
			case SELECT:
				callSelect(cmdCall);
				break;
			case INSERT_INTO:
			case INSERT_OVERWRITE:
				callInsert(cmdCall);
				break;
			case CREATE_TABLE:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_TABLE_CREATED);
				break;
			case DROP_TABLE:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_TABLE_REMOVED);
				break;
			case CREATE_VIEW:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_VIEW_CREATED);
				break;
			case DROP_VIEW:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_VIEW_REMOVED);
				break;
			case ALTER_VIEW:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_ALTER_VIEW_SUCCEEDED, CliStrings.MESSAGE_ALTER_VIEW_FAILED);
				break;
			case CREATE_FUNCTION:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_FUNCTION_CREATED);
				break;
			case DROP_FUNCTION:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_FUNCTION_REMOVED);
				break;
			case ALTER_FUNCTION:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_ALTER_FUNCTION_SUCCEEDED,
						CliStrings.MESSAGE_ALTER_FUNCTION_FAILED);
				break;
			case SOURCE:
				callSource(cmdCall);
				break;
			case CREATE_DATABASE:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_DATABASE_CREATED);
				break;
			case DROP_DATABASE:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_DATABASE_REMOVED);
				break;
			case ALTER_DATABASE:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_ALTER_DATABASE_SUCCEEDED,
						CliStrings.MESSAGE_ALTER_DATABASE_FAILED);
				break;
			case ALTER_TABLE:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_ALTER_TABLE_SUCCEEDED,
						CliStrings.MESSAGE_ALTER_TABLE_FAILED);
				break;
			case CREATE_CATALOG:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_CATALOG_CREATED);
				break;
			case DROP_CATALOG:
				callDdl(cmdCall.operands[0], CliStrings.MESSAGE_CATALOG_REMOVED);
				break;
			default:
				throw new SqlClientException("Unsupported command: " + cmdCall.command);
		}
	}

	private void callCreateDebug(SqlCommandParser.SqlCommandCall cmdCall) {
		try {
			executor.executeDebug(cmdCall.operands[0], cmdCall.operands[1]);
		} catch (SqlExecutionException e) {
			printExecutionException(e);
		}
	}

	private void callQuit() {
		printInfo(CliStrings.MESSAGE_QUIT);
	}

	private void callClear() {
	}

	private void callReset() {
		try {
			executor.resetSessionProperties();
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		printInfo(CliStrings.MESSAGE_RESET);
	}

	private void callSet(SqlCommandParser.SqlCommandCall cmdCall) {
		if (cmdCall.operands.length == 0) {
			final Map<String, String> properties;
			try {
				properties = executor.getSessionProperties();
			} catch (SqlExecutionException e) {
				printExecutionException(e);
				return;
			}
			if (properties.isEmpty()) {
				printInfo(CliStrings.MESSAGE_EMPTY);
			} else {
				properties
					.entrySet()
					.stream()
					.map((e) -> e.getKey() + "=" + e.getValue())
					.sorted()
					.forEach(log::info);
			}
		}
		else {
			try {
				executor.setSessionProperty(cmdCall.operands[0], cmdCall.operands[1].trim());
			} catch (SqlExecutionException e) {
				printExecutionException(e);
				return;
			}
			printInfo(CliStrings.MESSAGE_SET);
		}
	}

	private void callShowCatalogs() {
		final List<String> catalogs;
		try {
			catalogs = getShowResult("CATALOGS");
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		if (catalogs.isEmpty()) {
			printInfo(CliStrings.MESSAGE_EMPTY);
		} else {
			catalogs.forEach(this::printInfo);
		}
	}

	private void callShowCurrentCatalog() {
		String currentCatalog;
		try {
			currentCatalog = executor.executeSql("SHOW CURRENT CATALOG").collect().next().toString();
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		printInfo(currentCatalog);
	}

	private void callShowDatabases() {
		final List<String> dbs;
		try {
			dbs = getShowResult("DATABASES");
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		if (dbs.isEmpty()) {
			printInfo(CliStrings.MESSAGE_EMPTY);
		} else {
			dbs.forEach(this::printInfo);
		}
	}

	private void callShowCurrentDatabase() {
		String currentDatabase;
		try {
			currentDatabase = executor.executeSql("SHOW CURRENT DATABASE").collect().next().toString();
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		printInfo(currentDatabase);
	}

	private void callShowTables() {
		final List<String> tables;
		try {
			tables = getShowResult("TABLES");
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		if (tables.isEmpty()) {
			printInfo(CliStrings.MESSAGE_EMPTY);
		} else {
			tables.forEach(this::printInfo);
		}
	}

	private void callShowFunctions() {
		final List<String> functions;
		try {
			functions = getShowResult("FUNCTIONS");
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		if (functions.isEmpty()) {
			printInfo(CliStrings.MESSAGE_EMPTY);
		} else {
			Collections.sort(functions);
			functions.forEach(this::printInfo);
		}
	}

	private List<String> getShowResult(String objectToShow) {
		TableResult tableResult = executor.executeSql("SHOW " + objectToShow);
		return CollectionUtil.iteratorToList(tableResult.collect())
				.stream()
				.map(r -> checkNotNull(r.getField(0)).toString())
				.collect(Collectors.toList());
	}

	private List<String> getShowResult(SqlCommandParser.SqlCommandCall cmdCall) {
		TableResult tableResult = executor.executeSql(cmdCall.operands[0]);
		return CollectionUtil.iteratorToList(tableResult.collect())
			.stream()
			.map(r -> checkNotNull(r.getField(0)).toString())
			.collect(Collectors.toList());
	}

	private void callShowModules() {
		final List<String> modules;
		try {
			modules = executor.listModules();
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		if (modules.isEmpty()) {
			printInfo(CliStrings.MESSAGE_EMPTY);
		} else {
			modules.forEach(this::printInfo);
		}
	}

	private void callShowPartitions(SqlCommandParser.SqlCommandCall cmdCall) {
		final List<String> partitions;
		try {
			partitions = getShowResult(cmdCall);
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		if (partitions.isEmpty()) {
			printInfo(CliStrings.MESSAGE_EMPTY);
		} else {
			partitions.forEach(this::printInfo);
		}
	}

	private void callUseCatalog(SqlCommandParser.SqlCommandCall cmdCall) {
		try {
			executor.executeSql("USE CATALOG " + cmdCall.operands[0]);
		} catch (SqlExecutionException e) {
			printExecutionException(e);
		}
	}

	private void callUseDatabase(SqlCommandParser.SqlCommandCall cmdCall) {
		try {
			executor.executeSql("USE " + cmdCall.operands[0]);
		} catch (SqlExecutionException e) {
			printExecutionException(e);
		}
	}

	private void callDescribe(SqlCommandParser.SqlCommandCall cmdCall) {
		final TableResult tableResult;
		try {
			tableResult = executor.executeSql("DESCRIBE " + cmdCall.operands[0]);
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		try (StringWriter sw = new StringWriter();
			 PrintWriter pw = new PrintWriter(sw);){
			PrintUtils.printAsTableauForm(
					tableResult.getTableSchema(),
					tableResult.collect(),
					pw,
					Integer.MAX_VALUE,
					"",
					false,
					false);
			printInfo(sw.toString());
		}catch (IOException e){
			printException("查询描述信息错误",e);
		}
	}

	private void callExplain(SqlCommandParser.SqlCommandCall cmdCall) {
		final String explanation;
		try {
			TableResult tableResult = executor.executeSql(cmdCall.operands[0]);
			explanation = tableResult.collect().next().getField(0).toString();
		} catch (SqlExecutionException e) {
			printExecutionException(e);
			return;
		}
		printInfo(explanation);
	}

	private void callSelect(SqlCommandParser.SqlCommandCall cmdCall) {
		try {
//			executor.executeQuery(cmdCall.operands[0]);
		} catch (SqlExecutionException e) {
			printExecutionException(e);
		}
	}

	private void callInsert(SqlCommandParser.SqlCommandCall cmdCall) {
		printInfo(CliStrings.MESSAGE_SUBMITTING_STATEMENT);

		try {
			executor.executeUpdate(cmdCall.operands[0]);
		} catch (SqlExecutionException e) {
			printExecutionException(e);
		}
	}

	private void callSource(SqlCommandParser.SqlCommandCall cmdCall) {
		final String pathString = cmdCall.operands[0];

		final String stmt;
		try {
			final Path path = Paths.get(pathString);
			byte[] encoded = Files.readAllBytes(path);
			stmt = new String(encoded, Charset.defaultCharset());
		} catch (IOException e) {
			printExecutionException(e);
			return;
		}

		if (stmt.length() > SOURCE_MAX_SIZE) {
			printExecutionError(CliStrings.MESSAGE_MAX_SIZE_EXCEEDED);
			return;
		}

		printInfo(CliStrings.MESSAGE_WILL_EXECUTE);
		printInfo(stmt);

		final Optional<SqlCommandParser.SqlCommandCall> call = parseCommand(stmt);
		call.ifPresent(this::callCommand);
	}

	private void callDdl(String ddl, String successMessage) {
		callDdl(ddl, successMessage, null);
	}

	private void callDdl(String ddl, String successMessage, String errorMessage) {
		try {
			executor.executeSql(ddl);
			printInfo(successMessage);
		} catch (SqlExecutionException e) {
			printExecutionException(errorMessage, e);
		}
	}

	// --------------------------------------------------------------------------------------------

	private void printExecutionException(Throwable t) {
		printExecutionException(null, t);
	}

	private void printExecutionException(String message, Throwable t) {
		final String finalMessage;
		if (message == null) {
			finalMessage = CliStrings.MESSAGE_SQL_EXECUTION_ERROR;
		} else {
			finalMessage = CliStrings.MESSAGE_SQL_EXECUTION_ERROR + ' ' + message;
		}
		printException(finalMessage, t);
	}

	private void printExecutionError(String message) {
		log.error(message);
	}

	private void printException(String message, Throwable t) {
		LOG.error(message, t);
	}

	private void printError(String message) {
		log.error(message);
	}

	private void printInfo(String message) {
		log.info(message);
	}

}
