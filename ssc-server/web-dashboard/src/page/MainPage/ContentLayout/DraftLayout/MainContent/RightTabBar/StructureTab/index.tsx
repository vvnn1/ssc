import { useRef, useState } from "react";
import SqlStructureGraph from "./SqlStructureGraph";
import { Empty, Radio, RadioChangeEvent, Tooltip } from "antd";
import SqlStructureTree from "./SqlStructureTree";
import { BlockOutlined, RotateRightOutlined } from "../../../../../../../component/Icon";
import "./index.sass";
import { useParams } from "react-router-dom";

const StructureTab = () => {
    const [rotate, setRotate] = useState<boolean>(false);
    const [radioValue, setRadioValue] = useState<string>("graph");
    const { draftId } = useParams();

    const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
        setRadioValue(value);
    };

    const getStructureNode = () => {
        if (radioValue === "graph") {
            return <SqlStructureGraph />;
        } else if (radioValue === "tree") {
            return <SqlStructureTree />;
        }
        return null;
    };

    const isActionsDisabled = () => {
        return radioValue === "tree";
    };

    const onRotateClick = () => {
        setRotate(!rotate);
    };
    return (
        <div className="draft-struct">
            <div className="title">
                <span>代码结构</span>
                <span className={`actions ${isActionsDisabled() ? "disabled" : ""}`}>
                    <Tooltip title="切换视图布局方向">
                        <RotateRightOutlined
                            onClick={onRotateClick}
                            className={`rotate-right-icon anticon-rotate-right ${rotate ? "lr" : "tb"}`}
                        />
                    </Tooltip>
                    <Tooltip title="自适应缩放">
                        <BlockOutlined />
                    </Tooltip>
                </span>
            </div>
            <div className="content-wrapper">
                <div className="structure-switch">
                    <Radio.Group
                        defaultValue={radioValue}
                        size="small"
                        buttonStyle="solid"
                        onChange={onRadioChange}
                    >
                        <Radio.Button value="graph">数据流向图</Radio.Button>
                        <Radio.Button value="tree">树状结构图</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="structure">
                    {draftId === "2aa0e831-2b04-407e-b47c-d30afc3c2070" ? <Empty /> : getStructureNode()}
                </div>
            </div>
        </div>
    );
};

export default StructureTab;
