import { Key, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
    BatchDraftOutlined,
    CheckCircleOutlined,
    FloderClosedColorOutlined,
    FloderOpenColorOutlined,
    LoadingOutlined,
    QuestionCircleOutlined,
    StreamDraftOutlined,
} from "../../../../../../../../component/Icon";
import "./index.sass";
import TreeTitle from "./TreeTitle";
import { Item, Menu, Separator, useContextMenu } from "react-contexify";
import CreateDraftModal from "../../../../ToolBar/CreateDraftModal";
import { Modal, Tooltip, Tree, TreeDataNode, TreeProps, message } from "antd";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { changeModalOpen } from "../../../../../../../../util";
import MoveDraftModal from "../MoveDraftModal";
import { doOnNode } from "../../../../../../../../util/tree";

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
                children: [
                    {
                        title: "实时价格",
                        key: "4cc43af1-01c9-4218-a394-2eaab808d92c",
                        isLeaf: true,
                        switcherIcon: (
                            <Tooltip title="已部署">
                                <span className="type">
                                    <StreamDraftOutlined />
                                </span>
                            </Tooltip>
                        ),
                    },
                    {
                        title: "批任务",
                        key: "6f8aa897-bcff-4fff-888e-79d96f0129ec",
                        isLeaf: true,
                        switcherIcon: (
                            <Tooltip title="未部署">
                                <span className="type offline">
                                    <BatchDraftOutlined />
                                </span>
                            </Tooltip>
                        ),
                    },
                    {
                        title: "空任务",
                        key: "2aa0e831-2b04-407e-b47c-d30afc3c2070",
                        isLeaf: true,
                        switcherIcon: (
                            <Tooltip title="未部署">
                                <span className="type offline">
                                    <BatchDraftOutlined />
                                </span>
                            </Tooltip>
                        ),
                    },
                ],
            },
        ],
        switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
    },
];

const refreshData: TreeDataNode[] = [
    {
        title: "作业草稿",
        key: "0",
        switcherIcon: <LoadingOutlined />,
    },
];

const dirMenuId = "draft-tree-context-dir-menu";
const fileMenuId = "draft-tree-context-file-menu";

const doOnLeafNode = (treeData: TreeDataNode[], callback: (data: TreeDataNode) => void) => {
    doOnNode(treeData, data => {
        if (data.isLeaf) {
            callback(data);
        }
    });
};

const findLastIndex = <T,>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): number => {
    for (let i = array.length; i > 0; i--) {
        if (predicate(array[i - 1], i, array)) {
            return i;
        }
    }
    return -1;
};

const removeNode = (treeData: TreeDataNode[], key: string) => {
    for (let i = 0; i < treeData.length; i++) {
        if (treeData[i].key === key) {
            treeData.splice(i, 1);
        } else if (treeData[i].children) {
            removeNode(treeData[i].children!, key);
        }
    }
};

const locateNode = (treeData: TreeDataNode[], pickedKeys: Key[], key: string) => {
    for (let i = 0; i < treeData.length; i++) {
        const nodeKey = treeData[i].key;
        pickedKeys.push(nodeKey);
        if (nodeKey === key) {
            return;
        }

        if (!!treeData[i].children?.length) {
            locateNode(treeData[i].children!, pickedKeys, key);
            if (pickedKeys[pickedKeys.length - 1] === key) {
                return;
            }
        }
        pickedKeys.pop();
    }
};

interface DraftTreeProps {
    onSelectedKeys?: (keys: Key[]) => void;
}

export interface DraftTreeElement {
    refreshTree: () => void;
    locateOpenedDraft: () => void;
}

