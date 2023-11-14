import { Button, Divider, Dropdown, Table, Tooltip } from "antd";
import "./index.sass";
import { DownOutlined, LockFilled } from "../../../../../Icon";
import CompareModal from "./CompareModal";
import { useState } from "react";
import RollBackModal from "./RollBackModal";
import DeleteModal from "./DeleteModal";

type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const VersionTab = () => {
    const [diffModalOpen, setDiffModalOpen] = useState<boolean>(false);
    const [rollBackModalOpen, setRollBackModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean, setModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        return () => {
            setModalOpen(open);
        };
    };

    const columns: ColumnTypes = [
        {
            title: "版本号",
            dataIndex: "version",
            key: "version",
            fixed: "left",
            width: 100,
            render: (value, recoerd) => <>{value} {recoerd.lock ? <LockFilled style={{color: "#fac800"}}/> : null}</>
        },
        {
            title: "提交时间",
            dataIndex: "dateTime",
            key: "dateTime",
            width: 120,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "提交人",
            dataIndex: "submitor",
            key: "submitor",
            width: 150,
            render: (value) => <Tooltip title={value}>{value}</Tooltip>
        },
        {
            title: "备注",
            dataIndex: "remark",
            key: "remark",
            width: 150
        },
        {
            title: "操作",
            key: "operations",
            fixed: "right",
            width: 120,
            render: () => {
                return (
                    <span>
                        <Button type="link" size="small" onClick={changeModalOpen(true, setDiffModalOpen)}>对比</Button>
                        <Divider type="vertical" />
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "1",
                                        label: <Tooltip title="The draft editor will be reverted to this particular version." placement="left">回滚</Tooltip>,
                                        onClick: changeModalOpen(true, setRollBackModalOpen),

                                    },
                                    {
                                        key: "2",
                                        label: <Tooltip title="Pinned versions cannot be overwritten if the total number of versions reaches limit." placement="left">锁定</Tooltip>
                                    },
                                    {
                                        key: "3",
                                        label: "删除",
                                        danger: true,
                                        onClick: changeModalOpen(true, setDeleteModalOpen),
                                    }
                                ]
                            }}
                        >
                            <Button type="link" size="small">更多<DownOutlined /></Button>
                        </Dropdown>
                    </span>
                );
            }
        },
    ];

    return (
        <div className="draft-version">
            <div className="title">
                <span>版本信息</span>
            </div>
            <div className="content-wrapper">
                <Table //TODO bug
                    size="small"
                    columns={columns}
                    scroll={{ x: 150 }}
                    pagination={false}
                    dataSource={[
                        {
                            version: "11",
                            dateTime: "10-19 14:24",
                            submitor: "1142765884572712",
                            remark: "-",
                            lock: false
                        },
                        {
                            version: "10",
                            dateTime: "10-14 14:24",
                            submitor: "1142765884572712",
                            remark: "-",
                            lock: true
                        },
                    ]}
                />
            </div>
            <CompareModal open={diffModalOpen} onCancel={changeModalOpen(false, setDiffModalOpen)} />
            <RollBackModal open={rollBackModalOpen} onCancel={changeModalOpen(false, setRollBackModalOpen)} />
            <DeleteModal open={deleteModalOpen} onCancel={changeModalOpen(false, setDeleteModalOpen)}/>
        </div>
    );
};

export default VersionTab;