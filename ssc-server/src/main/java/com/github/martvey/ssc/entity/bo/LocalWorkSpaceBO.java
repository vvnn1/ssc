package com.github.martvey.ssc.entity.bo;


import com.github.martvey.ssc.exception.SscSqlWorkSpaceException;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.core.fs.Path;
import org.apache.flink.util.FileUtils;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.util.LinkedList;
import java.util.List;

@Slf4j
public class LocalWorkSpaceBO extends WorkSpaceBO {

    private final List<URL> jarUrlList;
    private final List<URL> classPathList;
    private File libDir;
    private final File workSpacePath;

    public LocalWorkSpaceBO() throws SscSqlWorkSpaceException{
        try {
            jarUrlList = new LinkedList<>();
            classPathList = new LinkedList<>();
            workSpacePath = Files.createTempDirectory("ssc-").toFile();
            log.info("创建临时工作目录{}",workSpacePath);
        }catch (Exception e){
            throw new SscSqlWorkSpaceException("临时目录创建失败",e);
        }
    }

    @Override
    public void close() {
        log.info("删除环境{}，{}", workSpacePath, workSpacePath.exists() && workSpacePath.delete() ? "成功" : "失败");
    }

    @Override
    protected void init() throws IOException {
        libDir = new File(workSpacePath, "lib");
        if (!libDir.exists() && libDir.mkdirs()){
            log.debug("建立lib文件夹={}",libDir);
        }
        classPathList.add(libDir.toURI().toURL());
        classPathList.add(workSpacePath.toURI().toURL());
    }

    @Override
    protected void copyConf(String defaultMetastoreConfig, String content) throws IOException {
        if (StringUtils.hasText(defaultMetastoreConfig)){
            File configFile = new File(workSpacePath, getMetastoreFileName());
            if (configFile.createNewFile()){
                FileUtils.writeFileUtf8(configFile, defaultMetastoreConfig);
            }
        }

        if (StringUtils.hasText(content)){
            File sqlFile = new File(workSpacePath, "app-content");
            if (sqlFile.createNewFile()) {
                FileUtils.writeFileUtf8(sqlFile, content);
            }
        }
        log.info("拷贝配置完毕");
    }

    @Override
    protected void copyJar(List<Path> jarList) throws IOException {
        for (Path jarPath : jarList) {
            File file = new File(libDir, jarPath.getName());
            jarUrlList.add(file.toURI().toURL());
            FileUtils.copy(jarPath, Path.fromLocalFile(file), false);
        }
        log.info("拷贝jar包完毕");
    }

    public List<URL> getJarUrlList(){
        return jarUrlList;
    }

    public List<URL> getClassPaths(){
        return classPathList;
    }

    public String getWorkSpacePath(){
        return workSpacePath.toString();
    }
}
