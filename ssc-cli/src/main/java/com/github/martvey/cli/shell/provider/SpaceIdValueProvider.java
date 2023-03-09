package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.entity.space.SpaceTable;
import com.github.martvey.cli.net.SpaceApi;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SpaceIdValueProvider implements ValueProvider {

    private final SpaceApi spaceApi;

    public SpaceIdValueProvider(SpaceApi spaceApi) {
        this.spaceApi = spaceApi;
    }

    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        String input = completionContext.currentWordUpToCursor();
        List<SpaceTable> tableList = spaceApi.listSpace();
        return tableList.stream()
                .filter(table -> table.getId().startsWith(input))
                .map(table -> new CompletionProposal(table.getId()).displayText(table.getSpaceName()))
                .collect(Collectors.toList());
    }
}
