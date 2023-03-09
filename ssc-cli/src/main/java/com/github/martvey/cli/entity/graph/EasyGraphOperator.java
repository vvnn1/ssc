package com.github.martvey.cli.entity.graph;

import com.github.martvey.cli.exception.SscCliException;
import lombok.extern.slf4j.Slf4j;
import org.jline.terminal.Terminal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.util.Arrays;
import java.util.List;

/**
 * @author martvey
 * @date 2022/7/13 14:13
 */
@Component
@Slf4j
public class EasyGraphOperator {
    @Value("${server.path:.}")
    private String serverPath;
    private final Terminal terminal;

    public EasyGraphOperator(@Lazy Terminal terminal) {
        this.terminal = terminal;
    }

    public void printGraph(String easyGraphPlan) {
        terminal.pause();
        File tempFile = null;
        try {
            tempFile = File.createTempFile("ssc_", ".tmp");
            FileCopyUtils.copy(easyGraphPlan.getBytes(), tempFile);
            String osName = System.getProperty("os.name");
            List<String> cmdList;
            if (osName.startsWith("Windows")) {
                cmdList = Arrays.asList("cmd", "/c", "graph-easy.exe", tempFile.getPath());
            } else {
                cmdList = Arrays.asList("bash", "-c", "graph-easy", tempFile.getPath());
            }

            Process process = new ProcessBuilder(cmdList)
                    .directory(new File(serverPath, "ext"))
                    .start();

            process.waitFor();
            if (process.exitValue() != 0) {
                String errorMessage = FileCopyUtils.copyToString(new InputStreamReader(process.getErrorStream()));
                log.error("绘制执行计划错误，message={}", errorMessage);
                throw new SscCliException("系统异常");
            }
            String graphPlan = FileCopyUtils.copyToString(new InputStreamReader(process.getInputStream()));
            terminal.writer().print(graphPlan);
            process.destroy();
        } catch (IOException | InterruptedException e) {
            throw new SscCliException("系统异常", e);
        } finally {
            if (tempFile != null){
                log.trace("删除临时文件 {}， 结果：{}", tempFile, tempFile.delete());
            }
            terminal.resume();
        }
    }
}
