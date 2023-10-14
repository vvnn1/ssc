import { Menu, MenuProps } from 'antd';
import './index.sass'
import MyLink from '../../../../MyLink';
import RuntimeLogLayout from './RuntimeLogLayout';
import { Outlet, Route, Routes, matchPath, useHref, useLocation, useNavigate } from 'react-router-dom';
import LaunchLogLayout from './LaunchLogLayout';
import ExceptionLayout from './ExceptionLayout';
import RunIdNavigate from './RuntimeLogLayout/RunIdNavigate';

const items: MenuProps['items'] = [
    {
        label: <MyLink to='running'>运行日志</MyLink>,
        key: 'running',
    },
    {
        label: <MyLink to="starting">启动日志</MyLink>,
        key: 'starting',
    },
    {
        label: <MyLink to="exceptions">异常信息</MyLink>,
        key: 'exceptions'
    }
]
const ExplorationLayout = () => {
    let { pathname } = useLocation();
    const pathMatch = matchPath("/workspace/:workspace/namespace/:namespace/operations/:jobType/:jobId/:detailTab/:key/*", pathname);

    return (
        <div className="development-exploration-layout">
            <Menu className="vertical-mode" mode="inline" items={items} defaultSelectedKeys={[pathMatch?.params.key!]} />
            <Routes>
                <Route path='running' element={<RunIdNavigate />}>
                    <Route path=':runId'>
                        <Route path="archives">
                            <Route path='*' element={<RuntimeLogLayout />} />
                        </Route>
                    </Route>
                </Route>

                <Route path='starting' element={<LaunchLogLayout />} />
                <Route path='exceptions' element={<ExceptionLayout />} />
            </Routes>

        </div>
    )
};

export default ExplorationLayout;