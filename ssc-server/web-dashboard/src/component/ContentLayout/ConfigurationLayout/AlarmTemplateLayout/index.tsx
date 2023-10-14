import { Button, Divider, Drawer, Form, Space, Table } from "antd"
import './index.sass'
import { DeleteOutlined, EditOutlined } from "../../../Icon";
import { useState } from "react";
import AlarmRuleItem from "./AlarmDrawer/AlarmRuleItem";
import NotifiAvenueItem from "./AlarmDrawer/NotifiAvenueItem";
import AlarmDrawer from "./AlarmDrawer";

type TableProps = Parameters<typeof Table<DataType>>[0];
type ColumnTypes = Exclude<TableProps['columns'], undefined>;

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnTypes = [
    {
        title: '名称',
        dataIndex: 'name',
        width: '26.5%',
    },
    {
        title: '指标',
        dataIndex: 'age',
        width: '26.5%',
    },
    {
        title: '描述',
        dataIndex: 'age',
    },
    {
        title: '创建时间',
        dataIndex: 'age',
        width: '180px',
    },
    {
        title: '操作',
        dataIndex: 'age',
        width:'160px',
        render: () => (
            <>
                <Button type="link" icon={<EditOutlined />} size="small">编辑</Button>
                <Divider type="vertical" />
                <Button type="link" icon={<DeleteOutlined />} size="small" danger>删除</Button>
            </>
        )
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const WarnTemplateLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const changeDrawerOpen = (open: boolean) => {
        return () => {
            setDrawerOpen(open);
        }
    }
    
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
            
            <AlarmDrawer open={drawerOpen} onClose={changeDrawerOpen(false)} title="创建告警规则模板"/>
        </div>
    )
};

export default WarnTemplateLayout;