import { Table } from "antd";
import { DoubleRightOutlined } from "../../../../../Icon";
import "./index.sass";
import { useState } from "react";
import MonacoEditor from "../../../../../MonacoEditor";

interface Step2FormProps {
    hidden: boolean;
}

const Step2Form = (props: Step2FormProps) => {
    const [collapsedOpen, setCollapsedOpen] = useState<boolean>(false);
    const changeCollapsedOpen = () => {
        setCollapsedOpen(!collapsedOpen);
    };
    return (
        <div
            className="step2"
            hidden={props.hidden}
        >
            <Table
                size="small"
                columns={[
                    {
                        title: "",
                        width: 60,
                    },
                    {
                        title: "源表",
                        width: 160,
                    },
                    {
                        title: "数据状态",
                        width: 140,
                    },
                    {
                        title: "操作",
                    },
                ]}
            />

            <div className="code-collapsed-header">
                <span
                    className="collapsed-btn"
                    onClick={changeCollapsedOpen}
                >
                    调试代码预览
                    <DoubleRightOutlined style={{ transform: collapsedOpen ? "rotate(-90deg)" : "rotate(90deg)" }} />
                </span>
            </div>

            <div
                className="code-collapsed"
                hidden={!collapsedOpen}
            >
                <MonacoEditor
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        selectOnLineNumbers: true,
                        lineNumbersMinChars: 5,
                        lineDecorationsWidth: 0,
                        wordWrap: "on",
                        readOnly: false,
                        scrollBeyondLastLine: false,
                    }}
                    height={238}
                    value={`--********************************************************************--
-- Author:         Write your name here
-- Created Time:   2023-09-15 11:32:01
-- Description:    Write your description here
-- Hints:          You can use SET statements to modify the configuration
--********************************************************************--

CREATE TABLE sensor_source(
                              id VARCHAR,
                              dt BIGINT,
                              temperature DOUBLE
) WITH (
    'connector.type'='kafka',
    'connector.version'='universal',
    'connector.topic'='sensor_source',
    'connector.startup-mode'='latest-offset',
    'connector.properties.zookeeper.connect'='local199:2181',
    'connector.properties.bootstrap.servers'='local199:9092',
    'format.type'='csv'
);

CREATE TABLE sensor_sink(
                            id VARCHAR,
                            dt BIGINT,
                            temperature DOUBLE
)WITH(
    'connector.type'='kafka',
    'connector.version'='universal',
    'connector.topic'='sensor_sink',
    'connector.properties.zookeeper.connect'='local199:2181',
    'connector.properties.bootstrap.servers'='local199:9092',
    'format.type'='csv'
);

INSERT INTO sensor_sink
SELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;`}
                />
            </div>
        </div>
    );
};

export default Step2Form;
