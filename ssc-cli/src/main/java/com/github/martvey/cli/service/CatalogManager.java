package com.github.martvey.cli.service;

import com.github.martvey.cli.constant.ScopeEnum;
import org.springframework.shell.table.Table;

public interface CatalogManager {
    void useSpace(String id);
    void useProject(String id);
    void useApp(String id);

    Table currentUsed();
    String getCurrentId(ScopeEnum scopeType);
    String getCurrentName(ScopeEnum scopeType);
    String getCurrentSpaceId();
    String getCurrentProjectId();
    String getCurrentAppId();
    String getCurrentSpaceName();
    String getCurrentProjectName();
    String getCurrentAppName();
    Boolean hadUseSpace();
    Boolean hadUseProject();
    Boolean hadUseApp();
}
