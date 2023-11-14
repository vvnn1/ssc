import { Alert, Checkbox, CheckboxProps, Modal, ModalProps, Table } from "antd";
import './index.sass'
import { useState } from "react";

const DeleteModal = (props: ModalProps) => {
    const [btnEnable, setBtnEnable] = useState<boolean>(false);


    const onCheckedChange: CheckboxProps['onChange'] = ({target: {checked}}) => {
        setBtnEnable(checked);
    }
    return (
        <Modal
            {...props}
            title="删除 UDF JAR: testfunc"
            width={800}
            className="jar-delete-modal"
            footer={(_, {OkBtn, CancelBtn}) => (<><OkBtn/><CancelBtn/></>)}
            okButtonProps={{
                disabled: !btnEnable,
                danger: true
            }}
        >
            <Table
                size="small"
                columns={[
                    {
                        title: 'Function Name',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Class Name',
                        dataIndex: 'clazz'
                    }
                ]}
                dataSource={[
                    {
                        name: 'ASI_UDF',
                        clazz: 'ASI_UDF.ASI_UDF'
                    },
                    {
                        name: 'ASI_UDTF',
                        clazz: 'ASI_UDTF.ASI_UDTF'
                    },
                    {
                        name: 'ASI_UDAF$MySum',
                        clazz: 'ASI_UDAF.ASI_UDAF$MySum'
                    }
                ]}
                pagination={false}
                bordered
            />
            <div className="message">
                <Alert
                    message={<><Checkbox onChange={onCheckedChange}/> <strong>删除以上所有函数并且删除关联的文件。</strong></>}
                    description="以上函数已使用该 UDF 文件注册。"
                    type="warning"
                />
            </div>
        </Modal>
    )
};

export default DeleteModal;