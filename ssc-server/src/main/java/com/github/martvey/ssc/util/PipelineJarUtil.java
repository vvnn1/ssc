package com.github.martvey.ssc.util;

import org.apache.flink.core.fs.FileSystem;
import org.apache.flink.core.fs.Path;
import org.apache.flink.util.FileUtils;
import org.apache.flink.util.Preconditions;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

/**
 * @author martvey
 * @date 2022/6/25 16:50
 */
public class PipelineJarUtil {
    private static final String TEMP_JOB_DIR_PREFIX = "ssc_job_";

    public static File downloadJar(String pipelineJar) throws IOException {
        Path pipelineJarPath = new Path(pipelineJar);
        FileSystem dfsFileSystem = FileSystem.getUnguardedFileSystem(pipelineJarPath.toUri());

        Preconditions.checkArgument(dfsFileSystem.exists(pipelineJarPath), "文件不存在" + pipelineJarPath);

        File tempJarDir = Files.createTempDirectory(TEMP_JOB_DIR_PREFIX).toFile();
        File tempJarFile = new File(tempJarDir, pipelineJarPath.getName());

        FileUtils.copy(pipelineJarPath, Path.fromLocalFile(tempJarFile), false);
        return tempJarFile;
    }
}
