import { List } from "antd";
import DraftCard, {CardProps} from "./DraftCard";
import { useEffect, useState } from "react";
import './index.sass'

export type Card = CardProps;

interface ListProps {
    items: Card[];
}

const DraftList = (props: ListProps) => {
    const [activeItemIndex, setActiveItemIndex] = useState<number>(0);


    useEffect(() => {
        props.items[0].onClick?.();
    }, []);

    const onItemClick = (index:number) => {
        return () => {
            setActiveItemIndex(index);
        }
    }
    return (
        <List 
            grid={{ gutter: 16, column: 4 }}
            dataSource={props.items}
            className="draft-template-list"
            renderItem={(item, index) => (
                <List.Item
                    className={activeItemIndex === index ? 'active' : undefined}
                    onClick={onItemClick(index)}
                >
                    <DraftCard 
                        {...item}
                    />
                </List.Item>
            )}
        />
    )
};

export default DraftList;