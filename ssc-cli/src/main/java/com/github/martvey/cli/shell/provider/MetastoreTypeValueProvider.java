package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.constant.MetastoreEnum;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author martvey
 * @date 2022/5/14 20:42
 */
@Component
public class MetastoreTypeValueProvider implements ValueProvider {
    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        return Arrays.stream(MetastoreEnum.values())
                .map(metastoreType -> new CompletionProposal(metastoreType.name()))
                .collect(Collectors.toList());
    }
}
