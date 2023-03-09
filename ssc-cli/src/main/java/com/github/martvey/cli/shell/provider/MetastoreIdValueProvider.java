package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.constant.MetastoreEnum;
import com.github.martvey.cli.service.CatalogManager;
import com.github.martvey.cli.service.MetastoreService;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author martvey
 * @date 2022/5/29 18:48
 */
@Component
public class MetastoreIdValueProvider implements ValueProvider {
    private final MetastoreService metastoreService;
    private final CatalogManager catalogManager;

    public MetastoreIdValueProvider(MetastoreService metastoreService, CatalogManager catalogManager) {
        this.metastoreService = metastoreService;
        this.catalogManager = catalogManager;
    }

    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        List<String> words = completionContext.getWords();
        for (int i = 0; i < words.size(); i++) {
            if ("--metastore-type".equals(words.get(i)) && i+1 < words.size()){
                String metastoreType = words.get(i + 1);
                MetastoreEnum metastoreEnum = MetastoreEnum.valueOf(metastoreType);
                return metastoreService.listMetastore(metastoreEnum, catalogManager.getCurrentSpaceId(), catalogManager.getCurrentProjectId(), catalogManager.getCurrentAppId())
                        .stream()
                        .map(metastoreTable -> {
                            CompletionProposal completionProposal = new CompletionProposal(metastoreTable.getId());
                            if (metastoreEnum == MetastoreEnum.TABLE || metastoreEnum == MetastoreEnum.FUNCTION
                                    || metastoreEnum == MetastoreEnum.CATALOG || metastoreEnum == MetastoreEnum.MODULE){
                                completionProposal.displayText(metastoreTable.getName());
                            }
                            return completionProposal;
                        })
                        .collect(Collectors.toList());
            }
        }
        return Collections.emptyList();
    }
}
