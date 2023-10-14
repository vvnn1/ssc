import { Progress, ProgressProps } from "antd";
import { useEffect, useState } from "react";

interface Step2Props {
    onStatusChange?: (status: ProgressProps['status']) => void;
}

const Step2 = (props: Step2Props & ProgressProps) => {
    const [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        props.onStatusChange?.('active');
        const timer = setInterval(() => {
            setPercent((percent) => {
                if (percent > 100) {
                    clearInterval(timer);
                    props.onStatusChange?.('success');
                }
                return percent + 15
            });
        }, 1000);
    }, []);

    return (
        <div className="content-container">
            <Progress percent={percent} status={props.status} />
            <div className="note-wrapper">
                正在进行作业最终检查，请稍后。
            </div>
        </div>
    )
};

export default Step2;