package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.net.JarApi;
import com.github.martvey.cli.service.CatalogManager;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class JarIdValueProvider implements ValueProvider {
    private final JarApi jarApi;
    private final CatalogManager catalogManager;

    public JarIdValueProvider(JarApi jarApi, CatalogManager catalogManager) {
        this.jarApi = jarApi;
        this.catalogManager = catalogManager;
    }

    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        return jarApi.listJar(catalogManager.getCurrentSpaceId(), catalogManager.getCurrentProjectId(), catalogManager.getCurrentAppId())
                .stream()
                .map(table -> new CompletionProposal(table.getId()).displayText(table.getJarName()).category(table.getScopeType()))
                .collect(Collectors.toList());
    }
}
