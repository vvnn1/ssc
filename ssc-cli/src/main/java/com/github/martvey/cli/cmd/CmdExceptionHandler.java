package com.github.martvey.cli.cmd;

import com.github.martvey.cli.exception.SscCliException;
import com.github.martvey.cli.util.TableUtils;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.shell.standard.ShellMethod;

public class CmdExceptionHandler implements MethodInterceptor {
    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        if (!invocation.getMethod().isAnnotationPresent(ShellMethod.class)) {
            return invocation.proceed();
        }

        try {
            return invocation.proceed();
        }catch (SscCliException e){
            return TableUtils.execResult(e.getMessage());
        }
    }
}
