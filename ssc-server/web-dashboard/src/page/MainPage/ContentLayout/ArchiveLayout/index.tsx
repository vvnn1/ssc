import { useState } from "react";
import "./index.sass";
import { Resizable, ResizeCallbackData } from "react-resizable";
import { SearchOutlined } from "../../../../component/Icon";
import { Input } from "antd";

const ArchiveLayout = () => {
    const [reSize, setReSize] = useState<number>(220);

    const onResize = (_: any, { size }: ResizeCallbackData) => {
        setReSize(size.width);
    };
    return (
        <div className="archive-layout panel left-panel panel-ltr">
            <div className="resizable-panel panel panel-ltr panel-border-right">
                <Resizable
                    width={reSize}
                    height={0}
                    onResize={onResize}
                    axis="x"
                >
                    <div
                        className="tree-content panel panel-ttb"
                        style={{ width: reSize + "px" }}
                    >
                        <div className="panel-bar searchbar panel panel-ltr panel-border-bottom">
                            <Input
                                placeholder="搜索名称…"
                                suffix={<SearchOutlined />}
                            />
                        </div>
                        <div className="panel draft-list panel-ttb"></div>
                    </div>
                </Resizable>
            </div>
            <div className="panel main-panel panel-ttb"></div>
        </div>
    );
};

export default ArchiveLayout;
