import { Popover, Tree, TreeNodeProps } from "antd";
import { ContainerOutlined, DatabaseOutlined, MinusSquareOutlined, PlusSquareOutlined, TableOutlined } from "../../../../../../Icon";
import { DataNode } from "antd/es/tree";
import './index.sass'
import TreeTitle from "./TreeTitle";

const treeData: DataNode[] = [
    {
        title: (
            <>
                <span className="title">vvp</span>
                <span className="extra">数据更新于 06-24 13:46</span>
            </>
        ),
        key: '0-0',
        icon: <ContainerOutlined />,
        children: [
            {
                title: (
                    <>
                        <span className="title">default</span>
                        <span className="tag">默认</span>
                    </>
                ),
                key: '0-0-0',
                icon: <DatabaseOutlined />,
                switcherIcon: (node) => (node.expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />),
                className: 'database',
                children: [
                    {
                        title: 'test-table',
                        key: '0-0-0-1',
                        icon: <TableOutlined />,
                        className: 'table',
                    },
                ]
            }
        ],
        switcherIcon: (node) => (node.expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />),
        className: 'catalog',
    },
];

const titleRender = (node: DataNode) => {
    return <TreeTitle dataNode={node} />
}

export default () => {
    return (
        <Tree
            className="meta-tree"
            showLine={false}
            showIcon={true}
            defaultExpandedKeys={['0-0-0']}
            treeData={treeData}
            titleRender={titleRender}
            blockNode
        />
    )
}