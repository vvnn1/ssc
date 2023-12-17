import { Divider, Popover, Space, Tooltip, TreeDataNode } from "antd";
import { CopyOutlined, ReloadOutlined } from "../../../../../../../../component/Icon";

interface TreeTitleProps {
    dataNode: TreeDataNode;
}

interface MetaDescriptionProps {
    metaItems: { key: string; value: string }[];
    updateTime?: string;
}
const MetaPopOverpContent = (props: MetaDescriptionProps) => {
    return (
        <div className="meta-popover-content">
            {props.metaItems.map((item, index) => {
                return (
                    <div
                        className="item"
                        key={index}
                    >
                        <div className="key">{item.key}</div>
                        <div className="value">{item.value}</div>
                    </div>
                );
            })}
            {props.updateTime ? (
                <>
                    <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                    <div className="item">
                        <div className="key">数据更新于 {props.updateTime}</div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

const createPopoverContent = (props: TreeTitleProps) => {
    if (props.dataNode.className === "catalog") {
        return (
            <MetaPopOverpContent
                metaItems={[
                    {
                        key: "Catalog名称",
                        value: "vvp",
                    },
                    {
                        key: "defaultDatabase",
                        value: "default",
                    },
                    {
                        key: "type",
                        value: "vvp",
                    },
                ]}
                updateTime="2023/09/25 09:48"
            />
        );
    }

    if (props.dataNode.className === "database") {
        return (
            <MetaPopOverpContent
                metaItems={[
                    {
                        key: "数据库名称",
                        value: "default",
                    },
                    {
                        key: "备注",
                        value: "the default database",
                    },
                ]}
            />
        );
    }

    if (props.dataNode.className === "table") {
        return (
            <MetaPopOverpContent
                metaItems={[
                    {
                        key: "表名称",
                        value: "test_table",
                    },
                    {
                        key: "备注",
                        value: "comment",
                    },
                    {
                        key: "connector",
                        value: "datagen",
                    },
                ]}
            />
        );
    }
};

const TreeTitle = (props: TreeTitleProps) => {
    return (
        <Popover
            content={createPopoverContent(props)}
            placement="right"
        >
            <div className="tree-title">
                <div className="title-wrapper">{props.dataNode.title as React.ReactNode}</div>
                <div className="actions">
                    <Space size={8}>
                        {props.dataNode.className === "catalog" ? (
                            <Tooltip title="刷新元数据信息">
                                <ReloadOutlined />
                            </Tooltip>
                        ) : null}
                        <Tooltip title="复制名称">
                            <CopyOutlined />
                        </Tooltip>
                    </Space>
                </div>
            </div>
        </Popover>
    );
};

export default TreeTitle;
