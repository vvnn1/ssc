import { Empty, Input, Radio, Space, Switch } from "antd";
import "./index.sass";
import { SearchOutlined } from "../../../../Icon";

const RelationLayout = () => {
    return (
        <div className="table-relation-layout">
            <div className="top-bar">
                <Space>
                    <Radio.Group optionType='button' defaultValue="table">
                        <Radio value="table">表级别</Radio>
                        <Radio value="field">字段级别</Radio>
                    </Radio.Group>
                    <Input prefix={<SearchOutlined />} placeholder='通过节点名称搜索' />
                </Space>
                <span className="top-bar-right">
                    居中选中节点：<Switch />
                </span>
            </div>
            <Empty />
        </div>
    );
};

export default RelationLayout;