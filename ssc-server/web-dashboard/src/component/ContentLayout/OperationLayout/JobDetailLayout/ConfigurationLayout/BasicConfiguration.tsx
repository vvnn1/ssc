import { Descriptions } from "antd";
import MonacoEditor from "../../../../MonacoEditor";

const BasicConfiguration = () => {
    return (
        <div className="basic-configuration">
            <MonacoEditor
                options={{
                    minimap: {
                        enabled: false,
                    },
                    scrollBeyondLastLine: false,
                    lineNumbersMinChars: 4,
                    lineDecorationsWidth: 0,
                }}
                height={250}
                value={`--创建一个datagen_source临时表。
CREATE TEMPORARY TABLE datagen_source(
randstr VARCHAR
) WITH (
'connector' = 'datagen'
);

--创建一个print_table临时表。
CREATE TEMPORARY TABLE print_table(
randstr  VARCHAR
) WITH (
'connector' = 'print',
'logger' = 'true'
);

--将randstr字段的数据打印出来。
INSERT INTO print_table
SELECT SUBSTRING(randstr,0,8) from datagen_source;`}
            />

            <Descriptions
                column={1}
                bordered
                size="small"
                labelStyle={{ width: 280, fontSize: 12 }}
                contentStyle={{ fontSize: 12 }}
                items={[
                    {
                        key: 1,
                        label: "引擎版本",
                        children: "vvr-8.0.1-flink-1.17",
                    },
                    {
                        key: 2,
                        label: "附加依赖文件",
                        children: "-",
                    },
                    {
                        key: 2,
                        label: "备注",
                        children: "-",
                    },
                ]}
            />
        </div>
    );
};

export default BasicConfiguration;
