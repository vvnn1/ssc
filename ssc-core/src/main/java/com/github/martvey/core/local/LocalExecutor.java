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

package com.github.martvey.core.local;

import com.github.martvey.core.util.ResourceUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.common.ExecutionConfig;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.api.common.typeutils.TypeSerializer;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.table.api.Table;
import org.apache.flink.table.api.TableEnvironment;
import org.apache.flink.table.api.TableResult;
import org.apache.flink.table.api.TableSchema;
import org.apache.flink.table.api.internal.TableEnvironmentInternal;
import org.apache.flink.table.catalog.UnresolvedIdentifier;
import org.apache.flink.table.client.SqlClientException;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.config.entries.DeploymentEntry;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.client.gateway.local.CollectBatchTableSink;
import org.apache.flink.table.client.gateway.local.CollectStreamTableSink;
import org.apache.flink.table.delegation.Parser;
import org.apache.flink.table.expressions.ResolvedExpression;
import org.apache.flink.table.operations.Operation;
import org.apache.flink.table.sinks.TableSink;
import org.apache.flink.table.types.DataType;
import org.apache.flink.table.types.logical.utils.LogicalTypeUtils;
import org.apache.flink.table.types.utils.DataTypeUtils;
import org.apache.flink.types.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.*;

@Slf4j
public class LocalExecutor {

	private static final Logger LOG = LoggerFactory.getLogger(LocalExecutor.class);

	private static final String DEFAULT_ENV_FILE = "sql-client-default.yaml";

	private final Environment defaultEnvironment;

	private ExecutionContext<?> executionContext;



	public LocalExecutor(URL defaultEnv) {
		if (defaultEnv == null) {
			System.out.println("用户未指定默认environment路径");
			System.out.print("从类路径查找 'classpath:" + DEFAULT_ENV_FILE + "'...");
			try{
				defaultEnv = ResourceUtils.getURL("classpath:" + DEFAULT_ENV_FILE);
			}catch (FileNotFoundException e){
				log.error("类路径中没有默认environment配置文件: classpath:" + DEFAULT_ENV_FILE, e);
			}
		}

		if (defaultEnv == null){
			defaultEnvironment = new Environment();
			return;
		}

		System.out.println("读取默认environment文件: " + defaultEnv);
		try {
			defaultEnvironment = Environment.parse(defaultEnv);
		} catch (IOException e) {
			throw new SqlClientException("无法读取默认environment文件: " + defaultEnv, e);
		}
	}

	private ExecutionContext.Builder createExecutionContextBuilder(Environment originalSessionEnvironment) {
		return ExecutionContext.builder(
				defaultEnvironment,
				originalSessionEnvironment);
	}

	public ExecutionContext<?> openSession(Environment sessionEnv) throws SqlExecutionException {
		if (executionContext != null) {
			throw new SqlExecutionException("Found another session with the same session identifier: ");
		} else {
			executionContext = createExecutionContextBuilder(sessionEnv).build();
		}
		return executionContext;
	}

	public Map<String, String> getSessionProperties() throws SqlExecutionException {
		final Environment env = executionContext.getEnvironment();
		final Map<String, String> properties = new HashMap<>();
		properties.putAll(env.getExecution().asTopLevelMap());
		properties.putAll(env.getDeployment().asTopLevelMap());
		properties.putAll(env.getConfiguration().asMap());
		return properties;
	}

	public void resetSessionProperties() throws SqlExecutionException {
		executionContext = createExecutionContextBuilder(
				executionContext.getOriginalSessionEnvironment())
				.sessionState(executionContext.getSessionState())
				.build();
	}

	public void setSessionProperty(String key, String value) throws SqlExecutionException {
		Environment env = executionContext.getEnvironment();
		Environment newEnv;
		try {
			newEnv = Environment.enrich(env, Collections.singletonMap(key, value));
		} catch (Throwable t) {
			throw new SqlExecutionException("Could not set session property.", t);
		}

		executionContext = createExecutionContextBuilder(
				executionContext.getOriginalSessionEnvironment())
				.env(newEnv)
				.sessionState(executionContext.getSessionState())
				.build();
	}

	public TableResult executeSql(String statement) throws SqlExecutionException {
		final TableEnvironment tEnv = executionContext.getTableEnvironment();
		try {
			return tEnv.executeSql(statement);
		} catch (Exception e) {
			throw new SqlExecutionException("Could not execute statement: " + statement, e);
		}
	}

