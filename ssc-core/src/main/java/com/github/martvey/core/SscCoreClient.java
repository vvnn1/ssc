package com.github.martvey.core;

import com.github.martvey.core.cli.CliClient;
import com.github.martvey.core.cli.CliOptions;
import com.github.martvey.core.cli.CliOptionsParser;
import com.github.martvey.core.local.ExecutionContext;
import com.github.martvey.core.local.LocalExecutor;
import com.github.martvey.core.util.ResourceUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.apache.flink.table.client.SqlClientException;
import org.apache.flink.table.client.config.Environment;
import org.apache.flink.util.StringUtils;

import java.io.*;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
@Slf4j
public class SscCoreClient {
    public static final String SQL_ENTRY = "sql";
    public static final String JOB_NAME_ENTRY="job-name";

    public static void main(String[] args) throws Exception {
        CliOptions options = CliOptionsParser.parseDefaultClient(args);
        final LocalExecutor executor = new LocalExecutor(options.getDefaults());

        Environment sessionEnvironment = enrichEnvironment(readSessionEnvironment(options.getEnvironment()), options.getDynamicProperties());

        ExecutionContext<?> executionContext = executor.openSession(sessionEnvironment);
        Environment environment = executionContext.getEnvironment();

        CliClient cli = new CliClient(executor);
        String updateStatement = options.getUpdateLocation() == null
                ? getSqlStatementFromEnvironment(environment)
                : readStringContentFromFile(options.getUpdateLocation());

        if (StringUtils.isNullOrWhitespaceOnly(updateStatement)){
            throw new SqlClientException("未指定SQL文件信息");
        }

        cli.prepareSql(updateStatement);

        String jobName = getJobNameFromEnvironment(environment);
        if (StringUtils.isNullOrWhitespaceOnly(jobName)) {
            jobName = String.format("_tmp_job_%s", Math.abs(updateStatement.hashCode()));
        }
        cli.execute(jobName);
    }

    private static Environment enrichEnvironment(Environment sessionEnvironment, Properties dynamicProperties) {
        Map<String, String> map = new HashMap<>();
        dynamicProperties.stringPropertyNames()
                .forEach(key -> {
                    final String value = dynamicProperties.getProperty(key);
                    if (value != null) {
                        map.put(key, value);
                    } else {
                        map.put(key, "true");
                    }
                });
        return Environment.enrich(sessionEnvironment, map);
    }

    private static Environment readSessionEnvironment(URL envUrl) {
        if (envUrl == null) {
            log.warn("未指定environment文件路径");
            return new Environment();
        }

        try {
            return Environment.parse(envUrl);
        } catch (IOException e) {
            throw new SqlClientException("无法读取会话配置文件: " + envUrl, e);
        }
    }

    private static String getJobNameFromEnvironment(Environment env){
        return env.getDeployment().asMap().getOrDefault(JOB_NAME_ENTRY,"");
    }

    private static String getSqlStatementFromEnvironment(Environment env){
        String sqlFileLocation = env.getDeployment().asMap().getOrDefault(SQL_ENTRY, "");
        return readStringContentFromFile(sqlFileLocation);
    }

    private static String readStringContentFromFile(String fileLocation){
        if (StringUtils.isNullOrWhitespaceOnly(fileLocation)){
            return "";
        }

        try (StringWriter sqlWriter = new StringWriter();
             InputStreamReader sqlReader = new InputStreamReader(ResourceUtils.getURL(fileLocation).openStream())){
            IOUtils.copy(sqlReader,sqlWriter);
            return sqlWriter.toString();
        } catch (FileNotFoundException e) {
            log.warn("不存在sql文件，fileLocation={}", fileLocation, e);
            return "";
        } catch (IOException e) {
            log.error("IO异常，fileLocation={}", fileLocation,e);
            throw new SqlClientException("无法正常读取SQL信息",e);
        }
    }
}
