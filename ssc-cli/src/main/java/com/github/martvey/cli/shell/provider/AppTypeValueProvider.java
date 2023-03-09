package com.github.martvey.cli.shell.provider;

import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AppTypeValueProvider implements ValueProvider {
    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        List<CompletionProposal> list = new ArrayList<>();
        list.add(new CompletionProposal("JAR").displayText("JAR"));
        list.add(new CompletionProposal("SQL").displayText("SQL"));
        return list;
    }
}
