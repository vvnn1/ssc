import { Button, ButtonProps } from "antd";
import "./index.sass";

interface TemplateCardProps {
    backgroundImageUrl: string;
    title: string;
    intro: string;
    buttonIcon: React.ReactNode;
    buttonText: string;
    buttonClick?: ButtonProps["onClick"];
}

const Card = (props: TemplateCardProps) => {
    return (
        <div className="template-item">
            <div
                className="image starter"
                style={{ backgroundImage: `url(${props.backgroundImageUrl})` }}
            ></div>
            <div className="title">{props.title}</div>
            <div className="intro">{props.intro}</div>
            <Button
                block
                type="link"
                onClick={props.buttonClick}
            >
                {props.buttonIcon}
                <span>{props.buttonText}</span>
            </Button>
        </div>
    );
};

export default Card;
