import Layout, { Content } from "antd/es/layout/layout";
import "./index.sass";
import MenuSider from "../../component/MenuSider";
import TopHeader from "../../component/TopHeader";
import ContentLayout from "../../component/ContentLayout";
import { FloatButton } from "antd";
import { FileSearchOutlined } from "../../component/Icon";
import DocumentLayout from "../../component/DocumentLayout";
import { createContext, useState } from "react";

export const DocumentContext = createContext((_: boolean) => {});

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
                <TopHeader />
                <Layout hasSider>
                    <MenuSider />
                    <Content>
                        <ContentLayout />
                    </Content>
                </Layout>
            </Layout>

            <FloatButton
                type="primary"
                icon={<FileSearchOutlined />}
                onClick={changeDocumentOpen(true)}
            />
            <DocumentLayout
                open={open}
                onCancel={changeDocumentOpen(false)}
            />
        </DocumentContext.Provider>
    );
};

export default MainPage;
