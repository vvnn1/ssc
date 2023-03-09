package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.net.AppApi;
import com.github.martvey.cli.service.CatalogManager;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AppIdValueProvider implements ValueProvider {
    private final AppApi appApi;
    private final CatalogManager catalogManager;

    public AppIdValueProvider(AppApi appApi, CatalogManager catalogManager) {
        this.appApi = appApi;
        this.catalogManager = catalogManager;
    }

    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        if (catalogManager.hadUseProject()){
            String projectId = catalogManager.getCurrentProjectId();
            return appApi.listApp(projectId)
                    .stream()
                    .map(table -> new CompletionProposal(table.getId()).displayText(table.getAppName()))
                    .collect(Collectors.toList());
        }

        return Collections.emptyList();
    }
}
