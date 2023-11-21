import { List } from "antd";
import CatalogCard, { CardProps } from "./CatalogCard";
import { useEffect, useState } from "react";
import "./index.sass";

export type Card = CardProps & { nextStep: React.ReactNode };

interface ListProps {
    dataSource: Card[];
}

const CatalogList = (props: ListProps) => {
    const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

    useEffect(() => {
        props.dataSource[0]?.onClick?.();
    }, []);

    const onListItemClick = (index: number) => {
        return () => {
            setActiveItemIndex(index);
        };
    };

    return (
        <List
            className="pro-list"
            grid={{ gutter: 16, column: 3 }}
            dataSource={props.dataSource}
            renderItem={(item, index) => (
                <List.Item
                    onClick={onListItemClick(index)}
                    className={activeItemIndex === index ? "active" : undefined}
                >
                    <CatalogCard
                        icon={item.icon}
                        desc={item.desc}
                        deletable={item.deletable}
                        onClick={item.onClick}
                    />
                </List.Item>
            )}
        />
    );
};

export default CatalogList;
