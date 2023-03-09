package com.github.martvey.cli.util;

import com.github.martvey.cli.exception.SscCliException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

@Slf4j
public class FileUtils {
    public static String copyToString(File file){
        try {
            return FileCopyUtils.copyToString(new FileReader(file));
        } catch (FileNotFoundException ignore) {
        } catch (IOException e) {
            log.error("读取文件错误, file={}", file, e);
            throw new SscCliException("文件读取错误");
        }
        return null;
    }
}
