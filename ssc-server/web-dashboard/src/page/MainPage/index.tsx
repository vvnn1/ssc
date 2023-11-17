import Layout, { Content } from "antd/es/layout/layout";
import "./index.sass";
import MenuSider from "../../component/MenuSider";
import TopHeader from "../../component/TopHeader";
import ContentLayout from "../../component/ContentLayout";

const MainPage = (): React.ReactElement => {
    return (
        <Layout className="base-layout">
            <TopHeader />
            <Layout hasSider>
                <MenuSider />
                <Content>
                    <ContentLayout />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainPage;
