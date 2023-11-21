import { Col, Modal, ModalProps, Row } from "antd";
import "./index.sass";
import { MinusCircleOutlined, PlusCircleOutlined } from "../../../../../component/Icon";
import {
    DndContext,
    DragEndEvent,
    MeasuringStrategy,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

interface DroppableProps {
    children: React.ReactNode;
    id: string;
    className?: string;
}

const Droppable = (props: DroppableProps) => {
    const { /* isOver,  */ setNodeRef } = useSortable({
        id: props.id,
    });
    const style: React.CSSProperties = {
        // color: isOver ? 'green' : undefined,
    };

    return (
        <div
            className={props.className}
            ref={setNodeRef}
            style={style}
        >
            {props.children}
        </div>
    );
};

interface DraggableProps {
    children: React.ReactNode;
    className?: string;
    id: string;
}

const Draggable = (props: DraggableProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging, transition } = useSortable({
        id: props.id,
    });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        cursor: "move",
        transition,
        ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
    };

    return (
        <div
            className={props.className}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </div>
    );
};

interface ColSet {
    [K: string]: {
        [K: string]: string;
    };
}

const SettingModal = (props: ModalProps) => {
    const [colSets, setColSets] = useState<ColSet>({
        showList: {
            healthSorce: "健康分",
            businessDelay: "业务延时",
            cpu: "CPU",
            memory: "内存",
            editor: "修改人",
        },
        hiddenList: {
            updateTime: "修改时间",
        },
    });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1,
            },
        })
    );

    const findContainer = (id: UniqueIdentifier) => {
        if (id in colSets) {
            return id;
        }

        return Object.keys(colSets).find(key => id in colSets[key]);
    };

    const cloneByKey = (obj: any, keyArr: UniqueIdentifier[]) => {
        const result: any = {};
        for (let i = 0; i < keyArr.length; i++) {
            result[keyArr[i]] = obj[keyArr[i]];
        }
        return result;
    };

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        const activeId = active.id;
        const overId = over?.id;
        if (!activeId || !overId || activeId === overId) {
            return;
        }

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (!overContainer || !activeContainer) {
            return;
        }

        setColSets(sets => {
            const activeCols = sets[activeContainer];
            const overCols = sets[overContainer];
            const activeKeyArr = Object.keys(activeCols) as UniqueIdentifier[];
            const overKeyArr = Object.keys(overCols) as UniqueIdentifier[];
            const activeIndex = activeKeyArr.indexOf(activeId);
            const overIndex = overKeyArr.indexOf(overId);

            if (activeContainer === overContainer) {
                let newIndex: number;
                if (overId in sets) {
                    newIndex = activeKeyArr.length;
                } else {
                    newIndex = overIndex;
                }

                const newKeyArr = arrayMove(activeKeyArr, activeIndex, newIndex);
                return {
                    ...sets,
                    [activeContainer]: cloneByKey(sets[activeContainer], newKeyArr),
                };
            } else {
                let newIndex: number;
                if (overId in sets) {
                    newIndex = overKeyArr.length;
                } else {
                    newIndex = overIndex;
                }

                console.log(newIndex);

                const newActiveKeyArr = activeKeyArr.filter(key => key !== activeId);
                const newOverKeyArr = [...overKeyArr.slice(0, newIndex), activeId, ...overKeyArr.slice(newIndex)];

                return {
                    [activeContainer]: cloneByKey(sets[activeContainer], newActiveKeyArr),
                    [overContainer]: cloneByKey(
                        {
                            ...sets[activeContainer],
                            ...sets[overContainer],
                        },
                        newOverKeyArr
                    ),
                };
            }
        });
    };

    const onMinusClick = (curKey: string) => {
        return () => {
            setColSets(sets => {
                const showKeyAry = Object.keys(sets["showList"]);
                const hiddenKeyAry = Object.keys(sets["hiddenList"]);

                const newShowKeyArr = showKeyAry.filter(key => key !== curKey);
                const newHiddenKeyArr = [...hiddenKeyAry, curKey];

                return {
                    showList: cloneByKey(sets["showList"], newShowKeyArr),
                    hiddenList: cloneByKey(
                        {
                            ...sets["showList"],
                            ...sets["hiddenList"],
                        },
                        newHiddenKeyArr
                    ),
                };
            });
        };
    };

    const onPlusClick = (curKey: string) => {
        return () => {
            setColSets(sets => {
                const showKeyAry = Object.keys(sets["showList"]);
                const hiddenKeyAry = Object.keys(sets["hiddenList"]);

                const newShowKeyArr = [...showKeyAry, curKey];
                const newHiddenKeyArr = hiddenKeyAry.filter(key => key !== curKey);

                return {
                    showList: cloneByKey(
                        {
                            ...sets["showList"],
                            ...sets["hiddenList"],
                        },
                        newShowKeyArr
                    ),
                    hiddenList: cloneByKey(sets["hiddenList"], newHiddenKeyArr),
                };
            });
        };
    };

    return (
        <Modal
            {...props}
            width={800}
            title="列表设置"
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn /> <CancelBtn />
                </>
            )}
            className="deploy-table-setting-modal"
        >
            <DndContext
                sensors={sensors}
                measuring={{
                    droppable: {
                        strategy: MeasuringStrategy.BeforeDragging,
                    },
                }}
                onDragEnd={onDragEnd}
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <div className="example-container">
                            <p>已显示 (拖拽排序)</p>
                            <div className="example-box"> 名称 </div>
                            <div className="example-box"> 状态 </div>
                            <SortableContext
                                items={Object.keys(colSets["showList"])}
                                strategy={verticalListSortingStrategy}
                            >
                                <Droppable
                                    className="example-list"
                                    key="showList"
                                    id={"showList"}
                                >
                                    {Object.keys(colSets["showList"]).map(item => (
                                        <Draggable
                                            key={item}
                                            id={item}
                                            className="example-box"
                                        >
                                            {colSets["showList"][item]}
                                            <MinusCircleOutlined onClick={onMinusClick(item)} />
                                        </Draggable>
                                    ))}
                                </Droppable>
                            </SortableContext>
                            <div className="example-box">操作</div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="example-container">
                            <p>未显示</p>
                            <SortableContext
                                items={Object.keys(colSets["hiddenList"])}
                                strategy={verticalListSortingStrategy}
                            >
                                <Droppable
                                    className="example-list"
                                    key="hiddenList"
                                    id={"hiddenList"}
                                >
                                    {Object.keys(colSets["hiddenList"]).map(item => (
                                        <Draggable
                                            key={item}
                                            id={item}
                                            className="example-box"
                                        >
                                            {colSets["hiddenList"][item]}
                                            <PlusCircleOutlined onClick={onPlusClick(item)} />
                                        </Draggable>
                                    ))}
                                </Droppable>
                            </SortableContext>
                        </div>
                    </Col>
                </Row>
            </DndContext>
        </Modal>
    );
};

export default SettingModal;
