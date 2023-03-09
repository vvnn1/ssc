package com.github.martvey.cli.shell.provider;

import org.springframework.core.MethodParameter;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class YarnDeploymentTargetProvider implements ValueProvider {

    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        return Arrays.stream(YarnDeploymentTarget.values())
                .map(target -> new CompletionProposal(target.name()).displayText(target.desc))
                .collect(Collectors.toList());
    }

    enum YarnDeploymentTarget {
        PER_JOB("yarn-per-job"),
        SESSION("yarn-session"),
        APPLICATION("yarn-application");
        private final String desc;

        YarnDeploymentTarget(String desc) {
            this.desc = desc;
        }
    }
}
