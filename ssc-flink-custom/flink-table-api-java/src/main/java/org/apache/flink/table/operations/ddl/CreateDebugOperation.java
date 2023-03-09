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

package org.apache.flink.table.operations.ddl;

import org.apache.flink.table.catalog.CatalogDebug;
import org.apache.flink.table.catalog.ObjectIdentifier;
import org.apache.flink.table.operations.Operation;
import org.apache.flink.table.operations.OperationUtils;
import org.apache.flink.table.operations.ddl.CreateOperation;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Operation to describe a CREATE VIEW statement.
 */
public class CreateDebugOperation implements CreateOperation {
	private final ObjectIdentifier debugIdentifier;
	private CatalogDebug catalogDebug;
	private boolean ignoreIfExists;
	private boolean isTemporary;

	public CreateDebugOperation(
			ObjectIdentifier debugIdentifier,
			CatalogDebug catalogDebug,
			boolean ignoreIfExists,
			boolean isTemporary) {
		this.debugIdentifier = debugIdentifier;
		this.catalogDebug = catalogDebug;
		this.ignoreIfExists = ignoreIfExists;
		this.isTemporary = isTemporary;
	}

	public CatalogDebug getCatalogDebug() {
		return catalogDebug;
	}

	public ObjectIdentifier getDebugIdentifier() {
		return debugIdentifier;
	}

	public boolean isIgnoreIfExists() {
		return ignoreIfExists;
	}

	public boolean isTemporary() {
		return isTemporary;
	}

	@Override
	public String asSummaryString() {
		Map<String, Object> params = new LinkedHashMap<>();
		params.put("originalQuery", catalogDebug.getOriginalQuery());
		params.put("expandedQuery", catalogDebug.getExpandedQuery());
		params.put("identifier", debugIdentifier);
		params.put("ignoreIfExists", ignoreIfExists);
		params.put("isTemporary", isTemporary);
		return OperationUtils.formatWithChildren(
			"CREATE DEBUG",
			params,
			Collections.emptyList(),
			Operation::asSummaryString);
	}
}
