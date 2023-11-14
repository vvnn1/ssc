import { Tree, TreeProps } from 'antd';
import { CaretDownOutlined } from '../../../../../../Icon';
import './index.sass'


const treeData: TreeProps['treeData'] = [
    {
        title: 'INSERT INTO sensor_sink SELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source',
        key: '0-0',
        className: 'sink',
        children: [
            {
                title: 'SELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source',
                key: '0-0-0',
                className: 'select',
                children: [
                    {
                        title: 'sensor_source',
                        key: '0-0-0-0',
                        className: 'source'
                    },
                ],
            },
        ],
    },
];

const SqlStructureTree = () => {

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const titleRender: TreeProps['titleRender'] = (node) => {

        return (
            <span className="tree-node-text">
                <span className="tree-node-text-type">{node.className?.toUpperCase()}</span>
                <span className="tree-node-text-detail">{node.title as string}</span>
            </span>
        )
    }

    return (
        <Tree
            className="sql-structure-tree"
            showLine
            switcherIcon={<CaretDownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
            titleRender={titleRender}
            motion={undefined}
        />
    )
};


export default SqlStructureTree;