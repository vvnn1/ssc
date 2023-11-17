import { Button, Divider } from "antd";
import {
    BackgroundOutlined,
    BuildOutlined,
    DesktopOutlined,
    FileZipOutlined,
    InfoCircleOutlined,
    PlusOutlined,
    TutorialOutlined,
} from "../../Icon";
import "./index.sass";
import Card from "./Card";

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <div className="header">
                <div className="header-intro">
                    <div className="detail">
                        <div className="head">实时计算</div>
                        <div className="desc">
                            实时计算 Flink 版（Alibaba Cloud Realtime Compute for Apache Flink，Powered by
                            Ververica）是阿里云基于 Apache Flink 构建的企业级、高性能实时大数据处理系统，由 Apache Flink
                            创始团队官方出品，拥有全球统一商业化品牌，完全兼容开源 Flink API，提供丰富的企业级增值功能。
                        </div>
                    </div>
                    <div className="background">
                        <BackgroundOutlined />
                    </div>
                </div>
                <Divider />
                <div className="operators">
                    <Button type="link">
                        <DesktopOutlined />
                        <span>作业开发</span>
                    </Button>

                    <Divider type="vertical" />

                    <Button type="link">
                        <BuildOutlined />
                        <span>作业运维</span>
                    </Button>

                    <Divider type="vertical" />

                    <Button type="link">
                        <FileZipOutlined />
                        <span>资源上传</span>
                    </Button>

                    <Divider type="vertical" />

                    <Button type="link">
                        <InfoCircleOutlined />
                        <span>系统信息</span>
                    </Button>
                </div>
            </div>
            <div className="example-list">
                <Card
                    backgroundImageUrl="//g.alicdn.com/computing-frontend/neo/0.14.63/zh/tutorial-starter.ec3e37e6057528bb.svg"
                    title="新手教程"
                    intro="一步步实现第一个 Flink 作业"
                    buttonIcon={<TutorialOutlined />}
                    buttonText="开始新手教程"
                />
                <Card
                    backgroundImageUrl="//g.alicdn.com/computing-frontend/neo/0.14.63/zh/tutorial-simple.4d5bd8a4bbcf2fbc.svg"
                    title="通用场景模板"
                    intro="通用场景 Flink 快速示例"
                    buttonIcon={<PlusOutlined />}
                    buttonText="从模板新建作业"
                />
                <Card
                    backgroundImageUrl="//g.alicdn.com/computing-frontend/neo/0.14.63/zh/tutorial-price.5bb5dfe8fe364bc0.svg"
                    title="订单价格计算模板"
                    intro="模拟电商场景中的订单价格计算"
                    buttonIcon={<PlusOutlined />}
                    buttonText="从模板新建作业"
                />
                <Card
                    backgroundImageUrl="//g.alicdn.com/computing-frontend/neo/0.14.63/zh/tutorial-quantity.31d16b7d02275202.svg"
                    title="订单数量统计模板"
                    intro="模拟电商场景中的订单数量统计"
                    buttonIcon={<PlusOutlined />}
                    buttonText="从模板新建作业"
                />
            </div>
        </div>
    );
};

export default DashboardLayout;
