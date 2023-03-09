package org.apache.flink.table.client.cli;

/**
 * Utility class that contains all strings for CLI commands and messages.
 */
public final class CliStrings {

	private CliStrings() {
	}

	public static final String CLI_NAME = "Flink SQL CLI Client";
	public static final String DEFAULT_MARGIN = " ";
	public static final String NULL_COLUMN = "(NULL)";

	// --------------------------------------------------------------------------------------------

	public static final String MESSAGE_QUIT = "Exiting " + CliStrings.CLI_NAME + "...";

	public static final String MESSAGE_SQL_EXECUTION_ERROR = "Could not execute SQL statement.";

	public static final String MESSAGE_RESET = "All session properties have been set to their default values.";

	public static final String MESSAGE_SET = "Session property has been set.";

	public static final String MESSAGE_EMPTY = "Result was empty.";

	public static final String MESSAGE_RESULT_QUIT = "Result retrieval cancelled.";

	public static final String MESSAGE_SUBMITTING_STATEMENT = "Submitting SQL update statement to the cluster...";

	public static final String MESSAGE_STATEMENT_SUBMITTED = "Table update statement has been successfully submitted to the cluster:";

	public static final String MESSAGE_MAX_SIZE_EXCEEDED = "The given file exceeds the maximum number of characters.";

	public static final String MESSAGE_WILL_EXECUTE = "Executing the following statement:";

	public static final String MESSAGE_UNSUPPORTED_SQL = "Unsupported SQL statement.";

	public static final String MESSAGE_TABLE_CREATED = "Table has been created.";

	public static final String MESSAGE_TABLE_REMOVED = "Table has been removed.";

	public static final String MESSAGE_ALTER_TABLE_SUCCEEDED = "Alter table succeeded!";

	public static final String MESSAGE_ALTER_TABLE_FAILED = "Alter table failed!";

	public static final String MESSAGE_VIEW_CREATED = "View has been created.";

	public static final String MESSAGE_VIEW_REMOVED = "View has been removed.";

	public static final String MESSAGE_ALTER_VIEW_SUCCEEDED = "Alter view succeeded!";

	public static final String MESSAGE_ALTER_VIEW_FAILED = "Alter view failed!";

	public static final String MESSAGE_FUNCTION_CREATED = "Function has been created.";

	public static final String MESSAGE_FUNCTION_REMOVED = "Function has been removed.";

	public static final String MESSAGE_ALTER_FUNCTION_SUCCEEDED = "Alter function succeeded!";

	public static final String MESSAGE_ALTER_FUNCTION_FAILED = "Alter function failed!";

	public static final String MESSAGE_DATABASE_CREATED = "Database has been created.";

	public static final String MESSAGE_DATABASE_REMOVED = "Database has been removed.";

	public static final String MESSAGE_ALTER_DATABASE_SUCCEEDED = "Alter database succeeded!";

	public static final String MESSAGE_ALTER_DATABASE_FAILED = "Alter database failed!";

	public static final String MESSAGE_CATALOG_CREATED = "Catalog has been created.";

	public static final String MESSAGE_CATALOG_REMOVED = "Catalog has been removed.";

	// --------------------------------------------------------------------------------------------

	public static final String RESULT_TITLE = "SQL Query Result";

	public static final String RESULT_REFRESH_INTERVAL = "Refresh:";

	public static final String RESULT_PAGE = "Page:";

	public static final String RESULT_PAGE_OF = " of ";

	public static final String RESULT_LAST_REFRESH = "Updated:";

	public static final String RESULT_LAST_PAGE = "Last";

	public static final String RESULT_QUIT = "Quit";

	public static final String RESULT_REFRESH = "Refresh";

	public static final String RESULT_GOTO = "Goto Page";

	public static final String RESULT_NEXT = "Next Page";

	public static final String RESULT_PREV = "Prev Page";

	public static final String RESULT_LAST = "Last Page";

	public static final String RESULT_FIRST = "First Page";

	public static final String RESULT_SEARCH = "Search";

	public static final String RESULT_INC_REFRESH = "Inc Refresh"; // implementation assumes max length of 11

	public static final String RESULT_DEC_REFRESH = "Dec Refresh";

	public static final String RESULT_OPEN = "Open Row";

	public static final String RESULT_CHANGELOG = "Changelog";

	public static final String RESULT_TABLE = "Table";

	public static final String RESULT_STOPPED = "Table program finished.";

	public static final String RESULT_REFRESH_UNKNOWN = "Unknown";

	// --------------------------------------------------------------------------------------------

	public static final String INPUT_TITLE = "Input Dialog";

	public static final String INPUT_ENTER_PAGE = "Enter page number:";

	public static final String INPUT_ERROR = "The input is invalid please check it again.";

	// --------------------------------------------------------------------------------------------

	public static final String ROW_HEADER = "Row Summary";

	// --------------------------------------------------------------------------------------------
}
