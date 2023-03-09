package com.github.martvey.core.validator;

import com.github.martvey.core.cli.SqlCommandParser;
import com.github.martvey.core.exception.SscSqlValidatorException;
import com.github.martvey.core.util.CliStatementSplitter;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.table.api.*;
import org.apache.flink.table.api.internal.CatalogTableSchemaResolver;
import org.apache.flink.table.catalog.*;
import org.apache.flink.table.catalog.exceptions.TableAlreadyExistException;
import org.apache.flink.table.catalog.exceptions.TableNotExistException;
import org.apache.flink.table.catalog.exceptions.*;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.table.client.gateway.SqlExecutionException;
import org.apache.flink.table.delegation.*;
import org.apache.flink.table.factories.CatalogFactory;
import org.apache.flink.table.factories.ComponentFactoryService;
import org.apache.flink.table.factories.TableFactoryService;
import org.apache.flink.table.functions.*;
import org.apache.flink.table.module.ModuleManager;
import org.apache.flink.table.operations.*;
import org.apache.flink.table.operations.ddl.*;
import org.apache.flink.table.utils.TableSchemaUtils;

import javax.annotation.Nullable;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class SqlMetadata {
    private final CatalogManager catalogManager;
    private final FunctionCatalog functionCatalog;
    private final Parser parser;
    private final ClassLoader userClassLoader;
    private final Configuration configuration;

    private SqlMetadata(CatalogManager catalogManager, FunctionCatalog functionCatalog, Planner planner, ClassLoader userClassLoader, Configuration configuration) {
        this.catalogManager = catalogManager;
        this.functionCatalog = functionCatalog;
        this.userClassLoader = userClassLoader;
        this.parser = planner.getParser();
        this.configuration = configuration;
    }


    public List<Operation> validateSql(String statement) {
        return CliStatementSplitter.splitContent(statement)
                .stream()
                .filter(sql -> !SqlCommandParser.parseByRegexMatching(sql).isPresent())
                .map(sql -> {
                    try {
                        sql = sql.trim();
                        return parseSql(sql);
                    }catch (ValidationException e){
                        throw new SscSqlValidatorException(sql, e.getCause().getMessage());
                    }
                })
                .collect(Collectors.toList());
    }

    private Operation parseSql(String sql) {
        if (sql.endsWith(";")) {
            sql = sql.substring(0, sql.length() - 1).trim();
        }

        List<Operation> operations = parser.parse(sql.trim());
        Operation operation = operations.get(0);
        executeOperation(operation);
        return operation;
    }



    private void executeOperation(Operation operation) {
        if (operation instanceof ModifyOperation
                || operation instanceof ShowCatalogsOperation
                || operation instanceof ShowCurrentCatalogOperation
                || operation instanceof ShowDatabasesOperation
                || operation instanceof ShowCurrentDatabaseOperation
                || operation instanceof ShowTablesOperation
                || operation instanceof ShowFunctionsOperation
                || operation instanceof ShowViewsOperation
                || operation instanceof ShowPartitionsOperation
                || operation instanceof ExplainOperation
                || operation instanceof DescribeTableOperation
                || operation instanceof QueryOperation) {
            return;
        }
        if (operation instanceof CreateTableOperation) {
            CreateTableOperation createTableOperation = (CreateTableOperation) operation;
            if (createTableOperation.isTemporary()) {
                catalogManager.createTemporaryTable(
                        createTableOperation.getCatalogTable(),
                        createTableOperation.getTableIdentifier(),
                        createTableOperation.isIgnoreIfExists());
            } else {
                catalogManager.createTable(
                        createTableOperation.getCatalogTable(),
                        createTableOperation.getTableIdentifier(),
                        createTableOperation.isIgnoreIfExists());
            }
        } else if (operation instanceof DropTableOperation) {
            DropTableOperation dropTableOperation = (DropTableOperation) operation;
            if (dropTableOperation.isTemporary()) {
                catalogManager.dropTemporaryTable(
                        dropTableOperation.getTableIdentifier(),
                        dropTableOperation.isIfExists());
            } else {
                catalogManager.dropTable(
                        dropTableOperation.getTableIdentifier(),
                        dropTableOperation.isIfExists());
            }
        } else if (operation instanceof AlterTableOperation) {
            AlterTableOperation alterTableOperation = (AlterTableOperation) operation;
            Catalog catalog = getCatalogOrThrowException(alterTableOperation.getTableIdentifier().getCatalogName());
            String exMsg = getDDLOpExecuteErrorMsg(alterTableOperation.asSummaryString());
            try {
                if (alterTableOperation instanceof AlterTableRenameOperation) {
                    AlterTableRenameOperation alterTableRenameOp = (AlterTableRenameOperation) operation;
                    catalog.renameTable(
                            alterTableRenameOp.getTableIdentifier().toObjectPath(),
                            alterTableRenameOp.getNewTableIdentifier().getObjectName(),
                            false);
                } else if (alterTableOperation instanceof AlterTablePropertiesOperation) {
                    AlterTablePropertiesOperation alterTablePropertiesOp = (AlterTablePropertiesOperation) operation;
                    catalog.alterTable(
                            alterTablePropertiesOp.getTableIdentifier().toObjectPath(),
                            alterTablePropertiesOp.getCatalogTable(),
                            false);
                } else if (alterTableOperation instanceof AlterTableAddConstraintOperation){
                    AlterTableAddConstraintOperation addConstraintOP =
                            (AlterTableAddConstraintOperation) operation;
                    CatalogTable oriTable = (CatalogTable) catalogManager
                            .getTable(addConstraintOP.getTableIdentifier())
                            .get()
                            .getTable();
                    TableSchema.Builder builder = TableSchemaUtils
                            .builderWithGivenSchema(oriTable.getSchema());
                    if (addConstraintOP.getConstraintName().isPresent()) {
                        builder.primaryKey(
                                addConstraintOP.getConstraintName().get(),
                                addConstraintOP.getColumnNames());
                    } else {
                        builder.primaryKey(addConstraintOP.getColumnNames());
                    }
                    CatalogTable newTable = new CatalogTableImpl(
                            builder.build(),
                            oriTable.getPartitionKeys(),
                            oriTable.getOptions(),
                            oriTable.getComment());
                    catalog.alterTable(
                            addConstraintOP.getTableIdentifier().toObjectPath(),
                            newTable,
                            false);
                } else if (alterTableOperation instanceof AlterTableDropConstraintOperation){
                    AlterTableDropConstraintOperation dropConstraintOperation =
                            (AlterTableDropConstraintOperation) operation;
                    CatalogTable oriTable = (CatalogTable) catalogManager
                            .getTable(dropConstraintOperation.getTableIdentifier())
                            .get()
                            .getTable();
                    CatalogTable newTable = new CatalogTableImpl(
                            TableSchemaUtils.dropConstraint(
                                    oriTable.getSchema(),
                                    dropConstraintOperation.getConstraintName()),
                            oriTable.getPartitionKeys(),
                            oriTable.getOptions(),
                            oriTable.getComment());
                    catalog.alterTable(
                            dropConstraintOperation.getTableIdentifier().toObjectPath(),
                            newTable,
                            false);
                } else if (alterTableOperation instanceof AlterPartitionPropertiesOperation) {
                    AlterPartitionPropertiesOperation alterPartPropsOp = (AlterPartitionPropertiesOperation) operation;
                    catalog.alterPartition(alterPartPropsOp.getTableIdentifier().toObjectPath(),
                            alterPartPropsOp.getPartitionSpec(),
                            alterPartPropsOp.getCatalogPartition(),
                            false);
                } else if (alterTableOperation instanceof AlterTableSchemaOperation) {
                    AlterTableSchemaOperation alterTableSchemaOperation = (AlterTableSchemaOperation) alterTableOperation;
                    catalog.alterTable(alterTableSchemaOperation.getTableIdentifier().toObjectPath(),
                            alterTableSchemaOperation.getCatalogTable(),
                            false);
                } else if (alterTableOperation instanceof AddPartitionsOperation) {
                    AddPartitionsOperation addPartitionsOperation = (AddPartitionsOperation) alterTableOperation;
                    List<CatalogPartitionSpec> specs = addPartitionsOperation.getPartitionSpecs();
                    List<CatalogPartition> partitions = addPartitionsOperation.getCatalogPartitions();
                    boolean ifNotExists = addPartitionsOperation.ifNotExists();
                    ObjectPath tablePath = addPartitionsOperation.getTableIdentifier().toObjectPath();
                    for (int i = 0; i < specs.size(); i++) {
                        catalog.createPartition(tablePath, specs.get(i), partitions.get(i), ifNotExists);
                    }
                } else if (alterTableOperation instanceof DropPartitionsOperation) {
                    DropPartitionsOperation dropPartitionsOperation = (DropPartitionsOperation) alterTableOperation;
                    ObjectPath tablePath = dropPartitionsOperation.getTableIdentifier().toObjectPath();
                    boolean ifExists = dropPartitionsOperation.ifExists();
                    for (CatalogPartitionSpec spec : dropPartitionsOperation.getPartitionSpecs()) {
                        catalog.dropPartition(tablePath, spec, ifExists);
                    }
                }
            } catch (TableAlreadyExistException | TableNotExistException e) {
                throw new ValidationException(exMsg, e);
            } catch (Exception e) {
                throw new TableException(exMsg, e);
            }
        } else if (operation instanceof CreateDebugOperation){
            CreateDebugOperation createDebugOperation = (CreateDebugOperation) operation;
            if (createDebugOperation.isTemporary()) {
                catalogManager.createTemporaryTable(
                        createDebugOperation.getCatalogDebug(),
                        createDebugOperation.getDebugIdentifier(),
                        createDebugOperation.isIgnoreIfExists());
            } else {
                catalogManager.createTable(
                        createDebugOperation.getCatalogDebug(),
                        createDebugOperation.getDebugIdentifier(),
                        createDebugOperation.isIgnoreIfExists());
            }
        }
          else if (operation instanceof CreateViewOperation) {
            CreateViewOperation createViewOperation = (CreateViewOperation) operation;
            if (createViewOperation.isTemporary()) {
                catalogManager.createTemporaryTable(
                        createViewOperation.getCatalogView(),
                        createViewOperation.getViewIdentifier(),
                        createViewOperation.isIgnoreIfExists());
            } else {
                catalogManager.createTable(
                        createViewOperation.getCatalogView(),
                        createViewOperation.getViewIdentifier(),
                        createViewOperation.isIgnoreIfExists());
            }
        } else if (operation instanceof DropViewOperation) {
            DropViewOperation dropViewOperation = (DropViewOperation) operation;
            if (dropViewOperation.isTemporary()) {
                catalogManager.dropTemporaryView(
                        dropViewOperation.getViewIdentifier(),
                        dropViewOperation.isIfExists());
            } else {
                catalogManager.dropView(
                        dropViewOperation.getViewIdentifier(),
                        dropViewOperation.isIfExists());
            }
        } else if (operation instanceof AlterViewOperation) {
            AlterViewOperation alterViewOperation = (AlterViewOperation) operation;
            Catalog catalog = getCatalogOrThrowException(alterViewOperation.getViewIdentifier().getCatalogName());
            String exMsg = getDDLOpExecuteErrorMsg(alterViewOperation.asSummaryString());
            try {
                if (alterViewOperation instanceof AlterViewRenameOperation) {
                    AlterViewRenameOperation alterTableRenameOp = (AlterViewRenameOperation) operation;
                    catalog.renameTable(
                            alterTableRenameOp.getViewIdentifier().toObjectPath(),
                            alterTableRenameOp.getNewViewIdentifier().getObjectName(),
                            false);
                } else if (alterViewOperation instanceof AlterViewPropertiesOperation) {
                    AlterViewPropertiesOperation alterTablePropertiesOp = (AlterViewPropertiesOperation) operation;
                    catalog.alterTable(
                            alterTablePropertiesOp.getViewIdentifier().toObjectPath(),
                            alterTablePropertiesOp.getCatalogView(),
                            false);
                } else if (alterViewOperation instanceof AlterViewAsOperation) {
                    AlterViewAsOperation alterViewAsOperation = (AlterViewAsOperation) alterViewOperation;
                    catalog.alterTable(alterViewAsOperation.getViewIdentifier().toObjectPath(),
                            alterViewAsOperation.getNewView(),
                            false);
                }
            } catch (TableAlreadyExistException | TableNotExistException e) {
                throw new ValidationException(exMsg, e);
            } catch (Exception e) {
                throw new TableException(exMsg, e);
            }
        } else if (operation instanceof CreateDatabaseOperation) {
            CreateDatabaseOperation createDatabaseOperation = (CreateDatabaseOperation) operation;
            Catalog catalog = getCatalogOrThrowException(createDatabaseOperation.getCatalogName());
            String exMsg = getDDLOpExecuteErrorMsg(createDatabaseOperation.asSummaryString());
            try {
                catalog.createDatabase(
                        createDatabaseOperation.getDatabaseName(),
                        createDatabaseOperation.getCatalogDatabase(),
                        createDatabaseOperation.isIgnoreIfExists());
            } catch (DatabaseAlreadyExistException e) {
                throw new ValidationException(exMsg, e);
            } catch (Exception e) {
                throw new TableException(exMsg, e);
            }
        } else if (operation instanceof DropDatabaseOperation) {
            DropDatabaseOperation dropDatabaseOperation = (DropDatabaseOperation) operation;
            Catalog catalog = getCatalogOrThrowException(dropDatabaseOperation.getCatalogName());
            String exMsg = getDDLOpExecuteErrorMsg(dropDatabaseOperation.asSummaryString());
            try {
                catalog.dropDatabase(
                        dropDatabaseOperation.getDatabaseName(),
                        dropDatabaseOperation.isIfExists(),
                        dropDatabaseOperation.isCascade());
            } catch (DatabaseNotExistException | DatabaseNotEmptyException e) {
                throw new ValidationException(exMsg, e);
            } catch (Exception e) {
                throw new TableException(exMsg, e);
            }
        } else if (operation instanceof AlterDatabaseOperation) {
            AlterDatabaseOperation alterDatabaseOperation = (AlterDatabaseOperation) operation;
            Catalog catalog = getCatalogOrThrowException(alterDatabaseOperation.getCatalogName());
            String exMsg = getDDLOpExecuteErrorMsg(alterDatabaseOperation.asSummaryString());
            try {
                catalog.alterDatabase(
                        alterDatabaseOperation.getDatabaseName(),
                        alterDatabaseOperation.getCatalogDatabase(),
                        false);
            } catch (DatabaseNotExistException e) {
                throw new ValidationException(exMsg, e);
            } catch (Exception e) {
                throw new TableException(exMsg, e);
            }
        } else if (operation instanceof CreateCatalogFunctionOperation) {
            createCatalogFunction((CreateCatalogFunctionOperation) operation);
        } else if (operation instanceof CreateTempSystemFunctionOperation) {
            createSystemFunction((CreateTempSystemFunctionOperation) operation);
        } else if (operation instanceof DropCatalogFunctionOperation) {
            dropCatalogFunction((DropCatalogFunctionOperation) operation);
        } else if (operation instanceof DropTempSystemFunctionOperation) {
            dropSystemFunction((DropTempSystemFunctionOperation) operation);
        } else if (operation instanceof AlterCatalogFunctionOperation) {
            alterCatalogFunction((AlterCatalogFunctionOperation) operation);
        } else if (operation instanceof CreateCatalogOperation) {
            createCatalog((CreateCatalogOperation) operation);
        } else if (operation instanceof DropCatalogOperation) {
            DropCatalogOperation dropCatalogOperation = (DropCatalogOperation) operation;
            String exMsg = getDDLOpExecuteErrorMsg(dropCatalogOperation.asSummaryString());
            try {
                catalogManager.unregisterCatalog(dropCatalogOperation.getCatalogName(),
                        dropCatalogOperation.isIfExists());
            } catch (CatalogException e) {
                throw new ValidationException(exMsg, e);
            }
        } else if (operation instanceof UseCatalogOperation) {
            UseCatalogOperation useCatalogOperation = (UseCatalogOperation) operation;
            catalogManager.setCurrentCatalog(useCatalogOperation.getCatalogName());
        } else if (operation instanceof UseDatabaseOperation) {
            UseDatabaseOperation useDatabaseOperation = (UseDatabaseOperation) operation;
            catalogManager.setCurrentCatalog(useDatabaseOperation.getCatalogName());
            catalogManager.setCurrentDatabase(useDatabaseOperation.getDatabaseName());
        } else {
            throw new TableException("不支持的SQL");
        }
    }

    private void createCatalog(CreateCatalogOperation operation) {
        String exMsg = getDDLOpExecuteErrorMsg(operation.asSummaryString());
        try {
            String catalogName = operation.getCatalogName();
            Map<String, String> properties = operation.getProperties();
            final CatalogFactory factory = TableFactoryService.find(
                    CatalogFactory.class,
                    properties,
                    userClassLoader);

            Catalog catalog = factory.createCatalog(catalogName, properties);
            catalogManager.registerCatalog(catalogName, catalog);
        } catch (CatalogException e) {
            throw new ValidationException(exMsg, e);
        }
    }

    private Catalog getCatalogOrThrowException(String catalogName) {
        return getCatalog(catalogName)
                .orElseThrow(() -> new ValidationException(String.format("Catalog %s does not exist", catalogName)));
    }

    private Optional<Catalog> getCatalog(String catalogName) {
        return catalogManager.getCatalog(catalogName);
    }

    private void alterCatalogFunction(AlterCatalogFunctionOperation alterCatalogFunctionOperation) {
        String exMsg = getDDLOpExecuteErrorMsg(alterCatalogFunctionOperation.asSummaryString());
        try {
            CatalogFunction function = alterCatalogFunctionOperation.getCatalogFunction();
            if (alterCatalogFunctionOperation.isTemporary()) {
                throw new ValidationException(
                        "Alter temporary catalog function is not supported");
            } else {
                Catalog catalog = getCatalogOrThrowException(
                        alterCatalogFunctionOperation.getFunctionIdentifier().getCatalogName());
                catalog.alterFunction(
                        alterCatalogFunctionOperation.getFunctionIdentifier().toObjectPath(),
                        function,
                        alterCatalogFunctionOperation.isIfExists());
            }
        } catch (ValidationException e) {
            throw e;
        }  catch (FunctionNotExistException e) {
            throw new ValidationException(e.getMessage(), e);
        } catch (Exception e) {
            throw new TableException(exMsg, e);
        }
    }

    private void dropSystemFunction(DropTempSystemFunctionOperation operation) {
        try {
            functionCatalog.dropTemporarySystemFunction(
                    operation.getFunctionName(),
                    operation.isIfExists());
        } catch (ValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new TableException(getDDLOpExecuteErrorMsg(operation.asSummaryString()), e);
        }
    }

    private void dropCatalogFunction(DropCatalogFunctionOperation dropCatalogFunctionOperation) {
        String exMsg = getDDLOpExecuteErrorMsg(dropCatalogFunctionOperation.asSummaryString());
        try {
            if (dropCatalogFunctionOperation.isTemporary()) {
                functionCatalog.dropTempCatalogFunction(
                        dropCatalogFunctionOperation.getFunctionIdentifier(),
                        dropCatalogFunctionOperation.isIfExists());
            } else {
                Catalog catalog = getCatalogOrThrowException
                        (dropCatalogFunctionOperation.getFunctionIdentifier().getCatalogName());

                catalog.dropFunction(
                        dropCatalogFunctionOperation.getFunctionIdentifier().toObjectPath(),
                        dropCatalogFunctionOperation.isIfExists());
            }
        } catch (ValidationException e) {
            throw e;
        }  catch (FunctionNotExistException e) {
            throw new ValidationException(e.getMessage(), e);
        } catch (Exception e) {
            throw new TableException(exMsg, e);
        }
    }

    private void createSystemFunction(CreateTempSystemFunctionOperation operation) {
        String exMsg = getDDLOpExecuteErrorMsg(operation.asSummaryString());
        try {
            functionCatalog.registerTemporarySystemFunction(
                    operation.getFunctionName(),
                    operation.getFunctionClass(),
                    operation.getFunctionLanguage(),
                    operation.isIgnoreIfExists());
        } catch (ValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new TableException(exMsg, e);
        }
    }

    private void registerFunction(String name, ScalarFunction function) {
        functionCatalog.registerTempSystemScalarFunction(
                name,
                function);
    }

    private <T, ACC> void registerFunction(String name, AggregateFunction<T, ACC> aggregateFunction) {
        TypeInformation<T> typeInfo = UserDefinedFunctionHelper.getReturnTypeOfAggregateFunction(aggregateFunction);
        TypeInformation<ACC> accTypeInfo = UserDefinedFunctionHelper
                .getAccumulatorTypeOfAggregateFunction(aggregateFunction);

        functionCatalog.registerTempSystemAggregateFunction(
                name,
                aggregateFunction,
                typeInfo,
                accTypeInfo
        );
    }

    private <T> void registerFunction(String name, TableFunction<T> tableFunction) {
        TypeInformation<T> typeInfo = UserDefinedFunctionHelper.getReturnTypeOfTableFunction(tableFunction);

        functionCatalog.registerTempSystemTableFunction(
                name,
                tableFunction,
                typeInfo
        );
    }

    private void createCatalogFunction(CreateCatalogFunctionOperation createCatalogFunctionOperation) {
        String exMsg = getDDLOpExecuteErrorMsg(createCatalogFunctionOperation.asSummaryString());
        try {
            if (createCatalogFunctionOperation.isTemporary()) {
                functionCatalog.registerTemporaryCatalogFunction(
                        UnresolvedIdentifier.of(createCatalogFunctionOperation.getFunctionIdentifier().toList()),
                        createCatalogFunctionOperation.getCatalogFunction(),
                        createCatalogFunctionOperation.isIgnoreIfExists());
            } else {
                Catalog catalog = getCatalogOrThrowException(
                        createCatalogFunctionOperation.getFunctionIdentifier().getCatalogName());
                catalog.createFunction(
                        createCatalogFunctionOperation.getFunctionIdentifier().toObjectPath(),
                        createCatalogFunctionOperation.getCatalogFunction(),
                        createCatalogFunctionOperation.isIgnoreIfExists());
            }
        } catch (ValidationException e) {
            throw e;
        } catch (FunctionAlreadyExistException e) {
            throw new ValidationException(e.getMessage(), e);
        } catch (Exception e) {
            throw new TableException(exMsg, e);
        }
    }

    private String getDDLOpExecuteErrorMsg(String action) {
        return String.format("Could not execute %s", action);
    }

    public static SqlMetadata buildSqlMetadata(Environment environment, @Nullable ClassLoader classLoader, Configuration configuration){
        EnvironmentSettings settings = environment.getExecution().getEnvironmentSettings();
        if (classLoader == null){
            classLoader = Thread.currentThread().getContextClassLoader();
        }

        TableConfig tableConfig = new TableConfig();

        ModuleManager moduleManager = new ModuleManager();

        CatalogManager catalogManager = CatalogManager.newBuilder()
                .classLoader(classLoader)
                .config(tableConfig.getConfiguration())
                .defaultCatalog(
                        settings.getBuiltInCatalogName(),
                        new GenericInMemoryCatalog(
                                settings.getBuiltInCatalogName(),
                                settings.getBuiltInDatabaseName()))
                .build();

        FunctionCatalog functionCatalog = new FunctionCatalog(tableConfig, catalogManager, moduleManager);

        Map<String, String> executorProperties = settings.toExecutorProperties();
        Executor executor = ComponentFactoryService.find(ExecutorFactory.class, executorProperties)
                .create(executorProperties);

        Map<String, String> plannerProperties = settings.toPlannerProperties();
        Planner planner = ComponentFactoryService.find(PlannerFactory.class, plannerProperties)
                .create(
                        plannerProperties,
                        executor,
                        tableConfig,
                        functionCatalog,
                        catalogManager);
        catalogManager.setCatalogTableSchemaResolver(new CatalogTableSchemaResolver(planner.getParser(), settings.isStreamingMode()));
        SqlMetadata sqlMetadata = new SqlMetadata(catalogManager, functionCatalog, planner, classLoader, configuration);
        sqlMetadata.registerFunction(environment);
        return sqlMetadata;
    }

    private void registerFunction(Environment environment) {
        environment.getFunctions().forEach((name, entry) -> {
            final UserDefinedFunction function = FunctionService.createFunction(
                    entry.getDescriptor(),
                    userClassLoader,
                    false,
                    configuration
                    );

            if (function instanceof ScalarFunction) {
                registerFunction(name, (ScalarFunction) function);
            } else if (function instanceof AggregateFunction) {
                registerFunction(name, (AggregateFunction<?, ?>) function);
            } else if (function instanceof TableFunction) {
                registerFunction(name, (TableFunction<?>) function);
            } else {
                throw new SqlExecutionException("Unsupported function type: " + function.getClass().getName());
            }
        });
    }
}
