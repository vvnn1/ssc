import { Tree, TreeDataNode, TreeProps, message } from "antd";
import {
    CheckCircleOutlined,
    ColumnHeightOutlined,
    ContainerOutlined,
    CopyOutlined,
    DatabaseOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined,
    TableOutlined,
    VerticalAlignMiddleOutlined,
} from "../../../../../../../../component/Icon";
import "./index.sass";
import TreeTitle from "./TreeTitle";
import { Key, useState } from "react";
import { Item, Menu, useContextMenu } from "react-contexify";
import { doOnNode } from "../../../../../../../../util/tree";

const treeData: TreeDataNode[] = [
    {
        title: (
            <div>
                <span className="title">vvp</span>
                <span className="extra">数据更新于 06-24 13:46</span>
            </div>
        ),
        key: "0",
        icon: <ContainerOutlined />,
        children: [
            {
                title: (
                    <>
                        <span className="title">default</span>
                        <span className="tag">默认</span>
                    </>
                ),
                key: "0-0",
                icon: <DatabaseOutlined />,
                switcherIcon: node => (node.expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />),
                className: "database",
                isLeaf: false,
                children: [
                    {
                        title: "test-table",
                        key: "0-0-0",
                        icon: <TableOutlined />,
                        className: "table",
                        isLeaf: true,
                    },
                ],
            },
        ],
        switcherIcon: node => (node.expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />),
        className: "catalog",
        isLeaf: false,
    },
];

const titleRender = (node: TreeDataNode) => {
    return <TreeTitle dataNode={node} />;
};

const foundCatalogTreeKey = (treeData: TreeDataNode[], targetNode: TreeDataNode): Key[] => {
    const pickedKeys: Key[] = [];
    let isFound = false;
    let isFull = false;
    doOnNode(treeData, indexNode => {
        if (isFull) {
            return;
        }
        if (indexNode.className === "catalog") {
            if (isFound) {
                isFull = true;
                return;
            } else {
                while (pickedKeys.length > 0) {
                    pickedKeys.pop();
                }
            }
        }

        if (!isFull) {
            if (indexNode.key === targetNode.key) {
                isFound = true;
            }
            if (indexNode.className !== "table") {
                pickedKeys.push(indexNode.key);
            }
        }
    });
    return pickedKeys;
};

const catalogMenuId = "meta-tree-context-catalog-menu";
const tableMenuId = "meta-tree-context-table-menu";

const MetaTree = (props: TreeProps) => {
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const [expandKeys, setExpandKeys] = useState<Key[]>(["0", "0-0"]);
    const { show: showCatalogMenu } = useContextMenu({ id: catalogMenuId });
    const { show: showTableMenu } = useContextMenu({ id: tableMenuId });
    const [messageApi, contextHolder] = message.useMessage();

    const atLastOneSelected = (keys: Key[]) => {
        if (keys.length === 0) {
            return;
        }
        setSelectedKeys(keys);
    };

    const onRightClick: TreeProps["onRightClick"] = ({ event, node }) => {
        if (node.className === "table") {
            showTableMenu({ event, props: node });
        } else {
            showCatalogMenu({ event, props: node });
        }
    };

    const onCopyNameClick = () => {
        messageApi.success({
            icon: <></>,
            content: (
                <>
                    <CheckCircleOutlined color="#00a700" />
                    已复制到剪切板
                </>
            ),
        });
    };

    const onShrinkAllNodeClick = () => {
        setExpandKeys([]);
    };

    const onExpandAllNodeClick = () => {
        const pickedKeys: Key[] = [];
        doOnNode(treeData, node => {
            if (node.className === "catalog" || node.className === "database") {
                pickedKeys.push(node.key);
            }
        });
        setExpandKeys(pickedKeys);
    };

    const onExpandCurrentCatalogClick = ({ props: targetNode }: any) => {
        const pickedKeys = foundCatalogTreeKey(treeData, targetNode);
        setExpandKeys(pickedKeys);
    };

    const onShrinkCurrentCatalogClick = ({ props: targetNode }: any) => {
        const pickedKeys = foundCatalogTreeKey(treeData, targetNode);
        setExpandKeys(expandKeys => {
            return expandKeys.filter(key => !pickedKeys.includes(key));
        });
    };

    const onExpand: TreeProps["onExpand"] = expandKeys => {
        setExpandKeys(expandKeys);
    };

    return (
        <>
            <Tree
                {...props}
                selectedKeys={selectedKeys}
                onSelect={atLastOneSelected}
                className="meta-tree"
                showLine={false}
                showIcon={true}
                expandedKeys={expandKeys}
                onExpand={onExpand}
                treeData={treeData}
                titleRender={titleRender}
                onRightClick={onRightClick}
                blockNode
            />
            <Menu id={catalogMenuId}>
                <Item
                    id="1"
                    onClick={onCopyNameClick}
                >
                    <CopyOutlined />
                    &nbsp;复制名称
                </Item>
                <Item
                    id="2"
                    onClick={onExpandAllNodeClick}
                >
                    <ColumnHeightOutlined />
                    &nbsp;展开所有节点
                </Item>
                <Item
                    id="3"
                    onClick={onShrinkAllNodeClick}
                >
                    <VerticalAlignMiddleOutlined />
                    &nbsp;收起所有节点
                </Item>
                <Item
                    id="4"
                    onClick={onExpandCurrentCatalogClick}
                >
                    <ColumnHeightOutlined />
                    &nbsp;展开当前 Catalog 下的所有节点
                </Item>
                <Item
                    id="5"
                    onClick={onShrinkCurrentCatalogClick}
                >
                    <ColumnHeightOutlined />
                    &nbsp;收起当前 Catalog 下的所有节点
                </Item>
                <Item id="6">
                    <VerticalAlignMiddleOutlined />
                    &nbsp;刷新当前节点所属 Catalog 的元数据
                </Item>
            </Menu>

            <Menu id={tableMenuId}>
                <Item
                    id="1"
                    onClick={onCopyNameClick}
                >
                    <CopyOutlined />
                    &nbsp;复制名称
                </Item>
                <Item
                    id="7"
                    onClick={onCopyNameClick}
                >
                    <CopyOutlined />
                    &nbsp;复制表创建语句
                </Item>
                <Item
                    id="8"
                    onClick={onCopyNameClick}
                >
                    <CopyOutlined />
                    &nbsp;复制表修改语句
                </Item>
                <Item
                    id="2"
                    onClick={onExpandAllNodeClick}
                >
                    <ColumnHeightOutlined />
                    &nbsp;展开所有节点
                </Item>
                <Item
                    id="3"
                    onClick={onShrinkAllNodeClick}
                >
                    <VerticalAlignMiddleOutlined />
                    &nbsp;收起所有节点
                </Item>
                <Item
                    id="4"
                    onClick={onExpandCurrentCatalogClick}
                >
                    <ColumnHeightOutlined />
                    &nbsp;展开当前 Catalog 下的所有节点
                </Item>
                <Item
                    id="5"
                    onClick={onShrinkCurrentCatalogClick}
                >
                    <ColumnHeightOutlined />
                    &nbsp;收起当前 Catalog 下的所有节点
                </Item>
                <Item id="6">
                    <VerticalAlignMiddleOutlined />
                    &nbsp;刷新当前节点所属 Catalog 的元数据
                </Item>
            </Menu>
            {contextHolder}
        </>
    );
};

export default MetaTree;
