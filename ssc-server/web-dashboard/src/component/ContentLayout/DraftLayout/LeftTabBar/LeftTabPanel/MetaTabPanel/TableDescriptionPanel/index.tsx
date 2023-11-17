import { Popover } from "antd";
import { InsertRowLeftOutlined, MinusOutlined } from "../../../../../../Icon";
import "./index.sass";

const TableFieldPopOverContent = () => {
    return (
        <div className="table-field-popover-content">
            <div className="item">
                <div className="key">字段名称</div>
                <div className="value">id</div>
            </div>
            <div className="item">
                <div className="key">字段类型</div>
                <div className="value">BIGINT</div>
            </div>
            <div className="item">
                <div className="key">表达式</div>
                <div className="value">-</div>
            </div>
            <div className="item">
                <div className="key">是否主键</div>
                <div className="value">是</div>
            </div>
            <div className="item">
                <div className="key">Watermark</div>
                <div className="value">-</div>
            </div>
        </div>
    );
};

interface TableDescriptionPanelProps {
    onCancel: () => void;
}

const TableDescriptionPanel = (props: TableDescriptionPanelProps) => {
    return (
        <div className="table-description-panel">
            <div className="header">
                <span className="title">test_table</span>
                <span className="action">
                    <MinusOutlined onClick={props.onCancel} />
                </span>
            </div>
            <div className="content">
                <Popover
                    content={<TableFieldPopOverContent />}
                    placement="right"
                >
                    <div className="row">
                        <span className="name">
                            <InsertRowLeftOutlined /> id
                        </span>
                        <span className="type">BIGINT</span>
                    </div>
                </Popover>

                <Popover
                    content={<TableFieldPopOverContent />}
                    placement="right"
                >
                    <div className="row">
                        <span className="name">
                            <InsertRowLeftOutlined /> user_id
                        </span>
                        <span className="type">BIGINT</span>
                    </div>
                </Popover>
                <Popover
                    content={<TableFieldPopOverContent />}
                    placement="right"
                >
                    <div className="row">
                        <span className="name">
                            <InsertRowLeftOutlined /> product
                        </span>
                        <span className="type">VARCHAR(2147483647)</span>
                    </div>
                </Popover>

                <Popover
                    content={<TableFieldPopOverContent />}
                    placement="right"
                >
                    <div className="row">
                        <span className="name">
                            <InsertRowLeftOutlined /> order_time
                        </span>
                        <span className="type">TIMESTAMP(3)</span>
                    </div>
                </Popover>
            </div>
        </div>
    );
};

export default TableDescriptionPanel;
