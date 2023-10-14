import { Form, Radio, RadioChangeEvent, Select, Space, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { ApartmentOutlined, BlockOutlined, CheckOutlined, ControlOutlined, DeleteOutlined, DownloadOutlined, HistoryOutlined, RotateRightOutlined, UploadOutlined } from "../../../../Icon";
import './index.sass';
import SqlStructureGraph from "./SqlStructureGraph";
import SqlStructureTree from "./SqlStructureTree";
// import Tooltip from "../../../../Tooltip";

const { Option } = Select;

type TableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const columns: ColumnTypes = [
    {
        title: '版本号',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 100
    },
    {
        title: '提交时间',
        dataIndex: 'age',
        key: 'age',
        width: 120,
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: '提交人',
        dataIndex: 'address',
        key: 'address',
        width: 150
    },
    {
        title: '备注',
        dataIndex: 'name',
        key: 'name',
        width: 150
    },
    {
        title: '操作',
        dataIndex: 'age',
        key: 'age',
        fixed: 'right',
        width: 120
    },
]

const Configuration = () => {
    return (
        <div className="draft-configuration">
            <div className="title">
                <span>更多配置</span>
            </div>

            <div className="content-wrapper">
                <Form
                    size="small"
                    layout="vertical"
                >
                    <Form.Item
                        label="引擎版本"
                    >
                        <Select />
                    </Form.Item>
                    <Form.Item
                        label="附加依赖文件"
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="如果你需要添加更多依赖文件，请选择或输入任意合法的文件地址"
                            defaultValue={['china']}
                            optionLabelProp="label"
                            suffixIcon={<Tooltip title="选择或拖拽文件以上传" placement="left"><UploadOutlined /></Tooltip>}
                            popupClassName="addition-file-dropdown small"
                            menuItemSelectedIcon={<span className="ant-select-selected-icon"><CheckOutlined /></span>}
                        >
                            <Option value="china" label="China">
                                <div className="addition-file-item">
                                    <span className="file-name">Final_Company.txt</span>
                                    <span className="operator">
                                        <Space>
                                            <Tooltip title="下载" ><DownloadOutlined /></Tooltip>
                                            <Tooltip title="删除"><DeleteOutlined /></Tooltip>
                                        </Space>
                                    </span>
                                </div>
                            </Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};


const Structure = () => {
    const [structureNode, setStructureNode] = useState<React.ReactNode>(<SqlStructureGraph />);

    const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
        if (value === 'graph') {
            setStructureNode(<SqlStructureGraph />);
        } else if (value === 'tree') {
            setStructureNode(<SqlStructureTree />);
        }
    }

    return (
        <div className="draft-struct">
            <div className="title">
                <span>代码结构</span>
                <span className="actions">
                    <Tooltip title="切换视图布局方向"><RotateRightOutlined /></Tooltip>
                    <Tooltip title="自适应缩放"><BlockOutlined /></Tooltip>
                </span>
            </div>
            <div className="content-wrapper">
                <div className="structure-switch">
                    <Radio.Group defaultValue="graph" size="small" buttonStyle="solid" onChange={onRadioChange}>
                        <Radio.Button value="graph">数据流向图</Radio.Button>
                        <Radio.Button value="tree">树状结构图</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="structure">
                    {structureNode}
                </div>
            </div>
        </div>
    )
};

const Version = () => {
    return (
        <div className="draft-version">
            <div className="title">
                <span>版本信息</span>
            </div>
            <div className="content-wrapper">
                <Table size="small" columns={columns} scroll={{ x: 150 }} />
            </div>
        </div>
    )
};

interface RightTabBarProps {
    onPanelChange: (panel: React.ReactNode) => void;
}

const RightTabBar = (props: RightTabBarProps) => {
    const [activeLabel, setActiveLabel] = useState<string>();

    const changeActiveLabel = (label: string, activePanel: React.ReactNode) => {
        return () => {
            if (activeLabel === label) {
                setActiveLabel(undefined);
                props.onPanelChange(undefined);
            } else {
                setActiveLabel(label);
                props.onPanelChange(activePanel);
            }
        }
    }

    return (
        <div className="tabs-bar-right">
            <div id="draft-configurations" className={`tabs-bar-tab-label ${activeLabel === 'draft-configurations' ? 'tabs-bar-tab-label-activated' : ''}`} onClick={changeActiveLabel("draft-configurations", <Configuration />)}>
                <span className="tabs-bar-tab-icon">
                    <ControlOutlined />
                </span>
                <span className="tabs-bar-tab-title">更多配置</span>
            </div>
            <div id="structure" className={`tabs-bar-tab-label ${activeLabel === 'structure' ? 'tabs-bar-tab-label-activated' : ''}`} onClick={changeActiveLabel("structure", <Structure />)}>
                <span className="tabs-bar-tab-icon">
                    <ApartmentOutlined />
                </span>
                <span className="tabs-bar-tab-title">代码结构</span>
            </div>
            <div id="versions" className={`tabs-bar-tab-label ${activeLabel === 'versions' ? 'tabs-bar-tab-label-activated' : ''}`} onClick={changeActiveLabel("versions", <Version />)}>
                <span className="tabs-bar-tab-icon">
                    <HistoryOutlined />
                </span>
                <span className="tabs-bar-tab-title">版本信息</span>
            </div>
        </div>
    )
}

export default RightTabBar;