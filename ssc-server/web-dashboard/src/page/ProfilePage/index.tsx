import { Layout } from "antd";
import Header from "./Header";
import Sider from "./Sider";
import ContentLayout from "./ContentLayout";

const { Content } = Layout;
const ProfilePage = () => {
    return (
        <Layout className="base-layout">
            <Header />
            <Layout hasSider>
                <Sider />
                <Content>
                    <ContentLayout />
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProfilePage;
