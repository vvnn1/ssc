package com.github.martvey.ssc.entity.bo;

import com.github.martvey.ssc.exception.SscSqlWorkSpaceException;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.core.fs.*;
import org.springframework.util.StringUtils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileAlreadyExistsException;
import java.util.List;
import java.util.jar.Attributes;
import java.util.jar.JarEntry;
import java.util.jar.JarOutputStream;
import java.util.jar.Manifest;

@Slf4j
public class JarWorkSpaceBO extends WorkSpaceBO {
    private final Path targetJarPath;
    private final Manifest manifest;
    private JarOutputStream jos;
    private static final char SEP = '/';
    private static final int BUFFER_SIZE = 2156;
    private static final byte[] mBuffer = new byte[BUFFER_SIZE];
    private FSDataOutputStream fos;

    private JarWorkSpaceBO(Path targetJarPath, String version, String mainClass) throws SscSqlWorkSpaceException {
        try {
            this.targetJarPath = targetJarPath;
            this.manifest = new Manifest();
            Attributes attributes = manifest.getMainAttributes();
            attributes.put(Attributes.Name.MAIN_CLASS, mainClass);
            attributes.put(Attributes.Name.MANIFEST_VERSION, version);
        }catch (Exception e){
            throw new SscSqlWorkSpaceException("构建项目空间错误", e);
        }
    }

    @Override
    public void close() {
        try {
            if (jos != null){
                jos.close();
            }
            if (fos != null){
                fos.close();
            }
        }catch (IOException e){
            log.error("关闭jar流错误",e);
        }

    }



    @Override
    protected void init() throws IOException {
        FileSystem targetJarFs = FileSystem.getUnguardedFileSystem(targetJarPath.toUri());
        if (targetJarFs.exists(targetJarPath)) {
            throw new FileAlreadyExistsException("jar文件已存在" + targetJarPath);
        }
        fos = targetJarFs.create(targetJarPath, FileSystem.WriteMode.OVERWRITE);
        jos = new JarOutputStream(fos, manifest);
        mkJarPath(jos,"lib/");
    }

    @Override
    protected void copyConf(String defaultMetastoreConfig, String content) throws IOException {
        if (StringUtils.hasText(content)){
            byte[] contentBytes = content.getBytes(StandardCharsets.UTF_8);
            try (ByteArrayInputStream contentInputStream = new ByteArrayInputStream(contentBytes)){
                writeStream2Jar(contentInputStream, "app-content");
            }
        }

        if (StringUtils.hasText(content)){
            byte[] metastoreBytes = defaultMetastoreConfig.getBytes(StandardCharsets.UTF_8);
            try (ByteArrayInputStream metastoreInputStream = new ByteArrayInputStream(metastoreBytes)){
                writeStream2Jar(metastoreInputStream, getMetastoreFileName());
            }
        }
        log.info("拷贝配置完毕");
    }

    @Override
    protected void copyJar(List<Path> jarList) throws IOException {
        for (Path jarPath : jarList) {
            FileSystem sourceJarFs = FileSystem.getUnguardedFileSystem(jarPath.toUri());
            jarDir(jarPath, sourceJarFs, jos, "lib/");
        }
        log.info("拷贝jar包完毕");
    }
    
    private void mkJarPath(JarOutputStream jos, String path) throws IOException {
        JarEntry je = new JarEntry(path);
        jos.putNextEntry(je);
        jos.flush();
        jos.closeEntry();
    }

    private void jarDir(Path dirOrFile2jar,FileSystem sourceFs, JarOutputStream jos, String path)
            throws IOException {
        log.debug("checking {}", dirOrFile2jar);
        
        FileStatus fileStatus = sourceFs.getFileStatus(dirOrFile2jar);
        if (fileStatus.isDir()) {

            FileStatus[] dirList = sourceFs.listStatus(dirOrFile2jar);
            String subPath = (path == null) ? "" : (path + dirOrFile2jar.getName() + SEP);
            if (path != null) {
               mkJarPath(jos,subPath);
            }
            for (FileStatus status : dirList) {
                jarDir(status.getPath(), sourceFs, jos, subPath);
            }
        } else if (sourceFs.exists(dirOrFile2jar)) {
            log.debug("adding {}", dirOrFile2jar.getPath());

            try (FSDataInputStream fis = sourceFs.open(dirOrFile2jar)){
                writeStream2Jar(fis, path + dirOrFile2jar.getName());
            }
        }
    }

    private void writeStream2Jar(InputStream is, String filePath) throws IOException {
        JarEntry entry = new JarEntry(filePath);
        jos.putNextEntry(entry);
        int mByteCount;
        while ((mByteCount = is.read(mBuffer)) != -1) {
            jos.write(mBuffer, 0, mByteCount);
        }
        jos.flush();
        jos.closeEntry();
    }

    public Path getTargetJarPath(){
        return targetJarPath;
    }



    public static Builder builder(){
        return new Builder();
    }

    public static class Builder{
        private String basePath;
        private String spaceId;
        private String projectId;
        private String appId;
        private String appName;
        private String version;
        private String mainClass;

        public Builder basePath(String basePath){
            this.basePath = basePath;
            return this;
        }

        public Builder spaceId(String spaceId){
            this.spaceId = spaceId;
            return this;
        }

        public Builder projectId(String applicationId){
            this.projectId = applicationId;
            return this;
        }

        public Builder appId(String appId){
            this.appId = appId;
            return this;
        }

        public Builder appName(String appName){
            this.appName = appName;
            return this;
        }

        public Builder version(String version){
            this.version = version;
            return this;
        }

        public Builder mainClass(String mainClass){
            this.mainClass = mainClass;
            return this;
        }

        public JarWorkSpaceBO build() throws SscSqlWorkSpaceException {
            String jarSubName = String.join("/", spaceId, projectId, appId, version,appName + "-" + version + ".jar");
            return new JarWorkSpaceBO(new Path(basePath, jarSubName), version, mainClass);
        }
    }
}
