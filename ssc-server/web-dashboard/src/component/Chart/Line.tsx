import { Spin, Tooltip } from "antd";
import { FullscreenOutlined, InfoCircleOutlined } from "../Icon";
import { Line as AntLine, LineConfig } from "@ant-design/plots";
import "./index.sass";

interface LineProps {
    title: string;
    tooltip: string;
    lineConfig?: LineConfig;
}

const Line = (props: LineProps) => {
    return (
        <div className="chart-wrap">
            <Spin spinning={false}>
                <div className="chart-panel">
                    <div className="chart-panel-header">
                        <div className="chart-panel-header-title">
                            <span>{props.title}</span>
                            <Tooltip title={props.tooltip}>
                                <InfoCircleOutlined />
                            </Tooltip>
                        </div>
                        <FullscreenOutlined />
                    </div>
                    <div className="chart-panel-content">
                        <div className={props.lineConfig?.data.length ? "visible" : "hidden"}>
                            <AntLine
                                data={[]}
                                {...props.lineConfig}
                                height={180}
                            />
                        </div>
                        {props.lineConfig?.data.length ? null : <div className="datapoints-warning">无数据</div>}
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default Line;
