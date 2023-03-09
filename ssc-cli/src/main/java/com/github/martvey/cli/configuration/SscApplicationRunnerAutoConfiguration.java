package com.github.martvey.cli.configuration;

import com.github.martvey.cli.service.UserService;
import org.jline.reader.LineReader;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.shell.DefaultShellApplicationRunner;
import org.springframework.shell.ShellRunner;
import org.springframework.shell.boot.SpringShellProperties;

import java.util.List;

@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties(SpringShellProperties.class)
public class SscApplicationRunnerAutoConfiguration {
    @Bean
    public DefaultShellApplicationRunner defaultShellApplicationRunner(List<ShellRunner> shellRunners,
                                                                       UserService userService,
                                                                       LineReader lineReader) {
        return new LoginShellApplicationRunner(shellRunners, userService, lineReader);
    }
}
