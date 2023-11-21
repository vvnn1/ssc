import { Button, List, Modal, ModalProps, Popconfirm, message } from "antd";
import { useState } from "react";
import { MonacoDiffEditor } from "react-monaco-editor";
import {
    CheckCircleOutlined,
    DeleteOutlined,
    DoubleLeftOutlined,
    RollbackOutlined,
} from "../../../../../../../../component/Icon";
import "./index.sass";

const itemList = [
    {
        version: "10",
        dateTime: "10-20 10:38",
        submitor: "1142765884572712",
        remark: "-",
    },
    {
        version: "10",
        dateTime: "10-20 10:38",
        submitor: "1142765884572712",
        remark: "-",
    },
    {
        version: "10",
        dateTime: "10-20 10:38",
        submitor: "1142765884572712",
        remark: "-",
    },
    {
        version: "10",
        dateTime: "10-20 10:38",
        submitor: "1142765884572712",
        remark: "-",
    },
    {
        version: "10",
        dateTime: "10-20 10:38",
        submitor: "1142765884572712",
        remark: "-",
    },
    {
        version: "10",
        dateTime: "10-20 10:38",
        submitor: "1142765884572712",
        remark: "-",
    },
    {
        version: "10",
        dateTime: "10-20 10:38",
        submitor: "1142765884572712",
        remark: "-",
    },
];

const CompareModal = (props: ModalProps) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
    const [messageApi, contextMessage] = message.useMessage();
    const onItemClick = (index: number) => {
        return () => {
            setSelectedItemIndex(index);
        };
    };

    const onRollBackClick = () => {
        messageApi.success({
            icon: <></>,
            content: (
                <>
                    <CheckCircleOutlined color="#00a700" />
                    作业回滚到指定版本成功
                </>
            ),
        });
        props.onCancel?.(undefined as any);
    };

    const onDeleteClick = () => {
        messageApi.success({
            icon: <></>,
            content: (
                <>
                    <CheckCircleOutlined color="#00a700" />
                    删除作业版本成功
                </>
            ),
        });
        props.onCancel?.(undefined as any);
    };

    return (
        <Modal
            {...props}
            width={1000}
            title="作业版本"
            className="draft-compare-modal"
            footer={(_, { CancelBtn }) => <CancelBtn />}
        >
            {contextMessage}
            <div className="content-container">
                <div className="side-container">
                    <div className="side-title">选择版本</div>
                    <div className="side-options">
                        <List
                            dataSource={itemList}
                            itemLayout="vertical"
                            renderItem={(item, index) => (
                                <List.Item
                                    className={selectedItemIndex === index ? "selected side-option" : "side-option"}
                                    onClick={onItemClick(index)}
                                >
                                    <div className="option-title">
                                        <span className="ellipsis">版本 {item.version}</span>
                                        <span className="sub-title">{item.dateTime}</span>
                                    </div>
                                    <div className="comment ellipsis">提交人: {item.submitor}</div>
                                    <div className="comment ellipsis">备注: {item.remark}</div>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <div className="middle-container">
                    <DoubleLeftOutlined />
                </div>

                <div className="diff-container">
                    <div className="title-container">
                        <span className="left-wrapper">当前编辑版本</span>
                        <span className="no-wrap">对比版本（版本 11）</span>
                        <div className="right-wrapper">
                            <Popconfirm
                                okText="确认"
                                cancelText="取消"
                                title="你确定要回滚到选择的版本吗?"
                                overlayClassName="ant-popover-rtl"
                                onConfirm={onRollBackClick}
                            >
                                <Button
                                    size="small"
                                    type="link"
                                    icon={<RollbackOutlined />}
                                >
                                    回滚
                                </Button>
                            </Popconfirm>
                            <Popconfirm
                                okText="确认"
                                cancelText="取消"
                                title="你确定要删除选择的版本吗?"
                                overlayClassName="ant-popover-rtl"
                                onConfirm={onDeleteClick}
                            >
                                <Button
                                    size="small"
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    danger
                                >
                                    删除
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                    <div className="editor-container">
                        <MonacoDiffEditor
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
                            original={`--创建一个datagen_source临时表。
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
                            height={"100%"}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CompareModal;
