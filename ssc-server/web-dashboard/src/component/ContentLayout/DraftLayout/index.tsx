import './index.sass'
import MainContent from './MainContent';
import LeftTabBar from './LeftTabBar';
import DraftTabPanel from './LeftTabBar/LeftTabPanel/DraftTabPanel';
import { useState } from 'react';
import Resizable from '../../Resizable';
import BottomTabBar from './BottomTabBar';
import WelcomeContent from './WelcomeContent';
import { Route, Routes } from 'react-router-dom';

const DraftLayout = () => {
    const [tabPanel, setTabPanel] = useState<React.ReactNode>(<DraftTabPanel />);

    return (
        <div className="draft-layout">
            <div className="panel workbench panel-ttb">
                <div className="panel left-panel panel-ltr panel-border-bottom">
                    <div className="panel-tabs-bar panel-tabs-bar-small panel-tabs-bar-left panel panel-ttb panel-border-right">
                        <LeftTabBar activeTabPanel={setTabPanel} />
                    </div>

                    <Resizable
                        size={220}
                        axis='x'
                        className='left-bar-panel resizable-panel panel panel-ltr panel-border-right'
                        resizeHandle='e'
                        minSize={150}
                        maxSize={500}
                    >
                        {tabPanel}
                    </Resizable>

                    <div className="panel main-panel panel-ttb">

                        <Routes>
                            <Route path='' element={<WelcomeContent />} />
                            <Route path=":draftId">
                                <Route path="sql" element={<MainContent />} />
                            </Route>
                        </Routes>
                    </div>

                </div>
                <div className="panel-bar panel-bar-small panel panel-ltr">
                    <BottomTabBar />
                </div>
            </div>
        </div>
    )
};

export default DraftLayout;