	public List<String> listModules() throws SqlExecutionException {
		final TableEnvironment tableEnv = executionContext.getTableEnvironment();
		return Arrays.asList(tableEnv.listModules());
	}

	public Parser getSqlParser() {
		final TableEnvironment tableEnv = executionContext.getTableEnvironment();
		final Parser parser = ((TableEnvironmentInternal) tableEnv).getParser();
		return new Parser() {
			@Override
			public List<Operation> parse(String statement) {
				return parser.parse(statement);
			}

			@Override
			public UnresolvedIdentifier parseIdentifier(String identifier) {
				return parser.parseIdentifier(identifier);
			}

			@Override
			public ResolvedExpression parseSqlExpression(String sqlExpression, TableSchema inputSchema) {
				return parser.parseSqlExpression(sqlExpression, inputSchema);
			}
		};
	}

	public List<String> completeStatement(String statement, int position) {
		final TableEnvironment tableEnv = executionContext.getTableEnvironment();

		try {
			return Arrays.asList(tableEnv.getCompletionHints(statement, position));
		} catch (Throwable t) {
			if (LOG.isDebugEnabled()) {
				LOG.debug("Could not complete statement at " + position + ":" + statement, t);
			}
			return Collections.emptyList();
		}
	}

	public void executeDebug(String tableName, String query) throws SqlExecutionException {
		if (!enableDebug()){
			return;
		}
		final Table table = executionContext.getTableEnvironment().sqlQuery(query);
		TableSink<?> tableSink = getTableSink(tableName, table.getSchema());
		((TableEnvironmentInternal) executionContext.getTableEnvironment()).registerTableSinkInternal(tableName, tableSink);
		table.insertInto(tableName);
	}

	private boolean enableDebug(){
		return Boolean.parseBoolean(executionContext.getEnvironment().getDeployment().asMap().getOrDefault("debug-enable", "false"));
	}

	public void executeUpdate(String statement) throws SqlExecutionException {
		executionContext.getTableEnvironment().sqlUpdate(statement);
	}

	private TableSink<?> getTableSink(String tableName, TableSchema tableSchema){
		Environment environment = executionContext.getEnvironment();
		ExecutionConfig executionConfig = executionContext.getExecutionConfig();
		if (environment.getExecution().inStreamingMode()) {
			final TypeInformation<Tuple2<Boolean, Row>> socketType = Types.TUPLE(Types.BOOLEAN, tableSchema.toRowType());
			final TypeSerializer<Tuple2<Boolean, Row>> serializer = socketType.createSerializer(executionConfig);
			return new CollectStreamTableSink(getGatewayAddress(tableName, environment.getDeployment())
					, getGatewayPort(tableName, environment.getDeployment())
					, serializer
					, removeTimeAttributes(tableSchema));

		}
		TypeSerializer<Row> serializer = tableSchema.toRowType().createSerializer(executionConfig);
		return new CollectBatchTableSink(tableName, serializer, tableSchema);
	}

	private static TableSchema removeTimeAttributes(TableSchema schema) {
		final TableSchema.Builder builder = TableSchema.builder();
		for (int i = 0; i < schema.getFieldCount(); i++) {
			final DataType dataType = schema.getFieldDataTypes()[i];
			final DataType convertedType = DataTypeUtils.replaceLogicalType(
				dataType,
				LogicalTypeUtils.removeTimeAttributes(dataType.getLogicalType()));
			builder.field(schema.getFieldNames()[i], convertedType);
		}
		return builder.build();
	}

	private int getGatewayPort(String tableName, DeploymentEntry deploy) {
		final String port = deploy.asMap().getOrDefault("gateway." + tableName + ".port","");
		if (!port.isEmpty()){
			return Integer.parseInt(port);
		}
		throw new SqlClientException("无法确定" + tableName + "结果接受端口,请确认端口");
	}

	private InetAddress getGatewayAddress(String tableName, DeploymentEntry deploy) {
		final String address = deploy.asMap().getOrDefault("gateway." + tableName + ".address","");

		if (!address.isEmpty()) {
			try {
				return InetAddress.getByName(address);
			} catch (UnknownHostException e) {
				throw new SqlClientException("接受结果的路由地址无效 '" + address + "'.", e);
			}
		}
		throw new SqlClientException("无法确定" + tableName + "结果接受ip地址,请确认ip地址");
	}

	public void execute(String jobName) throws Exception {
		executionContext.getTableEnvironment().execute(jobName);
	}
}
