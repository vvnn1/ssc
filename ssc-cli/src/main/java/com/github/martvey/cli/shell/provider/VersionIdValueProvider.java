package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.net.VersionApi;
import com.github.martvey.cli.service.CatalogManager;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author martvey
 * @date 2022/5/11 21:28
 */
@Component
public class VersionIdValueProvider implements ValueProvider {
    private final VersionApi versionApi;
    private final CatalogManager catalogManager;


    public VersionIdValueProvider(VersionApi versionApi, CatalogManager catalogManager) {
        this.versionApi = versionApi;
        this.catalogManager = catalogManager;
    }

    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        if (!catalogManager.hadUseApp()){
            return Collections.emptyList();
        }
        String currentAppId = catalogManager.getCurrentAppId();
        return versionApi.listVersion(currentAppId)
                .stream()
                .map(version -> new CompletionProposal(version.getId()).displayText(version.getVersion()))
                .collect(Collectors.toList());
    }
}
