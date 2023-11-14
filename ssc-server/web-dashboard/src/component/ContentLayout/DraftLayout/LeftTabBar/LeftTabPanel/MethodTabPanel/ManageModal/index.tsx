import { Button, Divider, Input, Modal, ModalProps, Table } from "antd";
import './index.sass'
import { useState } from "react";


interface ManageModalProps extends ModalProps {
    onDeleteClick: () => void;
    onCreateClick: () => void;
}

const ManageModal = (props: ManageModalProps) => {
    const [enableDelete, setEnableDelete] = useState<boolean>(false);
    const [enableCreate, setEnableCreate] = useState<boolean>(false);

    return (
        <Modal
            {...props}
            title="管理函数: testfunc"
            width={800}
            footer={null}
            okText="创建函数"
            className="function-manage-modal"
        >
            <h3>已注册的函数</h3>
            <Table
                size="small"
                columns={[
                    {
                        title: 'Function Name',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Class',
                        dataIndex: 'clazz'
                    },
                    Table.SELECTION_COLUMN,
                ]}
                dataSource={[
                    {
                        key: '1',
                        name: 'ASI_UDF',
                        clazz: 'ASI_UDF.ASI_UDF'
                    },
                ]}
                rowSelection={{
                    columnWidth: '33%',
                    onChange: (keys) => setEnableDelete(keys.length > 0)
                }}
                pagination={false}
            />
            <div className="btn-container">
                <Button disabled={!enableDelete} type="primary" onClick={props.onDeleteClick}>删除函数</Button>
            </div>
            <Divider />
            <h3>可用函数</h3>
            <Table
                columns={[
                    {
                        title: 'Function Name',
                        dataIndex: 'name',
                        render: (value) => <Input defaultValue={value} style={{ backgroundColor: 'transparent' }} />
                    },
                    {
                        title: 'Function class',
                        dataIndex: 'clazz',
                    },
                    Table.SELECTION_COLUMN,
                ]}
                dataSource={[

                    {
                        key: '2',
                        name: 'ASI_UDTF',
                        clazz: 'ASI_UDTF.ASI_UDTF'
                    },
                    {
                        key: '3',
                        name: 'ASI_UDAF$MySum',
                        clazz: 'ASI_UDAF.ASI_UDAF$MySum'
                    }
                ]}
                bordered
                size="small"
                rowSelection={{
                    columnWidth: '33%',
                    onChange: (keys) => setEnableCreate(keys.length > 0)
                }}
                pagination={false}
            />
            <div className="btn-container">
                <Button disabled={!enableCreate} type="primary" onClick={props.onCreateClick}>创建函数</Button>
            </div >
        </Modal >
    )
};

export default ManageModal;