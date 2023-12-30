import { Dropdown, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import "./index.sass";
import { BatchDraftOutlined, StreamDraftOutlined } from "../../../../../component/Icon";
import { useNavigate } from "react-router-dom";
import CreateDraftModal from "../ToolBar/CreateDraftModal";
import { Item, ItemProps, Menu, contextMenu, useContextMenu } from "react-contexify";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export interface TabItem {
    id: string;
    name: string;
    hasErr?: boolean;
    hasDeploy?: boolean;
    type: "s" | "b";
}

interface NavTabProps {
    selectedItem?: TabItem;
}

const tabMenuId = "draft-tree-context-tab-menu";

const NavTab: React.FC<NavTabProps> = ({ selectedItem }) => {
    const [items, setItems] = useState<TabItem[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { show: showTabMenu } = useContextMenu({ id: tabMenuId });
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedItem) {
            setItems(items => {
                if (items.findIndex(item => item.id === selectedItem.id) > -1) {
                    return [...items];
                }
                return [...items, selectedItem];
            });
        }
    }, [selectedItem?.id]);

    const onTabContextMenu = (item: TabItem) => {
        return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            showTabMenu({ event: e, props: { targetId: item.id } });
        };
    };

    const transTabs = (items: TabItem[]): TabsProps["items"] => {
        return items.map(item => {
            return {
                id: item.id,
                key: item.id,
                label: (
                    <div
                        className="custom-draft-tab"
                        onContextMenu={onTabContextMenu(item)}
                    >
                        <span className={`draft-type type ${item.hasDeploy ? "" : "offline"}`}>
                            {item.type === "s" ? <StreamDraftOutlined /> : null}
                            {item.type === "b" ? <BatchDraftOutlined /> : null}
                        </span>
                        <span className={`draft-name ${item.hasErr ? "has-error" : ""}`}>{item.name}</span>
                    </div>
                ),
            };
        });
    };

    const onSelectedChange = (id: string) => {
        navigate(`../../${id}/sql`);
    };

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        };
    };

    const add = () => {
        setModalOpen(true);
    };

    const removeItem = (targetId: TargetKey) => {
        let newActiveId = selectedItem?.id;
        let lastIndex = -1;

        for (let i = 0; i < items.length; i++) {
            if (items[i].id === targetId) {
                lastIndex = i - 1;
                break;
            }
        }

        const newPanes = items.filter(item => item.id !== targetId);
        if (newPanes.length === 0) {
            navigate("../../.");
            return;
        }

        setItems(newPanes);

        if (newActiveId === targetId) {
            if (lastIndex > -1) {
                newActiveId = newPanes[lastIndex].id;
            } else {
                newActiveId = newPanes[0].id;
            }
            navigate(`../../${newActiveId}/sql`, { replace: true });
        }
    };

    const onEdit = (targetId: React.MouseEvent | React.KeyboardEvent | string, action: "add" | "remove") => {
        if (action === "add") {
            add();
        } else {
            removeItem(targetId);
        }
    };

    const onCloseTabClick: ItemProps["onClick"] = ({ props: { targetId } }) => {
        removeItem(targetId);
    };

    const onCloseRightClick: ItemProps["onClick"] = ({ props: { targetId } }) => {
        const pickedItems: TabItem[] = [];
        let onLeft = false;
        for (let i = 0; i < items.length; i++) {
            pickedItems.push(items[i]);

            if (items[i].id === selectedItem?.id) {
                onLeft = true;
            }

            if (items[i].id === targetId) {
                setItems(pickedItems);
                if (!onLeft) {
                    navigate(`../../${items[i].id}/sql`, { replace: true });
                }
                return;
            }
        }
    };

    const onCloseOthersClick: ItemProps["onClick"] = ({ props: { targetId } }) => {
        const item = items.find(item => item.id === targetId);
        if (item) {
            setItems([item]);
            navigate(`../../${item.id}/sql`, { replace: true });
        } else {
            setItems([]);
            navigate("../../.");
        }
    };
    return (
        <div className="editor-nav-tab">
            <Tabs
                type="editable-card"
                onChange={onSelectedChange}
                activeKey={selectedItem?.id}
                onEdit={onEdit}
                items={transTabs(items)}
                size="small"
            />
            <CreateDraftModal
                open={modalOpen}
                onCancel={changeModalOpen(false)}
            />

            <Menu
                id={tabMenuId}
                className="tab-context-menu"
            >
                <Item
                    id="1"
                    onClick={onCloseTabClick}
                >
                    关闭标签
                </Item>
                <Item
                    id="2"
                    onClick={onCloseOthersClick}
                >
                    关闭其他
                </Item>
                <Item
                    id="3"
                    onClick={onCloseRightClick}
                >
                    关闭右侧
                </Item>
            </Menu>
        </div>
    );
};

export default NavTab;
