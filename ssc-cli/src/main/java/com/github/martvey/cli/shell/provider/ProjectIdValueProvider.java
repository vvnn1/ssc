package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.entity.project.ProjectTable;
import com.github.martvey.cli.net.ProjectApi;
import com.github.martvey.cli.service.CatalogManager;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProjectIdValueProvider implements ValueProvider {
    private final ProjectApi projectApi;
    private final CatalogManager catalogManager;

    public ProjectIdValueProvider(ProjectApi projectApi, CatalogManager catalogManager) {
        this.projectApi = projectApi;
        this.catalogManager = catalogManager;
    }

    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        if (!catalogManager.hadUseSpace()){
            return Collections.emptyList();
        }
        String currentSpaceId = catalogManager.getCurrentSpaceId();
        String currentProjectId = catalogManager.getCurrentProjectId();
        return projectApi.listProject(currentSpaceId)
                .stream()
                .map(table -> buildCompletion(table, currentProjectId))
                .collect(Collectors.toList());
    }

    private CompletionProposal buildCompletion(ProjectTable table, String projectId) {
        CompletionProposal completionProposal = new CompletionProposal(table.getId());
        if (StringUtils.pathEquals(table.getId(), projectId)){
            completionProposal.displayText(table.getProjectName() + "*");
        } else {
            completionProposal.displayText(table.getProjectName());
        }
        return completionProposal;
    }
}
