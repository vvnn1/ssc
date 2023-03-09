package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.net.JobApi;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class JobIdValueProvider implements ValueProvider {
    private final JobApi jobApi;

    public JobIdValueProvider(JobApi jobApi) {
        this.jobApi = jobApi;
    }

    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {
        return jobApi.listJob().stream()
                .map(job -> new CompletionProposal(job.getId()).displayText(job.getJobName()))
                .collect(Collectors.toList());
    }
}
