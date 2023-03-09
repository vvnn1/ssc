package com.github.martvey.cli.entity.tree;

import org.jline.terminal.Terminal;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.io.PrintWriter;
import java.util.List;


@Component
public class TreePrinter {
    private final PrintWriter printWriter;

    public TreePrinter(@Lazy Terminal terminal) {
        this.printWriter = terminal.writer();
    }

    public TreePrinter title(String name){
        printWriter.println(name);
        printWriter.flush();
        return this;
    }

    public void print(List<TreeNode> nodeList){
        print(nodeList, "");
    }

    private void print(List<TreeNode> nodeList, String prefix){
        if (CollectionUtils.isEmpty(nodeList)){
            return;
        }

        int size = nodeList.size();
        for (int i = 0; i < size; i++) {
            TreeNode currentNode = nodeList.get(i);
            String currentName = currentNode.getName();
            printWriter.println(prefix + "+-- " + currentName);
            printWriter.flush();
            print(currentNode.getTreeNodeList(), prefix + (i < size - 1 ? "|   ":"    "));
        }
    }
}
