package com.github.martvey.ssc.util;

import com.github.martvey.core.exception.SscSqlValidatorException;
import com.github.martvey.core.util.EnvironmentUtils;
import com.github.martvey.core.validator.SqlMetadata;
import com.github.martvey.ssc.entity.bo.LocalWorkSpaceBO;
import com.github.martvey.ssc.entity.sql.AppDetail;
import com.github.martvey.ssc.exception.SscSqlWorkSpaceException;
import org.apache.flink.client.ClientUtils;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.core.fs.Path;
import org.apache.flink.util.TemporaryClassLoaderContext;

import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.List;

public class AppUtil {
    public static void validateSql(AppDetail appDetail) throws SscSqlValidatorException {
        Configuration configuration = appDetail.getConfiguration();
        String metastoreConfig = appDetail.getMetastoreConfig();
        String sqlContent = appDetail.getContent();
        List<Path> jarList = appDetail.getJarList();

        try (LocalWorkSpaceBO workSpaceBO = buildWorkSpace(metastoreConfig, sqlContent, jarList);
             URLClassLoader classLoader = (URLClassLoader) buildUserClassLoader(workSpaceBO.getJarUrlList(), workSpaceBO.getClassPaths(), configuration);
             TemporaryClassLoaderContext ignored = TemporaryClassLoaderContext.of(classLoader)) {
            SqlMetadata.buildSqlMetadata(EnvironmentUtils.parse(metastoreConfig), null, configuration)
                    .validateSql(sqlContent);
        } catch (SscSqlWorkSpaceException | IOException e) {
            throw new RuntimeException("构建检验环境错误", e);
        }
    }

    private static ClassLoader buildUserClassLoader(List<URL> jarList, List<URL> classPathList, Configuration configuration){
        return ClientUtils.buildUserCodeClassLoader(
                jarList,
                classPathList,
                AppUtil.class.getClassLoader(),
                configuration
        );
    }

    private static LocalWorkSpaceBO buildWorkSpace(String defaultMetastoreConfig, String content, List<Path> jarList) throws SscSqlWorkSpaceException {
        LocalWorkSpaceBO workSpaceBO = new LocalWorkSpaceBO();
        workSpaceBO.createWorkSpace(defaultMetastoreConfig, content, jarList);
        return workSpaceBO;
    }
}
