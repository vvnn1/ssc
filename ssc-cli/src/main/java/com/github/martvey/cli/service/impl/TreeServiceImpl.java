package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.constant.MetastoreEnum;
import com.github.martvey.cli.constant.ScopeEnum;
import com.github.martvey.cli.entity.tree.TreeNode;
import com.github.martvey.cli.entity.tree.TreePrinter;
import com.github.martvey.cli.exception.SscCliException;
import com.github.martvey.cli.net.*;
import com.github.martvey.cli.service.CatalogManager;
import com.github.martvey.cli.service.TreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TreeServiceImpl implements TreeService {
    private final CatalogManager catalogManager;
    private final SpaceApi spaceApi;
    private final ProjectApi projectApi;
    private final MetastoreApi metastoreApi;
    private final JarApi jarApi;
    private final AppApi appApi;
    private final TreePrinter treePrinter;


    @Override
    public void printTree() {
        List<TreeNode> treeNodeList = buildTree(ScopeEnum.SPACE);
        treePrinter.title("SPACE")
                .print(treeNodeList);
    }


    private List<TreeNode> buildTree(ScopeEnum scopeEnum) {
        List<TreeNode> nodeList = listScopeTreeNode(scopeEnum);
        for (TreeNode treeNode : nodeList) {
            if (treeNode.getId().equals(catalogManager.getCurrentId(scopeEnum))) {
                ScopeEnum next = nextScope(scopeEnum);
                if (next == null){
                    treeNode.setTreeNodeList(getMetastoreTreeNode(scopeEnum));
                } else {
                    TreeNode nextTreeNode = new TreeNode(next.name(), buildTree(next));
                    treeNode.setTreeNodeList(getMetastoreTreeNode(scopeEnum, nextTreeNode));
                }

            }
        }
        return nodeList;
    }

    private ScopeEnum nextScope(ScopeEnum scopeEnum) {
        ScopeEnum[] scopeEnums = ScopeEnum.values();
        for (int i = 0; i < scopeEnums.length; i++) {
            if (scopeEnums[i] == scopeEnum && i + 1 < scopeEnums.length) {
                return scopeEnums[i + 1];
            }
        }
        return null;
    }

    private List<TreeNode> listScopeTreeNode(ScopeEnum scopeType) {
        switch (scopeType) {
            case SPACE:
                return spaceApi.listSpace()
                        .stream()
                        .map(table -> new TreeNode(table.getId(), table.getSpaceName()))
                        .collect(Collectors.toList());
            case PROJECT:
                return projectApi.listProject(catalogManager.getCurrentSpaceId())
                        .stream()
                        .map(table -> new TreeNode(table.getId(), table.getProjectName()))
                        .collect(Collectors.toList());
            case APPLICATION:
                return appApi.listApp(catalogManager.getCurrentProjectId())
                        .stream()
                        .map(table -> new TreeNode(table.getId(), table.getAppName()))
                        .collect(Collectors.toList());
            default:
                return Collections.emptyList();
        }
    }

    private List<TreeNode> getMetastoreTreeNode(ScopeEnum scopeType, TreeNode preNode) {
        List<TreeNode> list = new LinkedList<>();
        list.add(preNode);
        list.addAll(getMetastoreTreeNode(scopeType));
        return list;
    }

    private List<TreeNode> getMetastoreTreeNode(ScopeEnum scopeType) {
        String id = catalogManager.getCurrentId(scopeType);
        if (ObjectUtils.isEmpty(id)) {
            return Collections.emptyList();
        }
        String[] params = getIdParams(scopeType, id);

        List<TreeNode> list = new LinkedList<>();

        List<TreeNode> tableNodeList = metastoreApi.listMetastore(MetastoreEnum.TABLE, params[0], params[1], params[2])
                .stream()
                .map(table -> new TreeNode(table.getName()))
                .collect(Collectors.toList());
        if (!CollectionUtils.isEmpty(tableNodeList)){
            list.add(new TreeNode("TABLE", tableNodeList));
        }

        List<TreeNode> functionNodeList = metastoreApi.listMetastore(MetastoreEnum.FUNCTION, params[0], params[1], params[2])
                .stream()
                .map(table -> new TreeNode(table.getName()))
                .collect(Collectors.toList());
        if (!CollectionUtils.isEmpty(functionNodeList)){
            list.add(new TreeNode("FUNCTION", functionNodeList));
        }

        List<TreeNode> jarNodeList = jarApi.listJar(params[0], params[1], params[2])
                .stream()
                .map(table -> new TreeNode(table.getJarName()))
                .collect(Collectors.toList());
        if (!CollectionUtils.isEmpty(jarNodeList)){
            list.add(new TreeNode("JAR", jarNodeList));
        }

        return list;
    }

    private String[] getIdParams(ScopeEnum scopeType, String id) {
        switch (scopeType) {
            case SPACE:
                return new String[]{id, null, null};
            case PROJECT:
                return new String[]{null, id, null};
            case APPLICATION:
                return new String[]{null, null, id};
            default:
                throw new SscCliException("错误的范围类型");
        }
    }
}
