package com.github.martvey.cli.entity.tree;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;


@Getter
@Setter
@ToString
public class TreeNode {
    private String id;
    private String name;
    private List<TreeNode> treeNodeList;

    public TreeNode() {
    }

    public TreeNode(String name) {
        this.name = name;
    }

    public TreeNode(String name, List<TreeNode> treeNodeList) {
        this.name = name;
        this.treeNodeList = treeNodeList;
    }

    public TreeNode(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public TreeNode(String id, String name, List<TreeNode> treeNodeList) {
        this.id = id;
        this.name = name;
        this.treeNodeList = treeNodeList;
    }
}
