import { Spin, Tooltip } from "antd";
import { FullscreenOutlined, InfoCircleOutlined } from "../Icon";
import { Line as AntLine, LineConfig } from "@ant-design/plots"
import './index.sass'
import dayjs from 'dayjs';


interface LineProps {
    title: string;
    tooltip: string;
    lineConfig?: LineConfig;
}

const Line = (props: LineProps) => {
    const data = [
        { x: 1698816519, y: "0" },
        { x: 1698816534, y: "0" },
        { x: 1698816549, y: "0" },
        { x: 1698816564, y: "0" },
        { x: 1698816579, y: "0" },
        { x: 1698816594, y: "0" },
        { x: 1698816609, y: "0" },
        { x: 1698816624, y: "0" },
        { x: 1698816639, y: "0" },
        { x: 1698816654, y: "0" },
        { x: 1698816669, y: "0" },
        { x: 1698816684, y: "0" },
        { x: 1698816699, y: "0" },
        { x: 1698816714, y: "0" },
        { x: 1698816729, y: "0" },
        { x: 1698816744, y: "0" },
        { x: 1698816759, y: "0" },
        { x: 1698816774, y: "0" },
        { x: 1698816789, y: "0" },
        { x: 1698816804, y: "0" },
        { x: 1698816819, y: "0" },
        { x: 1698816834, y: "0" },
        { x: 1698816849, y: "0" },
        { x: 1698816864, y: "0" },
        { x: 1698816879, y: "0" },
        { x: 1698816894, y: "0" },
        { x: 1698816909, y: "0" },
        { x: 1698816924, y: "0" },
        { x: 1698816939, y: "0" },
        { x: 1698816954, y: "0" },
        { x: 1698816969, y: "0" },
        { x: 1698816984, y: "0" },
        { x: 1698816999, y: "0" },
        { x: 1698817014, y: "0" },
        { x: 1698817029, y: "0" },
        { x: 1698817044, y: "0" },
        { x: 1698817059, y: "0" },
        { x: 1698817074, y: "0" },
        { x: 1698817089, y: "0" },
        { x: 1698817104, y: "0" },
        { x: 1698817119, y: "0" },
        { x: 1698817134, y: "0" },
        { x: 1698817149, y: "0" },
        { x: 1698817164, y: "0" },
        { x: 1698817179, y: "0" },
        { x: 1698817194, y: "0" },
        { x: 1698817209, y: "0" },
        { x: 1698817224, y: "0" },
        { x: 1698817239, y: "0" },
        { x: 1698817254, y: "0" },
        { x: 1698817269, y: "0" },
        { x: 1698817284, y: "0" },
        { x: 1698817299, y: "0" },
        { x: 1698817314, y: "0" },
        { x: 1698817329, y: "0" },
        { x: 1698817344, y: "0" },
        { x: 1698817359, y: "0" },
        { x: 1698817374, y: "0" },
        { x: 1698817389, y: "0" },
        { x: 1698817404, y: "0" },
        { x: 1698817419, y: "0" }
    ];

    return (
        <div className="chart-wrap">
            <Spin spinning={false}>
                <div className="chart-panel">
                    <div className="chart-panel-header">
                        <div className="chart-panel-header-title">
                            <span>{props.title}</span>
                            <Tooltip title={props.tooltip}><InfoCircleOutlined /></Tooltip>
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
                        {
                            props.lineConfig?.data.length
                                ? null
                                : (
                                    <div className="datapoints-warning">
                                        无数据
                                    </div>
                                )
                        }

                    </div>
                </div>
            </Spin>
        </div>
    )
};

export default Line;