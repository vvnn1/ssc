package com.github.martvey.cli.configuration;

import com.github.martvey.cli.exception.SscCliException;
import com.github.martvey.cli.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.jline.reader.LineReader;
import org.jline.reader.UserInterruptException;
import org.jline.utils.AttributedString;
import org.jline.utils.AttributedStyle;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.DefaultApplicationArguments;
import org.springframework.core.annotation.Order;
import org.springframework.shell.DefaultShellApplicationRunner;
import org.springframework.shell.ShellRunner;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Order(DefaultShellApplicationRunner.PRECEDENCE)
@Slf4j
public class LoginShellApplicationRunner extends DefaultShellApplicationRunner {
    @Value("${ssc.username:#{null}}")
    private String username;
    @Value("${ssc.password:#{null}}")
    private String password;

    private final UserService userService;
    private final LineReader lineReader;

    public LoginShellApplicationRunner(List<ShellRunner> shellRunners, UserService userService, LineReader lineReader) {
        super(shellRunners);
        this.userService = userService;
        this.lineReader = lineReader;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Object username = getOptionValueByName("username", args);
        if (!ObjectUtils.isEmpty(username)) {
            this.username = String.valueOf(username);
            args = removeOptionByName("username", args);
        }

        Object password = getOptionValueByName("password", args);
        if (!ObjectUtils.isEmpty(password)) {
            this.password = String.valueOf(password);
            args = removeOptionByName("password", args);
        }

        while (true) {
            try {
                while (ObjectUtils.isEmpty(this.username)) {
                    this.username = lineReader.readLine("请输入用户名称:");
                    this.password = null;
                }

                while (ObjectUtils.isEmpty(this.password)) {
                    this.password = lineReader.readLine("请输入用户密码:", '*');
                }

                userService.login(this.username, this.password);
                break;
            } catch (UserInterruptException e) {
                System.exit(0);
            } catch (SscCliException e) {
                lineReader.printAbove(new AttributedString(e.getMessage(), AttributedStyle.DEFAULT.foreground(AttributedStyle.RED)));
                this.username = null;
                this.password = null;
            }
        }

        super.run(args);
    }

    private ApplicationArguments removeOptionByName(String optionName, ApplicationArguments args) {
        if (!args.containsOption(optionName)) {
            return new DefaultApplicationArguments(args.getSourceArgs());
        }

        if (!CollectionUtils.isEmpty(args.getOptionValues(optionName))) {
            String[] sourceArgs = args.getSourceArgs();
            String[] newArgs = new String[sourceArgs.length - 1];
            for (int i = 0, j = 0; i < sourceArgs.length; i++) {
                if (!sourceArgs[i].startsWith(optionName)) {
                    newArgs[j] = sourceArgs[i];
                    j++;
                }
            }
            return new DefaultApplicationArguments(newArgs);
        }

        optionName = optionName.startsWith("--") ? optionName : "--" + optionName;

        String[] sourceArgs = args.getSourceArgs();
        String[] newArgs = new String[sourceArgs.length];

        int newLength = 0;
        for (int i = 0, j = 0, skip = 0; i < sourceArgs.length; i++) {
            if (Objects.equals(sourceArgs[i], optionName)) {
                skip = 1;
            } else if (skip == 1 && sourceArgs[i].startsWith("--")) {
                skip = 0;
            }

            if (skip == 0) {
                newArgs[j] = sourceArgs[i];
                newLength = ++j;
            }
        }
        return new DefaultApplicationArguments(Arrays.copyOf(newArgs, newLength));
    }

    private Object getOptionValueByName(String optionName, ApplicationArguments args) {
        if (!args.containsOption(optionName)) {
            return null;
        }

        List<String> optionValues = args.getOptionValues(optionName);
        if (!CollectionUtils.isEmpty(optionValues)) {
            if (optionValues.size() == 1) {
                String value = optionValues.get(0);
                return parseSingleValue(value);
            }
            return optionValues;
        }

        optionName = optionName.startsWith("--") ? optionName : "--" + optionName;
        String[] sourceArgs = args.getSourceArgs();
        int argIndex = -1;
        int valueIndex = -1;

        for (int i = 0; i < sourceArgs.length; i++) {
            if (Objects.equals(optionName, sourceArgs[i])) {
                if (argIndex > -1) {
                    throw new IllegalArgumentException("bad [" + optionName + "] in args: " + Arrays.toString(args.getSourceArgs()));
                }
                argIndex = i;
            } else if (argIndex > -1 && sourceArgs[i].startsWith("--")) {
                valueIndex = i;
            }
        }

        String[] sourceValues;
        if (valueIndex == -1) {
            sourceValues = new String[sourceArgs.length - argIndex - 1];
        } else {
            sourceValues = new String[valueIndex - argIndex - 1];
        }

        if (sourceValues.length == 0) {
            return true;
        }

        System.arraycopy(sourceArgs, argIndex + 1, sourceValues, 0, sourceValues.length);

        if (sourceValues.length == 1) {
            return parseSingleValue(sourceValues[0]);
        }

        return Collections.unmodifiableList(Arrays.asList(sourceValues));
    }

    private Object parseSingleValue(String value) {
        if (value.equalsIgnoreCase("true") || value.equalsIgnoreCase("false")) {
            return Boolean.parseBoolean(value);
        }
        return value;
    }
}
