import React from "react";
import {Layout} from "antd";
import "./index.sass"
import MenuSider from "../../component/MenuSider";
import FileBar from "../../component/OperationBar/FileBar"
const {Sider, Header, Content} = Layout

const MainPage:React.FC = () => {
    return (
        <Layout className="base-layout">
            <Header className="header">Header</Header>
            <Layout className="work-layout">
                <Sider className="active-bar" collapsed collapsedWidth={44}>
                    <MenuSider/>
                </Sider>
                <Content className="work-content">
                    <div className="side-bar">
                        <FileBar/>
                    </div>
                    <div className="edit-layout">dash-board</div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainPage;