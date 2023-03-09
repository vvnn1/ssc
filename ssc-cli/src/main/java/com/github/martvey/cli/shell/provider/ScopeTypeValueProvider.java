package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.constant.ScopeEnum;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
public class ScopeTypeValueProvider implements ValueProvider {
    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        LinkedList<CompletionProposal> result = new LinkedList<>();
        result.add(new CompletionProposal(ScopeEnum.SPACE.name()).displayText(ScopeEnum.SPACE.getDesc()));
        result.add(new CompletionProposal(ScopeEnum.PROJECT.name()).displayText(ScopeEnum.PROJECT.getDesc()));
        result.add(new CompletionProposal(ScopeEnum.APPLICATION.name()).displayText(ScopeEnum.APPLICATION.getDesc()));
        return result;
    }
}
