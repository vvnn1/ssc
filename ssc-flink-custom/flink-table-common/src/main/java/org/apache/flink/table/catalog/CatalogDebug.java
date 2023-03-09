package org.apache.flink.table.catalog;

/**
 * Represents a debug in a catalog.
 */
public interface CatalogDebug extends CatalogBaseTable{
	/**
	 * Original text of the debug definition that also perserves the original formatting.
	 *
	 * @return the original string literal provided by the user.
	 */
	String getOriginalQuery();

	/**
	 * Expanded text of the original debug definition
	 * This is needed because the context such as current DB is
	 * lost after the session, in which debug is defined, is gone.
	 * Expanded query text takes care of this, as an example.
	 *
	 * <p>For example, for a debug that is defined in the context of "default" database with a query {@code select * from
	 * test1}, the expanded query text might become {@code select `test1`.`name`, `test1`.`value` from `default`.`test1`},
	 * where table test1 resides in database "default" and has two columns ("name" and "value").
	 *
	 * @return the debug definition in expanded text.
	 */
	String getExpandedQuery();
}
