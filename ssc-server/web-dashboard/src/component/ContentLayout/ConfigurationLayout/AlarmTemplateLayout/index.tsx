import { Button, Divider, Popconfirm, Table } from "antd"
import './index.sass'
import { DeleteOutlined, EditOutlined } from "../../../Icon";
import { useState } from "react";
import AlarmDrawer from "./AlarmDrawer";

type TableProps = Parameters<typeof Table<AlarmTemplate>>[0];
type ColumnTypes = Exclude<TableProps['columns'], undefined>;

interface AlarmTemplate {
    key: React.Key;
    name: string;
    indicator: string;
    description: string;
    createTime: string;
}
//规则模板已创建


const data: AlarmTemplate[] = [
    {
        key: '1',
        name: 'John Brown',
        indicator: "Restart Count in 1 Minute",
        description: 'New York No. 1 Lake Park',
        createTime: "2023-11-10 17:08:25"
    },
];

const WarnTemplateLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const changeDrawerOpen = (open: boolean) => {
        return () => {
            setDrawerOpen(open);
        }
    }

    const columns: ColumnTypes = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '指标',
            dataIndex: 'indicator',
        },
        {
            title: '描述',
            dataIndex: 'description',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 180,
        },
        {
            title: '操作',
            dataIndex: 'age',
            width: 160,
            render: () => (
                <>
                    <Button type="link" icon={<EditOutlined />} size="small" onClick={changeDrawerOpen(true)}>编辑</Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        okText="确认"
                        cancelText="取消"
                        title="确定删除当前告警规则模板吗？"
                        overlayClassName="ant-popover-rtl"
                        placement="left"
                    >
                        <Button type="link" icon={<DeleteOutlined />} size="small" danger>删除</Button>
                    </Popconfirm>
                </>
            )
        },
    ];

    return (
        <div className="warn-template-container">
            <div className="actions">
                <Button
                    type="primary"
                    onClick={changeDrawerOpen(true)}
                >
                    添加告警规则模板
                </Button>
            </div>

            <div className="table-container">
                <Table
                    columns={columns}
                    dataSource={data}
                    showSorterTooltip={false}
                    size='small'
                />
            </div>

            <AlarmDrawer open={drawerOpen} onClose={changeDrawerOpen(false)} title="创建告警规则模板" />
        </div>
    )
};

export default WarnTemplateLayout;