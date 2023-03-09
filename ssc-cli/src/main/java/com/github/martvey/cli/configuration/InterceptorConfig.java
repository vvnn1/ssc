package com.github.martvey.cli.configuration;

import com.github.martvey.cli.cmd.CmdExceptionHandler;
import org.springframework.aop.aspectj.AspectJExpressionPointcut;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InterceptorConfig {
    @Bean
    public DefaultPointcutAdvisor defaultPointcutAdvisor(){
        CmdExceptionHandler handler = new CmdExceptionHandler();
        AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
        pointcut.setExpression("within(com.github.martvey.cli.cmd.*)");

        DefaultPointcutAdvisor defaultPointcutAdvisor = new DefaultPointcutAdvisor();
        defaultPointcutAdvisor.setPointcut(pointcut);
        defaultPointcutAdvisor.setAdvice(handler);
        return defaultPointcutAdvisor;
    }
}
