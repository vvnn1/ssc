import { Button, Card } from "antd"
import './index.sass'
import Paragraph from "antd/es/typography/Paragraph"
import { DeleteOutlined } from "../../../../../../Icon";


export interface CardProps {
    icon: React.ReactNode;
    desc: string;
    deletable?: boolean;
    onClick?: () => void;
}

const CatalogCard = (props: CardProps) => {
    return (
        <Card className="catalog-card" hoverable onClick={props.onClick}>
            <div className="card-content">
                <div className="icon">
                    {props.icon}
                </div>
                <Paragraph className="desc" ellipsis>
                    {props.desc}
                </Paragraph>
                {
                    props.deletable 
                    ? (
                        <Button type="text" icon={<DeleteOutlined />}/>
                    ) : null
                }

            </div>
        </Card>
    )
};

export default CatalogCard;