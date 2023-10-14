import { Button, Col, Divider, Form, Input, Modal, ModalProps, Row, Select, Space, Tabs, TabsProps, Typography } from "antd";
import './index.sass'
import { ArrowLeftOutlined, ArrowsAltOutlined, FileFilled, SearchOutlined } from "../../../../../../../Icon";
import DraftList, { Card } from "./DraftList";
import ScrollTab from "../../../../../../../ScrollTab";
import { useState } from "react";
import Step2 from "./Step2";
import Step1, { CardTemplate } from "./Step1";

const { Paragraph, Text } = Typography;


const basicTemplateItems: Card[] = [
    {
        icon: <FileFilled />,
        title: "空白的流作业草稿",
        content: "创建一个空白的流类型的作业草稿。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "空白的批作业草稿",
        content: "创建一个空白的批类型的作业草稿。",
        classification: "批",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "创建表",
        content: "Flink SQL使用DDL创建表并保存在catalog中，对表的操作和数据库类似。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "创建临时表",
        content: "当某些表只需要在当前会话或SQL脚本中使用时，可以使用临时表。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "创建临时视图",
        content: "在Flink SQL开发过程中，如果需要重用代码，组织长查询或者SQL脚本来简化开发时可以使用临时视图。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "INSERT INTO",
        content: "当你需要将查询结果写入到外部存储系统中的表，从而提供给下游应用程序时需要使用INSERT INTO语法。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "STATEMENT SET",
        content: "当你需要将查询的结果输出到下游的两到多个外部系统中时，需要使用STATEMENT SET语法。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "Watermark",
        content: "上游系统因为崩溃/网络延时等问题造成后产生的数据先被Flink接收会导致数据乱序，如果希望Flink可以正确处理乱序数据就需要使用Watermark。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "GROUP BY",
        content: "需要实时对时间序列数据进行聚合分析的时候，可以使用GROUP BY语句。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "滚动窗口聚合",
        content: "当你需要对时间序列数据进行分组，并对每个分组内的数据进行聚合分析时，可以使用滚动窗口。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "滑动窗口聚合",
        content: "如果需要每间隔一段时间更新一个窗口内的数据的话，你可以使用滑动窗口。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "累积窗口聚合",
        content: "如果你需要提早看到窗口的计算结果，例如每分钟看到最新的窗口结果，可以使用累积窗口。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "会话窗口聚合",
        content: "需要实时统计用户在一个活跃会话期间的数据，你可以使用会话窗口。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "Over窗口聚合",
        content: "如果你想对一个窗口内的每个元素进行统计分析时，需要使用OVER窗口。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "级联窗口聚合",
        content: "当你想同时对同一个流的数据进行不同时间维度（如1min/5min/30min/1h）的聚合的时候，需要使用级联窗口。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "去重",
        content: "当你需要去除数据流中的重复数据时，可以使用去重语法。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "Top-N",
        content: "当你需要根据业务要求计算出目前排名前几位或者后几位的数据的时候可以使用Top-N功能。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "窗口Top-N",
        content: "当你需要在某个时间范围内计算出目前排名前几位或者后几位的数据的时候可以使用窗口Top-N功能。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "模式检测（CEP）",
        content: "在数据流情景中，当需要搜索一组事件模式时，可以使用MATCH_RECOGNIZE语句。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "Regular Join",
        content: "当你在计算中需要去关联查询其他流表的数据时，可以使用Regular Join。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "Interval Join",
        content: "如果你需要关联某张表在指定时间范围内的数据可以使用Interval Join。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "时态表Join",
        content: "当流表中的每条数据需要关联其他表中对应时间版本数据的时候，可以使用时态表Join。",
        classification: "流",
        type: "SQL"
    },
    {
        icon: <FileFilled />,
        title: "维表Join",
        content: "如果你需要关联静态维表上的数据可以使用维表Join。",
        classification: "流",
        type: "SQL"
    },
];

const synTemplateItems: Card[] = [
    {
        icon: <FileFilled />,
        title: "MySQL到Hologres数据同步",
        content: "本模版可以协助您将mysql中的数据实时同步到hologres。",
        classification: "流",
        type: "SQL"
    },
];

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `SQL 基础模板`,
        children: <DraftList items={basicTemplateItems} />,
    },
    {
        key: '2',
        label: `数据同步模板`,
        children: <DraftList items={synTemplateItems} />
    },
];



const CreateDraftModal = (props: ModalProps) => {

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selectedCardTemplate, setSelectedCardTemplate] = useState<CardTemplate>();

    const nextClick = () => {
        if (currentStep < 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevClick = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    const step1Footer = (
        <>
            <Button key="next-step" type="primary" onClick={nextClick}>下一步</Button>
            <Button key="cancel" onClick={props.onCancel}>取消</Button>
        </>
    );


    const step2Footer = (
        <>
            <Button key="perv-step" onClick={prevClick}>上一步</Button>
            <Button key="create" type="primary">创建</Button>
            <Button key="cancel" onClick={props.onCancel}>取消</Button>
        </>
    );

    return (
        <Modal
            destroyOnClose
            open={props.open}
            onCancel={props.onCancel}
            maskClosable={false}
            title="新建作业草稿"
            width={1000}
            rootClassName="create-draft-modal"
            footer={currentStep === 0 ? step1Footer : step2Footer}
        >

            {currentStep === 0 ? <Step1 onTemplateSelected={setSelectedCardTemplate}/> : <Step2 onBackwardClick={prevClick}/>}

        </Modal>
    )
};

export default CreateDraftModal;