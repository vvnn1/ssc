import { Button, Modal, ModalProps, Popconfirm, message } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "../../../../../../Icon";
import "./index.sass";
import { MonacoDiffEditor } from "react-monaco-editor";

const DeleteModal = (props: ModalProps) => {
    const [messageApi, contextMessage] = message.useMessage();
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
            title="作业版本"
            width={1000}
            cancelText="取消"
            className="draft-delete-modal"
            footer={(_, { CancelBtn }) => (
                <>
                    <Popconfirm
                        okText="确认"
                        cancelText="取消"
                        title="你确定要删除选择的版本吗?"
                        overlayClassName="ant-popover-rtl"
                        onConfirm={onDeleteClick}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            type="primary"
                        >
                            删除
                        </Button>
                    </Popconfirm>
                    <CancelBtn />
                </>
            )}
        >
            {contextMessage}
            <div className="content-container">
                <div className="diff-container">
                    <div className="title-container">
                        <span className="left-wrapper">当前编辑版本</span>
                        <span className="no-wrap">对比版本 ( 版本 11 )</span>
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

export default DeleteModal;
