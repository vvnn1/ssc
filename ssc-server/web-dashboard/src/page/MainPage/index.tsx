import "./index.sass";
import Sider from "./Sider";
import Header from "./Header";
import ContentLayout from "./ContentLayout";
import { FloatButton, Layout } from "antd";
import { FileSearchOutlined } from "../../component/Icon";
import DocumentLayout from "../../component/DocumentLayout";
import { createContext, useState } from "react";

export const DocumentContext = createContext((_: boolean) => {});

const { Content } = Layout;

const MainPage = (): React.ReactElement => {
    const [open, setOpen] = useState<boolean>(false);

    const changeDocumentOpen = (open: boolean) => {
        return () => {
            setOpen(open);
        };
    };

    return (
        <DocumentContext.Provider value={setOpen}>
            <Layout className="base-layout">
                <Header />
                <Layout hasSider>
                    <Sider />
                    <Content>
                        <ContentLayout />
                    </Content>
                </Layout>
            </Layout>

            <FloatButton
                type="primary"
                icon={<FileSearchOutlined />}
                onClick={changeDocumentOpen(!open)}
            />
            <DocumentLayout
                open={open}
                onCancel={changeDocumentOpen(false)}
            />
        </DocumentContext.Provider>
    );
};

export default MainPage;
