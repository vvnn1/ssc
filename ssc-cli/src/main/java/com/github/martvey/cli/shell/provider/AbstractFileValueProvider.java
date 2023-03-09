package com.github.martvey.cli.shell.provider;

import org.springframework.core.MethodParameter;
import org.springframework.shell.CompletionContext;
import org.springframework.shell.CompletionProposal;
import org.springframework.shell.standard.ShellOption;
import org.springframework.shell.standard.ValueProvider;

import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import static java.nio.file.FileVisitOption.FOLLOW_LINKS;

public abstract class AbstractFileValueProvider implements ValueProvider {
    @Override
    public List<CompletionProposal> complete(CompletionContext completionContext) {

        String input = completionContext.currentWordUpToCursor();
        int lastSlash = input.lastIndexOf(File.separatorChar);
        Path dir = lastSlash > -1 ? Paths.get(input.substring(0, lastSlash+1)) : Paths.get("");
        String prefix = input.substring(lastSlash + 1);

        try {
            return Files.find(dir, 1, (p, a) -> p.getFileName() != null && isMatchFileOrDir(p) &&p.getFileName().toString().startsWith(prefix), FOLLOW_LINKS)
                    .map(p -> new CompletionProposal(p.toString()))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private boolean isMatchFileOrDir(Path p) {
        File file = p.toFile();
        return file.isDirectory() || fileNameMatch(file.getName());
    }

    protected abstract boolean fileNameMatch(String fileName);
}