const DraftTree = forwardRef((props: DraftTreeProps, ref) => {
    const [treeData, setTreeData] = useState<TreeDataNode[]>(demoData);
    const [expandedKeys, setExpandedKeys] = useState<Key[]>(["0"]);
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const { show: showDirMenu } = useContextMenu({ id: dirMenuId });
    const { show: showFileMenu } = useContextMenu({ id: fileMenuId });
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [moveModalOpen, setMoveModalOpen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [deleteModal, modalContextHolder] = Modal.useModal();
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const pathMatch = matchPath("/workspace/:workspaceId/namespace/:namespaceId/draft/:draftId/sql", pathname);

    let editing = false;

    doOnNode(treeData, treeNode => {
        if (treeNode.className === "edit-node") {
            editing = true;
        }
    });

    useImperativeHandle(ref, () => ({
        refreshTree,
        locateOpenedDraft,
    }));

    useEffect(() => {
        props.onSelectedKeys?.(selectedKeys);
    }, [selectedKeys]);

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

    const onCopy = () => {
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

    const titleRender = (dataNode: TreeDataNode) => {
        const changedCallback = () => {
            setTreeData([...treeData]);
        };

        const onFileAddClick = () => {
            setCreateModalOpen(true);
        };

        const onFloderAddClick = () => {
            if (dataNode.children) {
                const lastIndex = findLastIndex(dataNode.children, node => !node.isLeaf);
                dataNode.children.splice(lastIndex + 1, 0, {
                    title: "新建文件夹",
                    key: dataNode.key + "-" + dataNode.children.length,
                    isLeaf: false,
                    switcherIcon: node => (node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />),
                    children: [],
                    className: "edit-node",
                });
            } else {
                dataNode.children = [
                    {
                        title: "test",
                        key: dataNode.key + "-0",
                        isLeaf: false,
                        switcherIcon: node =>
                            node.expanded ? <FloderOpenColorOutlined /> : <FloderClosedColorOutlined />,
                        children: [],
                    },
                ];
            }

            if (!expandedKeys.includes(dataNode.key)) {
                setExpandedKeys([...expandedKeys, dataNode.key]);
            }
            setTreeData([...treeData]);
        };

        return (
            <TreeTitle
                key={dataNode.key}
                title={
                    dataNode.isLeaf ? (
                        <div>
                            <span className="name">{dataNode.title as string}</span>
                            <span className="extra">开发人员A 锁定于 11-19 14:27</span>
                        </div>
                    ) : (
                        (dataNode.title as string)
                    )
                }
                dataNode={dataNode}
                changedCallback={changedCallback}
                onFileAddClick={onFileAddClick}
                onFloderAddClick={onFloderAddClick}
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

        navigate(`${node.key}/sql`);
    };

    const onRenameClick = ({ props: node }: any) => {
        setTreeData(treeData => {
            doOnNode(treeData, treeNode => {
                if (treeNode.key === node.key) {
                    treeNode.className = "edit-node";
                }
            });
            return [...treeData];
        });
    };

    const onDeleteClick = ({ props: node }: any) => {
        deleteModal.confirm({
            icon: <QuestionCircleOutlined />,
            title: `删除${node.isLeaf ? "作业草稿" : "文件夹"}：${node.title}`,
            content: `你确定要删除这个${node.isLeaf ? "作业草稿" : "文件夹"}?`,
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            ),
            okText: "删除",
            okButtonProps: {
                type: "primary",
                danger: true,
            },
            onOk: () => {
                removeNode(treeData, node.key);
                setExpandedKeys(expandedKeys => expandedKeys.filter(key => key !== node.key));
                setTreeData([...treeData]);
            },
            cancelText: "取消",
            closable: true,
        });
    };

    const refreshTree = () => {
        setTreeData(refreshData);
        const id = setInterval(() => {
            setTreeData(demoData);
            setExpandedKeys(["0"]);
            setSelectedKeys([]);
            clearInterval(id);
        }, 2000);
    };

    const locateOpenedDraft = () => {
        const openedKey = pathMatch?.params.draftId;
        if (!openedKey) {
            return;
        }

        const pickedKeys: Key[] = [];
        locateNode(treeData, pickedKeys, openedKey);
        if (pickedKeys.length > 0) {
            pickedKeys.forEach(key => {
                if (expandedKeys.includes(key)) {
                    return;
                }
                expandedKeys.push(key);
            });
            setExpandedKeys([...expandedKeys]);
            setSelectedKeys([pickedKeys[pickedKeys.length - 1]]);
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
                    onClick={changeModalOpen(true, setCreateModalOpen)}
                >
                    新建作业草稿
                </Item>
                <Item id="2">新建文件夹</Item>
                <Separator />
                <Item
                    id="3"
                    onClick={onCopy}
                >
                    复制文件夹名
                </Item>
                <Separator />
                <Item
                    id="4"
                    onClick={onRenameClick}
                >
                    重命名
                </Item>
                <Item
                    id="5"
                    onClick={changeModalOpen(true, setMoveModalOpen)}
                >
                    移动文件夹…
                </Item>
                <Separator />
                <Item
                    id="6"
                    onClick={onDeleteClick}
                >
                    删除
                </Item>
            </Menu>

            <Menu id={fileMenuId}>
                <Item
                    id="1"
                    onClick={onCopy}
                >
                    复制名称
                </Item>
                <Separator />
                <Item
                    id="2"
                    onClick={changeModalOpen(true, setMoveModalOpen)}
                >
                    移动作业草稿…
                </Item>
                <Separator />
                <Item
                    id="3"
                    onClick={onDeleteClick}
                >
                    删除
                </Item>
            </Menu>

            <CreateDraftModal
                open={createModalOpen}
                onCancel={changeModalOpen(false, setCreateModalOpen)}
            />
            <MoveDraftModal
                open={moveModalOpen}
                onCancel={changeModalOpen(false, setMoveModalOpen)}
            />
            {modalContextHolder}
            {contextHolder}
        </>
    );
});

export default DraftTree;
