package com.github.martvey.cli.entity.vim;

import com.github.martvey.cli.exception.SscCliException;
import lombok.extern.slf4j.Slf4j;
import org.jline.terminal.Terminal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;

import javax.annotation.PreDestroy;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.*;

/**
 * @author martvey
 * @date 2022/5/25 17:22
 */
@Component
@Slf4j
public class VimOperator {
    private static final int EXIT_NORMAL = 0;
    private final ExecutorService executorService;
    @Value("${server.path:.}")
    private String serverPath;
    private final Terminal terminal;

    public VimOperator(@Lazy Terminal terminal) {
        this.terminal = terminal;
        executorService = Executors.newCachedThreadPool(r -> {
            Thread thread = new Thread(r);
            thread.setName("Vim-Thread");
            return thread;
        });
    }


    public String openVimAndReceive(String initContent) {
        File tempFile = null;
        terminal.pause();
        try {
            tempFile = File.createTempFile("ssc_",".tmp");
            if (StringUtils.hasText(initContent)){
                FileCopyUtils.copy(initContent, new FileWriter(tempFile));
            }

            List<String> cmdList;

            String osName = System.getProperty("os.name");
            if (osName.startsWith("Windows")) {
                cmdList = Arrays.asList("cmd","/c","vim.exe", tempFile.getAbsolutePath());
            } else {
                cmdList = Arrays.asList("bash","-c","vim.sh", tempFile.getAbsolutePath());
            }

            Future<Integer> submit = executorService.submit(() -> {
                Process process = new ProcessBuilder(cmdList)
                        .inheritIO()
                        .directory(new File(serverPath, "ext"))
                        .start();
                process.waitFor();
                process.destroy();
                return process.exitValue();
            });

            Integer exitCode = submit.get();

            if (exitCode != EXIT_NORMAL){
                log.error("vim退出失败，exitCode={}", exitCode);
                throw new SscCliException("读取输入错误");
            }

            return FileCopyUtils.copyToString(new FileReader(tempFile));
        } catch (IOException e){
            log.error("创建临时文件错误",e);
            throw new SscCliException("系统异常");
        }catch (ExecutionException |InterruptedException e) {
            log.error("调用vim错误",e);
            throw new SscCliException("读取输入错误");
        } finally {
            if (tempFile != null) {
                log.trace("删除临时文件 {}，结果：{}", tempFile, tempFile.delete());
            }
            terminal.resume();
        }
    }

    @PreDestroy
    public void destroy(){
        executorService.shutdown();
    }
}
