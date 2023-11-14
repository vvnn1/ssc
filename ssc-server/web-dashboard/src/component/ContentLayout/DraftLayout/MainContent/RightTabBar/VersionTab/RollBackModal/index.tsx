import { Button, Modal, ModalProps, Popconfirm, message } from "antd";
import { CheckCircleOutlined, RollbackOutlined } from "../../../../../../Icon";
import './index.sass'
import { MonacoDiffEditor } from "react-monaco-editor";

const RollBackModal = (props: ModalProps) => {
    const [messageApi, contextMessage] = message.useMessage();
    const onRollBackClick = () => {
        messageApi.success(
            {
                icon: <></>,
                content: <><CheckCircleOutlined color="#00a700" />作业回滚到指定版本成功</>
            }
        );
        props.onCancel?.(undefined as any);
    }
    return (
        <Modal
            {...props}
            title="作业版本"
            width={1000}
            cancelText="取消"
            className="draft-rollback-modal"
            footer={(_, { CancelBtn, }) => (
                <>
                    <Popconfirm
                        okText="确认"
                        cancelText="取消"
                        title='你确定要回滚到选择的版本吗?'
                        overlayClassName="ant-popover-rtl"
                        onConfirm={onRollBackClick}
                    >
                        <Button icon={<RollbackOutlined />} type="primary">回 滚</Button>
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
                            value={
                                `--创建一个datagen_source临时表。
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
SELECT SUBSTRING(randstr,0,8) from datagen_source;`
                            }
                            original={
                                `--创建一个datagen_source临时表。
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
SELECT SUBSTRING(randstr,0,8) from datagen_source;`
                            }
                            height={'100%'}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default RollBackModal;