package com.github.martvey.cli.util;

import com.github.martvey.cli.constant.ScopeEnum;
import com.github.martvey.cli.exception.SscCliException;
import com.github.martvey.cli.service.CatalogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.function.BiConsumer;

@Component
public class CatalogUtils {
    private static CatalogManager catalogManager;

    public static void doInMinScope(String spaceId, String projectId, String appId, BiConsumer<ScopeEnum, String> consumer){
        if (StringUtils.hasText(appId)){
            consumer.accept(ScopeEnum.APPLICATION, appId);
            return;
        }

        if (StringUtils.hasText(projectId)){
            consumer.accept(ScopeEnum.APPLICATION, appId);
            return;
        }

        if (StringUtils.hasText(spaceId)){
            consumer.accept(ScopeEnum.SPACE, spaceId);
            return;
        }

        String currentAppId = catalogManager.getCurrentAppId();
        if (StringUtils.hasText(currentAppId)){
            consumer.accept(ScopeEnum.APPLICATION, currentAppId);
            return;
        }

        String currentProjectId = catalogManager.getCurrentProjectId();
        if (StringUtils.hasText(currentProjectId)){
            consumer.accept(ScopeEnum.PROJECT, currentProjectId);
            return;
        }

        String currentSpaceId = catalogManager.getCurrentSpaceId();
        if (StringUtils.hasText(currentSpaceId)){
            consumer.accept(ScopeEnum.SPACE, currentSpaceId);
            return;
        }

        throw new SscCliException("没有指定范围");
    }

    public static String getDefaultSpaceId(){
        if (!catalogManager.hadUseSpace()){
            throw new SscCliException("没有指定空间");
        }
        return catalogManager.getCurrentSpaceId();
    }

    public static String getDefaultProjectId(){
        if (!catalogManager.hadUseProject()){
            throw new SscCliException("没有指定工程");
        }
        return catalogManager.getCurrentProjectId();
    }

    public static String getDefaultAppId(){
        if (!catalogManager.hadUseApp()){
            throw new SscCliException("没有指定应用");
        }
        return catalogManager.getCurrentAppId();
    }

    public static boolean isSpaceInUse(String spaceId){
        if (StringUtils.hasText(spaceId)){
            return spaceId.equals(catalogManager.getCurrentSpaceId());
        }
        return false;
    }

    public static boolean isProjectInUse(String projectId){
        if (StringUtils.hasText(projectId)){
            return projectId.equals(catalogManager.getCurrentProjectId());
        }
        return false;
    }

    public static boolean isAppInUse(String appId){
        if (StringUtils.hasText(appId)){
            return appId.equals(catalogManager.getCurrentAppId());
        }
        return false;
    }

    @Autowired
    public void setCatalogManager(CatalogManager catalogManager) {
        CatalogUtils.catalogManager = catalogManager;
    }
}
