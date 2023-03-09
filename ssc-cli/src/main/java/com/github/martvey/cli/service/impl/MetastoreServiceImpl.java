package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.constant.MetastoreEnum;
import com.github.martvey.cli.entity.metastore.*;
import com.github.martvey.cli.entity.request.PMetastoreReuqest;
import com.github.martvey.cli.entity.request.UMetastoreRequest;
import com.github.martvey.cli.entity.vim.VimOperator;
import com.github.martvey.cli.exception.SscCliException;
import com.github.martvey.cli.net.MetastoreApi;
import com.github.martvey.cli.service.MetastoreService;
import com.github.martvey.cli.util.FileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jline.terminal.Terminal;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MetastoreServiceImpl implements MetastoreService {
    private final MetastoreApi metastoreApi;
    private final VimOperator vimOperator;
    @Lazy
    private final Terminal terminal;

    @Override
    public void createMetastore(MetastoreEnum metastoreType, File yamlFile, String scopeType, String scopeId) {
        String metastoreYml = yamlFile == null ? vimOperator.openVimAndReceive(null) : FileUtils.copyToString(yamlFile);
        if (ObjectUtils.isEmpty(metastoreYml)){
            throw new SscCliException("添加失败，元数据内容为空");
        }
        metastoreApi.createMetastore(new PMetastoreReuqest(scopeId, scopeType, metastoreType.name(), metastoreYml));
    }

    @Override
    public void updateMetastore(String id, MetastoreEnum metastoreType, File yamlFile, String scopeType, String scopeId) {
        MetastoreTable metastore = metastoreApi.getMetastore(metastoreType, id);
        String metastoreYml = yamlFile == null ? vimOperator.openVimAndReceive(metastore.getSourceYaml()) : FileUtils.copyToString(yamlFile);
        if (ObjectUtils.isEmpty(metastoreYml)){
            throw new SscCliException("添加失败，元数据内容为空");
        }
        metastoreApi.updateMetastore(new UMetastoreRequest(id, scopeId, scopeType, metastoreType.name(), metastoreYml));
    }

    @Override
    public List<? extends MetastoreTable> listMetastore(MetastoreEnum metastoreType, String spaceId, String projectId, String appId) {
        return metastoreType.listMetastore.apply(spaceId, projectId, appId);
    }

    @Override
    public void deleteMetastore(MetastoreEnum metastoreType, String id) {
        metastoreApi.deleteMetastore(metastoreType, id);
    }

    @Override
    public void printMetastore(MetastoreEnum metastoreType, String id) {
        MetastoreTable metastoreTable = metastoreApi.getMetastore(metastoreType, id);
        if (!ObjectUtils.isEmpty(metastoreTable.getSourceYaml())){
            terminal.writer().println(metastoreTable.getSourceYaml());
        }
    }

    private <T> Function<MetastoreTable, T> convert2(Class<T> clazz){
        return metastoreTable -> {
            try {
                T t = clazz.newInstance();
                BeanUtils.copyProperties(metastoreTable, t);
                return t;
            } catch (InstantiationException | IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        };
    }

    @PostConstruct
    public void init(){
        for (MetastoreEnum metastoreEnum : MetastoreEnum.values()) {
            metastoreEnum.listMetastore = ((spaceId, projectId, appId) ->
                    metastoreApi.listMetastore(metastoreEnum, spaceId, projectId, appId)
                            .stream()
                            .map(convert2(metastoreEnum.getMetastoreClazz()))
                            .collect(Collectors.toList())
            );
        }
    }
}
