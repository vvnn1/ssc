import { Button, Divider, Input, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import './index.sass'
import { DeleteOutlined, EditOutlined, TeamOutlined } from "../../../Icon";
import { useState } from "react";
import AddModal from "./AddModal";
import { changeModalOpen } from "../../../../util";
import EditorModal from "./EditorModal";

const { Search } = Input;


interface Member {
    key: React.Key;
    role: string;
    memberId: string;
    memberName: string;
}

type TableProps = Parameters<typeof Table<Member>>[0];
type ColumnTypes = Exclude<TableProps['columns'], undefined>;



const data: Member[] = [
    {
        key: '1',
        role: 'owner',
        memberId: "1840755998634838",
        memberName: '1840755998634838',
    },
];


const MemberLayout = () => {
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const onSearch = (value: string) => console.log(value);

    const columns: ColumnTypes = [
        {
            title: '角色',
            dataIndex: 'role',
            width: 200,
            render: (name) => (
                <>
                    <TeamOutlined /> <span>{name}</span>
                </>
            )
        },
        {
            title: '成员 ID',
            dataIndex: 'memberId',
            render: (memberId) => <Tooltip title={memberId}><Tag>{memberId}</Tag></Tooltip>
        },
        {
            title: '成员名',
            dataIndex: 'memberName',
            render: (memberName) => <Tooltip title={memberName}><Tag>{memberName}</Tag></Tooltip>
        },
        {
            title: '操作',
            width: 200,
            render: () => (
                <>
                    <Button type="link" size="small" onClick={changeModalOpen(true, setEditModalOpen)}><EditOutlined />编辑</Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        okText="确认"
                        cancelText="取消"
                        title="确认要删除该成员？"
                        overlayClassName="ant-popover-rtl"
                    >
                        <Button type="link" size="small" danger><DeleteOutlined />删除</Button>
                    </Popconfirm>
                </>
            )
        },
    ];

    return (
        <div className="security-member-layout">
            <div className="actions">
                <Space>
                    <Button type='primary' onClick={changeModalOpen(true, setAddModalOpen)}>添加角色绑定</Button>
                    <Search
                        placeholder="搜索…"
                        onSearch={onSearch}
                    />
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                showSorterTooltip={false}
                size='small'
            />

            <EditorModal open={editModalOpen} onCancel={changeModalOpen(false, setEditModalOpen)} />
            <AddModal open={addModalOpen} onCancel={changeModalOpen(false, setAddModalOpen)} />
        </div>
    )
};

export default MemberLayout;