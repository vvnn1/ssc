import { Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import "./index.sass";
import { BatchDraftOutlined, StreamDraftOutlined } from "../../../../../component/Icon";
import { useNavigate } from "react-router-dom";
import CreateDraftModal from "../ToolBar/CreateDraftModal";

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

const NavTab: React.FC<NavTabProps> = ({ selectedItem }) => {
    const [items, setItems] = useState<TabItem[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
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

    const transTabs = (items: TabItem[]): TabsProps["items"] => {
        return items.map(item => {
            return {
                id: item.id,
                key: item.id,
                label: (
                    <>
                        <span className={`draft-type type ${item.hasDeploy ? "" : "offline"}`}>
                            {item.type === "s" ? <StreamDraftOutlined /> : null}
                            {item.type === "b" ? <BatchDraftOutlined /> : null}
                        </span>
                        <span className={`draft-name ${item.hasErr ? "has-error" : ""}`}>{item.name}</span>
                    </>
                ),
            };
        });
    };

    const onChange = (id: string) => {
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

    const remove = (targetId: TargetKey) => {
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
            remove(targetId);
        }
    };

    return (
        <>
            <Tabs
                className="editor-nav-tab"
                type="editable-card"
                onChange={onChange}
                activeKey={selectedItem?.id}
                onEdit={onEdit}
                items={transTabs(items)}
                size="small"
            />
            <CreateDraftModal
                open={modalOpen}
                onCancel={changeModalOpen(false)}
            />
        </>
    );
};

export default NavTab;
