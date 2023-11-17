import { Button, Empty, Tabs, TabsProps } from "antd";
import "./index.sass";
import {
    ConnectorOutlined,
    ElasticsearchOutlined,
    HologresOutlined,
    MySqlOutlined,
    PlusOutlined,
} from "../../../../Icon";
import { useState } from "react";
import CatalogList, { Card } from "./CatalogList";
import CustomCatalogModal from "./CustomCatalogModal";
import HiveForm from "../Step2Form/HiveForm";
import HologresForm from "../Step2Form/HologresForm";
import MySqlForm from "../Step2Form/MySqlForm";
import DLFForm from "../Step2Form/DLFForm";
import PaimonForm from "../Step2Form/PaimonForm";
import CommonForm from "../Step2Form/CommonForm";

const catalogItems: Card[] = [
    {
        icon: <ConnectorOutlined />,
        desc: "Hive",
        nextStep: <HiveForm />,
    },
    {
        icon: <HologresOutlined />,
        desc: "Hologres",
        nextStep: <HologresForm />,
    },
    {
        icon: <MySqlOutlined />,
        desc: "MySQL",
        nextStep: <MySqlForm />,
    },
    {
        icon: <ConnectorOutlined />,
        desc: "DLF",
        nextStep: <DLFForm />,
    },
    {
        icon: <ConnectorOutlined />,
        desc: "Apache Paimon",
        nextStep: <PaimonForm />,
    },
];

const customCatalogItems: Card[] = [
    {
        icon: <ElasticsearchOutlined />,
        desc: "ElasticSearch",
        deletable: true,
        nextStep: <CommonForm />,
    },
];

interface Step1FormInterface {
    onNextFormChange: (nextForm: React.ReactNode) => void;
    hidden: boolean;
}

const Step1Form = (props: Step1FormInterface) => {
    const [customCatalogButton, setCustomCatalogButton] = useState<React.ReactNode>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const changeModalOpen = (open: boolean) => {
        return () => {
            setModalOpen(open);
        };
    };

    const onTabChange = (key: string) => {
        if (key === "2") {
            setCustomCatalogButton(
                <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={changeModalOpen(true)}
                >
                    创建自定义 Catalog 类型
                </Button>
            );
        } else {
            setCustomCatalogButton(null);
        }
    };

    const wrapperClick = (cards: Card[]): Card[] => {
        return cards.map(card => {
            card.onClick = () => props.onNextFormChange(card.nextStep);
            return card;
        });
    };

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "内置 Catalog",
            children: <CatalogList dataSource={wrapperClick(catalogItems)} />,
        },
        {
            key: "2",
            label: "自定义 Catalog",
            children:
                customCatalogItems.length > 0 ? (
                    <CatalogList dataSource={wrapperClick(customCatalogItems)} />
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                        <Button
                            type="primary"
                            size="small"
                            onClick={changeModalOpen(true)}
                        >
                            创建自定义 Catalog 类型
                        </Button>
                    </Empty>
                ),
        },
    ];

    return (
        <div hidden={props.hidden}>
            <Tabs
                className="step1-tabs"
                defaultActiveKey="1"
                items={items}
                onChange={onTabChange}
                tabBarExtraContent={customCatalogButton}
                destroyInactiveTabPane
            />
            <CustomCatalogModal
                open={modalOpen}
                onCancel={changeModalOpen(false)}
            />
        </div>
    );
};

export default Step1Form;
