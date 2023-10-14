import React, { useEffect, useState } from 'react';
import { ConfigProvider, MenuProps } from 'antd';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import './index.sass'
import { MenuUnfoldOutlined } from '@ant-design/icons';
import {
    HomeOutlined, ConsoleSqlOutlined, BuildOutlined, FileZipOutlined, ShareAltOutlined, DatabaseOutlined,
    ClusterOutlined, SafetyOutlined, ControlOutlined
} from '../Icon'
import MyLink from '../MyLink';
import { matchPath, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/dashboard">系统概览</MyLink>, 'dashboard', <HomeOutlined />),
    getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/draft">SQL开发</MyLink>, 'draft', <ConsoleSqlOutlined />),
    getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/operations/stream">作业运维</MyLink>, 'operations', <BuildOutlined />),
    getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/resource">资源管理</MyLink>, 'resource', <FileZipOutlined />),
    getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/connectors/connector">数据连接</MyLink>, 'connectors', <ShareAltOutlined />),
    getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/metadata">元数据管理</MyLink>, 'metadata', <DatabaseOutlined />),
    getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/session-clusters/list">Session 集群</MyLink>, 'session-clusters', <ClusterOutlined />),
    getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/security/member">安全中心</MyLink>, 'security', <SafetyOutlined />),
    getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/configurations/deployment-defaults">配置管理</MyLink>, 'configurations', <ControlOutlined />),
    // getItem(<MyLink to="/workspace/:workspace/namespace/:namespace/migration">作业归档</MyLink>, 'migration', <FileDoneOutlined />),
];

const MenuSider = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    let { pathname } = useLocation();
    const pathMatch = matchPath("/workspace/:workspace/namespace/:namespace/:key/*", pathname);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={<MenuUnfoldOutlined />}
            collapsedWidth={64}
        >
            <ConfigProvider prefixCls='side' theme={{
                token: {

                },
                components: {
                    Table: {
                        colorInfoBgHover: "f7f9fa"
                    }
                }
            }}>
                <Menu
                    mode="inline"
                    items={items}
                    inlineIndent={12}
                    defaultSelectedKeys={[pathMatch?.params.key!]}
                />
            </ConfigProvider>
            {
                collapsed
                    ? null
                    : (
                        <div className="compute_resource">
                            <div className="cpu">
                                CPU
                                <div className="value">0 / -</div>
                                <div className="progress"></div>
                            </div>
                            <div className="memory">
                                Memory
                                <div className="value">0 iB / -</div>
                                <div className="progress" style={{ width: "0%" }}></div>
                            </div>
                        </div>
                    )
            }
        </Sider>

    )
};

export default MenuSider;