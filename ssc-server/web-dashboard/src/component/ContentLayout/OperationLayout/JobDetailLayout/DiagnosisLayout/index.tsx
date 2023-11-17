import { Button, Collapse, CollapseProps, Result, Spin, Tooltip } from "antd";
import "./index.sass";
import { CheckCircleFilled, DownloadOutlined } from "../../../../Icon";
import { useState } from "react";

const items: CollapseProps["items"] = [
    {
        key: "1",
        label: "资源分析",
        children: (
            <Result
                status='success'
                title="诊断通过"
                subTitle="1 项检查全部通过，未发现可修复诊断项。"
            />
        ),
    },
    {
        key: "2",
        label: "启动分析",
        children: (
            <Result
                status='success'
                title="诊断通过"
                subTitle="13 项检查全部通过，未发现可修复诊断项。"
            />
        ),
    },
    {
        key: "3",
        label: "作业分析",
        children: (
            <Result
                status='success'
                title="诊断通过"
                subTitle="5 项检查全部通过，未发现可修复诊断项。"
            />
        ),
    },
    {
        key: "4",
        label: "State 分析",
        children: (
            <Result
                status='success'
                title="诊断通过"
                subTitle="2 项检查全部通过，未发现可修复诊断项。"
            />
        ),
    },
    {
        key: "5",
        label: "异常分析",
        children: (
            <Result
                status='success'
                title="诊断通过"
                subTitle="3 项检查全部通过，未发现可修复诊断项。"
            />
        ),
    },
];

const DiagnosisLayout = () => {
    const [diagnosising, setDiagnosising] = useState<boolean>(false);

    const onDiagnosisButtonClick = () => {
        setDiagnosising(true);
        const id = setInterval(() => {
            setDiagnosising(false);
            clearInterval(id);
        }, 3000);
    };
    return (
        <div className="development-diagnosis-layout">
            <div className="meta">
                <span>
                    健康评分：&nbsp;{diagnosising ? "-" : <span className="hightlight">100</span>}
                </span>
                <span>
                    诊断时间：&nbsp;{diagnosising ? "-" : <span>2023-10-31 16:05:49</span>}
                </span>
            </div>
            <div className="actions">
                <Button disabled={diagnosising} className="diagnosis-button" type="primary" onClick={onDiagnosisButtonClick}>开始诊断</Button>
                <Tooltip title="导出诊断报告" placement='left'><Button disabled={diagnosising} className="download-button" icon={<DownloadOutlined />} /></Tooltip>
            </div>
            <div className="diagnosis-content">
                <Spin spinning={diagnosising} tip="诊断中…" >
                    <div className="passed">
                        <div className="overview">
                            <CheckCircleFilled /> 5 项检查全部通过，未发现可修复诊断项
                        </div>
                        <Collapse size='small' bordered={false} items={items} defaultActiveKey={["1"]} />
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default DiagnosisLayout;