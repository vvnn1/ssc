import { Key, useEffect, useState } from "react";
import {
    FloderClosedColorOutlined,
    FloderOpenColorOutlined,
    StreamDraftOutlined,
} from "../../../../../../../../component/Icon";
import "./index.sass";
import TreeTitle from "./TreeTitle";
import { Item, Menu, Separator, useContextMenu } from "react-contexify";
import CreateDraftModal from "../../../../ToolBar/CreateDraftModal";
import { Tooltip, Tree, TreeDataNode, TreeProps } from "antd";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { changeModalOpen } from "../../../../../../../../util";

const demoData: TreeDataNode[] = [
    {
        title: "作业草稿",
        key: "0",
        children: [
            {
                title: "母婴订单实时查询",
                key: "0-0",
                isLeaf: false,
                switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
                children: [
                    {
                        title: "实时查询",
                        key: "2ca189d0-e96c-4389-8422-24ad910a6dc1",
                        isLeaf: true,
                        switcherIcon: (
                            <Tooltip title="未部署">
                                <span className="type offline">
                                    <StreamDraftOutlined />
                                </span>
                            </Tooltip>
                        ),
                    },
                    {
                        title: "实时大屏",
                        key: "96b2af76-27a3-46f2-a1c9-b7a7e7df73d4",
                        isLeaf: true,
                        switcherIcon: (
                            <Tooltip title="未部署">
                                <span className="type offline">
                                    <StreamDraftOutlined />
                                </span>
                            </Tooltip>
                        ),
                    },
                ],
            },
            {
                title: "数据同步",
                key: "0-1",
                isLeaf: false,
                switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
                children: [
                    {
                        title: "db2kafka",
                        key: "e65309f5-7e94-4c8f-aa2e-8c8fe19869f6",
                        isLeaf: true,
                        switcherIcon: (
                            <Tooltip title="已部署">
                                <span className="type online">
                                    <StreamDraftOutlined />
                                </span>
                            </Tooltip>
                        ),
                    },
                    {
                        title: "order2kafka",
                        key: "4ed06c1a-1fb3-4727-9607-e6a2ec38f9ef",
                        isLeaf: true,
                        switcherIcon: (
                            <Tooltip title="未部署">
                                <span className="type offline">
                                    <StreamDraftOutlined />
                                </span>
                            </Tooltip>
                        ),
                    },
                ],
            },
            {
                title: "临时文件夹",
                key: "0-2",
                isLeaf: false,
                switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
            },
        ],
        switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
    },
];

const dirMenuId = "draft-tree-context-dir-menu";
const fileMenuId = "draft-tree-context-file-menu";

const doOnLeafNode = (treeData: TreeDataNode[], callback: (data: TreeDataNode) => void) => {
    for (let i = 0; i < treeData.length; i++) {
        if (treeData[i].isLeaf) {
            callback(treeData[i]);
        } else if (treeData[i].children) {
            doOnLeafNode(treeData[i].children!, callback);
        }
    }
};

const DraftTree = () => {
    const [treeData, setTreeData] = useState<TreeDataNode[]>(demoData);
    const [expandedKeys, setExpandedKeys] = useState<Key[]>(["0"]);
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const { show: showDirMenu } = useContextMenu({ id: dirMenuId });
    const { show: showFileMenu } = useContextMenu({ id: fileMenuId });
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const pathMatch = matchPath("/workspace/:workspaceId/namespace/:namespaceId/draft/:draftId/sql", pathname);

    useEffect(() => {
        const draftId = pathMatch?.params.draftId;
        doOnLeafNode(treeData, data => {
            if (data.key === draftId) {
                data.className = "ant-tree-treenode-focused";
            } else {
                data.className = undefined;
            }
        });
        setTreeData([...treeData]);
    }, [pathMatch?.params.draftId]);

    const titleRender = (dataNode: TreeDataNode) => {
        const expandCallback = () => {
            if (!expandedKeys.includes(dataNode.key)) {
                setExpandedKeys([...expandedKeys, dataNode.key]);
            }
        };

        const changedCallback = () => {
            setTreeData([...treeData]);
        };

        return (
            <TreeTitle
                dataNode={dataNode}
                expandCallback={expandCallback}
                changedCallback={changedCallback}
                editingCallback={setEditing}
            />
        );
    };

    const atLastOneSelected = (keys: Key[]) => {
        if (keys.length === 0) {
            return;
        }
        setSelectedKeys(keys);
    };

    const nodeDraggable = (node: TreeDataNode) => {
        return node.key !== "0";
    };

    const allowDrop: TreeProps["allowDrop"] = p => {
        return !p.dropNode.isLeaf;
    };

    const onDrop: TreeProps["onDrop"] = info => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;

        const data = [...treeData];

        const loop = (
            data: TreeDataNode[],
            key: React.Key,
            callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void
        ) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children!, key, callback);
                }
            }
        };

        let dragObj: TreeDataNode;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        loop(data, dropKey, item => {
            item.children = item.children || [];
            item.children.push(dragObj);
        });
        setTreeData(data);
    };

    const onRightClick: TreeProps["onRightClick"] = ({ event, node }) => {
        if (node.isLeaf) {
            showFileMenu({ event, props: node });
        } else {
            showDirMenu({ event, props: node });
        }
    };

    const onDoubleClick: TreeProps["onDoubleClick"] = (_, node) => {
        if (!node.isLeaf) {
            return;
        }

        if (pathMatch?.params.draftId) {
            navigate(`../../${node.key}/sql`, { relative: "path" });
        } else {
            navigate(`${node.key}/sql`);
        }
    };

    return (
        <>
            <Tree
                selectedKeys={selectedKeys}
                className="draft-tree"
                treeData={treeData}
                titleRender={titleRender}
                expandAction="doubleClick"
                onExpand={setExpandedKeys}
                expandedKeys={expandedKeys}
                rootClassName={editing ? "editing" : undefined}
                onSelect={atLastOneSelected}
                draggable={{
                    icon: false,
                    nodeDraggable,
                }}
                allowDrop={allowDrop}
                onDrop={onDrop}
                onRightClick={onRightClick}
                onDoubleClick={onDoubleClick}
            />

            <Menu id={dirMenuId}>
                <Item
                    id="1"
                    onClick={changeModalOpen(true, setModalOpen)}
                >
                    新建作业草稿
                </Item>
                <Item id="2">新建文件夹</Item>
                <Separator />
                <Item id="3">复制文件夹名</Item>
                <Separator />
                <Item id="3">重命名</Item>
                <Item id="3">移动文件夹…</Item>
                <Separator />
                <Item id="3">删除</Item>
            </Menu>

            <Menu id={fileMenuId}>
                <Item id="1">复制名称</Item>
                <Separator />
                <Item id="3">移动作业草稿…</Item>
                <Separator />
                <Item id="3">删除</Item>
            </Menu>

            <CreateDraftModal
                open={modalOpen}
                onCancel={changeModalOpen(false, setModalOpen)}
            />
        </>
    );
};

export default DraftTree;
