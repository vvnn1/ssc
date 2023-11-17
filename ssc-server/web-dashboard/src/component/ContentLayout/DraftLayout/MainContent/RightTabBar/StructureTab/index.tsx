import { useState } from "react";
import SqlStructureGraph from "./SqlStructureGraph";
import { Radio, RadioChangeEvent, Tooltip } from "antd";
import SqlStructureTree from "./SqlStructureTree";
import { BlockOutlined, RotateRightOutlined } from "../../../../../Icon";
import "./index.sass";

const StructureTab = () => {
    const [structureNode, setStructureNode] = useState<React.ReactNode>(<SqlStructureGraph />);

    const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
        if (value === "graph") {
            setStructureNode(<SqlStructureGraph />);
        } else if (value === "tree") {
            setStructureNode(<SqlStructureTree />);
        }
    };

    return (
        <div className="draft-struct">
            <div className="title">
                <span>代码结构</span>
                <span className="actions">
                    <Tooltip title="切换视图布局方向"><RotateRightOutlined /></Tooltip>
                    <Tooltip title="自适应缩放"><BlockOutlined /></Tooltip>
                </span>
            </div>
            <div className="content-wrapper">
                <div className="structure-switch">
                    <Radio.Group defaultValue="graph" size="small" buttonStyle="solid" onChange={onRadioChange}>
                        <Radio.Button value="graph">数据流向图</Radio.Button>
                        <Radio.Button value="tree">树状结构图</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="structure">
                    {structureNode}
                </div>
            </div>
        </div>
    );
};

export default StructureTab;