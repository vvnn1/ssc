package org.apache.flink.sql.parser.ddl;

import com.google.common.collect.ImmutableList;
import org.apache.calcite.sql.*;
import org.apache.calcite.sql.parser.SqlParserPos;

import javax.annotation.Nullable;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

/**
 * CREATE DEBUG DDL sql call.
 */
public class SqlCreateDebug extends SqlCreate {
	public static final SqlSpecialOperator OPERATOR = new SqlSpecialOperator("CREATE_DEBUG", SqlKind.CREATE_VIEW);

	private final SqlIdentifier debugName;
	private final SqlNodeList fieldList;
	private final SqlNode query;
	private final boolean isTemporary;

	@Nullable
	private final SqlCharStringLiteral comment;

	@Nullable
	private final SqlNodeList properties;

	public SqlCreateDebug(
			SqlParserPos pos,
			SqlIdentifier debugName,
			SqlNodeList fieldList,
			SqlNode query,
			boolean replace,
			boolean isTemporary,
			boolean ifNotExists,
			SqlCharStringLiteral comment,
			SqlNodeList properties) {
		super(OPERATOR, pos, replace, ifNotExists);
		this.debugName = requireNonNull(debugName, "debugName should not be null");
		this.fieldList = requireNonNull(fieldList, "fieldList should not be null");
		this.query = requireNonNull(query, "query should not be null");
		this.isTemporary = isTemporary;
		this.comment = comment;
		this.properties = properties;
	}

	@Override
	public List<SqlNode> getOperandList() {
		List<SqlNode> ops = new ArrayList<>();
		ops.add(debugName);
		ops.add(fieldList);
		ops.add(query);
		ops.add(SqlLiteral.createBoolean(getReplace(), SqlParserPos.ZERO));
		return ops;
	}

	public SqlIdentifier getDebugName() {
		return debugName;
	}

	public SqlNodeList getFieldList() {
		return fieldList;
	}

	public SqlNode getQuery() {
		return query;
	}

	public Optional<SqlCharStringLiteral> getComment() {
		return Optional.ofNullable(comment);
	}

	public Optional<SqlNodeList> getProperties() {
		return Optional.ofNullable(properties);
	}

	@Override
	public void unparse(SqlWriter writer, int leftPrec, int rightPrec) {
		writer.keyword("CREATE");
		if (isTemporary()) {
			writer.keyword("TEMPORARY");
		}
		writer.keyword("DEBUG");
		if (isIfNotExists()) {
			writer.keyword("IF NOT EXISTS");
		}
		debugName.unparse(writer, leftPrec, rightPrec);
		if (fieldList.size() > 0) {
			fieldList.unparse(writer, 1, rightPrec);
		}
		if (comment != null) {
			writer.newlineAndIndent();
			writer.keyword("COMMENT");
			comment.unparse(writer, leftPrec, rightPrec);
		}
		writer.newlineAndIndent();
		writer.keyword("AS");
		writer.newlineAndIndent();
		query.unparse(writer, leftPrec, rightPrec);
	}

	protected void printIndent(SqlWriter writer) {
		writer.sep(",", false);
		writer.newlineAndIndent();
		writer.print("  ");
	}

	public boolean isTemporary() {
		return isTemporary;
	}

	public boolean isIfNotExists() {
		return ifNotExists;
	}

	public String[] fullDebugName() {
		return debugName.names.toArray(new String[0]);
	}
}
